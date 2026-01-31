import { Request, Response, NextFunction } from "express";
import { LogGeracaoIAService } from "../service/LogGeracaoIAService";
import { ILogGeracaoIAService } from "../interfaces/ILogdeGeracaooIA";

/**
 * Controller responsável por gerenciar logs de geração de IA.
 * Recebe requisições HTTP, chama os métodos do serviço e retorna respostas apropriadas.
 */
export class LogGeracaoIAController {
  private logService: ILogGeracaoIAService;

  /**
   * Cria uma instância do controller de logs de geração de IA.
   * @param logService - Serviço de logs (injeção de dependência opcional)
   */
  constructor(logService?: ILogGeracaoIAService) {
    this.logService = logService ?? new LogGeracaoIAService();
  }

  /**
   * Cria um novo log de geração de IA.
   * Método: POST
   * Body: Objeto contendo informações do log
   * Retorna: 201 + log criado
   */
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const log = await this.logService.createLog(req.body);
      return res.status(201).json(log);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Busca um log pelo seu ID.
   * Método: GET
   * Params: id - ID do log
   * Retorna: 200 + log encontrado
   */
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const log = await this.logService.getLogById(id);
      return res.json(log);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Lista todos os logs de uma unidade específica.
   * Método: GET
   * Params: unidadeId - ID da unidade
   * Retorna: 200 + array de logs da unidade
   */
  getAllByUnidade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const unidadeId = Number(req.params.unidadeId);
      const logs = await this.logService.getAllLogsByUnidade(unidadeId);
      return res.json(logs);
    } catch (err) {
      next(err);
    }
  };
}
