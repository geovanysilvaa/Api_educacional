import { IMaterialBNCCRepository, IMaterialBNCCService } from "../interfaces/IMaterialBNCCService";
import { MaterialBNCCRepository } from "../repository/MaterialBNCCRepository";
import { CreateMaterialBNCCDTO, MaterialBNCCResponseDTO } from "../models/DTOs";

/**
 * Serviço responsável pelo gerenciamento dos vínculos entre Materiais e BNCC.
 * Permite criar, consultar e excluir relações entre materiais e competências BNCC.
 */
export class MaterialBNCCService implements IMaterialBNCCService {
  private repositoryMaterialBCNN: IMaterialBNCCRepository;

  /**
   * Injeção de dependência do repositório de MaterialBNCC.
   * @param repositoryMaterialBCNN - repositório opcional, caso não seja fornecido será criado internamente
   */
  constructor(repositoryMaterialBCNN?: IMaterialBNCCRepository) {
    this.repositoryMaterialBCNN = repositoryMaterialBCNN ?? new MaterialBNCCRepository();
  }

  /**
   * Cria um vínculo entre um material e uma BNCC.
   * @param data - dados do vínculo (materialId e bnccId)
   * @returns MaterialBNCCResponseDTO criado
   */
 async createMaterialBNCC(data: CreateMaterialBNCCDTO): Promise<MaterialBNCCResponseDTO> {
    
    const existente = await this.repositoryMaterialBCNN.findAllByMaterial(data.materialId);
    if (existente.some(mb => mb.bnccId === data.bnccId)) {
        throw new Error("Associação Material ↔ BNCC já existe");
    }

    return this.repositoryMaterialBCNN.create(data);
}


  /**
   * Remove um vínculo pelo ID do registro.
   * @param id - ID do vínculo
   */
  async deleteMaterialBNCC(id: number): Promise<void> {
    return this.repositoryMaterialBCNN.delete(id);
  }

  /**
   * Remove um vínculo específico entre um material e uma BNCC.
   * @param materialId - ID do material
   * @param bnccId - ID da BNCC
   */
  async deleteByMaterialAndBNCC(materialId: number, bnccId: number): Promise<void> {
    return this.repositoryMaterialBCNN.deleteByMaterialAndBNCC(materialId, bnccId);
  }

  /**
   * Busca um vínculo pelo ID do registro.
   * @param id - ID do vínculo
   * @returns MaterialBNCCResponseDTO ou null caso não exista
   */
  async getById(id: number): Promise<MaterialBNCCResponseDTO | null> {
    return this.repositoryMaterialBCNN.findById(id);
  }

  /**
   * Retorna todos os vínculos de um determinado material.
   * @param materialId - ID do material
   * @returns Lista de MaterialBNCCResponseDTO
   */
  async getAllByMaterial(materialId: number): Promise<MaterialBNCCResponseDTO[]> {
    return this.repositoryMaterialBCNN.findAllByMaterial(materialId);
  }

  /**
   * Retorna todos os vínculos relacionados a uma determinada BNCC.
   * @param bnccId - ID da BNCC
   * @returns Lista de MaterialBNCCResponseDTO
   */
  async getAllByBNCC(bnccId: number): Promise<MaterialBNCCResponseDTO[]> {
    return this.repositoryMaterialBCNN.findAllByBNCC(bnccId);
  }
}
