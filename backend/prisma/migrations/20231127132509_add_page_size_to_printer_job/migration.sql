/*
  Warnings:

  - Added the required column `pageSize` to the `PrinterJob` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PrinterJob" ADD COLUMN     "pageSize" TEXT NOT NULL;
