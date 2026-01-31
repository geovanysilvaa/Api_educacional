import { LogGeracaoIADTO, CreateLogGeracaoIADTO } from "../models/DTOs";

/**
 * Interface do repositório de logs de geração IA
 * Responsável apenas por persistência no banco
 * Não faz validações de negócio complexas, apenas CRUD e consultas básicas
 */
export interface ILogGeracaoIARepository {
  /**
   * Cria um log de geração IA
   * @param data Dados necessários para criar o log
   * @returns O log criado
   */
  create(data: CreateLogGeracaoIADTO): Promise<LogGeracaoIADTO>;

  /**
   * Busca um log pelo seu ID
   * @param id ID do log
   * @returns O log ou null se não existir
   */
  findById(id: number): Promise<LogGeracaoIADTO | null>;

  /**
   * Retorna todos os logs de uma unidade específica
   * @param unidadeId ID da unidade
   * @returns Lista de logs dessa unidade
   */
  findAllByUnidade(unidadeId: number): Promise<LogGeracaoIADTO[]>;
}

/**
 * Interface do serviço de logs de geração IA
 * Responsável por regras de negócio, validações e consistência antes de chamar o repositório
 */
export interface ILogGeracaoIAService {
  /**
   * Cria um log de geração IA, validando a existência da unidade
   * @param data Dados do log
   * @returns O log criado
   */
  createLog(data: CreateLogGeracaoIADTO): Promise<LogGeracaoIADTO>;

  /**
   * Busca um log pelo ID
   * @param id ID do log
   * @returns O log encontrado
   * @throws Erro se o log não existir
   */
  getLogById(id: number): Promise<LogGeracaoIADTO>;

  /**
   * Retorna todos os logs de uma unidade específica
   * @param unidadeId ID da unidade
   * @returns Lista de logs
   */
  getAllLogsByUnidade(unidadeId: number): Promise<LogGeracaoIADTO[]>;
}
