import { PrismaClient, PrinterJobStatus } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Log a printer job into the database
 * @param {
    { printerId: string,
      userId: string,
      fileId: string,
      status: PrinterJobStatus,
      estimatedTime: number,
      createdAt: number,
      copiesNo: number,
      startPage: number,
      endPage: number }
    } printerJobInfo - Information about the printer job
 * @returns { Promise<boolean> } - whether the logging was successful
 */
export default async function logPrinterJob(printerJobInfo) {
  try {
    await prisma.printerJob.createMany({
      data: [printerJobInfo],
    });
    return true;
  } catch (e) {
    return false;
  }
}
