import { Router } from "express";
import { BNCCController } from "../../../core/controllers/BNCCController";

/**
 * Define as rotas relacionadas à BNCC (Base Nacional Comum Curricular).
 * @param bnccController - Controller responsável pelas operações da BNCC
 * @returns Router configurado com as rotas da BNCC
 */
export function bnccRoutes(bnccController: BNCCController) {

    const router = Router();

    /**
     * Cria um novo registro da BNCC.
     * Método: POST
     * Body: Objeto com dados da BNCC
     * Retorna: 201 + registro criado
     */
    router.post("/", bnccController.create);

    /**
     * Lista todos os registros da BNCC.
     * Método: GET
     * Retorna: 200 + array com todos os registros
     */
    router.get("/", bnccController.getAll);

    /**
     * Busca um registro da BNCC pelo ID.
     * Método: GET
     * Params: id - ID do registro da BNCC
     * Retorna: 200 + registro encontrado
     */
    router.get("/:id", bnccController.getById);

    /**
     * Atualiza um registro da BNCC pelo ID.
     * Método: PUT
     * Params: id - ID do registro
     * Body: Dados a serem atualizados
     * Retorna: 200 + registro atualizado
     */
    router.put("/:id", bnccController.update);

    /**
     * Deleta um registro da BNCC pelo ID.
     * Método: DELETE
     * Params: id - ID do registro
     * Retorna: 204 No Content
     */
    router.delete("/:id", bnccController.delete);

    return router;
}
