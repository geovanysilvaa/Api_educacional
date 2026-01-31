import { Request, Response, NextFunction } from "express";
import { DisciplinaService } from "../service/DisciplinaService";
import { IDisciplinaService } from "../interfaces/IDisciplina";

/**
 * Controller responsável por gerenciar operações de disciplinas.
 * Recebe requisições HTTP, chama os métodos do serviço e retorna respostas apropriadas.
 */
export class DisciplinaController {
  private disciplinaService: IDisciplinaService;

  /**
   * Cria uma instância do controller de disciplinas.
   * @param disciplinaService - Serviço de disciplinas (injeção de dependência opcional)
   */
  constructor(disciplinaService?: IDisciplinaService) {
    this.disciplinaService =
      disciplinaService ?? new DisciplinaService();
  }

  /**
   * Cria uma nova disciplina.
   * Método: POST
   * Body: Objeto contendo os dados da disciplina
   * Retorna: 201 + disciplina criada
   */
  create = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const disciplina = await this.disciplinaService.createDisciplina(req.body);
      return res.status(201).json(disciplina);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Busca uma disciplina pelo ID.
   * Método: GET
   * Params: id - ID da disciplina
   * Retorna: 200 + disciplina encontrada
   */
  getById = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const disciplina = await this.disciplinaService.getDisciplinaById(id);
      return res.json(disciplina);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Lista todas as disciplinas.
   * Método: GET
   * Retorna: 200 + array com todas as disciplinas
   */
  getAll = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const disciplinas = await this.disciplinaService.getAllDisciplinas();
      return res.json(disciplinas);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Atualiza uma disciplina existente pelo ID.
   * Método: PUT
   * Params: id - ID da disciplina
   * Body: Dados a serem atualizados
   * Retorna: 200 + disciplina atualizada
   */
  update = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const disciplina = await this.disciplinaService.updateDisciplina(id, req.body);
      return res.json(disciplina);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Deleta uma disciplina pelo ID.
   * Método: DELETE
   * Params: id - ID da disciplina
   * Retorna: 204 No Content
   */
  delete = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await this.disciplinaService.deleteDisciplina(id);
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
