import { Request, Response, NextFunction } from "express";
import { MaterialBNCCService } from "../service/MaterialBNCCService";
import { IMaterialBNCCService } from "../interfaces/IMaterialBNCCService";

/**
 * Controller responsável por gerenciar a associação entre Materiais e BNCC.
 * Recebe requisições HTTP, chama os métodos do serviço e retorna respostas apropriadas.
 */
export class MaterialBNCCController {
  private service: IMaterialBNCCService;

  /**
   * Cria uma instância do controller de Material-BNCC.
   * @param service - Serviço de Material-BNCC (injeção de dependência opcional)
   */
  constructor(service?: IMaterialBNCCService) {
    this.service = service ?? new MaterialBNCCService();
  }

  /**
   * Cria uma nova associação entre Material e BNCC.
   * Método: POST
   * Body: Objeto contendo dados da associação
   * Retorna: 201 + associação criada
   */
  create = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const record = await this.service.createMaterialBNCC(req.body);
      res.status(201).json(record);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Deleta uma associação entre Material e BNCC pelo ID.
   * Método: DELETE
   * Params: id - ID da associação
   * Valida: Retorna 400 se o ID não for numérico
   * Retorna: 204 No Content
   */
  delete = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      await this.service.deleteMaterialBNCC(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

  /**
   * Lista todas as associações de um material específico.
   * Método: GET
   * Params: materialId - ID do material
   * Valida: Retorna 400 se o materialId não for numérico
   * Retorna: 200 + array de associações do material
   */
  findAllByMaterial = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const materialId = Number(req.params.materialId);
      if (isNaN(materialId)) {
        return res.status(400).json({ error: "materialId inválido" });
      }

      const records = await this.service.getAllByMaterial(materialId);
      res.json(records);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Lista todas as associações de uma BNCC específica.
   * Método: GET
   * Params: bnccId - ID da BNCC
   * Valida: Retorna 400 se o bnccId não for numérico
   * Retorna: 200 + array de associações da BNCC
   */
  findAllByBNCC = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const bnccId = Number(req.params.bnccId);
      if (isNaN(bnccId)) {
        return res.status(400).json({ error: "bnccId inválido" });
      }

      const records = await this.service.getAllByBNCC(bnccId);
      res.json(records);
    } catch (err) {
      next(err);
    }
  };
}
