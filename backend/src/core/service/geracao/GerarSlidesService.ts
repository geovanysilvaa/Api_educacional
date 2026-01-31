import { UnidadeRepository } from "../../repository/UnidadeRepository";
import { LogGeracaoIARepository } from "../../repository/LogGeracaoIARepository";
import { IAClient } from "../ia/IAClient";
import { ModelosIA } from "../ia/ModelasIA";

/**
 * Calcula quantas gerações de slides ainda podem ser feitas com o saldo disponível.
 * @param saldoAtual - Valor monetário disponível na API
 * @param custoPorSlide - Custo estimado por geração de slides
 * @returns Número inteiro de gerações restantes
 */
function calcularGeracoesRestantes(saldoAtual: number, custoPorSlide = 0.000456): number {
  return Math.floor(saldoAtual / custoPorSlide);
}

/**
 * Serviço responsável por gerar slides para uma unidade.
 * Utiliza IA externa e registra logs da geração.
 */
export class GerarSlidesService {
  /**
   * @param unidadeRepo - Repositório para buscar dados da unidade
   * @param logRepo - Repositório para registrar logs de gerações da IA
   * @param iaClient - Cliente para chamar a IA externa
   */
  constructor(
    private unidadeRepo: UnidadeRepository,
    private logRepo: LogGeracaoIARepository,
    private iaClient: IAClient
  ) { }

  /**
   * Executa a geração dos slides para uma unidade específica.
   * @param unidadeId - ID da unidade
   * @returns Objeto contendo os slides gerados, gerações restantes e mensagem de sucesso
   * @throws Erro se a unidade não for encontrada ou se houver falha na IA
   */
  async executar(unidadeId: number) {

    const unidade = await this.unidadeRepo.findById(unidadeId);
    if (!unidade) throw new Error("Unidade não encontrada");

    const prompt = `Você é um especialista em pedagogia e design instrucional.

Crie o conteúdo de SLIDES para uma aula objetiva e didática.

Objetivo:
- Ensinar o conteúdo de forma clara
- Organizar o raciocínio do aluno
- Facilitar a memorização

Regras obrigatórias:
- Linguagem simples e direta
- Cada slide deve ter um TÍTULO claro
- Use tópicos curtos e objetivos
- Máximo de 4 tópicos por slide
- Não escreva parágrafos longos
- Os slides devem seguir uma progressão lógica:
  introdução → conceito → exemplos → aplicação → conclusão

Contexto da aula:
Disciplina (ID): ${unidade.disciplinaId}
Série/Ano: ${unidade.serieAno}
Tema: ${unidade.tema}
Duração: ${unidade.duracao} minutos

Quantidade:
- Gere de 6 a 8 slides, conforme a duração

Formato esperado (OBRIGATÓRIO):

Slide 1 - Título
• Tópico
• Tópico

Slide 2 - Título
• Tópico
• Tópico
`;

    const respostaIA = await this.iaClient.gerarTexto(ModelosIA.SLIDES, prompt);

    await this.logRepo.create({
      unidadeId: unidade.id,
      tipoGeracao: "SLIDES",
      promptUsado: prompt,
      respostaBruta: respostaIA,
      evidenciasRecuperadas: [] // pode ser usado futuramente
    });

    const saldoAPI = 5;

    return {
      slides: respostaIA,
      geracoesRestantes: calcularGeracoesRestantes(saldoAPI),
      mensagem: "Slides gerados com sucesso."
    };
  }
}
