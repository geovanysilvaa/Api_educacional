import { Request, Response, NextFunction } from "express";
import { BNCCService } from "../service/BNCCService";
import { IBNCCService } from "../interfaces/IBNCCService";

/**
 * Controller responsável por gerenciar operações da BNCC.
 * Recebe requisições HTTP, chama os métodos do serviço e retorna respostas apropriadas.
 */
export class BNCCController {
  private service: IBNCCService;

  /**
   * Cria uma instância do controller da BNCC.
   * @param service - Serviço de BNCC (injeção de dependência opcional)
   */
  constructor(service?: IBNCCService) {
    this.service = service ?? new BNCCService();
  }

  /**
   * Cria um novo registro da BNCC.
   * Método: POST
   * Body: Objeto contendo os dados da BNCC
   * Retorna: 201 + BNCC criado
   */
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bncc = await this.service.createBNCC(req.body);
      res.status(201).json(bncc);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Busca um registro da BNCC pelo ID.
   * Método: GET
   * Params: id - ID do registro da BNCC
   * Valida: Retorna 400 se o ID não for numérico
   * Retorna: 200 + registro encontrado
   */
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const bncc = await this.service.getBNCCById(id);
      res.json(bncc);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Lista todos os registros da BNCC.
   * Método: GET
   * Retorna: 200 + array de registros da BNCC
   */
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bnccs = await this.service.getAllBNCC();
      res.json(bnccs);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Atualiza um registro da BNCC pelo ID.
   * Método: PUT
   * Params: id - ID do registro
   * Body: Dados a serem atualizados
   * Valida: Retorna 400 se o ID não for numérico
   * Retorna: 200 + registro atualizado
   */
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const updated = await this.service.updateBNCC(id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Deleta um registro da BNCC pelo ID.
   * Método: DELETE
   * Params: id - ID do registro
   * Valida: Retorna 400 se o ID não for numérico
   * Retorna: 204 No Content
   */
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      await this.service.deleteBNCC(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
