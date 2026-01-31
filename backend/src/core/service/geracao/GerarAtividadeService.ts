import { UnidadeRepository } from "../../repository/UnidadeRepository";
import { AtividadeRepository } from "../../repository/AtividadeRepository";
import { LogGeracaoIARepository } from "../../repository/LogGeracaoIARepository";
import { IAClient } from "../ia/IAClient";
import { ModelosIA } from "../ia/ModelasIA";
import { PromptFactory } from "../ia/PromptFactory";
import { CreateAtividadeDTO, AtividadeDTO, PlanoAulaDTO, UnidadeResponseDTO } from "../../models/DTOs";

/**
 * Calcula quantas atividades ainda podem ser geradas com o saldo disponível.
 * @param saldoAtual - Valor monetário disponível na API
 * @param custoPorAtividade - Custo estimado por geração de atividade
 * @returns Número inteiro de atividades restantes
 */
function calcularAtividadesRestantes(saldoAtual: number, custoPorAtividade = 0.000456): number {
  return Math.floor(saldoAtual / custoPorAtividade);
}

/**
 * Serviço responsável por gerar atividades pedagógicas para uma unidade.
 * Utiliza IA externa e registra logs da geração.
 */
export class GerarAtividadeService {
  /**
   * @param unidadeRepo - Repositório para buscar dados da unidade
   * @param atividadeRepo - Repositório para criar atividades
   * @param logRepo - Repositório para registrar logs de gerações da IA
   * @param iaClient - Cliente para chamar a IA externa
   */
  constructor(
    private unidadeRepo: UnidadeRepository, 
    private atividadeRepo: AtividadeRepository, 
    private logRepo: LogGeracaoIARepository, 
    private iaClient: IAClient
  ) { }

  /**
   * Executa a geração de uma atividade para uma unidade específica.
   * @param unidadeId - ID da unidade
   * @returns Objeto contendo a atividade criada, BNCC, fontes, evidências e número de atividades restantes
   * @throws Erro se a unidade não for encontrada ou se houver falha na IA
   */
  async executar(unidadeId: number) {
    
    const unidade: UnidadeResponseDTO | null = await this.unidadeRepo.findById(unidadeId);
    if (!unidade) throw new Error("Unidade não encontrada");

    const unidadeParaPrompt = {
      tema: unidade.tema ?? "Não definido",
      serieAno: unidade.serieAno ?? "Não definido",
    };

    const prompt = PromptFactory.atividade(unidadeParaPrompt as any);

    const respostaIA = await this.iaClient.gerarTexto(ModelosIA.ATIVIDADE, prompt);

    const atividadeData: CreateAtividadeDTO = {
      unidadeId: unidade.id,
      enunciado: respostaIA,
      criteriosCorrecao: "Definidos pela IA",
      tipo: "ATIVIDADE",
    };

    const atividade: AtividadeDTO = await this.atividadeRepo.create(atividadeData);

    const evidencias = unidade.planoAula?.fontes ?? [];

    await this.logRepo.create({
      unidadeId: unidade.id,
      tipoGeracao: "ATIVIDADE",
      promptUsado: prompt,
      respostaBruta: respostaIA,
      evidenciasRecuperadas: evidencias,
    });

    const saldoAPI = 5;
    const atividadesRestantes = calcularAtividadesRestantes(saldoAPI);

    return {
      atividade,
      bnccCompetencias: unidade.planoAula?.bnccCompetencias ?? [],
      fontes: unidade.planoAula?.fontes ?? [],
      evidencias: evidencias,
      atividadesRestantes,
    };
  }
}
