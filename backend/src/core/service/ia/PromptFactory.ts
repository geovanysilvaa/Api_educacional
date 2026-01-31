import { UnidadeDTO, UnidadeIAContextDTO } from "../../models/DTOs";

/**
 * Fábrica de prompts para a IA.
 * Fornece métodos estáticos para gerar prompts para:
 * - Plano de aula ()
 * - Atividades 
 * - Slides ()
 * - Sugestões pedagógicas ()
 */
export class PromptFactory {
  /**
   * Gera o prompt para criação de uma atividade pedagógica.
   * @param unidade - Dados da unidade (tema, série/ano)
   * @returns Prompt formatado para enviar à IA
   */
  static atividade(unidade: UnidadeDTO): string {
    const tema = unidade.tema || "Não definido";
    const serieAno = unidade.serieAno || "Não definido";

    return `
Você é um professor experiente.

Crie ATIVIDADES PEDAGÓGICAS alinhadas ao tema abaixo.

Tema: ${tema}
Série/Ano: ${serieAno}

Inclua obrigatoriamente:
- Enunciado claro
- Tipo da atividade (individual ou em grupo)
- Respostas esperadas
- Critérios de correção
`;
  }
}


