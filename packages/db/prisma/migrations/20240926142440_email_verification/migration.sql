/*
  Warnings:

  - You are about to drop the column `emailToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailTokenExpiry` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailToken",
DROP COLUMN "emailTokenExpiry",
ADD COLUMN     "emailVerificationExpiry" TEXT,
ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false;
