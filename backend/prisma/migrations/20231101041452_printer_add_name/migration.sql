/*
  Warnings:

  - Added the required column `name` to the `Printer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Printer" ADD COLUMN     "name" TEXT NOT NULL;
