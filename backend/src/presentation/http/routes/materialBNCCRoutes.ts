import { Router } from "express";
import { MaterialBNCCController } from "../../../core/controllers/MaterialBNCCController";

/**
 * Define as rotas relacionadas à associação entre Materiais e BNCC.
 * @param materialBNCCController - Controller responsável pelas operações de Material-BNCC
 * @returns Router configurado com as rotas de Material-BNCC
 */
export function materialBNCCRoutes(materialBNCCController: MaterialBNCCController) {

  const router = Router();

  /**
   * Cria uma nova associação entre Material e BNCC.
   * Método: POST
   * Body: Objeto com dados da associação
   * Retorna: 201 + associação criada
   */
  router.post("/", materialBNCCController.create);

  /**
   * Lista todas as associações de um material específico.
   * Método: GET
   * Params: materialId - ID do material
   * Retorna: 200 + array de associações do material
   */
  router.get("/by-material/:materialId", materialBNCCController.findAllByMaterial);

  /**
   * Lista todas as associações de uma BNCC específica.
   * Método: GET
   * Params: bnccId - ID da BNCC
   * Retorna: 200 + array de associações da BNCC
   */
  router.get("/by-bncc/:bnccId", materialBNCCController.findAllByBNCC);

  /**
   * Remove uma associação entre Material e BNCC pelo ID.
   * Método: DELETE
   * Params: id - ID da associação
   * Retorna: 204 No Content
   */
  router.delete("/:id", materialBNCCController.delete);

  return router;
}
