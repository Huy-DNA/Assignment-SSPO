import { PrismaClient, UserRole } from '@prisma/client';

const client = new PrismaClient();

/**
 * Inspect the userInfo to see if it's already in the database
 * If not, add it to the database
 * @param {{ name: string, isManager: boolean, id: string }} userInfo
 */
export default async function addIfNewUser(userInfo) {
  const isInDb = (await client.user.findFirst({
    where: {
      id: userInfo.id,
    },
  })) !== null;
  if (!isInDb) {
    await client.user.create({
      data: {
        id: userInfo.id,
        name: userInfo.name,
        role: userInfo.isManager ? UserRole.Manager : UserRole.Student,
      },
    });

    if (userInfo.isManager) {
      await client.manager.create({
        data: {
          id: userInfo.id,
        },
      });
    } else {
      await client.student.create({
        data: {
          id: userInfo.id,
          paperNo: 0,
        },
      });
    }
  }
}
