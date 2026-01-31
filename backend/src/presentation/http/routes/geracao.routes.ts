import { Router } from "express";
import { GerarPlanoAulaController } from "../../../core/controllers/IAcontroller/GerarPlanoAulaController";
import { GerarAtividadeController } from "../../../core/controllers/IAcontroller/GerarAtividadeController";
import { GerarSlidesController } from "../../../core/controllers/IAcontroller/GerarSlidesController";
import { GerarSugestaoController } from "../../../core/controllers/IAcontroller/GerarSugestaoController";

/**
 * Define as rotas relacionadas à geração de conteúdo via IA.
 * @param controllers - Objeto contendo os controllers de geração
 * @returns Router configurado com as rotas de geração
 */
export function geracaoRoutes(controllers: {plano: GerarPlanoAulaController;atividade: GerarAtividadeController;slides: GerarSlidesController;sugestao: GerarSugestaoController;}) {
  const router = Router();

  /**
   * Gera um plano de aula para a unidade
   * POST /geracao/plano/:unidadeId
   */
  router.post("/plano/:unidadeId", controllers.plano.gerar);

  /**
   * Gera uma atividade para a unidade
   * POST /geracao/atividade/:unidadeId
   */
  router.post("/atividade/:unidadeId", controllers.atividade.gerar);

  /**
   * Gera slides para a unidade
   * POST /geracao/slides/:unidadeId
   */
  router.post("/slides/:unidadeId", controllers.slides.gerar);

  /**
   * Gera sugestões pedagógicas para a unidade
   * POST /geracao/sugestao/:unidadeId
   */
  router.post("/sugestao/:unidadeId", controllers.sugestao.gerar);

  return router;
}
