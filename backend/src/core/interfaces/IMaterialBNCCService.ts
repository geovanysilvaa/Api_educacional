import { CreateMaterialBNCCDTO, MaterialBNCCResponseDTO } from "../models/DTOs";

/**
 * Interface do repositório de Material-BNCC
 * Responsável apenas por persistência no banco
 * Não realiza validações complexas, apenas CRUD e consultas diretas
 */
export interface IMaterialBNCCRepository {
  /** Cria um vínculo entre um material e uma BNCC */
  create(data: CreateMaterialBNCCDTO): Promise<MaterialBNCCResponseDTO>;

  /** Deleta um vínculo pelo ID do relacionamento */
  delete(id: number): Promise<void>;

  /** Busca um vínculo pelo ID do relacionamento, retorna null se não existir */
  findById(id: number): Promise<MaterialBNCCResponseDTO | null>;

  /** Retorna todos os vínculos de uma material específico */
  findAllByMaterial(materialId: number): Promise<MaterialBNCCResponseDTO[]>;

  /** Retorna todos os vínculos de uma BNCC específica */
  findAllByBNCC(bnccId: number): Promise<MaterialBNCCResponseDTO[]>;

  /** Deleta um vínculo específico dado o material e a BNCC */
  deleteByMaterialAndBNCC(materialId: number, bnccId: number): Promise<void>;
}

/**
 * Interface do serviço de Material-BNCC
 * Responsável por regras de negócio e validações antes de interagir com o repositório
 */
export interface IMaterialBNCCService {
  /** Cria um vínculo entre material e BNCC, garantindo consistência */
  createMaterialBNCC(data: CreateMaterialBNCCDTO): Promise<MaterialBNCCResponseDTO>;

  /** Deleta um vínculo pelo ID do relacionamento */
  deleteMaterialBNCC(id: number): Promise<void>;

  /** Deleta um vínculo específico dado o material e a BNCC */
  deleteByMaterialAndBNCC(materialId: number, bnccId: number): Promise<void>;

  /** Busca um vínculo pelo ID do relacionamento, retorna null se não existir */
  getById(id: number): Promise<MaterialBNCCResponseDTO | null>;

  /** Retorna todos os vínculos de um material específico */
  getAllByMaterial(materialId: number): Promise<MaterialBNCCResponseDTO[]>;

  /** Retorna todos os vínculos de uma BNCC específica */
  getAllByBNCC(bnccId: number): Promise<MaterialBNCCResponseDTO[]>;
}
