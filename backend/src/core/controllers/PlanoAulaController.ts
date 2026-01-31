import { Request, Response, NextFunction } from "express";
import { PlanoAulaService } from "../service/PlanoAulaService";
import { IPlanoAulaService } from "../interfaces/IPlanodeAula";

/**
 * Controller responsável por gerenciar planos de aula.
 * Recebe requisições HTTP, chama os métodos do serviço e retorna respostas apropriadas.
 */
export class PlanoAulaController {
  private planoService: IPlanoAulaService;

  /**
   * Cria uma instância do controller de plano de aula.
   * @param planoService - Serviço de plano de aula (injeção de dependência opcional)
   */
  constructor(planoService?: IPlanoAulaService) {
    this.planoService = planoService ?? new PlanoAulaService();
  }

  /**
   * Cria um novo plano de aula.
   * Método: POST
   * Body: Objeto contendo dados do plano de aula
   * Retorna: 201 + plano criado
   */
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const plano = await this.planoService.createPlanoAula(req.body);
      return res.status(201).json(plano);
    } catch (err) {
      next(err);
    }
  };

 /**
   * Lista todos os planos de aula.
   * Método: GET
   * Retorna: 200 + plano encontrado
   */
  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const plano = await this.planoService.getAllPlano();
      return res.json(plano);
    } catch (err) {
      next(err);
    }
  };
  /**
   * Busca um plano de aula pelo ID.
   * Método: GET
   * Params: id - ID do plano de aula
   * Retorna: 200 + plano encontrado
   */
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const plano = await this.planoService.getPlanoAulaById(id);
      return res.json(plano);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Lista todos os planos de aula de uma unidade específica.
   * Método: GET
   * Params: unidadeId - ID da unidade
   * Retorna: 200 + array de planos de aula
   */
  getAllByUnidade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const unidadeId = Number(req.params.unidadeId);
      const planos = await this.planoService.getAllPlanosByUnidade(unidadeId);
      return res.json(planos);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Atualiza um plano de aula existente pelo ID.
   * Método: PUT
   * Params: id - ID do plano
   * Body: Dados a serem atualizados
   * Retorna: 200 + plano atualizado
   */
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const plano = await this.planoService.updatePlanoAula(id, req.body);
      return res.json(plano);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Deleta um plano de aula pelo ID.
   * Método: DELETE
   * Params: id - ID do plano
   * Retorna: 204 No Content
   */
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await this.planoService.deletePlanoAula(id);
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
