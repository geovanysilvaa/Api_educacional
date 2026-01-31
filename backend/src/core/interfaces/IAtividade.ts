import { AtividadeDTO, CreateAtividadeDTO, UpdateAtividadeDTO } from "../models/DTOs";

/**
 * Interface do repositório de Atividade
 * Responsável por operações diretas no banco de dados.
 */
export interface IAtividadeRepository {
  /**
   * Cria uma nova Atividade
   * @param data Dados da atividade
   * @returns A atividade criada
   */
  create(data: CreateAtividadeDTO): Promise<AtividadeDTO>;

  /**
   * Busca uma Atividade pelo ID
   * @param id ID da atividade
   * @returns A atividade encontrada ou null se não existir
   */
  findById(id: number): Promise<AtividadeDTO | null>;
  
   /**
   * lista todas as atividade
   * @returns Todas as atvidades
   */
  list():Promise<AtividadeDTO[]>;

  /**
   * Retorna todas as atividades vinculadas a uma unidade
   * @param unidadeId ID da unidade
   * @returns Lista de atividades
   */
  findAllByUnidade(unidadeId: number): Promise<AtividadeDTO[]>;

  /**
   * Atualiza uma atividade existente
   * @param id ID da atividade
   * @param data Dados para atualização
   * @returns A atividade atualizada
   */
  update(id: number, data: UpdateAtividadeDTO): Promise<AtividadeDTO>;

  /**
   * Remove uma atividade
   * @param id ID da atividade
   */
  delete(id: number): Promise<void>;
}

/**
 * Interface do serviço de Atividade
 * Responsável por regras de negócio, validações e consistência antes de chamar o repositório.
 */
export interface IAtividadeService {
  /**
   * Cria uma nova atividade
   * @param data Dados da atividade
   * @returns A atividade criada
   */
  createAtividade(data: CreateAtividadeDTO): Promise<AtividadeDTO>;

  /**
   * Busca uma atividade pelo ID
   * @param id ID da atividade
   * @returns A atividade encontrada
   * @throws Erro se não existir
   */
  getAtividadeById(id: number): Promise<AtividadeDTO>;

  /**
   * Retorna todas as atividades vinculadas a uma unidade
   * @param unidadeId ID da unidade
   * @returns Lista de atividades
   */
  getAllAtividadesByUnidade(unidadeId: number): Promise<AtividadeDTO[]>;
    
   /**
   * lista todas as atividade
   * @returns Todas as atvidades
   */
  list():Promise<AtividadeDTO[]>;

  /**
   * Atualiza uma atividade existente
   * @param id ID da atividade
   * @param data Dados para atualização
   * @returns A atividade atualizada
   */
  updateAtividade(id: number, data: UpdateAtividadeDTO): Promise<AtividadeDTO>;

  /**
   * Remove uma atividade
   * @param id ID da atividade
   * @throws Erro se não existir
   */
  deleteAtividade(id: number): Promise<void>;
}
