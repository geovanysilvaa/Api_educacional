import { prisma } from "../lib/prisma";
import { IAtividadeRepository } from "../interfaces/IAtividade";
import { AtividadeDTO, CreateAtividadeDTO, UpdateAtividadeDTO } from "../models/DTOs";

/**
 * Repository responsável por gerenciar atividades no banco de dados.
 * Implementa a interface IAtividadeRepository usando Prisma ORM.
 */
export class AtividadeRepository implements IAtividadeRepository {

  /**
   * Cria uma nova atividade no banco.
   * @param data - Objeto contendo os dados da nova atividade
   * @returns Promise<AtividadeDTO> - A atividade criada
   */
  async create(data: CreateAtividadeDTO): Promise<AtividadeDTO> {
    const atividade = await prisma.atividade.create({ data });
    return { ...atividade, createdAt: atividade.createdAt }; 
  }

  /**
   * Busca uma atividade pelo seu ID.
   * @param id - ID da atividade a ser buscada
   * @returns Promise<AtividadeDTO | null> - Atividade encontrada ou null se não existir
   */
  async findById(id: number): Promise<AtividadeDTO | null> {
    const atividade = await prisma.atividade.findUnique({ where: { id } });
    if (!atividade){
      return null;
    }
    return { ...atividade, createdAt: atividade.createdAt };
  }

  /**
   * lista todas as atividade
   * @returns Todas as atvidades
   */
  list():Promise<AtividadeDTO[]>{
    return prisma.atividade.findMany();
  }

  /**
   * Busca todas as atividades de uma unidade específica.
   * @param unidadeId - ID da unidade
   * @returns Promise<AtividadeDTO[]> - Lista de atividades pertencentes à unidade
   */
  async findAllByUnidade(unidadeId: number): Promise<AtividadeDTO[]> {
    const atividades = await prisma.atividade.findMany({ where: { unidadeId } });
    return atividades.map(a => ({ ...a, createdAt: a.createdAt }));
  }

  /**
   * Atualiza uma atividade existente.
   * @param id - ID da atividade a ser atualizada
   * @param data - Objeto contendo os dados a serem atualizados
   * @returns Promise<AtividadeDTO> - Atividade atualizada
   */
  async update(id: number, data: UpdateAtividadeDTO): Promise<AtividadeDTO> {
    const atividade = await prisma.atividade.update({
      where: { id },
      data: {
        ...(data.enunciado && { enunciado: data.enunciado }),
        ...(data.criteriosCorrecao && { criteriosCorrecao: data.criteriosCorrecao }),
        ...(data.tipo && { tipo: data.tipo }),
      },
    });
    return { ...atividade, createdAt: atividade.createdAt };
  }

  /**
   * Remove uma atividade do banco de dados pelo seu ID.
   * @param id - ID da atividade a ser deletada
   * @returns Promise<void>
   */
  async delete(id: number): Promise<void> {
    await prisma.atividade.delete({ where: { id } });
  }
}
