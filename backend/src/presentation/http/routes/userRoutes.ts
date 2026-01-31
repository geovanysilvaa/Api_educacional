import { Router } from "express";
import { UserController } from "../../../core/controllers/UserController";

/**
 * Define as rotas relacionadas aos usuários.
 * @param controller - Controller responsável pelas operações de usuários
 * @returns Router configurado com as rotas de usuários
 */
export function userRoutes(controller: UserController) {

    const router = Router();

    /**
     * Login de um usuário.
     * Método: POST
     * Body: Objeto contendo email e senha
     * Retorna: 200 + dados do usuário e token de autenticação
     */
    router.post("/login", controller.login);

    /**
     * Cria um novo usuário.
     * Método: POST
     * Body: Objeto contendo dados do usuário (nome, email, senha, etc.)
     * Retorna: 201 + usuário criado
     */
    router.post("/create", controller.create);

    /**
     * Lista todos os usuários.
     * Método: GET
     * Retorna: 200 + array com todos os usuários
     */
    router.get("/", controller.getAll);

    /**
     * Busca um usuário pelo ID.
     * Método: GET
     * Params: id - ID do usuário
     * Retorna: 200 + usuário encontrado
     */
    router.get("/:id", controller.getById);

    /**
     * Atualiza um usuário existente pelo ID.
     * Método: PUT
     * Params: id - ID do usuário
     * Body: Dados a serem atualizados
     * Retorna: 200 + usuário atualizado
     */
    router.put("/:id", controller.update);

    /**
     * Deleta um usuário pelo ID.
     * Método: DELETE
     * Params: id - ID do usuário
     * Retorna: 204 No Content
     */
    router.delete("/:id", controller.delete);

    return router;
}
