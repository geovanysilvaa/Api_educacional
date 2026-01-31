import { prisma } from "../lib/prisma";
import { IMaterialRepository } from "../interfaces/IMaterialService";
import { MaterialResponseDTO, CreateMaterialDTO, UpdateMaterialDTO, MaterialFilterDTO, TagDTO, MaterialBNCCDTO } from "../models/DTOs";

/**
 * Repositório responsável pelas operações de persistência
 * da entidade Material no banco de dados (Prisma ORM).
 */
export class MaterialRepository implements IMaterialRepository {

    /**
     * Mapeia o registro bruto do Prisma para o DTO completo do Material
     * @param material - registro bruto do Prisma
     * @returns MaterialResponseDTO
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
            tags: (material.tags ?? [])
                .map((t: any) => t.tag ? { id: t.tag.id, name: t.tag.name, createdAt: t.tag.createdAt } : null)
                .filter(Boolean) as TagDTO[],
            bnccRefs: (material.bnccRefs ?? [])
                .map((b: any) => b.bncc ? { id: b.id, materialId: b.materialId, bnccId: b.bnccId, createdAt: b.createdAt } : null)
                .filter(Boolean) as MaterialBNCCDTO[],
        };
    }

    /**
     * Cria um novo material, vinculando tags e BNCCs se fornecidos
     * @param data - Dados do material a ser criado
     * @returns MaterialResponseDTO
     */
    async create(data: CreateMaterialDTO): Promise<MaterialResponseDTO> {

        // Cria o registro base do material
        const material = await prisma.material.create({
            data: {
                title: data.title,
                description: data.description,
                type: data.type,
                gradeLevel: data.gradeLevel,
                userId: data.userId,
            },
        });

        // Cria vínculos com tags, se fornecidas
        if (data.tagIds?.length) {
            await prisma.materialTag.createMany({
                data: data.tagIds.map(tagId => ({ materialId: material.id, tagId })),
                skipDuplicates: true,
            });
        }

        // Cria vínculos com BNCC, se fornecidas
        if (data.bnccIds?.length) {
            await prisma.materialBNCC.createMany({
                data: data.bnccIds.map(bnccId => ({ materialId: material.id, bnccId })),
                skipDuplicates: true,
            });
        }

        // Retorna o material completo com tags e BNCCs
        const fullMaterial = await prisma.material.findUnique({
            where: { id: material.id },
            include: {
                tags: { include: { tag: true } },
                bnccRefs: { include: { bncc: true } }
            }
        });

        return this.mapMaterial(fullMaterial!);
    }

    /**
     * Busca um material pelo ID
     * @param id - ID do material
     * @returns MaterialResponseDTO ou null
     */
    async findById(id: number): Promise<MaterialResponseDTO | null> {
        const material = await prisma.material.findUnique({
            where: { id },
            include: { tags: { include: { tag: true } }, bnccRefs: { include: { bncc: true } } }
        });
        return material ? this.mapMaterial(material) : null;
    }

    /**
     * Busca todos os materiais, com filtros opcionais
     * @param filter - Filtros por usuário, tag, BNCC ou série
     * @returns Lista de MaterialResponseDTO
     */
    async findAll(filter?: MaterialFilterDTO): Promise<MaterialResponseDTO[]> {
        const where: any = {};

        if (filter?.userId){
            where.userId = Number(filter.userId);
        } 
        if (filter?.tagId){
            where.tags = { some: { tagId: Number(filter.tagId) } };
        } 
        if (filter?.bnccId){
            where.bnccRefs = { some: { bnccId: Number(filter.bnccId) } };
        } 
        if (filter?.gradeLevel){
             where.gradeLevel = filter.gradeLevel;
        }

        const materials = await prisma.material.findMany({
            where,
            include: {
                tags: { include: { tag: true } },
                bnccRefs: { include: { bncc: true } }
            }
        });

        return materials.map(this.mapMaterial);
    }

    /**
     * Atualiza um material e seus vínculos com tags e BNCCs
     * @param id - ID do material
     * @param data - Dados para atualizar
     * @returns MaterialResponseDTO atualizado
     */
    async update(id: number, data: UpdateMaterialDTO): Promise<MaterialResponseDTO> {

        await prisma.material.update({ where: { id }, data: { ...data } });

        // Atualiza tags, se fornecidas
        if (data.tagIds) {
            await prisma.materialTag.deleteMany({ where: { materialId: id } });
            await prisma.materialTag.createMany({
                data: data.tagIds.map(tagId => ({ materialId: id, tagId })),
                skipDuplicates: true,
            });
        }

        // Atualiza BNCCs, se fornecidas
        if (data.bnccIds) {
            await prisma.materialBNCC.deleteMany({ where: { materialId: id } });
            await prisma.materialBNCC.createMany({
                data: data.bnccIds.map(bnccId => ({ materialId: id, bnccId })),
                skipDuplicates: true,
            });
        }

        const material = await prisma.material.findUnique({
            where: { id },
            include: { tags: { include: { tag: true } }, bnccRefs: { include: { bncc: true } } }
        });

        return this.mapMaterial(material!);
    }

    /**
     * Busca todos os materiais de um usuário específico
     * @param userId - ID do usuário
     * @returns Lista de MaterialResponseDTO
     */
    async findByUserId(userId: number): Promise<MaterialResponseDTO[]> {
        const materiais = await prisma.material.findMany({
            where: { userId },
            include: {
                tags: { include: { tag: true } },
                bnccRefs: { include: { bncc: true } }
            }
        });

        return materiais.map(this.mapMaterial.bind(this));
    }

    /**
     * Deleta um material e todos os seus vínculos
     * @param id - ID do material
     */
    async delete(id: number): Promise<void> {
        await prisma.materialBNCC.deleteMany({ where: { materialId: id } });
        await prisma.materialTag.deleteMany({ where: { materialId: id } });
        await prisma.material.delete({ where: { id } });
    }
}
