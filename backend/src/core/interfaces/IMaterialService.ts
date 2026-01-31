import { CreateMaterialDTO, UpdateMaterialDTO, MaterialResponseDTO, MaterialFilterDTO } from "../models/DTOs";

/**
 * Interface do repositório de Material
 * Responsável apenas por persistência no banco
 * Não realiza validações complexas ou regras de negócio
 */
export interface IMaterialRepository {
  /** Cria um novo material */
  create(data: CreateMaterialDTO): Promise<MaterialResponseDTO>;

  /** Busca um material pelo ID, retorna null se não encontrado */
  findById(id: number): Promise<MaterialResponseDTO | null>;

  /** Busca todos os materiais, podendo filtrar por usuário, tag, BNCC ou série */
  findAll(filter?: MaterialFilterDTO): Promise<MaterialResponseDTO[]>;

  /** Atualiza um material pelo ID */
  update(id: number, data: UpdateMaterialDTO): Promise<MaterialResponseDTO>;

  /** Busca todos os materiais de um usuário específico */
  findByUserId(userId: number): Promise<MaterialResponseDTO[]>;

  /** Deleta um material pelo ID */
  delete(id: number): Promise<void>;
}

/**
 * Interface do serviço de Material
 * Responsável por regras de negócio, validações e consistência
 * Interage com o repositório para operações no banco
 */
export interface IMaterialService {
  /** Cria um material, valida título, tags e BNCCs antes de persistir */
  createMaterial(data: CreateMaterialDTO): Promise<MaterialResponseDTO>;

  /** Atualiza um material, garante que exista antes de atualizar */
  updateMaterial(id: number, data: UpdateMaterialDTO): Promise<MaterialResponseDTO>;

  /** Busca um material pelo ID, pode retornar null se não existir */
  getMaterialById(id: number): Promise<MaterialResponseDTO | null>;

  /** Retorna todos os materiais, com filtros opcionais */
  getAllMaterials(filter?: MaterialFilterDTO): Promise<MaterialResponseDTO[]>;

  /** Deleta um material, garantindo remoção de vínculos com tags e BNCC */
  deleteMaterial(id: number): Promise<void>;
}
