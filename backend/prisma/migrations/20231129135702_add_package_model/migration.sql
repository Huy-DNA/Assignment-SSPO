-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "packageId" TEXT;

-- CreateTable
CREATE TABLE "PaperPackage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "isDeleted" BOOLEAN NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "paperNo" INTEGER NOT NULL,

    CONSTRAINT "PaperPackage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_id_fkey" FOREIGN KEY ("id") REFERENCES "PaperPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
