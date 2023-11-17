/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Printer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Printer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Printer" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Printer_code_key" ON "Printer"("code");
