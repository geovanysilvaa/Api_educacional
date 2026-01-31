import { IPlanoAulaService, IPlanoAulaRepository } from "../interfaces/IPlanodeAula";
import { PlanoAulaDTO, CreatePlanoAulaDTO, UpdatePlanoAulaDTO } from "../models/DTOs";
import { PlanoAulaRepository } from "../repository/PlanoAulaRepository";

import { IUnidadeRepository } from "../interfaces/IUnidade";
import { UnidadeRepository } from "../repository/UnidadeRepository";

/**
 * Serviço responsável por gerenciar Planos de Aula.
 * Contém lógica de criação, busca, atualização e exclusão de planos de aula.
 */
export class PlanoAulaService implements IPlanoAulaService {
  private repository: IPlanoAulaRepository;
  private unidadeRepository: IUnidadeRepository;

  /**
   * Injeção de dependência dos repositórios.
   * Permite usar mocks para testes unitários.
   * @param repository - repositório de planos de aula
   * @param unidadeRepository - repositório de unidades
   */
  constructor(repository?: IPlanoAulaRepository,unidadeRepository?: IUnidadeRepository) {
    this.repository = repository ?? new PlanoAulaRepository();
    this.unidadeRepository = unidadeRepository ?? new UnidadeRepository();
  }

  /**
   * Cria um novo plano de aula.
   * Valida se a unidade associada existe antes de criar o plano.
   * @param data - dados do plano de aula
   * @returns PlanoAulaDTO criado
   */
  async createPlanoAula(data: CreatePlanoAulaDTO): Promise<PlanoAulaDTO> {
 
  const unidade = await this.unidadeRepository.findById(data.unidadeId);
  if (!unidade) {
    throw new Error("Unidade não encontrada");
  }
  const plano = await this.repository.findPlanoByUnidadeId(data.unidadeId);
  
  if (plano) {
    throw new Error("Esta unidade já possui um plano de aula");
  }
 
  return this.repository.create(data);
}
  /**
   * Busca um plano de aula pelo ID.
   * @param id - ID do plano
   * @returns PlanoAulaDTO encontrado
   */
  async getPlanoAulaById(id: number): Promise<PlanoAulaDTO> {
    const plano = await this.repository.findById(id);
    if (!plano) throw new Error("Plano de aula não encontrado");
    return plano;
  }

  /**
   * Retorna todos os planos de aula de uma unidade específica.
   * @param unidadeId - ID da unidade
   * @returns lista de PlanoAulaDTO
   */
  async getAllPlanosByUnidade(unidadeId: number): Promise<PlanoAulaDTO[]> {
    return this.repository.findAllByUnidade(unidadeId);
  }

  /**
   * Retorna todos os planos de aula.
   * @returns lista de PlanoAulaDTO
   */
  getAllPlano(): Promise<PlanoAulaDTO[]>{
    return this.repository.getAllPlano();
  }

  /**
   * Atualiza um plano de aula existente.
   * @param id - ID do plano de aula
   * @param data - dados a atualizar
   * @returns PlanoAulaDTO atualizado
   */
  async updatePlanoAula(id: number, data: UpdatePlanoAulaDTO): Promise<PlanoAulaDTO> {

    const plano = await this.repository.findById(id);
    if (!plano) {
        throw new Error("Plano de Aula não encontrado");
    }

    return this.repository.update(id, data);
}

  /**
   * Remove um plano de aula pelo ID.
   * @param id - ID do plano de aula
   */
  async deletePlanoAula(id: number): Promise<void> {
     const plano = await this.repository.findById(id);
    if (!plano){
       throw new Error("Plano de aula não encontrado");
    }
  
    await this.repository.delete(id);
  }
}
