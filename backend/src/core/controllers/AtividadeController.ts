import { Request, Response, NextFunction } from "express";
import { AtividadeService } from "../service/AtividadeService";
import { IAtividadeService } from "../interfaces/IAtividade";

/**
 * Controller responsável por gerenciar atividades.
 * Recebe requisições HTTP, chama o serviço correspondente
 * e retorna respostas para o cliente.
 */
export class AtividadeController {
  private atividadeService: IAtividadeService;

  /**
   * Cria uma instância do controller de atividades.
   * @param atividadeService - Serviço de atividades (injeção de dependência opcional)
   */
  constructor(atividadeService?: IAtividadeService) {
    this.atividadeService = atividadeService ?? new AtividadeService();
  }

  /**
   * Cria uma nova atividade.
   * @param req.body - Objeto com dados da atividade
   * @returns 201 e a atividade criada em JSON
   */
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const atividade = await this.atividadeService.createAtividade(req.body);
      return res.status(201).json(atividade);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Busca uma atividade pelo seu ID.
   * @param req.params.id - ID da atividade
   * @returns 200 e a atividade encontrada em JSON
   */
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const atividade = await this.atividadeService.getAtividadeById(id);
      return res.json(atividade);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Busca todas as atividades de uma unidade específica.
   * @param req.params.unidadeId - ID da unidade
   * @returns 200 e lista de atividades em JSON
   */
  getAllByUnidade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const unidadeId = Number(req.params.unidadeId);
      const atividades =
        await this.atividadeService.getAllAtividadesByUnidade(unidadeId);

      return res.json(atividades);
    } catch (err) {
      next(err);
    }
  };


    list = async (req:Request,res:Response,next:NextFunction) => {
     try {
      const atividade = await this.atividadeService.list();
      return res.json(atividade);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Atualiza uma atividade existente.
   * @param req.params.id - ID da atividade a ser atualizada
   * @param req.body - Dados atualizados da atividade
   * @returns 200 e a atividade atualizada em JSON
   */
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const atividade = await this.atividadeService.updateAtividade(
        id,
        req.body
      );
      return res.json(atividade);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Deleta uma atividade pelo seu ID.
   * @param req.params.id - ID da atividade
   * @returns 204 No Content se deletado com sucesso
   */
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await this.atividadeService.deleteAtividade(id);
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
