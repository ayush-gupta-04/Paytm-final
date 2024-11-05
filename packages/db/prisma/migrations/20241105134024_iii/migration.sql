/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `emailOtpVerification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "emailOtpVerification_token_key" ON "emailOtpVerification"("token");
