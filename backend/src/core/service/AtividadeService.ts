import { IAtividadeRepository, IAtividadeService } from "../interfaces/IAtividade";
import { AtividadeDTO, CreateAtividadeDTO, UpdateAtividadeDTO } from "../models/DTOs";
import { AtividadeRepository } from "../repository/AtividadeRepository";
import { UnidadeRepository } from "../repository/UnidadeRepository";

/**
 * Serviço responsável pelo gerenciamento de atividades.
 * Permite criar, consultar, atualizar e excluir atividades vinculadas a unidades.
 */
export class AtividadeService implements IAtividadeService {
    private atividadeRepository: IAtividadeRepository;
    private unidadeRepository: UnidadeRepository;

    /**
     * Injeção de dependência do repositório de atividades e unidades.
     * @param atividadeRepository - repositório de atividades (opcional)
     * @param unidadeRepository - repositório de unidades (opcional)
     */
    constructor(atividadeRepository?: IAtividadeRepository, unidadeRepository?: UnidadeRepository) {
        this.atividadeRepository = atividadeRepository ?? new AtividadeRepository();
        this.unidadeRepository = unidadeRepository ?? new UnidadeRepository();
    }

    /**
     * Garante que a unidade existe antes de criar ou atualizar atividade.
     * @param unidadeId - ID da unidade
     * @throws Erro se a unidade não existir
     */
    private async ensureUnidadeExists(unidadeId: number) {
        const unidade = await this.unidadeRepository.findById(unidadeId);
        if (!unidade) {
            throw new Error(`Unidade com id ${unidadeId} não existe`);
        }
    }

    /**
     * Cria uma nova atividade.
     * @param data - dados da atividade (enunciado, critérios de correção, tipo e unidade)
     * @returns AtividadeDTO criada
     * @throws Erro se o enunciado não for fornecido ou unidade não existir
     */
    async createAtividade(data: CreateAtividadeDTO): Promise<AtividadeDTO> {
        if (!data.enunciado.trim()) {
            throw new Error("Enunciado é obrigatório");
        }

        await this.ensureUnidadeExists(data.unidadeId); // validação da FK
        return this.atividadeRepository.create(data);
    }

    /**
     * Retorna uma atividade pelo seu ID.
     * @param id - ID da atividade
     * @returns AtividadeDTO correspondente
     * @throws Erro se a atividade não existir
     */
    async getAtividadeById(id: number): Promise<AtividadeDTO> {
        const atividade = await this.atividadeRepository.findById(id);
        if (!atividade) {
            throw new Error("Atividade não encontrada");
        }
        return atividade;
    }

     async list(): Promise<AtividadeDTO[]> {
        return this.atividadeRepository.list();
    }


    /**
     * Retorna todas as atividades vinculadas a uma unidade.
     * @param unidadeId - ID da unidade
     * @returns Lista de AtividadeDTO
     */
    async getAllAtividadesByUnidade(unidadeId: number): Promise<AtividadeDTO[]> {
        await this.ensureUnidadeExists(unidadeId);
        return this.atividadeRepository.findAllByUnidade(unidadeId);
    }

    /**
     * Atualiza uma atividade existente.
     * @param id - ID da atividade
     * @param data - dados a atualizar
     * @returns AtividadeDTO atualizada
     * @throws Erro se a atividade não existir ou unidade alterada não existir
     */
    async updateAtividade(id: number, data: UpdateAtividadeDTO): Promise<AtividadeDTO> {
        await this.getAtividadeById(id);
        return this.atividadeRepository.update(id, data);
    }

    /**
     * Exclui uma atividade existente.
     * @param id - ID da atividade
     * @throws Erro se a atividade não existir
     */
    async deleteAtividade(id: number): Promise<void> {
        await this.getAtividadeById(id);
        await this.atividadeRepository.delete(id);
    }
}
