import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Log the transaction into the database
 * @param {
    { userId: string,
      paperNo: number,
      price: number,
      createdAt: string,
      success: boolean }
    } transaction - information about the transaction
 * @returns { Promise<boolean> } - whether the logging was successful
 */
export default async function logTransaction(transaction) {
  try {
    await prisma.transaction.createMany({
      data: [transaction],
    });
    return true;
  } catch (e) {
    return false;
  }
}
