import { TagRepository } from "../repository/TagRepository";
import { TagDTO, CreateTagDTO, UpdateTagDTO } from "../models/DTOs";
import { ITagService, ITagRepository } from "../interfaces/ITagService";

/**
 * Serviço responsável por gerenciar Tags.
 * Contém a lógica de criação, busca, atualização e exclusão de tags.
 */
export class TagService implements ITagService {
  private repository: ITagRepository;

  /**
   * Injeção de dependência do repositório de tags.
   * Permite usar mocks para testes unitários.
   * @param repository - repositório de tags
   */
  constructor(repository?: ITagRepository) {
    this.repository = repository ?? new TagRepository();
  }

  /**
   * Cria uma nova tag.
   * Valida se o nome foi informado e se a tag já existe.
   * @param data - dados da tag a ser criada
   * @returns TagDTO criada
   */
  async createTag(data: CreateTagDTO): Promise<TagDTO> {
    if (!data.name) {
      throw new Error("Nome da tag é obrigatório");
    }

    
    const existing = await this.repository.findByName(data.name);
    if (existing) {
      throw new Error("Tag já existe");
    }

    
    return this.repository.create(data);
  }

  /**
   * Busca uma tag pelo ID.
   * @param id - ID da tag
   * @returns TagDTO encontrada
   */
  async getTagById(id: number): Promise<TagDTO> {
    const tag = await this.repository.findById(id);
    if (!tag) {
      throw new Error("Tag não encontrada");
    }
    return tag;
  }

  /**
   * Retorna todas as tags cadastradas.
   * @returns lista de TagDTO
   */
  async getAllTags(): Promise<TagDTO[]> {
    return this.repository.findAll();
  }

  /**
   * Atualiza uma tag existente.
   * Verifica se a tag existe antes de atualizar.
   * @param id - ID da tag
   * @param data - dados a atualizar
   * @returns TagDTO atualizada
   */
  async updateTag(id: number, data: UpdateTagDTO): Promise<TagDTO> {
    const tag = await this.repository.findById(id);
    if (!tag) {
      throw new Error("Tag não encontrada");
    }

    return this.repository.update(id, data);
  }

  /**
   * Remove uma tag pelo ID.
   * Verifica se a tag existe antes de deletar.
   * @param id - ID da tag
   */
  async deleteTag(id: number): Promise<void> {
    const tag = await this.repository.findById(id);
    if (!tag) {
      throw new Error("Tag não encontrada");
    }

    await this.repository.delete(id);
  }
}
