import { Router } from "express";
import { DisciplinaController } from "../../../core/controllers/DisciplinaController";

/**
 * Define as rotas relacionadas a disciplinas.
 * @param controller - Controller responsável pelas operações de disciplinas
 * @returns Router configurado com as rotas de disciplinas
 */
export function disciplinaRoutes(controller: DisciplinaController) {

    const router = Router();

    /**
     * Cria uma nova disciplina.
     * Método: POST
     * Body: Objeto com dados da disciplina
     * Retorna: 201 + disciplina criada
     */
    router.post("/", controller.create);

    /**
     * Lista todas as disciplinas.
     * Método: GET
     * Retorna: 200 + array com todas as disciplinas
     */
    router.get("/", controller.getAll);

    /**
     * Busca uma disciplina pelo ID.
     * Método: GET
     * Params: id - ID da disciplina
     * Retorna: 200 + disciplina encontrada
     */
    router.get("/:id", controller.getById);

    /**
     * Atualiza uma disciplina existente pelo ID.
     * Método: PUT
     * Params: id - ID da disciplina
     * Body: Dados a serem atualizados
     * Retorna: 200 + disciplina atualizada
     */
    router.put("/:id", controller.update);

    /**
     * Deleta uma disciplina pelo ID.
     * Método: DELETE
     * Params: id - ID da disciplina
     * Retorna: 204 No Content
     */
    router.delete("/:id", controller.delete);

    return router;
}
