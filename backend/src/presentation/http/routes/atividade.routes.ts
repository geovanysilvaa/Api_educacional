import { Router } from "express";
import { AtividadeController } from "../../../core/controllers/AtividadeController";

/**
 * Define as rotas relacionadas a atividades.
 * @param controller - Controller responsável pelas operações de atividades
 * @returns Router configurado com as rotas de atividades
 */
export function atividadeRoutes(controller: AtividadeController) {
    const router = Router();

    /**
     * Cria uma nova atividade.
     * Método: POST
     * Body: Objeto com dados da atividade
     * Retorna: 201 + atividade criada
     */
    router.post("/", controller.create);

    /**
     * Busca uma atividade pelo ID.
     * Método: GET
     * Params: id - ID da atividade
     * Retorna: 200 + atividade encontrada
     */
    router.get("/:id", controller.getById);

    /**
     * Lista todas as atividades de uma unidade específica.
     * Método: GET
     * Params: unidadeId - ID da unidade
     * Retorna: 200 + array de atividades
     */
    router.get("/unidade/:unidadeId", controller.getAllByUnidade);


    router.get("/",controller.list);

    /**
     * Atualiza uma atividade existente pelo ID.
     * Método: PUT
     * Params: id - ID da atividade
     * Body: Dados a serem atualizados
     * Retorna: 200 + atividade atualizada
     */
    router.put("/:id", controller.update);

    /**
     * Deleta uma atividade pelo ID.
     * Método: DELETE
     * Params: id - ID da atividade
     * Retorna: 204 No Content
     */
    router.delete("/:id", controller.delete);

    return router;
}
