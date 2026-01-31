import { CreateBNCCDTO, UpdateBNCCDTO, BNCCDTO, Stage } from "../models/DTOs";

/**
 * Interface do serviço BNCC
 * Responsável por regras de negócio, validações e consistência antes de chamar o repositório.
 */
export interface IBNCCService {
  /**
   * Cria uma nova BNCC
   * @param data Dados da BNCC
   * @returns A BNCC criada
   */
  createBNCC(data: CreateBNCCDTO): Promise<BNCCDTO>;

  /**
   * Atualiza uma BNCC existente
   * @param id ID da BNCC
   * @param data Dados para atualização
   * @returns A BNCC atualizada
   */
  updateBNCC(id: number, data: UpdateBNCCDTO): Promise<BNCCDTO>;

  /**
   * Busca uma BNCC pelo ID
   * @param id ID da BNCC
   * @returns A BNCC encontrada
   * @throws Erro se não existir
   */
  getBNCCById(id: number): Promise<BNCCDTO>;

  /**
   * Retorna todas as BNCCs, opcionalmente filtrando por estágio
   * @param stage Estágio de ensino (opcional)
   * @returns Lista de BNCCs
   */
  getAllBNCC(stage?: Stage): Promise<BNCCDTO[]>;

  /**
   * Remove uma BNCC
   * @param id ID da BNCC
   * @throws Erro se não existir
   */
  deleteBNCC(id: number): Promise<void>;
}

/**
 * Interface do repositório BNCC
 * Responsável por operações diretas no banco de dados.
 */
export interface IBNCCRepository {
  /**
   * Cria uma nova BNCC
   * @param data Dados da BNCC
   * @returns A BNCC criada
   */
  create(data: CreateBNCCDTO): Promise<BNCCDTO>;

  /**
   * Busca uma BNCC pelo ID
   * @param id ID da BNCC
   * @returns A BNCC ou null se não existir
   */
  findById(id: number): Promise<BNCCDTO | null>;

  /**
   * Busca uma BNCC pelo código
   * @param code Código da BNCC
   * @returns A BNCC ou null se não existir
   */
  findByCode(code: string): Promise<BNCCDTO | null>;

  /**
   * Retorna todas as BNCCs, opcionalmente filtrando por estágio
   * @param stage Estágio de ensino (opcional)
   * @returns Lista de BNCCs
   */
  findAll(stage?: Stage): Promise<BNCCDTO[]>;

  /**
   * Atualiza uma BNCC existente
   * @param id ID da BNCC
   * @param data Dados para atualização
   * @returns A BNCC atualizada
   */
  update(id: number, data: UpdateBNCCDTO): Promise<BNCCDTO>;

  /**
   * Remove uma BNCC
   * @param id ID da BNCC
   */
  delete(id: number): Promise<void>;
}
