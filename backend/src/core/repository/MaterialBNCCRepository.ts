import { prisma } from "../lib/prisma";
import { IMaterialBNCCRepository } from "../interfaces/IMaterialBNCCService";
import { CreateMaterialBNCCDTO, MaterialBNCCResponseDTO, MaterialResponseDTO, BNCCDTO, TagDTO } from "../models/DTOs";

/**
 * Repositório responsável pelas operações de persistência
 * da relação Material <-> BNCC no banco de dados (Prisma ORM).
 */
export class MaterialBNCCRepository implements IMaterialBNCCRepository {

  /**
   * Mapeia um registro de Material do Prisma para DTO simplificado
   * incluindo apenas tags, sem bnccRefs para evitar recursão.
   */
  private mapMaterial(material: any): MaterialResponseDTO {
    return {
      id: material.id,
      title: material.title,
      description: material.description ?? undefined,
      type: material.type,
      gradeLevel: material.gradeLevel,
      createdAt: material.createdAt,
      userId: material.userId,
      tags: material.tags?.map((t: any): TagDTO => ({
        id: t.tag.id,
        name: t.tag.name,
        createdAt: t.tag.createdAt
      })) || [],
      bnccRefs: [] // sempre vazio aqui para não gerar repetição
    };
  }

  /**
   * Mapeia um registro da tabela materialBNCC para DTO
   * incluindo o Material e a BNCC vinculados.
   */
  private mapMaterialBNCC(mb: any): MaterialBNCCResponseDTO {
    return {
      id: mb.id,
      materialId: mb.materialId,
      bnccId: mb.bnccId,
      createdAt: mb.createdAt,
      material: mb.material ? this.mapMaterial(mb.material) : undefined,
      bncc: mb.bncc ? {
        id: mb.bncc.id,
        code: mb.bncc.code,
        description: mb.bncc.description,
        stage: mb.bncc.stage
      } as BNCCDTO : undefined,
    };
  }

  /**
   * Cria um vínculo entre um material e uma BNCC
   */
  async create(data: CreateMaterialBNCCDTO): Promise<MaterialBNCCResponseDTO> {
    const mb = await prisma.materialBNCC.create({
      data,
      include: { 
        material: { include: { tags: { include: { tag: true } } } }, 
        bncc: true 
      },
    });
    return this.mapMaterialBNCC(mb);
  }

  /**
   * Busca um vínculo Material-BNCC pelo ID
   */
  async findById(id: number): Promise<MaterialBNCCResponseDTO | null> {
    const mb = await prisma.materialBNCC.findUnique({
      where: { id },
      include: { 
        material: { include: { tags: { include: { tag: true } } } }, 
        bncc: true 
      },
    });
    return mb ? this.mapMaterialBNCC(mb) : null;
  }

  /**
   * Lista todos os vínculos de um material específico
   */
  async findAllByMaterial(materialId: number): Promise<MaterialBNCCResponseDTO[]> {
    const mbs = await prisma.materialBNCC.findMany({
      where: { materialId },
      include: { 
        material: { include: { tags: { include: { tag: true } } } }, 
        bncc: true 
      },
    });
    return mbs.map(this.mapMaterialBNCC.bind(this));
  }

  /**
   * Lista todos os vínculos de uma BNCC específica
   */
  async findAllByBNCC(bnccId: number): Promise<MaterialBNCCResponseDTO[]> {
    const mbs = await prisma.materialBNCC.findMany({
      where: { bnccId },
      include: { 
        material: { include: { tags: { include: { tag: true } } } }, 
        bncc: true 
      },
    });
    return mbs.map(this.mapMaterialBNCC.bind(this));
  }

  /**
   * Remove um vínculo pelo ID do registro
   */
  async delete(id: number): Promise<void> {
    await prisma.materialBNCC.delete({ where: { id } });
  }

  /**
   * Remove vínculos de um material específico com uma BNCC específica
   */
  async deleteByMaterialAndBNCC(materialId: number, bnccId: number): Promise<void> {
    await prisma.materialBNCC.deleteMany({ where: { materialId, bnccId } });
  }
}
