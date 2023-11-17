-- AlterTable
ALTER TABLE "Printer" ADD COLUMN     "description" TEXT,
ALTER COLUMN "enabled" SET DEFAULT true,
ALTER COLUMN "brand" DROP NOT NULL,
ALTER COLUMN "isDeleted" SET DEFAULT true;
