import { prisma } from "../lib/prisma";
import { IDisciplinaRepository } from "../interfaces/IDisciplina";
import { DisciplinaDTO, CreateDisciplinaDTO, UpdateDisciplinaDTO } from "../models/DTOs";

/**
 * Repositório responsável pelas operações de persistência
 * da entidade Disciplina no banco de dados usando Prisma.
 */
export class DisciplinaRepository implements IDisciplinaRepository {

  /**
   * Cria uma nova disciplina no banco
   * @param data - DTO contendo nome, descrição e séries/anos
   * @returns DisciplinaDTO criada
   */
  async create(data: CreateDisciplinaDTO): Promise<DisciplinaDTO> {
    const disciplina = await prisma.disciplina.create({ data });
    return { ...disciplina, createdAt: disciplina.createdAt, seriesAnos: disciplina.seriesAnos };
  }

  /**
   * Busca uma disciplina pelo ID
   * @param id - ID da disciplina
   * @returns DisciplinaDTO ou null se não encontrada
   */
  async findById(id: number): Promise<DisciplinaDTO | null> {
    const disciplina = await prisma.disciplina.findUnique({ where: { id } });
    if (!disciplina) return null;
    return { ...disciplina, createdAt: disciplina.createdAt, seriesAnos: disciplina.seriesAnos };
  }

  /**
   * Retorna todas as disciplinas cadastradas
   * @returns Array de DisciplinaDTO
   */
  async findAll(): Promise<DisciplinaDTO[]> {
    const disciplinas = await prisma.disciplina.findMany();
    return disciplinas.map(d => ({ ...d, createdAt: d.createdAt, seriesAnos: d.seriesAnos }));
  }

  /**
   * Atualiza uma disciplina existente pelo ID
   * @param id - ID da disciplina
   * @param data - Dados para atualização
   * @returns DisciplinaDTO atualizada
   */
  async update(id: number, data: UpdateDisciplinaDTO): Promise<DisciplinaDTO> {
    const disciplina = await prisma.disciplina.update({ where: { id }, data });
    return { ...disciplina, createdAt: disciplina.createdAt, seriesAnos: disciplina.seriesAnos };
  }

  /**
   * Remove uma disciplina do banco pelo ID
   * @param id - ID da disciplina
   */
  async delete(id: number): Promise<void> {
    await prisma.disciplina.delete({ where: { id } });
  }
}
