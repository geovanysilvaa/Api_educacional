import { Router } from "express";
import { TagController } from "../../../core/controllers/TagController";

/**
 * Define as rotas relacionadas às tags.
 * @param tagController - Controller responsável pelas operações de tags
 * @returns Router configurado com as rotas de tags
 */
export function tagRoutes(tagController: TagController) {

    const router = Router();

    /**
     * Cria uma nova tag.
     * Método: POST
     * Body: Objeto contendo os dados da tag
     * Retorna: 201 + tag criada
     */
    router.post("/", tagController.create);

    /**
     * Lista todas as tags.
     * Método: GET
     * Retorna: 200 + array com todas as tags
     */
    router.get("/", tagController.findAll);

    /**
     * Busca uma tag pelo ID.
     * Método: GET
     * Params: id - ID da tag
     * Retorna: 200 + tag encontrada
     */
    router.get("/:id", tagController.findById);

    /**
     * Atualiza uma tag existente pelo ID.
     * Método: PUT
     * Params: id - ID da tag
     * Body: Dados a serem atualizados
     * Retorna: 200 + tag atualizada
     */
    router.put("/:id", tagController.update);

    /**
     * Deleta uma tag pelo ID.
     * Método: DELETE
     * Params: id - ID da tag
     * Retorna: 204 No Content
     */
    router.delete("/:id", tagController.delete);

    return router;
}
