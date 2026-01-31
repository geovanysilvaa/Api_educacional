# 📘 MANUAL COMPLETO DE TESTES – API DOCENTIS
_Versão final • Organizado • Focado em testes reais_

---

## 🌐 Base URL

http://localhost:3000

### 🔧 Insomnia / Postman – Environment

BASE_URL = http://localhost:3000

---

## ⚠️ BOAS PRÁTICAS ANTES DE TESTAR

- Sempre siga a ordem: **POST → GET → PUT → DELETE**
- ❌ Não invente ID
- ✅ Use o ID retornado no response
- ❌ Não envie `id` no body do PUT
- Teste erros de propósito
- `[]` → não existe dado relacionado
- `null` → relação opcional

---

# 1️⃣ USERS

**Base:** `/users`

### Criar
POST `/users`
```json
{
  "name": "Geo",
  "email": "geo@test.com",
  "password": "123456",
  "role": "PROFESSOR"
}
```
Testar:

Hash da senha

Enum role

Email único

Login
POST /users/login
```json
{
  "email": "geo@test.com",
  "password": "123456"
}
``` 
❌ Senha errada → 401

Listar
GET /users

Buscar por ID
GET /users/1

❌ ID inexistente → 404

Atualizar
PUT /users/1
```json
{
  "name": "Geo Atualizado"
}
```
Deletar
DELETE /users/1

---

## 2️⃣ MATERIAL (LIGADO AO USER)
📌 Material é a ÚNICA entidade ligada diretamente ao User

Base: /materiais

Criar
POST /materiais
```json
{
  "titulo": "Lista de Exercícios",
  "descricao": "Material de apoio",
  "tipo": "PDF",
  "conteudo": "Texto ou link",
  "userId": 1
}
```
❌ userId inexistente → erro

Listar
GET /materiais

Listar por usuário
GET /materiais/user/1

Buscar por ID
GET /materiais/1

Atualizar
PUT /materiais/1
```json
{
  "titulo": "Lista Revisada"
}
``` 
Deletar
DELETE /materiais/1

---

## 3️⃣ TAGS
Base: /tags

Criar
POST /tags
```json
{
  "name": "Matemática"
}
```
❌ Nome duplicado → erro (se unique)

Listar
GET /tags

Atualizar
PUT /tags/1
```json
{
  "name": "Matemática Básica"
}
``` 
Deletar
DELETE /tags/1

---

4️⃣ BNCC
Base: /bncc

Criar
POST /bncc
```json
{
  "code": "EF06MA01",
  "description": "Resolver problemas",
  "stage": "FUNDAMENTAL"
}
```
❌ stage inválido → 400

Listar
GET /bncc

Buscar
GET /bncc/1

Atualizar
PUT /bncc/1
```json
{
  "description": "Resolver equações"
}
``` 
Deletar
DELETE /bncc/1

⚠️ Se estiver vinculada a material → erro esperado

---

## 5️⃣ DISCIPLINAS
Base: /disciplinas

Criar
POST /disciplinas
```json
{
  "nome": "Matemática",
  "descricao": "Base do ensino",
  "seriesAnos": ["6º ano"]
}
```
Listar
GET /disciplinas

Buscar
GET /disciplinas/1

Atualizar
PUT /disciplinas/1
```json
{
  "nome": "Matemática Fundamental"
}
``` 
Deletar
DELETE /disciplinas/1

⚠️ Se existir unidade → erro esperado

---

## 6️⃣ UNIDADES
Base: /unidades

Criar
POST /unidades
```json
{
  "disciplinaId": 1,
  "tema": "Funções",
  "descricao": "Introdução às funções",
  "serieAno": "6º ano",
  "duracao": 4,
  "objetivos": "Entender funções"
}
```
❌ disciplinaId inexistente → erro

Listar
GET /unidades

Por disciplina
GET /unidades/disciplina/1

Buscar por ID
GET /unidades/1

Validar:

planoAula → null ou objeto

atividades → [] ou array

Atualizar
PUT /unidades/1
```json
{
  "tema": "Funções Avançadas"
}
```
Deletar
DELETE /unidades/1

---

## 7️⃣ PLANO DE AULA
📌 Apenas 1 plano por unidade

Base: /planos-aula

Criar
POST /planos-aula
```json
{
  "unidadeId": 1,
  "textoPlano": "Plano detalhado",
  "bnccCompetencias": [
    { "codigo": "EF06MA01", "descricao": "Raciocínio lógico" }
  ],
  "fontes": ["Livro didático"]
}
``` 
Buscar por unidade
GET /planos-aula/unidade/1

Atualizar
PUT /planos-aula/1
```json
{
  "textoPlano": "Plano revisado"
}
```
Deletar
DELETE /planos-aula/1

---

## 8️⃣ ATIVIDADES
Base: /atividades

Criar
POST /atividades
```json
{
  "unidadeId": 1,
  "enunciado": "Resolva as funções",
  "criteriosCorrecao": "Resultado correto",
  "tipo": "ATIVIDADE"
}
```
❌ Tipo inválido → 400

Buscar
GET /atividades/1

Por unidade
GET /atividades/unidade/1

Atualizar
PUT /atividades/1
```json
{
  "tipo": "PROVA"
}
```
Deletar
DELETE /atividades/1

---

## 9️⃣ 🤖 GERAÇÃO COM IA
Base: /gerar-ia

📌 Não recebe body
📌 Usa apenas unidadeId
📌 IA não cria dados estruturais

Gerar Plano
POST /gerar-ia/plano/1

Gerar Atividades
POST /gerar-ia/atividade/1

Gerar Slides
POST /gerar-ia/slides/1

Gerar Sugestões
POST /gerar-ia/sugestao/1

---

## 🔟 LOG DE GERAÇÃO IA
Base: /log-geracao-ia

Buscar por ID
GET /log-geracao-ia/1

Por unidade
GET /log-geracao-ia/unidade/1

Dados salvos:

- Prompt usado
- Resposta da IA
- Tipo
- Unidade
- Data/Hora

## 🔗 REGRAS DE DEPENDÊNCIA
Disciplina
⬇
Unidade
⬇
Plano de Aula
⬇
Atividades

---

User
⬇
Material

---

Unidade
⬇
Log IA

---

🧠 REGRA DE OURO
❌ Nada cria nada automaticamente
✅ Tudo deve existir antes

- Unidade NÃO cria plano
- Unidade NÃO cria atividade
- Material NÃO cria BNCC
- IA NÃO cria estrutura

✅ DICAS FINAIS

- include só retorna o que existe
- Prisma não inventa relação
- [] ≠ erro
- null ≠ erro
- Sempre confira no banco (SELECT)

- obrigado :)