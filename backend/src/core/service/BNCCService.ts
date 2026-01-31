import { BNCCRepository } from "../repository/BNCCRepository";
import { BNCCDTO, CreateBNCCDTO, UpdateBNCCDTO } from "../models/DTOs";
import { IBNCCService, IBNCCRepository } from "../interfaces/IBNCCService";
import { IMaterialBNCCRepository } from "../interfaces/IMaterialBNCCService";
import { MaterialRepository } from "../repository/MaterialRepository";
import { MaterialBNCCRepository } from "../repository/MaterialBNCCRepository";

/**
 * Serviço responsável pelo gerenciamento de registros da BNCC.
 * Permite criar, consultar, atualizar e excluir registros da BNCC.
 */
export class BNCCService implements IBNCCService {
  private repository: IBNCCRepository;
  private materialBNCCRepo: IMaterialBNCCRepository;

  /**
   * Injeção de dependência do repositório BNCC.
   * @param repository - repositório (opcional)
   */
  constructor(repository?: IBNCCRepository,materialBNCCRepo?: IMaterialBNCCRepository) {
    this.repository = repository ?? new BNCCRepository();
    this.materialBNCCRepo = materialBNCCRepo ?? new MaterialBNCCRepository();
  }

  /**
   * Verifica se um registro BNCC existe pelo ID.
   * @param id - ID do registro BNCC
   * @returns BNCCDTO correspondente
   * @throws Erro se a BNCC não existir
   */
  private async ensureExists(id: number): Promise<BNCCDTO> {
    const bncc = await this.repository.findById(id);
    if (!bncc) {
      throw new Error("BNCC não encontrada");
    }
    return bncc;
  }

  /**
   * Cria um novo registro BNCC.
   * @param data - dados do registro (código e descrição obrigatórios, stage)
   * @returns BNCCDTO criado
   * @throws Erro se código ou descrição não forem fornecidos
   */
  async createBNCC(data: CreateBNCCDTO): Promise<BNCCDTO> {
    if (!data.code || !data.description) {
      throw new Error("Código e descrição são obrigatórios");
    }

    return this.repository.create(data);
  }

  /**
   * Retorna um registro BNCC pelo seu ID.
   * @param id - ID do registro BNCC
   * @returns BNCCDTO correspondente
   * @throws Erro se a BNCC não existir
   */
  async getBNCCById(id: number): Promise<BNCCDTO> {
    return this.ensureExists(id);
  }

  /**
   * Retorna todos os registros BNCC cadastrados.
   * @returns Lista de BNCCDTO
   */
  async getAllBNCC(): Promise<BNCCDTO[]> {
    return this.repository.findAll();
  }

  /**
   * Atualiza um registro BNCC existente.
   * @param id - ID do registro BNCC
   * @param data - dados a atualizar
   * @returns BNCCDTO atualizado
   * @throws Erro se a BNCC não existir
   */
  async updateBNCC(id: number, data: UpdateBNCCDTO): Promise<BNCCDTO> {
    await this.ensureExists(id);
    return this.repository.update(id, data);
  }

  /**
   * Exclui um registro BNCC existente.
   * @param id - ID do registro BNCC
   * @throws Erro se a BNCC não existir
   */
    async deleteBNCC(id: number): Promise<void> {
    await this.ensureExists(id);

    const vinculos = await this.materialBNCCRepo.findAllByBNCC(id);
    if (vinculos.length > 0) {
      throw new Error(
        "Não é possível deletar a BNCC, existem materiais vinculados a ela"
      );
    }

    await this.repository.delete(id);
  }
}
