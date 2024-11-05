-- CreateTable
CREATE TABLE "HdfcBankTnx" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "webhookUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenExpiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HdfcBankTnx_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HdfcBankTnx_token_key" ON "HdfcBankTnx"("token");
