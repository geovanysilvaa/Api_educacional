import { prisma } from "../lib/prisma";
import { IPlanoAulaRepository } from "../interfaces/IPlanodeAula";
import { PlanoAulaDTO, CreatePlanoAulaDTO, UpdatePlanoAulaDTO } from "../models/DTOs";

/**
 * Repositório responsável pelas operações de persistência
 * da entidade Plano de Aula no banco de dados (Prisma ORM).
 */
export class PlanoAulaRepository implements IPlanoAulaRepository {

    /**
     * Mapeia o registro bruto do banco para o DTO
     * @param p - registro do Prisma
     * @returns PlanoAulaDTO
     */
    private map(p: any): PlanoAulaDTO {
        return {
            id: p.id,
            unidadeId: p.unidadeId,
            textoPlano: p.textoPlano,
            bnccCompetencias: p.bnccCompetencias,
            fontes: p.fontes,
            createdAt: p.createdAt,
        };
    }

    /**
     * Cria um novo plano de aula
     * @param data - Dados para criar o plano de aula
     * @returns PlanoAulaDTO criado
     */
    async create(data: CreatePlanoAulaDTO): Promise<PlanoAulaDTO> {
        const plano = await prisma.planoAula.create({
            data: {
                unidadeId: data.unidadeId,
                textoPlano: data.textoPlano,
                bnccCompetencias: data.bnccCompetencias ?? [],
                fontes: data.fontes
            },
        });
        return this.map(plano);
    }

    /**
     * Busca um plano de aula pelo ID
     * @param id - ID do plano de aula
     * @returns PlanoAulaDTO ou null
     */
    async findById(id: number): Promise<PlanoAulaDTO | null> {
        const plano = await prisma.planoAula.findUnique({ where: { id } });
        return plano ? this.map(plano) : null;
    }


    async findPlanoByUnidadeId(unidadeId: number): Promise<PlanoAulaDTO | null> {
        const unidade = await prisma.unidade.findUnique({
            where: { id: unidadeId },
            include: { planoAula: true },
        });
        return unidade?.planoAula ? this.map(unidade.planoAula) : null;
    }


    /**
     * Retorna todos os planos de aula
     * @returns Lista de PlanoAulaDTO
     */
    async getAllPlano(): Promise<PlanoAulaDTO[]> {
        const planos = await prisma.planoAula.findMany();

        return planos.map(plano => ({
            id: plano.id,
            unidadeId: plano.unidadeId,
            textoPlano: plano.textoPlano,
            bnccCompetencias: Array.isArray(plano.bnccCompetencias)
                ? plano.bnccCompetencias as { codigo: string; descricao: string }[]
                : [],
            fontes: plano.fontes ?? [],
            createdAt: plano.createdAt,
        }));
    }

    /**
     * Retorna todos os planos de aula de uma unidade
     * @param unidadeId - ID da unidade
     * @returns Lista de PlanoAulaDTO
     */
    async findAllByUnidade(unidadeId: number): Promise<PlanoAulaDTO[]> {
        const planos = await prisma.planoAula.findMany({ where: { unidadeId } });
        return planos.map(p => this.map(p));
    }

    /**
     * Atualiza um plano de aula existente
     * @param id - ID do plano
     * @param data - Dados a atualizar
     * @returns PlanoAulaDTO atualizado
     */
    async update(id: number, data: UpdatePlanoAulaDTO): Promise<PlanoAulaDTO> {
        const plano = await prisma.planoAula.update({
            where: { id },
            data: {
                ...(data.textoPlano && { textoPlano: data.textoPlano }),
                ...(data.bnccCompetencias && { bnccCompetencias: data.bnccCompetencias }),
                ...(data.fontes && { fontes: data.fontes }),
            },
        });
        return this.map(plano);
    }

    /**
     * Remove um plano de aula do banco
     * @param id - ID do plano de aula
     */
    async delete(id: number): Promise<void> {
        await prisma.planoAula.delete({ where: { id } });
    }
}
