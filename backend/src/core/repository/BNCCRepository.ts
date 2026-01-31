import { prisma } from "../lib/prisma";
import { IBNCCRepository } from "../interfaces/IBNCCService";
import { BNCCDTO, CreateBNCCDTO, UpdateBNCCDTO } from "../models/DTOs";

/**
 * Repositório responsável pelas operações de persistência
 * da entidade BNCC no banco de dados usando Prisma.
 */
export class BNCCRepository implements IBNCCRepository {

  /**
   * Cria uma nova BNCC no banco
   * @param data - DTO contendo código, descrição e etapa
   * @returns BNCCDTO criada
   */
  async create(data: CreateBNCCDTO): Promise<BNCCDTO> {
    const bncc = await prisma.bNCC.create({ data });
    return bncc;
  }

  /**
   * Busca uma BNCC pelo ID
   * @param id - ID da BNCC
   * @returns BNCCDTO ou null se não encontrada
   */
  async findById(id: number): Promise<BNCCDTO | null> {
    return await prisma.bNCC.findUnique({ where: { id } });
  }

  /**
   * Busca uma BNCC pelo código
   * @param code - Código da BNCC
   * @returns BNCCDTO ou null se não encontrada
   */
  async findByCode(code: string): Promise<BNCCDTO | null> {
    return await prisma.bNCC.findUnique({ where: { code } });
  }

  /**
   * Retorna todas as BNCCs cadastradas
   * @returns Array de BNCCDTO
   */
  async findAll(): Promise<BNCCDTO[]> {
    return await prisma.bNCC.findMany();
  }

  /**
   * Atualiza uma BNCC existente pelo ID
   * @param id - ID da BNCC
   * @param data - Dados para atualização
   * @returns BNCCDTO atualizada
   */
  async update(id: number, data: UpdateBNCCDTO): Promise<BNCCDTO> {
    return await prisma.bNCC.update({ where: { id }, data });
  }

  /**
   * Remove uma BNCC do banco pelo ID
   * @param id - ID da BNCC
   */
  async delete(id: number): Promise<void> {
    await prisma.bNCC.delete({ where: { id } });
  }
}
