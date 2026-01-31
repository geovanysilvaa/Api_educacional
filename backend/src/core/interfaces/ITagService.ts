import { CreateTagDTO, UpdateTagDTO, TagDTO } from "../models/DTOs";

/**
 * Interface do serviço de Tag
 * Define os métodos que a camada de serviço deve implementar
 * Responsável por regras de negócio relacionadas a Tags
 */
export interface ITagService {
  /** Cria uma nova tag */
  createTag(data: CreateTagDTO): Promise<TagDTO>;

  /** Atualiza uma tag existente pelo ID */
  updateTag(id: number, data: UpdateTagDTO): Promise<TagDTO>;

  /** Retorna uma tag pelo ID, lança erro se não encontrada */
  getTagById(id: number): Promise<TagDTO>;

  /** Retorna todas as tags cadastradas */
  getAllTags(): Promise<TagDTO[]>;

  /** Deleta uma tag pelo ID */
  deleteTag(id: number): Promise<void>;
}

/**
 * Interface do repositório de Tag
 * Define métodos de acesso ao banco de dados para Tags
 */
export interface ITagRepository {
  /** Cria uma nova tag no banco */
  create(data: CreateTagDTO): Promise<TagDTO>;

  /** Busca uma tag pelo ID, retorna null se não encontrada */
  findById(id: number): Promise<TagDTO | null>;

  /** Busca uma tag pelo nome, retorna null se não encontrada */
  findByName(name: string): Promise<TagDTO | null>;

  /** Retorna todas as tags cadastradas */
  findAll(): Promise<TagDTO[]>; 

  /** Atualiza uma tag pelo ID */
  update(id: number, data: UpdateTagDTO): Promise<TagDTO>;

  /** Deleta uma tag pelo ID */
  delete(id: number): Promise<void>;
}
