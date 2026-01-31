import { PlanoAulaDTO, CreatePlanoAulaDTO, UpdatePlanoAulaDTO } from "../models/DTOs";

/**
 * Interface do repositório de Plano de Aula
 * Define os métodos de acesso ao banco de dados
 * Responsável apenas por persistência: criar, buscar, atualizar e deletar planos de aula
 */
export interface IPlanoAulaRepository {
  /** Cria um novo plano de aula */
  create(data: CreatePlanoAulaDTO): Promise<PlanoAulaDTO>;

  /** Busca um plano de aula pelo ID, retorna null se não encontrado */
  findById(id: number): Promise<PlanoAulaDTO | null>;

  findPlanoByUnidadeId(unidadeId: number): Promise<PlanoAulaDTO | null> 

  /* Lista todos os planos de aulas*/
  getAllPlano(): Promise<PlanoAulaDTO[]>;

  /** Retorna todos os planos de aula de uma unidade específica */
  findAllByUnidade(unidadeId: number): Promise<PlanoAulaDTO[]>;

  /** Atualiza um plano de aula pelo ID */
  update(id: number, data: UpdatePlanoAulaDTO): Promise<PlanoAulaDTO>;

  /** Deleta um plano de aula pelo ID */
  delete(id: number): Promise<void>;
}

/**
 * Interface do serviço de Plano de Aula
 * Define regras de negócio e validações antes de persistir dados
 * Interage com o repositório para operações no banco
 */
export interface IPlanoAulaService {
  /** Cria um novo plano de aula com validação de unidade */
  createPlanoAula(data: CreatePlanoAulaDTO): Promise<PlanoAulaDTO>;

  /** Busca um plano de aula pelo ID, lança erro se não encontrado */
  getPlanoAulaById(id: number): Promise<PlanoAulaDTO>;

  /** Retorna todos os planos de aula de uma unidade */
  getAllPlanosByUnidade(unidadeId: number): Promise<PlanoAulaDTO[]>;
  
  /* Retorna todos as planos de aula */
  getAllPlano(): Promise<PlanoAulaDTO[]>;

  /** Atualiza um plano de aula pelo ID, lança erro se não encontrado */
  updatePlanoAula(id: number, data: UpdatePlanoAulaDTO): Promise<PlanoAulaDTO>;

  /** Deleta um plano de aula pelo ID, lança erro se não encontrado */
  deletePlanoAula(id: number): Promise<void>;
}
