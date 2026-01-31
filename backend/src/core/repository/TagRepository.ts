import { prisma } from "../lib/prisma";
import { ITagRepository } from "../interfaces/ITagService";
import { TagDTO, CreateTagDTO, UpdateTagDTO } from "../models/DTOs";

/**
 * Repositório responsável pelas operações de persistência
 * da entidade Tag no banco de dados (Prisma ORM).
 */
export class TagRepository implements ITagRepository {

  /**
   * Cria uma nova tag
   * @param data - Dados da tag (nome)
   * @returns Tag criada
   */
  async create(data: CreateTagDTO): Promise<TagDTO> {
    return prisma.tag.create({ data });
  }

  /**
   * Busca uma tag pelo ID
   * @param id - ID da tag
   * @returns Tag encontrada ou null
   */
  async findById(id: number): Promise<TagDTO | null> {
    return prisma.tag.findUnique({ where: { id } });
  }

  /**
   * Busca uma tag pelo nome
   * @param name - Nome da tag
   * @returns Tag encontrada ou null
   */
  async findByName(name: string): Promise<TagDTO | null> {
    return prisma.tag.findUnique({ where: { name } });
  }

  /**
   * Retorna todas as tags cadastradas
   * @returns Lista de tags
   */
  async findAll(): Promise<TagDTO[]> {
    return prisma.tag.findMany();
  }

  /**
   * Atualiza uma tag existente
   * @param id - ID da tag
   * @param data - Dados a atualizar
   * @returns Tag atualizada
   */
  async update(id: number, data: UpdateTagDTO): Promise<TagDTO> {
    return prisma.tag.update({ where: { id }, data });
  }

  /**
   * Remove uma tag do banco
   * @param id - ID da tag
   */
  async delete(id: number): Promise<void> {
    await prisma.tag.delete({ where: { id } });
  }
}
