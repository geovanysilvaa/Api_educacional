import { Request, Response, NextFunction } from "express";
import { MaterialService } from "../service/MaterialService";
import { IMaterialService } from "../interfaces/IMaterialService";

/**
 * Controller responsável por gerenciar materiais.
 * Recebe requisições HTTP, chama os métodos do serviço e retorna respostas apropriadas.
 */
export class MaterialController {
  private materialService: IMaterialService;

  /**
   * Cria uma instância do controller de materiais.
   * @param materialService - Serviço de materiais (injeção de dependência opcional)
   */
  constructor(materialService?: IMaterialService) {
    this.materialService = materialService ?? new MaterialService();
  }

  /**
   * Cria um novo material.
   * Método: POST
   * Body: Objeto contendo título, descrição, tipo, série, userId, tagIds e bnccIds
   * Retorna: 201 + material criado
   */
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const material = await this.materialService.createMaterial({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        gradeLevel: req.body.gradeLevel,
        userId: req.body.userId,
        tagIds: req.body.tagIds,
        bnccIds: req.body.bnccIds,
      });

      return res.status(201).json(material);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Busca um material pelo ID.
   * Método: GET
   * Params: id - ID do material
   * Valida: Retorna 400 se o ID não for numérico
   * Retorna: 200 + material encontrado
   */
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const material = await this.materialService.getMaterialById(id);
      res.json(material);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Lista todos os materiais.
   * Método: GET
   * Query: Pode conter filtros opcionais (ex: tipo, série, tags)
   * Retorna: 200 + array de materiais
   */
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const materials = await this.materialService.getAllMaterials(req.query);
      res.json(materials);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Atualiza um material existente pelo ID.
   * Método: PUT
   * Params: id - ID do material
   * Body: Dados a serem atualizados
   * Valida: Retorna 400 se o ID não for numérico
   * Retorna: 200 + material atualizado
   */
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const updated = await this.materialService.updateMaterial(id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Deleta um material pelo ID.
   * Método: DELETE
   * Params: id - ID do material
   * Valida: Retorna 400 se o ID não for numérico
   * Retorna: 204 No Content
   */
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      await this.materialService.deleteMaterial(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
