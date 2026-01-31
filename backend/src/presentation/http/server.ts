import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";

/**
 * Rotas IA
 */
import { geracaoRoutes } from "./routes/geracao.routes";

/**
 * Controllers IA
 */
import { GerarPlanoAulaController } from "../../core/controllers/IAcontroller/GerarPlanoAulaController";
import { GerarAtividadeController } from "../../core/controllers/IAcontroller/GerarAtividadeController";
import { GerarSlidesController } from "../../core/controllers/IAcontroller/GerarSlidesController";
import { GerarSugestaoController } from "../../core/controllers/IAcontroller/GerarSugestaoController";

/**
 * Services IA
 */
import { GerarPlanoAulaService } from "../../core/service/geracao/GerarPlanoAulaService";
import { GerarAtividadeService } from "../../core/service/geracao/GerarAtividadeService";
import { GerarSlidesService } from "../../core/service/geracao/GerarSlidesService";
import { GerarSugestaoAtividadeService } from "../../core/service/geracao/GerarSugestaoAtividadeService";

/**
 * Repositórios e cliente IA
 */
import { IAClient } from "../../core/service/ia/IAClient";
import { LogGeracaoIARepository } from "../../core/repository/LogGeracaoIARepository";
import { PlanoAulaRepository } from "../../core/repository/PlanoAulaRepository";
import { UnidadeRepository } from "../../core/repository/UnidadeRepository";
import { AtividadeRepository } from "../../core/repository/AtividadeRepository";

/**
 * Instanciando repositórios
 */
const unidadeRepo = new UnidadeRepository();
const planoRepo = new PlanoAulaRepository();
const atividadeRepo = new AtividadeRepository();
const logRepo = new LogGeracaoIARepository();
const iaClient = new IAClient();

/**
 * Instanciando services de IA
 */
const gerarPlanoAulaService = new GerarPlanoAulaService(unidadeRepo, planoRepo, logRepo, iaClient);
const gerarAtividadeService = new GerarAtividadeService(unidadeRepo, atividadeRepo, logRepo, iaClient);
const gerarSlidesService = new GerarSlidesService(unidadeRepo, logRepo, iaClient);
const gerarSugestaoService = new GerarSugestaoAtividadeService(unidadeRepo, logRepo, iaClient);

/**
 * Instanciando controllers de IA
 */
const gerarPlanoAulaController = new GerarPlanoAulaController(gerarPlanoAulaService);
const gerarAtividadeController = new GerarAtividadeController(gerarAtividadeService);
const gerarSlidesController = new GerarSlidesController(gerarSlidesService);
const gerarSugestaoController = new GerarSugestaoController(gerarSugestaoService);

/**
 * Agrupando controllers para rota de geração IA
 */
const gerarIAControllers = {
  plano: gerarPlanoAulaController,
  atividade: gerarAtividadeController,
  slides: gerarSlidesController,
  sugestao: gerarSugestaoController,
};

/**
 * Importando outras rotas e controllers
 */
import { userRoutes } from "./routes/userRoutes";
import { materialRoutes } from "./routes/materialRoutes";
import { bnccRoutes } from "./routes/bnccRoutes";
import { tagRoutes } from "./routes/tagRoutes";
import { materialBNCCRoutes } from "./routes/materialBNCCRoutes";
import { unidadeRoutes } from "./routes/UnidadeRouter";
import { planoRoutes } from "./routes/planoAularoutes";
import { atividadeRoutes } from "./routes/atividade.routes";
import { disciplinaRoutes } from "./routes/disciplinaroutes";
import { logGeracaoIARoutes } from "./routes/logGeracaoIAroutes";

import { UserController } from "../../core/controllers/UserController";
import { UnidadeController } from "../../core/controllers/UnidadeController";
import { TagController } from "../../core/controllers/TagController";
import { PlanoAulaController } from "../../core/controllers/PlanoAulaController";
import { MaterialController } from "../../core/controllers/MaterialController";
import { MaterialBNCCController } from "../../core/controllers/MaterialBNCCController";
import { LogGeracaoIAController } from "../../core/controllers/LogGeracaoIAController";
import { DisciplinaController } from "../../core/controllers/DisciplinaController";
import { BNCCController } from "../../core/controllers/BNCCController";
import { AtividadeController } from "../../core/controllers/AtividadeController";

import { UserService } from "../../core/service/UserService";
import { UnidadeService } from "../../core/service/UnidadeService";
import { TagService } from "../../core/service/TagService";
import { PlanoAulaService } from "../../core/service/PlanoAulaService";
import { MaterialService } from "../../core/service/MaterialService";
import { MaterialBNCCService } from "../../core/service/MaterialBNCCService";
import { LogGeracaoIAService } from "../../core/service/LogGeracaoIAService";
import { DisciplinaService } from "../../core/service/DisciplinaService";
import { BNCCService } from "../../core/service/BNCCService";
import { AtividadeService } from "../../core/service/AtividadeService";

/**
 * Instanciando services
 */
const userservice = new UserService();
const userunidade = new UnidadeService();
const usertag = new TagService();
const planoaula = new PlanoAulaService();
const material = new MaterialService();
const materialbncc = new MaterialBNCCService();
const loggeracaoia = new LogGeracaoIAService();
const disciplinaservice = new DisciplinaService();
const bnccservice = new BNCCService();
const atividadeservice = new AtividadeService();

/**
 * Instanciando controllers
 */
const usercontroller = new UserController(userservice);
const unidadecontroller = new UnidadeController(userunidade);
const tagcontroller = new TagController(usertag);
const planoaulacontroller = new PlanoAulaController(planoaula);
const materialcontroller = new MaterialController(material);
const materialbncccontroller = new MaterialBNCCController(materialbncc);
const loggeracaocontroller = new LogGeracaoIAController(loggeracaoia);
const disciplinacontroller = new DisciplinaController(disciplinaservice);
const bnccontroller = new BNCCController(bnccservice);
const atividadecontroller = new AtividadeController(atividadeservice);

/**
 * Configuração do servidor Express
 */
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

/**
 * Registro das rotas
 */
app.use("/users", userRoutes(usercontroller));
app.use("/materials", materialRoutes(materialcontroller));
app.use("/bncc", bnccRoutes(bnccontroller));
app.use("/tags", tagRoutes(tagcontroller));
app.use("/material-bncc", materialBNCCRoutes(materialbncccontroller));
app.use("/unidades", unidadeRoutes(unidadecontroller));
app.use("/planos", planoRoutes(planoaulacontroller));
app.use("/atividades", atividadeRoutes(atividadecontroller));
app.use("/disciplinas", disciplinaRoutes(disciplinacontroller));
app.use("/logs-ia", logGeracaoIARoutes(loggeracaocontroller));

/**
 * Rotas IA
 */
app.use("/gerar-ia", geracaoRoutes(gerarIAControllers));

/**
 * Middleware de tratamento de erros
 */
app.use(errorHandler);

/**
 * Inicialização do servidor
 */
const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
