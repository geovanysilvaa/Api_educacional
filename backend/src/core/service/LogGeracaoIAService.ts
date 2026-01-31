import { ILogGeracaoIAService, ILogGeracaoIARepository } from "../interfaces/ILogdeGeracaooIA";
import { LogGeracaoIADTO, CreateLogGeracaoIADTO } from "../models/DTOs";
import { LogGeracaoIARepository } from "../repository/LogGeracaoIARepository";

import { IUnidadeRepository } from "../interfaces/IUnidade";
import { UnidadeRepository } from "../repository/UnidadeRepository";

/**
 * Serviço responsável pelo gerenciamento de logs de geração IA.
 * Permite criar e consultar logs relacionados a unidades.
 */
export class LogGeracaoIAService implements ILogGeracaoIAService {
  private logRepository: ILogGeracaoIARepository;
  private unidadeRepository: IUnidadeRepository;

  /**
   * Injeção de dependência dos repositórios.
   * @param logRepository - repositório de logs (opcional)
   * @param unidadeRepository - repositório de unidades (opcional)
   */
  constructor(logRepository?: ILogGeracaoIARepository, unidadeRepository?: IUnidadeRepository) {
    this.logRepository = logRepository ?? new LogGeracaoIARepository();
    this.unidadeRepository = unidadeRepository ?? new UnidadeRepository();
  }

  /**
   * Cria um novo log de geração IA para uma unidade.
   * @param data - dados do log (unidadeId, tipo de geração, prompt usado, resposta, evidências)
   * @returns LogGeracaoIADTO criado
   * @throws Erro se a unidade não existir
   */
  async createLog(data: CreateLogGeracaoIADTO): Promise<LogGeracaoIADTO> {
    const unidade = await this.unidadeRepository.findById(data.unidadeId);
    if (!unidade) {
      throw new Error("Unidade não encontrada");
    }

    return this.logRepository.create(data);
  }

  /**
   * Retorna um log de geração IA pelo seu ID.
   * @param id - ID do log
   * @returns LogGeracaoIADTO correspondente
   * @throws Erro se o log não existir
   */
  async getLogById(id: number): Promise<LogGeracaoIADTO> {
    const log = await this.logRepository.findById(id);
    if (!log) {
      throw new Error("Log de geração IA não encontrado");
    }
    return log;
  }

  /**
   * Retorna todos os logs de geração IA de uma unidade específica.
   * @param unidadeId - ID da unidade
   * @returns Lista de LogGeracaoIADTO
   */
  async getAllLogsByUnidade(unidadeId: number): Promise<LogGeracaoIADTO[]> {
    return this.logRepository.findAllByUnidade(unidadeId);
  }
}
