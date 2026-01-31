# Docentis – Backend API

API REST responsável pelo gerenciamento educacional e pela geração de conteúdo com IA.  
Fornece endpoints para CRUD de entidades educacionais e geração automática de conteúdos pedagógicos utilizando a OpenRouter API.

---

## 📌 Funcionalidades da API

- CRUD de:
  - Disciplinas
  - Unidades
  - Planos de aula
  - Atividades
- Geração de conteúdo com IA:
  - Plano de aula
  - Atividades
  - Slides
  - Sugestões pedagógicas
- Registro de logs de todas as gerações de IA
- Persistência de dados com PostgreSQL
- Arquitetura em camadas (Controller / Service / Repository)

---

## 🛠️ Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- OpenRouter API
- dotenv
- cors
- bcryptjs

---

📂 Estrutura da API

src/
├── core/

│   ├── controllers/       # Controllers HTTP (rotas e endpoints)

│   │   └── IAController/  # Controller específico de IA

│   ├── services/          # Regras de negócio

│   │   ├── geracao/       # Serviços de geração

│   │   └── ia/            # Serviços de IA

│   ├── repository/        # Acesso ao banco (Prisma)

│   └── models/            # Modelos e DTOs

│
├── presentation/

│   └── http/

│       ├── routes/        # Rotas da 

│       ├── middlewares/   # Middlewares globais

│       └── server.ts      # Inicialização do servidor

│
├── prisma/

│   └── schema.prisma       # Schema do banco


---

## 🧩 Arquitetura

A API segue uma **arquitetura em camadas**, garantindo separação de responsabilidades.

### Controllers
- Recebem requisições HTTP
- Validam parâmetros
- Delegam regras de negócio para os services
- Retornam respostas padronizadas

### Services
- Contêm a lógica de negócio
- Orquestram geração de conteúdo com IA
- Criam registros no banco
- Gerenciam logs de geração

### Repositories
- Isolam o acesso ao banco de dados
- Implementados com Prisma ORM

---

## 🤖 Integração com IA

A comunicação com modelos de linguagem é centralizada em um cliente dedicado.

**Arquivo:** `IAClient.ts`

Responsabilidades:
- Enviar prompts para a OpenRouter API
- Receber e tratar respostas
- Padronizar chamadas aos modelos

Exemplo:

```ts
await iaClient.gerarTexto(ModelosIA.PLANO, prompt)

🤖 Modelos de IA

Os modelos utilizados são definidos via enum para facilitar manutenção:

export enum ModelosIA {
  PLANO = "openai/gpt-4o-mini",
  ATIVIDADE = "openai/gpt-4o-mini",
  SLIDES = "openai/gpt-4o-mini",
  SUGESTAO = "openai/gpt-4o-mini"
}
```
---

## 🔌 Endpoints de Geração de IA

Base da rota:

/gerar-ia

Método	Endpoint	Descrição
POST	/plano/:unidadeId	Gera plano de aula
POST	/atividade/:unidadeId	Gera atividades
POST	/slides/:unidadeId	Gera slides
POST	/sugestao/:unidadeId	Gera sugestões pedagógicas

---

## 📝 Logs de Geração de IA

Todas as gerações são registradas automaticamente.

- Dados armazenados:
- Prompt utilizado
- Resposta bruta da IA
- Tipo de geração
- Unidade relacionada
- Data e hora

---

## Tabela principal:

LogGeracaoIA

## 🗃️ Principais Entidades

- Disciplina
- Unidade
- PlanoAula
- Atividade
- LogGeracaoIA
- BNCC
- Tags

- Relacionamentos definidos no schema.prisma.

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto:

- DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_banco"

- OPENROUTER_API_KEY="sk-or-xxxxxxxxxxxxxxxx"
PORT=3000

---

## ⚠️ Nunca versionar o arquivo .env.

## 📦 Scripts
npm run dev     # Executa em desenvolvimento
npm run build   # Compila o projeto
npm start       # Executa o build

---

## 🚀 Executando a API banco de dados
npm install
npx prisma generate
npx prisma migrate dev


Servidor disponível em:

http://localhost:3000

---

## 🔐 Tratamento de Erros

- Middleware global de erros
- Respostas HTTP padronizadas
- Tratamento de erros do Prisma
- Validação básica de parâmetros


- Obrigado por visitar :)
