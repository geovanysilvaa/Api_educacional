import { prisma } from "../lib/prisma";
import { IUnidadeRepository } from "../interfaces/IUnidade";
import { UnidadeResponseDTO, CreateUnidadeDTO, UpdateUnidadeDTO, UnidadeDTO } from "../models/DTOs";

/**
 * Repositório responsável pelas operações de persistência
 * da entidade Unidade no banco de dados (Prisma ORM).
 */
export class UnidadeRepository implements IUnidadeRepository {

  /**
   * Mapeia um registro do banco para o DTO de resposta
   * @param u - registro retornado pelo Prisma
   * @returns Unidade mapeada com plano de aula e atividades
   */
  private map(u: any): UnidadeResponseDTO {
    return {
      id: u.id,
      disciplinaId: u.disciplinaId,
      tema: u.tema,
      descricao: u.descricao ?? null,
      serieAno: u.serieAno,
      duracao: u.duracao,
      objetivos: u.objetivos ?? null,
      createdAt: u.createdAt,
      planoAula: u.planoAula ?? null,
      atividades: u.atividades ?? [],
    };
  }

  /**
   * Cria uma nova unidade no banco
   * @param data - dados da unidade
   * @returns Unidade criada com plano de aula e atividades
   */
  async create(data: CreateUnidadeDTO): Promise<UnidadeResponseDTO> {
    const unidade = await prisma.unidade.create({
      data,
      include: { planoAula: true, atividades: true }, // inclui relações
    });
    return this.map(unidade);
  }

  /**
   * Busca uma unidade pelo ID
   * @param id - ID da unidade
   * @returns Unidade encontrada ou null
   */
  async findById(id: number): Promise<UnidadeResponseDTO | null> {
    const unidade = await prisma.unidade.findUnique({
      where: { id },
      include: { planoAula: true, atividades: true },
    });
    return unidade ? this.map(unidade) : null;
  }

  /**
   * Retorna todas as unidades de uma disciplina específica
   * @param disciplinaId - ID da disciplina
   * @returns Lista de unidades com plano de aula e atividades
   */
  async findAllByDisciplina(disciplinaId: number): Promise<UnidadeResponseDTO[]> {
    const unidades = await prisma.unidade.findMany({
      where: { disciplinaId },
      include: { planoAula: true, atividades: true },
    });
    return unidades.map(u => this.map(u));
  }

  /**
   * Retorna todas as unidades cadastradas
   * @returns Lista de unidades
   */
  async findAll(): Promise<UnidadeDTO[]> {
    return prisma.unidade.findMany({
      orderBy: { id: "asc" } // ordena pelo ID
    });
  }

  /**
   * Atualiza uma unidade existente
   * @param id - ID da unidade
   * @param data - dados a atualizar
   * @returns Unidade atualizada com plano de aula e atividades
   */
  async update(id: number, data: UpdateUnidadeDTO): Promise<UnidadeResponseDTO> {
    const unidade = await prisma.unidade.update({
      where: { id },
      data,
      include: { planoAula: true, atividades: true },
    });
    return this.map(unidade);
  }

  /**
   * Remove uma unidade do banco
   * @param id - ID da unidade
   */
  async delete(id: number): Promise<void> {
    await prisma.unidade.delete({ where: { id } });
  }
}
