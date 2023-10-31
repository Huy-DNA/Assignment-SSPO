import { PrismaClient, PrinterJobStatus } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Log a printer job into the database
 * @param {
 *  { printerId: string,
 *    userId: string,
 *    fileId: string,
 *    status: PrinterJobStatus,
 *    estimatedTime: number,
 *    createdAt: number,
 *    copiesNo: number,
 *    startPage: number,
 *    endPage: number } } printerJobInfo - Information about the printer job
 * @returns { { success: boolean, error?: any } } - whether the logging was successful
 */
export default async function logPrinterJob(printerJobInfo) {
  try {
    const res = await prisma.printerJob.createMany({
      data: [printerJobInfo],
    });
    return {
      success: res.count > 0,
      error: 'Unknown error while logging printer job',
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
}
