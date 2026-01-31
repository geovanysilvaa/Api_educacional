import { IDisciplinaRepository, IDisciplinaService } from "../interfaces/IDisciplina";
import { CreateDisciplinaDTO, DisciplinaDTO, UpdateDisciplinaDTO } from "../models/DTOs";
import { DisciplinaRepository } from "../repository/DisciplinaRepository";
import { UnidadeRepository } from "../repository/UnidadeRepository";

/**
 * Serviço responsável pelo gerenciamento de disciplinas.
 * Permite criar, consultar, atualizar e excluir disciplinas.
 */
export class DisciplinaService implements IDisciplinaService {
  private disciplinaRepository: IDisciplinaRepository;
  private unidadeRepository: UnidadeRepository;

  /**
   * Injeção de dependência do repositório de disciplinas e unidades.
   * Permite testes unitários e checagem de dependências antes de deletar.
   * @param disciplinaRepository - repositório de disciplinas (opcional)
   * @param unidadeRepository - repositório de unidades (opcional)
   */
  constructor(
    disciplinaRepository?: IDisciplinaRepository,
    unidadeRepository?: UnidadeRepository
  ) {
    this.disciplinaRepository = disciplinaRepository ?? new DisciplinaRepository();
    this.unidadeRepository = unidadeRepository ?? new UnidadeRepository();
  }

  /**
   * Cria uma nova disciplina.
   * @param data - dados da disciplina (nome, descrição, séries/anos)
   * @returns DisciplinaDTO criada
   * @throws Erro se o nome for inválido (<3 caracteres)
   */
  async createDisciplina(data: CreateDisciplinaDTO): Promise<DisciplinaDTO> {
    if (!data.nome || data.nome.trim().length < 3) {
      throw new Error("Nome da disciplina inválido");
    }

    return this.disciplinaRepository.create(data);
  }

  /**
   * Retorna uma disciplina pelo seu ID.
   * @param id - ID da disciplina
   * @returns DisciplinaDTO correspondente
   * @throws Erro se a disciplina não existir
   */
  async getDisciplinaById(id: number): Promise<DisciplinaDTO> {
    const disciplina = await this.disciplinaRepository.findById(id);

    if (!disciplina) {
      throw new Error("Disciplina não encontrada");
    }

    return disciplina;
  }

  /**
   * Retorna todas as disciplinas cadastradas.
   * @returns Lista de DisciplinaDTO
   */
  async getAllDisciplinas(): Promise<DisciplinaDTO[]> {
    return this.disciplinaRepository.findAll();
  }

  /**
   * Atualiza os dados de uma disciplina existente.
   * @param id - ID da disciplina
   * @param data - dados a atualizar
   * @returns DisciplinaDTO atualizada
   * @throws Erro se a disciplina não existir
   */
  async updateDisciplina(id: number, data: UpdateDisciplinaDTO): Promise<DisciplinaDTO> {
    await this.getDisciplinaById(id);
    return this.disciplinaRepository.update(id, data);
  }

  /**
   * Exclui uma disciplina existente.
   * Verifica se existem unidades vinculadas antes de deletar.
   * Lança erro caso exista vínculo.
   * @param id - ID da disciplina
   */
  async deleteDisciplina(id: number): Promise<void> {

    await this.getDisciplinaById(id);

    const unidades = await this.unidadeRepository.findAllByDisciplina(id);
    if (unidades.length > 0) {
      throw new Error("Não é possível deletar a disciplina, existem unidades vinculadas");
    }

    await this.disciplinaRepository.delete(id);
  }
}
