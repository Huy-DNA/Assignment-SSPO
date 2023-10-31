import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
/**
 * function lưu thông tin về việc in ấn về database
 * @param {object} data object chứa thông tin về việc in ấn
 */

/**
 *
 * @param data
 */
export default async function logTransaction(data) {
  const res = await prisma.transaction.create({
    data,
  });
}
