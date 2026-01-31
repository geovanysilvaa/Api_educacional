import { Request, Response, NextFunction } from "express";
import { GerarAtividadeService } from "../../service/geracao/GerarAtividadeService";

/**
 * Controller responsável por gerar atividades.
 * Ele recebe a requisição, chama o serviço e devolve a resposta.
 */
export class GerarAtividadeController {
  /**
   * @param service - Instância do serviço GerarAtividadeService
   */
  constructor(private service: GerarAtividadeService) {}

  /**
   * Método que gera uma atividade para uma unidade específica.
   *
   * @param req - Objeto da requisição do Express
   * @param req.params.unidadeId - ID da unidade para gerar a atividade
   * @param res - Objeto da resposta do Express
   * @param next - Função para passar erros para o middleware de tratamento
   *
   * @returns 200 com o resultado da geração em JSON
   * @throws Passa o erro para o middleware caso ocorra algum problema
   */
  gerar = async (req: Request, res: Response, next: NextFunction) => {
    const unidadeId = Number(req.params.unidadeId);
    try {    
      const resultado = await this.service.executar(unidadeId);
      res.status(200).json({ resultado });
    } catch (err) {
      next(err);
    }
  };
}
