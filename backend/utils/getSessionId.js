import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const client = new PrismaClient();

/**
 * Find or create a new session for user id
 * @param { string } userId - The id of the user
 * @returns { string } - The session id for the user id
 */
export default async function getSessionId(userId) {
  const oldSession = await client.session.findFirst({
    where: {
      userId,
    },
  });

  if (oldSession !== null) {
    await client.session.delete({
      where: {
        id: oldSession.id,
      },
    });
  }

  const sessionId = crypto.randomBytes(64).toString('base64');
  await client.session.create({
    data: {
      id: sessionId,
      userId,
    },
  });

  return sessionId;
}
