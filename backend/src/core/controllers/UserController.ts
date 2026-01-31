import { Request, Response, NextFunction } from "express";
import { UserService } from "../service/UserService";
import { IUserService } from "../interfaces/IUserService";
import { LoginUserDTO } from "../models/DTOs";

/**
 * Controller responsável por gerenciar usuários.
 * Recebe requisições HTTP, chama os métodos do serviço e retorna respostas apropriadas.
 */
export class UserController {
  private userService: IUserService;

  /**
   * Cria uma instância do controller de usuários.
   * @param userService - Serviço de usuários (injeção de dependência opcional)
   */
  constructor(userService?: IUserService) {
    this.userService = userService ?? new UserService();
  }

  /**
   * Realiza login de um usuário.
   * Método: POST
   * Body: { email: string, password: string }
   * Retorna: 200 + dados do usuário e token
   */
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: LoginUserDTO = req.body;
      const user = await this.userService.login(data);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Cria um novo usuário.
   * Método: POST
   * Body: Objeto contendo dados do usuário
   * Retorna: 201 + usuário criado
   */
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Busca um usuário pelo ID.
   * Método: GET
   * Params: id - ID do usuário
   * Retorna: 200 + usuário encontrado
   */
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.getUserById(id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Lista todos os usuários.
   * Método: GET
   * Retorna: 200 + array de usuários
   */
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Atualiza um usuário pelo ID.
   * Método: PUT
   * Params: id - ID do usuário
   * Body: Dados a serem atualizados
   * Retorna: 200 + usuário atualizado
   */
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const updated = await this.userService.updateUser(id, req.body);
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  };

  /**
   * Deleta um usuário pelo ID.
   * Método: DELETE
   * Params: id - ID do usuário
   * Retorna: 204 No Content
   */
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await this.userService.deleteUser(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
