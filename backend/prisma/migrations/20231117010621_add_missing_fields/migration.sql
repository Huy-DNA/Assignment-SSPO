/*
  Warnings:

  - You are about to drop the column `location` on the `Printer` table. All the data in the column will be lost.
  - Added the required column `brand` to the `Printer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `building` to the `Printer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `campus` to the `Printer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDeleted` to the `Printer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room` to the `Printer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oneSided` to the `PrinterJob` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Printer" DROP COLUMN "location",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "building" TEXT NOT NULL,
ADD COLUMN     "campus" TEXT NOT NULL,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL,
ADD COLUMN     "room" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PrinterJob" ADD COLUMN     "oneSided" BOOLEAN NOT NULL;
