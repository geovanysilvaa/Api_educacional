import { UnidadeDTO, CreateUnidadeDTO, UpdateUnidadeDTO } from "../models/DTOs";

/**
 * Interface do serviço de Unidade
 * Define métodos de negócio que a camada de serviço deve implementar
 */
export interface IUnidadeService {
  /** Cria uma nova unidade e retorna os dados completos */
  createUnidade(data: CreateUnidadeDTO): Promise<UnidadeDTO>;

  /** Busca uma unidade pelo ID */
  getUnidadeById(id: number): Promise<UnidadeDTO>;

  /** Retorna todas as unidades cadastradas */
  getAllUnidades(): Promise<UnidadeDTO[]>;

  /** Retorna todas as unidades associadas a uma disciplina específica */
  getAllUnidadesByDisciplina(disciplinaId: number): Promise<UnidadeDTO[]>;

  /** Atualiza uma unidade existente pelo ID */
  updateUnidade(id: number, data: UpdateUnidadeDTO): Promise<UnidadeDTO>;

  /** Deleta uma unidade pelo ID */
  deleteUnidade(id: number): Promise<void>;
}

/**
 * Interface do repositório de Unidade
 * Define métodos de acesso ao banco de dados
 */
export interface IUnidadeRepository {
  /** Cria uma nova unidade no banco e retorna os dados criados */
  create(data: CreateUnidadeDTO): Promise<UnidadeDTO>;

  /** Busca uma unidade pelo ID, retorna null se não encontrada */
  findById(id: number): Promise<UnidadeDTO | null>;

  /** Retorna todas as unidades cadastradas */
  findAll(): Promise<UnidadeDTO[]>; 

  /** Retorna todas as unidades de uma disciplina específica */
  findAllByDisciplina(disciplinaId: number): Promise<UnidadeDTO[]>;

  /** Atualiza uma unidade pelo ID e retorna os dados atualizados */
  update(id: number, data: UpdateUnidadeDTO): Promise<UnidadeDTO>;

  /** Deleta uma unidade pelo ID */
  delete(id: number): Promise<void>;
}
