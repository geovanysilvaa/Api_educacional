// GerarPlanoAulaController.ts
import { NextFunction, Request, Response } from "express";
import { GerarPlanoAulaService } from "../../service/geracao/GerarPlanoAulaService";

/**
 * Controller responsável por gerar planos de aula.
 * Recebe a requisição, chama o serviço e retorna o resultado.
 */
export class GerarPlanoAulaController {
  /**
   * @param service - Instância do serviço GerarPlanoAulaService
   */
  constructor(private service: GerarPlanoAulaService) {}

  /**
   * Gera um plano de aula para uma unidade específica.
   *
   * @param req - Objeto da requisição do Express
   * @param req.params.unidadeId - ID da unidade para gerar o plano de aula
   * @param res - Objeto da resposta do Express
   * @param next - Função para passar erros para o middleware de tratamento
   *
   * @returns 201 com o plano de aula em JSON
   * @throws Passa o erro para o middleware caso ocorra algum problema
   */
  gerar = async (req: Request, res: Response, next: NextFunction) => {
    const unidadeId = Number(req.params.unidadeId);
    try {
      const plano = await this.service.executar(unidadeId);
      res.status(201).json(plano);
    } catch (err) {
      next(err);
    }
  };
}
