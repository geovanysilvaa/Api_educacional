/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `Atividade` table. All the data in the column will be lost.
  - You are about to drop the column `criadoEm` on the `Disciplina` table. All the data in the column will be lost.
  - You are about to drop the column `criadoEm` on the `LogGeracaoIA` table. All the data in the column will be lost.
  - You are about to drop the column `criadoEm` on the `PlanoAula` table. All the data in the column will be lost.
  - You are about to drop the column `criadoEm` on the `Unidade` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Atividade" DROP COLUMN "criadoEm",
ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "BNCC" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Disciplina" DROP COLUMN "criadoEm",
ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "LogGeracaoIA" DROP COLUMN "criadoEm",
ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Material" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "MaterialBNCC" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "MaterialTag" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "PlanoAula" DROP COLUMN "criadoEm",
ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Unidade" DROP COLUMN "criadoEm",
ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ;
