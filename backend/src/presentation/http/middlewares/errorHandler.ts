import { NextFunction, Request, Response } from "express";

/**
 * Middleware de tratamento de erros.
 * Intercepta erros lançados nas rotas e retorna uma resposta adequada.
 * 
 * @param err - O erro capturado
 * @param _req - Objeto da requisição (não utilizado)
 * @param res - Objeto da resposta, usado para enviar o status e a mensagem
 * @param _next - Próximo middleware (não utilizado)
 * 
 * Retorno:
 * - 400 Bad Request com mensagem do erro, se o erro for instância de Error
 * - 500 Internal Server Error com mensagem genérica caso contrário
 */
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof Error) {
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({ message: "Unexpected error" });
}
