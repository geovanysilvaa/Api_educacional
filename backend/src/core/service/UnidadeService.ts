import { IUnidadeService, IUnidadeRepository } from "../interfaces/IUnidade";
import { IDisciplinaRepository } from "../interfaces/IDisciplina";
import { UnidadeDTO, CreateUnidadeDTO, UpdateUnidadeDTO } from "../models/DTOs";
import { UnidadeRepository } from "../repository/UnidadeRepository";
import { DisciplinaRepository } from "../repository/DisciplinaRepository";

/**
 * Serviço responsável por gerenciar Unidades.
 * Contém a lógica de criação, busca, atualização e exclusão de unidades.
 */
export class UnidadeService implements IUnidadeService {
  private repositoryService: IUnidadeRepository;
  private repositoryDisciplina: IDisciplinaRepository;

  /**
   * Injeção de dependências para repositórios.
   * Permite usar mocks em testes unitários.
   * @param repositoryService - repositório de unidades
   * @param repositoryDisciplina - repositório de disciplinas
   */
  constructor(
    repositoryService?: IUnidadeRepository,
    repositoryDisciplina?: IDisciplinaRepository
  ) {
    this.repositoryService = repositoryService ?? new UnidadeRepository();
    this.repositoryDisciplina = repositoryDisciplina ?? new DisciplinaRepository();
  }

  /**
   * Cria uma nova unidade.
   * Verifica se a disciplina existe antes de criar.
   * @param data - dados da unidade
   * @returns UnidadeDTO criada
   */
  async createUnidade(data: CreateUnidadeDTO): Promise<UnidadeDTO> {
   
    const disciplina = await this.repositoryDisciplina.findById(data.disciplinaId);
    if (!disciplina) {
      throw new Error("Disciplina não encontrada");
    }

    
    return this.repositoryService.create(data);
  }

  /**
   * Retorna uma unidade pelo ID.
   * @param id - ID da unidade
   * @returns UnidadeDTO
   */
  async getUnidadeById(id: number): Promise<UnidadeDTO> {
    const unidade = await this.repositoryService.findById(id);
    if (!unidade) throw new Error("Unidade não encontrada");
    return unidade;
  }

  /**
   * Retorna todas as unidades cadastradas.
   * @returns lista de UnidadeDTO
   */
  async getAllUnidades(): Promise<UnidadeDTO[]> {
    return this.repositoryService.findAll();
  }

  /**
   * Retorna todas as unidades de uma disciplina específica.
   * @param disciplinaId - ID da disciplina
   * @returns lista de UnidadeDTO
   */
  async getAllUnidadesByDisciplina(disciplinaId: number): Promise<UnidadeDTO[]> {
    return this.repositoryService.findAllByDisciplina(disciplinaId);
  }

  /**
   * Atualiza uma unidade existente.
   * Verifica se a unidade existe antes de atualizar.
   * @param id - ID da unidade
   * @param data - dados a atualizar
   * @returns UnidadeDTO atualizada
   */
  async updateUnidade(id: number, data: UpdateUnidadeDTO): Promise<UnidadeDTO> {
    const unidade = await this.repositoryService.findById(id);

    if (!unidade) {
      throw new Error("Unidade não encontrada");
    }

    return this.repositoryService.update(id, data);
  }

  /**
   * Remove uma unidade pelo ID.
   * Verifica se a unidade existe antes de deletar.
   * @param id - ID da unidade
   */
  async deleteUnidade(id: number): Promise<void> {
    const unidade = await this.repositoryService.findById(id);

    if (!unidade) {
      throw new Error("Unidade não encontrada");
    }

    await this.repositoryService.delete(id);
  }
}
