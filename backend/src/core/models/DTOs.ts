/**
 * Usuário
 */
export type UserRole = "PROFESSOR";

/** Dados enviados para login */
export interface LoginUserDTO {
  email: string;
  password: string;
}

/** Usuário completo com senha (uso interno) */
export interface UserWithPassword {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
}

/** Resposta de usuário (sem senha) */
export interface UserResponseDTO {
  id: number;
  name: string;
  email: string;
  role?: UserRole;
  createdAt: Date;
}

/** Dados para criar um novo usuário */
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

/** Dados para atualizar um usuário */
export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
}

/**
 * Tag
 */
export interface TagDTO {
  id: number;
  name: string;
  createdAt: Date;
}

export interface CreateTagDTO {
  name: string;
}

export interface UpdateTagDTO {
  name?: string;
}

/**
 * BNCC
 */
export type Stage = "FUNDAMENTAL" | "MEDIO";

/** DTO completo da BNCC */
export interface BNCCDTO {
  id: number;
  code: string;
  description: string;
  stage: Stage;
  createdAt: Date;
}

/** Dados para criar um novo BNCC */
export interface CreateBNCCDTO {
  code: string;
  description: string;
  stage: Stage;
}

/** Dados para atualizar um BNCC existente */
export interface UpdateBNCCDTO {
  code?: string;
  description?: string;
  stage?: Stage;
}

/**
 * Material
 */
export interface MaterialBNCCDTO {
  id: number;
  materialId: number;
  bnccId: number;
  createdAt: Date;
}

/** Filtros opcionais para buscar materiais */
export interface MaterialFilterDTO {
  tagId?: number;
  bnccId?: number;
  userId?: number;
  gradeLevel?: string;
}

/** DTO completo de Material com referências */
export interface MaterialResponseDTO {
  id: number;
  title: string;
  description?: string | null;
  type: string;
  gradeLevel: string;
  createdAt: Date;
  userId: number;
  tags: TagDTO[];
  bnccRefs: MaterialBNCCDTO[];
}

/** Dados para criar Material */
export interface CreateMaterialDTO {
  title: string;
  description?: string;
  type: string;
  gradeLevel: string;
  userId: number;
  tagIds?: number[];
  bnccIds?: number[];
}

/** Dados para atualizar Material */
export interface UpdateMaterialDTO {
  title?: string;
  description?: string;
  type?: string;
  gradeLevel?: string;
  tagIds?: number[];
  bnccIds?: number[];
}

/** Dados para criar associação Material <-> BNCC */
export interface CreateMaterialBNCCDTO {
  materialId: number;
  bnccId: number;
}

/** DTO de MaterialBNCC completo, com objetos aninhados */
export interface MaterialBNCCResponseDTO {
  id: number;
  materialId: number;
  bnccId: number;
  createdAt: Date;
  material?: MaterialResponseDTO;
  bncc?: BNCCDTO;
}

/**
 * Disciplina
 */
export interface DisciplinaDTO {
  id: number;
  nome: string;
  descricao: string | null;
  seriesAnos: string[];
  createdAt: Date;
}

export interface CreateDisciplinaDTO {
  nome: string;
  descricao?: string;
  seriesAnos: string[];
}

export interface UpdateDisciplinaDTO {
  nome?: string;
  descricao?: string;
  seriesAnos?: string[];
}

/**
 * Unidade
 */
export interface UnidadeDTO {
  id: number;
  disciplinaId: number;
  tema: string;
  descricao?: string | null;
  serieAno: string;
  duracao: number;
  objetivos?: string | null;
  createdAt: Date;
}

/** Dados para criar Unidade */
export interface CreateUnidadeDTO {
  disciplinaId: number;
  tema: string;
  descricao?: string;
  serieAno: string;
  duracao: number;
  objetivos?: string;
}

/** Dados para atualizar Unidade */
export interface UpdateUnidadeDTO {
  tema?: string;
  descricao?: string;
  serieAno?: string;
  duracao?: number;
  objetivos?: string;
}

/** Unidade com plano de aula e atividades anexadas */
export interface UnidadeResponseDTO extends UnidadeDTO {
  planoAula?: PlanoAulaDTO;
  atividades?: AtividadeDTO[];
}

/**
 * Plano de Aula
 */
export interface PlanoAulaDTO {
  id: number;
  unidadeId: number;
  textoPlano: string;
  bnccCompetencias: { codigo: string; descricao: string }[];
  fontes: string[];
  createdAt: Date;
}

export interface CreatePlanoAulaDTO {
  unidadeId: number;
  textoPlano: string;
  bnccCompetencias?: { codigo: string; descricao: string }[];
  fontes: string[];
}

export interface UpdatePlanoAulaDTO {
  textoPlano?: string;
  bnccCompetencias?: { codigo: string; descricao: string }[];
  fontes?: string[];
}

/**
 * Atividade
 */
export type TipoAtividade = "PROVA" | "TRABALHO" | "ATIVIDADE";

export interface AtividadeDTO {
  id: number;
  unidadeId: number;
  enunciado: string;
  criteriosCorrecao: string;
  tipo: TipoAtividade;
  createdAt: Date;
}

export interface CreateAtividadeDTO {
  unidadeId: number;
  enunciado: string;
  criteriosCorrecao: string;
  tipo: TipoAtividade;
}

export interface UpdateAtividadeDTO {
  enunciado?: string;
  criteriosCorrecao?: string;
  tipo?: TipoAtividade;
}

/**
 * Log de Geração IA
 */
export interface CreateLogGeracaoIADTO {
  unidadeId: number;
  tipoGeracao: "PLANO" | "ATIVIDADE" | "SLIDES" | "SUGESTAO";
  promptUsado: string;
  respostaBruta: string;
  evidenciasRecuperadas?: string[];
}

export interface LogGeracaoIADTO {
  id: number;
  unidadeId: number;
  tipoGeracao: "PLANO" | "ATIVIDADE" | "SLIDES" | "SUGESTAO";
  promptUsado: string;
  respostaBruta: string;
  evidenciasRecuperadas: string[];
  createdAt: Date;
}

/**
 * Sugestão Automática de Unidade
 */
export interface SugerirUnidadeDTO {
  disciplinaId: number;
  serieAno: string;
  parametrosOpcionais?: Record<string, any>;
}

/** DTO de Unidade sugerida, com referências BNCC */
export interface UnidadeSugeridaDTO extends UnidadeResponseDTO {
  referenciasBNCC: string[];
}


/*IA*/
export interface UnidadeIAContextDTO {
  disciplina: string
  serieAno: string
  tema: string
  duracao: number
}
