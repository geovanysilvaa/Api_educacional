import { prisma } from "../lib/prisma";
import { ILogGeracaoIARepository } from "../interfaces/ILogdeGeracaooIA";
import { LogGeracaoIADTO, CreateLogGeracaoIADTO } from "../models/DTOs";

/**
 * Repositório responsável pelas operações de persistência
 * dos logs de geração de conteúdo pela IA.
 */
export class LogGeracaoIARepository implements ILogGeracaoIARepository {

  /**
   * Cria um novo log de geração IA
   * @param data - DTO contendo as informações do log
   * @returns LogGeracaoIADTO criado
   */
  async create(data: CreateLogGeracaoIADTO): Promise<LogGeracaoIADTO> {

    return await prisma.logGeracaoIA.create({ data });
  }

  /**
   * Busca um log de geração IA pelo ID
   * @param id - ID do log
   * @returns LogGeracaoIADTO ou null se não encontrado
   */
  async findById(id: number): Promise<LogGeracaoIADTO | null> {
    return await prisma.logGeracaoIA.findUnique({ where: { id } });
  }

  /**
   * Retorna todos os logs de uma unidade específica
   * @param unidadeId - ID da unidade
   * @returns Array de LogGeracaoIADTO
   */
  async findAllByUnidade(unidadeId: number): Promise<LogGeracaoIADTO[]> {
    return await prisma.logGeracaoIA.findMany({ where: { unidadeId } });
  }
}
