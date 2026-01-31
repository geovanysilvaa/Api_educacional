/**
 * Enum com os modelos de IA disponíveis para diferentes tipos de geração de conteúdo.
 * Todos estão usando "gpt-4o-mini", mas podem ser alterados futuramente se necessário.
 */
export enum ModelosIA {
  /** Modelo usado para gerar atividades */
  ATIVIDADE = "gpt-4o-mini",

  /** Modelo usado para gerar planos de aula */
  PLANO = "gpt-4o-mini",

  /** Modelo usado para gerar slides */
  SLIDES = "gpt-4o-mini",

  /** Modelo usado para gerar sugestões de atividades */
  SUGESTAO = "gpt-4o-mini"
}
