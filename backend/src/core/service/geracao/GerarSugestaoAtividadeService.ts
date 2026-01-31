import { UnidadeRepository } from "../../repository/UnidadeRepository";
import { LogGeracaoIARepository } from "../../repository/LogGeracaoIARepository";
import { IAClient } from "../ia/IAClient";
import { ModelosIA } from "../ia/ModelasIA";

/**
 * Calcula quantas gerações de IA ainda podem ser feitas com o saldo disponível.
 * @param saldoAtual - Valor monetário disponível na API
 * @param custoPorSugestao - Custo estimado por geração de sugestão
 * @returns Número inteiro de gerações restantes
 */
function calcularGeracoesRestantes(saldoAtual: number, custoPorSugestao = 0.000456): number {
    return Math.floor(saldoAtual / custoPorSugestao);
}

/**
 * Serviço responsável por gerar sugestões pedagógicas para uma unidade.
 * Utiliza IA externa e registra logs da geração.
 */
export class GerarSugestaoAtividadeService {
    /**
     * @param unidadeRepo - Repositório para buscar dados da unidade
     * @param logRepo - Repositório para registrar logs de gerações da IA
     * @param iaClient - Cliente para chamar a IA externa
     */
    constructor(private unidadeRepo: UnidadeRepository, private logRepo: LogGeracaoIARepository, private iaClient: IAClient) { }

    /**
     * Executa a geração da sugestão pedagógica para uma unidade específica.
     * @param unidadeId - ID da unidade
     * @returns Objeto contendo a sugestão gerada e o número de gerações restantes
     * @throws Erro se a unidade não for encontrada ou se houver falha na IA
     */
    async executar(unidadeId: number) {
     
        const unidade = await this.unidadeRepo.findById(unidadeId);
        if (!unidade) throw new Error("Unidade não encontrada");
    
        const prompt = `
Você é um pedagogo especialista.

Sugira melhorias pedagógicas para a unidade abaixo:

Disciplina (ID): ${unidade.disciplinaId}
Série/Ano: ${unidade.serieAno}
Tema da unidade: ${unidade.tema}

Inclua:
- Estratégias ativas
- Sugestões de metodologias
- Possíveis adaptações para diferentes níveis
`;

        const respostaIA = await this.iaClient.gerarTexto(ModelosIA.SUGESTAO, prompt);

        await this.logRepo.create({
            unidadeId: unidade.id,
            tipoGeracao: "SUGESTAO",
            promptUsado: prompt,
            respostaBruta: respostaIA,
            evidenciasRecuperadas: [] // opcional, pode ser usado futuramente
        });

        // Simula saldo de API e calcula quantas gerações ainda são possíveis
        const saldoAPI = 5; // $5 de crédito restante (exemplo)
        const geracoesRestantes = calcularGeracoesRestantes(saldoAPI);

        return { sugestao: respostaIA, geracoesRestantes };
    }
}
