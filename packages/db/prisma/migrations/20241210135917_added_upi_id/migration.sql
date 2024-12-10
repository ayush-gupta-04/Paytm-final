/*
  Warnings:

  - A unique constraint covering the columns `[upi]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "upi" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_upi_key" ON "User"("upi");
