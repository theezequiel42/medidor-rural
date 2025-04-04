-- CreateTable
CREATE TABLE "Leitura" (
    "id" TEXT NOT NULL,
    "valorM3" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "moradorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Leitura_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Leitura" ADD CONSTRAINT "Leitura_moradorId_fkey" FOREIGN KEY ("moradorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
