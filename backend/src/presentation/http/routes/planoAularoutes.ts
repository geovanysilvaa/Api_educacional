import { Router } from "express";
import { PlanoAulaController } from "../../../core/controllers/PlanoAulaController";

/**
 * Define as rotas relacionadas aos Planos de Aula.
 * @param controller - Controller responsável pelas operações de planos de aula
 * @returns Router configurado com as rotas de planos de aula
 */
export function planoRoutes(controller: PlanoAulaController) {
    
    const router = Router();

    /**
     * Cria um novo plano de aula.
     * Método: POST
     * Body: Objeto contendo os dados do plano de aula
     * Retorna: 201 + plano de aula criado
     */
    router.post("/", controller.create);

    /**
     * Busca um plano de aula pelo ID.
     * Método: GET
     * Params: id - ID do plano de aula
     * Retorna: 200 + plano de aula encontrado
     */
    router.get("/:id", controller.getById);

    /**
     * Lista todos os planos de aula.
     * Método: GET
     * Retorna: 200 + plano de aula encontrado
     */
    router.get("/", controller.get);

    /**
     * Lista todos os planos de aula de uma unidade específica.
     * Método: GET
     * Params: unidadeId - ID da unidade
     * Retorna: 200 + array de planos de aula da unidade
     */
    router.get("/unidade/:unidadeId", controller.getAllByUnidade);

    /**
     * Atualiza um plano de aula existente pelo ID.
     * Método: PUT
     * Params: id - ID do plano de aula
     * Body: Dados a serem atualizados
     * Retorna: 200 + plano de aula atualizado
     */
    router.put("/:id", controller.update);

    /**
     * Deleta um plano de aula pelo ID.
     * Método: DELETE
     * Params: id - ID do plano de aula
     * Retorna: 204 No Content
     */
    router.delete("/:id", controller.delete);

    return router;
}
