// GerarSugestaoController.ts
import { NextFunction, Request, Response } from "express";
import { GerarSugestaoAtividadeService } from "../../service/geracao/GerarSugestaoAtividadeService";

/**
 * Controller responsável por gerar sugestões de atividades para uma unidade.
 * Recebe a requisição, chama o serviço e retorna a sugestão gerada.
 */
export class GerarSugestaoController {
  /**
   * @param service - Instância do serviço GerarSugestaoAtividadeService
   */
  constructor(private service: GerarSugestaoAtividadeService) {}

  /**
   * Gera uma sugestão de atividade para uma unidade específica.
   *
   * @param req - Objeto da requisição do Express
   * @param req.params.unidadeId - ID da unidade para gerar a sugestão
   * @param res - Objeto da resposta do Express
   * @param next - Função para passar erros para o middleware de tratamento
   *
   * @returns 201 com a sugestão em JSON
   * @throws Passa o erro para o middleware caso ocorra algum problema
   */
  gerar = async (req: Request, res: Response, next: NextFunction) => {
    const unidadeId = Number(req.params.unidadeId);
    try {
      const sugestao = await this.service.executar(unidadeId);
      res.status(201).json({ sugestao });
    } catch (err) {
      next(err);
    }
  };
}
