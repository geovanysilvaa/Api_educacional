import { UnidadeRepository } from "../../repository/UnidadeRepository";
import { PlanoAulaRepository } from "../../repository/PlanoAulaRepository";
import { LogGeracaoIARepository } from "../../repository/LogGeracaoIARepository";
import { IAClient } from "../ia/IAClient";
import { ModelosIA } from "../ia/ModelasIA";

/**
 * Calcula quantas gerações de planos de aula ainda podem ser feitas com o saldo disponível.
 * @param saldoAtual - Valor monetário disponível na API
 * @param custoPorPlano - Custo estimado por geração de plano de aula
 * @returns Número inteiro de gerações restantes
 */
function calcularGeracoesRestantes(saldoAtual: number, custoPorPlano = 0.000456): number {
  return Math.floor(saldoAtual / custoPorPlano);
}

/**
 * Serviço responsável por gerar planos de aula para uma unidade.
 * Verifica se já existe plano gerado, se não, chama IA externa e registra logs.
 */
export class GerarPlanoAulaService {
  /**
   * @param unidadeRepo - Repositório para buscar dados da unidade
   * @param planoRepo - Repositório para criar/consultar planos de aula
   * @param logRepo - Repositório para registrar logs de gerações da IA
   * @param iaClient - Cliente para chamar a IA externa
   */
  constructor(
    private unidadeRepo: UnidadeRepository, 
    private planoRepo: PlanoAulaRepository, 
    private logRepo: LogGeracaoIARepository, 
    private iaClient: IAClient
  ) { }

  /**
   * Executa a geração do plano de aula para uma unidade específica.
   * @param unidadeId - ID da unidade
   * @returns Objeto contendo o plano (novo ou existente), gerações restantes e mensagem
   * @throws Erro se a unidade não for encontrada ou se houver falha na IA
   */
  async executar(unidadeId: number) {
   
    const unidade = await this.unidadeRepo.findById(unidadeId);
    if (!unidade) throw new Error("Unidade não encontrada");

    const planoExistente = await this.planoRepo.findAllByUnidade(unidade.id);
    const saldoAPI = 5; // $5 de crédito restante (exemplo)

    if (planoExistente) {
     
      return {
        plano: planoExistente,
        geracoesRestantes: calcularGeracoesRestantes(saldoAPI),
        mensagem: "Plano de aula já existe. Retornando existente."
      };
    }

    const prompt = `
Você é um especialista em pedagogia.

Crie um plano de aula com linguagem clara e didática.

Disciplina (ID): ${unidade.disciplinaId}
Série/Ano: ${unidade.serieAno}
Tema: ${unidade.tema}
Duração: ${unidade.duracao} minutos

Estrutura obrigatória:
- Introdução
- Desenvolvimento
- Conclusão
`;

    const respostaIA = await this.iaClient.gerarTexto(ModelosIA.PLANO, prompt);

    const plano = await this.planoRepo.create({
      unidadeId: unidade.id,
      textoPlano: respostaIA,
      bnccCompetencias: [],
      fontes: []
    });

    await this.logRepo.create({
      unidadeId: unidade.id,
      tipoGeracao: "PLANO",
      promptUsado: prompt,
      respostaBruta: respostaIA,
      evidenciasRecuperadas: []
    });

    return {
      plano,
      geracoesRestantes: calcularGeracoesRestantes(saldoAPI),
      mensagem: "Plano de aula gerado com sucesso."
    };
  }
}
