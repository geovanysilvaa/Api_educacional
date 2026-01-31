-- CreateEnum
CREATE TYPE "Stage" AS ENUM ('FUNDAMENTAL', 'MEDIO');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PROFESSOR');

-- CreateEnum
CREATE TYPE "TipoAtividade" AS ENUM ('PROVA', 'TRABALHO', 'ATIVIDADE');

-- CreateEnum
CREATE TYPE "TipoGeracaoIA" AS ENUM ('PLANO', 'ATIVIDADE', 'SLIDES', 'SUGESTAO');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "UserRole" NOT NULL DEFAULT 'PROFESSOR',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BNCC" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stage" "Stage" NOT NULL,

    CONSTRAINT "BNCC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialBNCC" (
    "id" SERIAL NOT NULL,
    "materialId" INTEGER NOT NULL,
    "bnccId" INTEGER NOT NULL,

    CONSTRAINT "MaterialBNCC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialTag" (
    "id" SERIAL NOT NULL,
    "materialId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "MaterialTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "gradeLevel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "seriesAnos" TEXT[],
    "criadoEm" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unidade" (
    "id" SERIAL NOT NULL,
    "disciplinaId" INTEGER NOT NULL,
    "tema" TEXT NOT NULL,
    "descricao" TEXT,
    "serieAno" TEXT NOT NULL,
    "duracao" INTEGER NOT NULL,
    "objetivos" TEXT,
    "criadoEm" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Unidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanoAula" (
    "id" SERIAL NOT NULL,
    "unidadeId" INTEGER NOT NULL,
    "textoPlano" TEXT NOT NULL,
    "bnccCompetencias" JSONB NOT NULL,
    "fontes" TEXT[],
    "criadoEm" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlanoAula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atividade" (
    "id" SERIAL NOT NULL,
    "unidadeId" INTEGER NOT NULL,
    "enunciado" TEXT NOT NULL,
    "criteriosCorrecao" TEXT NOT NULL,
    "tipo" "TipoAtividade" NOT NULL,
    "criadoEm" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Atividade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogGeracaoIA" (
    "id" SERIAL NOT NULL,
    "unidadeId" INTEGER NOT NULL,
    "tipoGeracao" "TipoGeracaoIA" NOT NULL,
    "promptUsado" TEXT NOT NULL,
    "respostaBruta" TEXT NOT NULL,
    "evidenciasRecuperadas" TEXT[],
    "criadoEm" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogGeracaoIA_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BNCC_code_key" ON "BNCC"("code");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialBNCC_materialId_bnccId_key" ON "MaterialBNCC"("materialId", "bnccId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialTag_materialId_tagId_key" ON "MaterialTag"("materialId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "PlanoAula_unidadeId_key" ON "PlanoAula"("unidadeId");

-- AddForeignKey
ALTER TABLE "MaterialBNCC" ADD CONSTRAINT "MaterialBNCC_bnccId_fkey" FOREIGN KEY ("bnccId") REFERENCES "BNCC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialBNCC" ADD CONSTRAINT "MaterialBNCC_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialTag" ADD CONSTRAINT "MaterialTag_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialTag" ADD CONSTRAINT "MaterialTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unidade" ADD CONSTRAINT "Unidade_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanoAula" ADD CONSTRAINT "PlanoAula_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atividade" ADD CONSTRAINT "Atividade_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogGeracaoIA" ADD CONSTRAINT "LogGeracaoIA_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
