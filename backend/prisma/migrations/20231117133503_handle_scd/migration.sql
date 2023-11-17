/*
  Warnings:

  - Added the required column `building` to the `PrinterJob` table without a default value. This is not possible if the table is not empty.
  - Added the required column `campus` to the `PrinterJob` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room` to the `PrinterJob` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "PrinterJob" ADD COLUMN     "building" TEXT NOT NULL,
ADD COLUMN     "campus" TEXT NOT NULL,
ADD COLUMN     "room" INTEGER NOT NULL;
