import { Router } from "express";
import { UnidadeController } from "../../../core/controllers/UnidadeController";

/**
 * Define as rotas relacionadas às unidades.
 * @param controller - Controller responsável pelas operações de unidades
 * @returns Router configurado com as rotas de unidades
 */
export function unidadeRoutes(controller: UnidadeController) {

    const router = Router();

    /**
     * Cria uma nova unidade.
     * Método: POST
     * Body: Objeto contendo os dados da unidade
     * Retorna: 201 + unidade criada
     */
    router.post("/", controller.create);

    /**
     * Lista todas as unidades de uma disciplina específica.
     * Método: GET
     * Params: disciplinaId - ID da disciplina
     * Retorna: 200 + array de unidades da disciplina
     */
    router.get("/disciplina/:disciplinaId", controller.getAllByDisciplina);

    /**
     * Busca uma unidade pelo ID.
     * Método: GET
     * Params: id - ID da unidade
     * Retorna: 200 + unidade encontrada
     */
    router.get("/:id", controller.getById);

    /**
     * Lista todas as unidades.
     * Método: GET
     * Retorna: 200 + array com todas as unidades
     */
    router.get("/", controller.getAll);

    /**
     * Atualiza uma unidade existente pelo ID.
     * Método: PUT
     * Params: id - ID da unidade
     * Body: Dados a serem atualizados
     * Retorna: 200 + unidade atualizada
     */
    router.put("/:id", controller.update);

    /**
     * Deleta uma unidade pelo ID.
     * Método: DELETE
     * Params: id - ID da unidade
     * Retorna: 204 No Content
     */
    router.delete("/:id", controller.delete);

    return router;
}
