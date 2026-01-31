import { MaterialRepository } from "../repository/MaterialRepository";
import { MaterialResponseDTO, CreateMaterialDTO, UpdateMaterialDTO, MaterialFilterDTO } from "../models/DTOs";
import { IMaterialService, IMaterialRepository } from "../interfaces/IMaterialService";
import { IBNCCRepository } from "../interfaces/IBNCCService";
import { ITagRepository } from "../interfaces/ITagService";
import { TagRepository } from "../repository/TagRepository";
import { BNCCRepository } from "../repository/BNCCRepository";
import { UserRepository } from "../repository/UserRepository";
import { IUserRepository } from "../interfaces/IUserService";

/**
 * Serviço responsável pelo gerenciamento de materiais didáticos.
 * Inclui criação, leitura, atualização e exclusão de materiais,
 * além da gestão dos vínculos com tags e BNCC.
 */
export class MaterialService implements IMaterialService {
  private repository: IMaterialRepository;
  private tagRepository: ITagRepository;
  private bnccRepository: IBNCCRepository;
  private userRepository: IUserRepository;

  constructor(repository?: IMaterialRepository, tagRepository?: ITagRepository, bnccRepository?: IBNCCRepository, userRepository?: IUserRepository) {
    this.repository = repository ?? new MaterialRepository();
    this.tagRepository = tagRepository ?? new TagRepository();
    this.bnccRepository = bnccRepository ?? new BNCCRepository();
    this.userRepository = userRepository ?? new UserRepository();
  }

  /**
   * Cria um novo material.
   * Valida título, existência das tags e BNCCs antes de criar.
   */
  async createMaterial(data: CreateMaterialDTO): Promise<MaterialResponseDTO> {
    if (!data.title) throw new Error("Título do material é obrigatório");

    const existeUsuario = await this.userRepository.findById(data.userId);
    if (!existeUsuario) throw new Error("Usuário não existe");

    if (data.tagIds) {
      for (const tagId of data.tagIds) {
        const tag = await this.tagRepository.findById(tagId);
        if (!tag || !tag.id) throw new Error(`Tag com id ${tagId} não existe`);
      }
    }

    if (data.bnccIds) {
      for (const bnccId of data.bnccIds) {
        const bncc = await this.bnccRepository.findById(bnccId);
        if (!bncc || !bncc.id) throw new Error(`BNCC com id ${bnccId} não existe`);
      }
    }

    return this.repository.create(data);
  }

  /**
   * Busca um material pelo ID.
   * Retorna material com tags e bnccRefs já carregados.
   */
  async getMaterialById(id: number): Promise<MaterialResponseDTO> {
    const material = await this.repository.findById(id);
    if (!material) throw new Error("Material não encontrado");

    return material;
  }

  /**
   * Retorna todos os materiais, opcionalmente filtrando por tags, BNCC, usuário ou série.
   * Tags e bnccRefs já vêm carregados.
   */
  async getAllMaterials(filter?: MaterialFilterDTO): Promise<MaterialResponseDTO[]> {
    return this.repository.findAll(filter);
  }

  /**
   * Atualiza um material existente.
   */
  async updateMaterial(id: number, data: UpdateMaterialDTO): Promise<MaterialResponseDTO> {
    const material = await this.repository.findById(id);
    if (!material) throw new Error("Material não encontrado");

    return this.repository.update(id, data);
  }

  /**
   * Exclui um material pelo ID.
   * Todos os vínculos com tags e BNCC são removidos pelo repository.
   */
  async deleteMaterial(id: number): Promise<void> {
    const material = await this.repository.findById(id);
    if (!material) throw new Error("Material não encontrado");

    return this.repository.delete(id);
  }
}
