import { DisciplinaDTO, CreateDisciplinaDTO, UpdateDisciplinaDTO } from "../models/DTOs";

/**
 * Interface do repositório de disciplinas
 * Responsável por operações diretas no banco de dados.
 * Não realiza validações complexas, apenas CRUD puro.
 */
export interface IDisciplinaRepository {
  /**
   * Cria uma nova disciplina
   * @param data Dados necessários para criar a disciplina
   * @returns A disciplina criada
   */
  create(data: CreateDisciplinaDTO): Promise<DisciplinaDTO>;

  /**
   * Busca uma disciplina pelo ID
   * @param id ID da disciplina
   * @returns A disciplina ou null se não existir
   */
  findById(id: number): Promise<DisciplinaDTO | null>;

  /**
   * Retorna todas as disciplinas cadastradas
   * @returns Lista de disciplinas
   */
  findAll(): Promise<DisciplinaDTO[]>;

  /**
   * Atualiza os dados de uma disciplina
   * @param id ID da disciplina
   * @param data Dados para atualização
   * @returns A disciplina atualizada
   */
  update(id: number, data: UpdateDisciplinaDTO): Promise<DisciplinaDTO>;

  /**
   * Remove uma disciplina do banco
   * @param id ID da disciplina
   */
  delete(id: number): Promise<void>;
}

/**
 * Interface do serviço de disciplinas
 * Responsável por regras de negócio, validações e consistência antes de chamar o repositório.
 */
export interface IDisciplinaService {
  /**
   * Cria uma nova disciplina, validando o nome
   * @param data Dados da disciplina
   * @returns A disciplina criada
   */
  createDisciplina(data: CreateDisciplinaDTO): Promise<DisciplinaDTO>;

  /**
   * Busca uma disciplina pelo ID
   * @param id ID da disciplina
   * @returns A disciplina encontrada
   * @throws Erro se não existir
   */
  getDisciplinaById(id: number): Promise<DisciplinaDTO>;

  /**
   * Retorna todas as disciplinas
   * @returns Lista de disciplinas
   */
  getAllDisciplinas(): Promise<DisciplinaDTO[]>;

  /**
   * Atualiza uma disciplina existente
   * @param id ID da disciplina
   * @param data Dados para atualização
   * @returns A disciplina atualizada
   */
  updateDisciplina(id: number, data: UpdateDisciplinaDTO): Promise<DisciplinaDTO>;

  /**
   * Remove uma disciplina
   * @param id ID da disciplina
   * @throws Erro se a disciplina não existir
   */
  deleteDisciplina(id: number): Promise<void>;
}
