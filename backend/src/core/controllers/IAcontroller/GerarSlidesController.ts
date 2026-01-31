// GerarSlidesController.ts
import { NextFunction, Request, Response } from "express";
import { GerarSlidesService } from "../../service/geracao/GerarSlidesService";

/**
 * Controller responsável por gerar slides para uma unidade.
 * Recebe a requisição, chama o serviço e retorna os slides gerados.
 */
export class GerarSlidesController {
  /**
   * @param service - Instância do serviço GerarSlidesService
   */
  constructor(private service: GerarSlidesService) {}

  /**
   * Gera slides para uma unidade específica.
   *
   * @param req - Objeto da requisição do Express
   * @param req.params.unidadeId - ID da unidade para gerar os slides
   * @param res - Objeto da resposta do Express
   * @param next - Função para passar erros para o middleware de tratamento
   *
   * @returns 201 com os slides em JSON
   * @throws Passa o erro para o middleware caso ocorra algum problema
   */
  gerar = async (req: Request, res: Response, next: NextFunction) => {
    const unidadeId = Number(req.params.unidadeId);
    try {
      const slides = await this.service.executar(unidadeId);
      res.status(201).json({ slides });
    } catch (err) {
      next(err);
    }
  };
}
