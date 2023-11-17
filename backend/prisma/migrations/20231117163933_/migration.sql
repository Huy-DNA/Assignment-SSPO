/*
  Warnings:

  - The `code` column on the `Printer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Printer" DROP COLUMN "code",
ADD COLUMN     "code" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Printer_code_key" ON "Printer"("code");
