/*
  Warnings:

  - Added the required column `provider` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('RAZORPAY');

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "provider" "PaymentProvider" NOT NULL;
