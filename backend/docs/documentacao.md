# Especificação de Requisitos de Software (SRS) - Plataforma Educacional Backend

**Versão:** 1.1  
**Data:** 30/01/2026  
**Status:** Atualizado / Integrado com IA

---

## 1. Introdução

### 1.1 Propósito
Este documento define os requisitos funcionais, não-funcionais e regras de negócio para o backend da Plataforma Educacional Docentis.  
O backend fornece APIs REST para gerenciamento educacional e geração de conteúdo pedagógico via IA, garantindo consistência e rastreabilidade de dados.

### 1.2 Escopo do Produto
O backend permite:

- Gestão completa de usuários, disciplinas, unidades, planos de aula, atividades, materiais, tags e BNCC.  
- Registro e consulta de logs de geração de conteúdo via IA (OpenRouter).  
- Geração de conteúdos pedagógicos automatizados: planos de aula, atividades, slides e sugestões pedagógicas.  
- Filtragem avançada de materiais e conteúdos por usuário, tag, BNCC ou série/ano.  
- Funcionalidade RESTful com respostas JSON consistentes.

### 1.3 Definições e Acrônimos
- **DTO (Data Transfer Object):** Objeto usado para transporte de dados entre camadas.  
- **Repository:** Camada de acesso ao banco de dados.  
- **Service:** Camada de regras de negócio.  
- **Controller:** Camada que recebe requisições HTTP e chama os services.  
- **BNCC:** Base Nacional Comum Curricular.  
- **PlanoAula:** Planejamento de uma unidade curricular.  
- **LogGeracaoIA:** Registro de conteúdos gerados via IA.  
- **OpenRouter API:** Serviço de modelos de linguagem para geração de textos (IA).

---

## 2. Requisitos Funcionais (RF)

| ID | Descrição | Critérios de Aceitação | Prioridade |
|:---|:---|:---|:---|
| RF001 | Cadastro de Usuário | Criar, listar, atualizar e deletar usuários com validação de email único | Alta |
| RF002 | Gestão de Disciplinas | CRUD completo de disciplinas | Alta |
| RF003 | Gestão de Unidades | CRUD de unidades vinculadas a disciplinas | Alta |
| RF004 | Gestão de Planos de Aula | CRUD de planos de aula vinculados a unidades | Alta |
| RF005 | Gestão de Atividades | CRUD de atividades vinculadas a unidades | Média |
| RF006 | Gestão de Materiais | CRUD de materiais com tags e referências BNCC | Alta |
| RF007 | Gestão de Tags | CRUD de tags | Média |
| RF008 | Gestão de BNCC | CRUD de referências BNCC | Alta |
| RF009 | Consulta de Materiais | Buscar materiais por usuário, tag, BNCC ou série | Alta |
| RF010 | Filtragem de Conteúdos | Filtros aplicáveis em materiais, planos e atividades | Média |
| RF011 | Logs de Geração IA | Registrar e consultar logs de conteúdos gerados via IA | Média |
| RF012 | Geração de Conteúdo IA | Gerar planos, atividades, slides e sugestões pedagógicas via OpenRouter | Alta |
| RF013 | Histórico de Conteúdo IA | Consultar respostas anteriores por unidade ou usuário | Média |

---

## 3. Regras de Negócio (RN)

### 3.1 Usuário
- **RN-U01:** Email deve ser único.  
- **RN-U02:** Senha criptografada antes de salvar.  
- **RN-U03:** Role padrão é "PROFESSOR".  
- **RN-U04:** Último administrador não pode ser deletado.

### 3.2 Disciplina
- **RN-D01:** Nome mínimo de 3 caracteres.  
- **RN-D02:** Deletar disciplina remove ou reassocia unidades vinculadas.

### 3.3 Unidade
- **RN-Ud01:** Série/ano válida (1º ao 5º ano ou Ensino Médio).  
- **RN-Ud02:** Duração mínima da unidade: 30 minutos.  
- **RN-Ud03:** Deletar unidade remove planos e atividades associadas.

### 3.4 Material
- **RN-M01:** Tipos válidos: PDF, Texto, Vídeo.  
- **RN-M02:** GradeLevel compatível com série/ano.  
- **RN-M03:** Evitar duplicação de tags e BNCC.  
- **RN-M04:** Ao deletar material, remover associações MaterialTag e MaterialBNCC.

### 3.5 BNCC
- **RN-B01:** Código deve ser único.  
- **RN-B02:** Estágio compatível com série/ano.

### 3.6 Tag
- **RN-T01:** Nome único e não vazio.

### 3.7 Atividade
- **RN-A01:** Deve estar vinculada a unidade existente.  
- **RN-A02:** Tipo compatível com série/ano.

