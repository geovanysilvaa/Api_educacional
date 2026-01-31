import { Request, Response, NextFunction } from "express";
import { TagService } from "../service/TagService";
import { ITagService } from "../interfaces/ITagService";

/**
 * Controller responsável por gerenciar tags.
 * Recebe requisições HTTP, chama os métodos do serviço e retorna respostas apropriadas.
 */
export class TagController {
  private tagService: ITagService;

  /**
   * Cria uma instância do controller de tags.
   * @param tagService - Serviço de tags (injeção de dependência opcional)
   */
  constructor(tagService?: ITagService) {
    this.tagService = tagService ?? new TagService();
  }

  /**
   * Cria uma nova tag.
   * Método: POST
   * Body: Objeto contendo os dados da tag
   * Retorna: 201 + tag criada
   */
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tag = await this.tagService.createTag(req.body);
      res.status(201).json(tag);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Lista todas as tags.
   * Método: GET
   * Retorna: 200 + array de tags
   */
  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tags = await this.tagService.getAllTags();
      res.status(200).json(tags);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Busca uma tag pelo ID.
   * Método: GET
   * Params: id - ID da tag
   * Retorna: 200 + tag encontrada
   */
  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tag = await this.tagService.getTagById(Number(req.params.id));
      res.status(200).json(tag);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Atualiza uma tag pelo ID.
   * Método: PUT
   * Params: id - ID da tag
   * Body: Dados a serem atualizados
   * Retorna: 200 + tag atualizada
   */
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tag = await this.tagService.updateTag(Number(req.params.id), req.body);
      res.status(200).json(tag);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Deleta uma tag pelo ID.
   * Método: DELETE
   * Params: id - ID da tag
   * Retorna: 204 No Content
   */
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.tagService.deleteTag(Number(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
