import { Request, Response, NextFunction } from "express";
import { UnidadeService } from "../service/UnidadeService";
import { IUnidadeService } from "../interfaces/IUnidade";

/**
 * Controller responsável por gerenciar unidades.
 * Recebe requisições HTTP, chama os métodos do serviço e retorna respostas apropriadas.
 */
export class UnidadeController {
  private unidadeService: IUnidadeService;

  /**
   * Cria uma instância do controller de unidades.
   * @param unidadeService - Serviço de unidades (injeção de dependência opcional)
   */
  constructor(unidadeService?: IUnidadeService) {
    this.unidadeService = unidadeService ?? new UnidadeService();
  }

  /**
   * Cria uma nova unidade.
   * Método: POST
   * Body: Objeto contendo dados da unidade
   * Retorna: 201 + unidade criada
   */
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const unidade = await this.unidadeService.createUnidade(req.body);
      return res.status(201).json(unidade);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Busca uma unidade pelo ID.
   * Método: GET
   * Params: id - ID da unidade
   * Retorna: 200 + unidade encontrada
   */
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const unidade = await this.unidadeService.getUnidadeById(id);
      return res.json(unidade);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Lista todas as unidades.
   * Método: GET
   * Retorna: 200 + array de unidades
   */
  getAll = async (req: Request, res: Response) => {
    const unidades = await this.unidadeService.getAllUnidades();
    return res.json(unidades);
  };

  /**
   * Lista todas as unidades de uma disciplina específica.
   * Método: GET
   * Params: disciplinaId - ID da disciplina
   * Retorna: 200 + array de unidades da disciplina
   */
  getAllByDisciplina = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const disciplinaId = Number(req.params.disciplinaId);
      const unidades =
        await this.unidadeService.getAllUnidadesByDisciplina(disciplinaId);

      return res.json(unidades);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Atualiza uma unidade pelo ID.
   * Método: PUT
   * Params: id - ID da unidade
   * Body: Dados a serem atualizados
   * Retorna: 200 + unidade atualizada
   */
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const unidade = await this.unidadeService.updateUnidade(id, req.body);
      return res.json(unidade);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Deleta uma unidade pelo ID.
   * Método: DELETE
   * Params: id - ID da unidade
   * Retorna: 204 No Content
   */
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await this.unidadeService.deleteUnidade(id);
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
