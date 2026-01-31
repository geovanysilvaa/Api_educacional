import { Router } from "express";
import { MaterialController } from "../../../core/controllers/MaterialController";

/**
 * Define as rotas relacionadas aos materiais.
 * @param materialController - Controller responsável pelas operações de materiais
 * @returns Router configurado com as rotas de materiais
 */
export function materialRoutes(materialController: MaterialController) {

    const router = Router();

    /**
     * Cria um novo material.
     * Método: POST
     * Body: Objeto contendo os dados do material
     * Retorna: 201 + material criado
     */
    router.post("/", materialController.create);

    /**
     * Lista todos os materiais.
     * Método: GET
     * Retorna: 200 + array com todos os materiais
     */
    router.get("/", materialController.getAll);

    /**
     * Busca um material pelo ID.
     * Método: GET
     * Params: id - ID do material
     * Retorna: 200 + material encontrado
     */
    router.get("/:id", materialController.getById);

    /**
     * Atualiza um material existente pelo ID.
     * Método: PUT
     * Params: id - ID do material
     * Body: Dados a serem atualizados
     * Retorna: 200 + material atualizado
     */
    router.put("/:id", materialController.update);

    /**
     * Deleta um material pelo ID.
     * Método: DELETE
     * Params: id - ID do material
     * Retorna: 204 No Content
     */
    router.delete("/:id", materialController.delete);

    return router;
}
