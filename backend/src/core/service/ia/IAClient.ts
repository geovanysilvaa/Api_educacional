import axios from "axios";
import { ModelosIA } from "./ModelasIA";

/**
 * Cliente para comunicação com a API de IA (OpenRouter).
 * Encapsula chamadas HTTP e fornece métodos para gerar textos.
 */
export class IAClient {
  /**
   * Instância do axios configurada com baseURL e headers.
   */
  private client = axios.create({
    baseURL: "https://openrouter.ai/api/v1",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  /**
   * Gera um texto usando a IA.
   *
   * @param model - Modelo de IA a ser usado
   * @param prompt - Texto de entrada que orienta a IA
   * @param temperature - Grau de criatividade/resposta (0 a 1), padrão 0.7
   * @returns Texto gerado pela IA
   * @throws Lança erro se houver falha na comunicação ou na resposta da IA
   */
  async gerarTexto(model: ModelosIA, prompt: string, temperature = 0.7): Promise<string> {
    try {
      console.log("Enviando para IA:", { model, prompt, temperature });

      const response = await this.client.post("/chat/completions", {
        model,
        messages: [
          { role: "system", content: "Você é um especialista em educação." },
          { role: "user", content: prompt },
        ],
        temperature,
      });

      console.log("Resposta da IA:", response.data);

      return response.data.choices[0].message.content;
    } catch (err: any) {
      console.error(
        "Erro completo da API IA:",
        err.response?.data || err.message || err
      );

      throw new Error("Erro ao gerar texto na IA. Verifique os logs do servidor.");
    }
  }
}
