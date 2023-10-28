-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adress" (
    "id_adress" SERIAL NOT NULL,
    "cep" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Adress_pkey" PRIMARY KEY ("id_adress")
);

-- CreateIndex
CREATE UNIQUE INDEX "Adress_clientId_key" ON "Adress"("clientId");

-- AddForeignKey
ALTER TABLE "Adress" ADD CONSTRAINT "Adress_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
