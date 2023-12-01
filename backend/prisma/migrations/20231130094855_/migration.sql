/*
  Warnings:

  - You are about to drop the column `packageId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_id_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "packageId",
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "TransactionPackage" (
    "transaction_id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "TransactionPackage_pkey" PRIMARY KEY ("transaction_id","package_id")
);

-- AddForeignKey
ALTER TABLE "TransactionPackage" ADD CONSTRAINT "TransactionPackage_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionPackage" ADD CONSTRAINT "TransactionPackage_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "PaperPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
