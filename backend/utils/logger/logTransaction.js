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
 * @returns { { success: boolean, error?: any } } - whether the logging was successful
 */
export default async function logTransaction(transaction) {
  try {
    const res = await prisma.transaction.createMany({
      data: [transaction],
    });
    return {
      success: res.count > 0,
      error: 'Unknown error while logging transaction',
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
}