### 3.8 Plano de Aula
- **RN-PA01:** Unidade associada deve existir.  
- **RN-PA02:** Campo textoPlano obrigatório.

### 3.9 Log de Geração IA
- **RN-L01:** Unidade e usuário devem existir.  
- **RN-L02:** Horário registrado automaticamente.  
- **RN-L03:** Evitar duplicação de logs idênticos em curto período.

### 3.10 Geração de Conteúdo IA
- **RN-IA01:** Prompt personalizado enviado para OpenRouter.  
- **RN-IA02:** Resposta da IA registrada em LogGeracaoIA.  
- **RN-IA03:** Histórico de respostas recuperável por unidade.  
- **RN-IA04:** Tipos suportados: PLANO, ATIVIDADE, SLIDES, SUGESTAO.  

---

## 4. Requisitos Não-Funcionais (RNF)

| ID | Categoria | Descrição |
|:---|:---|:---|
| RNF001 | Performance | Respostas <200ms, consultas eficientes |
| RNF002 | Escalabilidade | Arquitetura modular, camada de serviços e repositórios |
| RNF003 | Persistência | PostgreSQL via Prisma ORM |
| RNF004 | Testabilidade | Cobertura de testes unitários e de integração |
| RNF005 | Documentação | UML, README, SRS completo |
| RNF006 | Compatibilidade | Node.js 18+, TypeScript 5+ |
| RNF007 | Robustez | Tratamento consistente de erros e validações |
| RNF008 | Segurança | Senhas criptografadas, validação de dados, logs auditáveis |
| RNF009 | Confiabilidade IA | Resposta da IA persistida e rastreável |

---

## 5. Endpoints da API

### 5.1 Usuários
- GET `/users` — listar usuários  
- POST `/users` — criar usuário  
- PUT `/users/:id` — atualizar usuário  
- DELETE `/users/:id` — deletar usuário  

### 5.2 Disciplinas
- GET `/disciplinas`  
- POST `/disciplinas`  
- PUT `/disciplinas/:id`  
- DELETE `/disciplinas/:id`  

### 5.3 Unidades
- GET `/unidades`  
- POST `/unidades`  
- PUT `/unidades/:id`  
- DELETE `/unidades/:id`  

### 5.4 Planos de Aula
- GET `/planos`  
- POST `/planos`  
- PUT `/planos/:id`  
- DELETE `/planos/:id`  

### 5.5 Atividades
- GET `/atividades`  
- POST `/atividades`  
- PUT `/atividades/:id`  
- DELETE `/atividades/:id`  

### 5.6 Materiais, BNCC, Tags
- CRUD padrão para cada entidade
- Filtros aplicáveis em GET (ex.: por tag, BNCC, série/ano)

### 5.7 Logs de IA
- GET `/logs-ia`  
- POST `/logs-ia`  

### 5.8 Geração de Conteúdo IA
Base `/gerar-ia`:

| Método | Rota | Descrição |
|------|------|----------|
| POST | /plano/:unidadeId | Gera plano de aula |
| POST | /atividade/:unidadeId | Gera atividade |
| POST | /slides/:unidadeId | Gera slides |
| POST | /sugestao/:unidadeId | Gera sugestões pedagógicas |

💡 **Observação:** não precisa body, apenas `unidadeId` na URL.  

---

## 6. Fluxos de Usuário

### 6.1 Criação de Unidade
1. POST `/unidades` com disciplinaId, tema e serieAno  
2. Validação de disciplina existente  
3. Cria unidade e retorna JSON da unidade

### 6.2 Geração de Atividade IA
1. POST `/gerar-ia/atividade/:unidadeId`  
2. Service envia prompt para OpenRouter  
3. Resposta persistida no banco  
4. Log registrado em `LogGeracaoIA`  
5. Retorna objeto da atividade criada

### 6.3 Consulta de Logs IA
1. GET `/logs-ia?unidadeId=&userId=`  
2. Filtra logs existentes e retorna lista paginada

---

## 7. Considerações Técnicas

- **Arquitetura:** Controllers → Services → Repositories → Prisma → PostgreSQL  
- **Tratamento de erros:** Middleware global  
- **Segurança:** Senhas criptografadas, validação de dados  
- **Versionamento:** Git + CI/CD pipelines  
- **Filtros e paginação:** GET endpoints suportam filtros e paginação  
- **IA:** Todos os tipos de conteúdo têm logs, histórico e rastreabilidade  

---

## 8. Sugestões Futuras

- Adicionar autenticação JWT  
- OpenAPI / Swagger para documentação dos endpoints  
- Cache de respostas de IA  
- Rate limit nas rotas de geração de IA  
- Testes unitários e de integração completos  

---

💡 **Docentis Backend** — Inteligência educacional com rastreabilidade e IA integrada.
