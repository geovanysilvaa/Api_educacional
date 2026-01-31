import { Router } from "express";
import { LogGeracaoIAController } from "../../../core/controllers/LogGeracaoIAController";

/**
 * Define as rotas relacionadas aos logs de geração de IA.
 * @param controller - Controller responsável pelas operações de logs de geração de IA
 * @returns Router configurado com as rotas de logs
 */
export function logGeracaoIARoutes(controller: LogGeracaoIAController) {

    const router = Router();

    /**
     * Cria um novo log de geração de IA.
     * Método: POST
     * Body: Objeto contendo informações do log
     * Retorna: 201 + log criado
     */
    router.post("/", controller.create);

    /**
     * Busca um log pelo seu ID.
     * Método: GET
     * Params: id - ID do log
     * Retorna: 200 + log encontrado
     */
    router.get("/:id", controller.getById);

    /**
     * Lista todos os logs de uma unidade específica.
     * Método: GET
     * Params: unidadeId - ID da unidade
     * Retorna: 200 + array de logs da unidade
     */
    router.get("/unidade/:unidadeId", controller.getAllByUnidade);

    return router;
}
