import { PrismaClient, UserRole } from '@prisma/client';

const client = new PrismaClient();

/**
 * Find the user associated with sessionId
 * @param { string } sessionId - The session id
 * @returns {null | { name: string, isManager: boolean, id: string }} userInfo
 */
export default async function getUserFromSession(sessionId) {
  const session = await client.session.findFirst({
    where: {
      id: sessionId,
    },
  });

  if (session === null) {
    return null;
  }

  const user = await client.user.findFirst({
    where: {
      id: session.userId,
    },
  });

  if (user === null) {
    return null;
  }

  return {
    id: user.id,
    isManager: user.role === UserRole.Manager,
    name: user.name,
  };
}
