import { PrismaClient, UserRole } from '@prisma/client';

const client = new PrismaClient();

/**
 * Authenticate whether the current session corresponds to a manager
 * @param { Request } req - Request
 * @param { Response } res - Response
 * @param { NextFunction } next - Next
 */
export async function authManager(req, res, next) {
  const { SESSION_ID } = req.cookies;
  if (!SESSION_ID) {
    res.send({
      success: false,
      error: 'Not logged in',
    });
    return;
  }

  const { userId } = await client.session.findFirst({
    where: {
      id: SESSION_ID,
    },
  });

  if (!userId) {
    res.clearCookie('SESSION_ID');
    res.send({
      success: false,
      error: 'Invalid session id',
    });
    return;
  }

  const { role } = await client.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (role === UserRole.Manager) {
    next();
    return;
  }

  res.send({
    success: false,
    error: 'Not a manager',
  });
}

/**
 * Authenticate whether the current session corresponds to a student
 * @param { Request } req - Request
 * @param { Response } res - Response
 * @param { NextFunction } next - Next
 */
export async function authStudent(req, res, next) {
  const { SESSION_ID } = req.cookies;
  if (!SESSION_ID) {
    res.send({
      success: false,
      error: 'Not logged in',
    });
    return;
  }

  const { userId } = await client.session.findFirst({
    where: {
      id: SESSION_ID,
    },
  });

  if (!userId) {
    res.send({
      success: false,
      error: 'Invalid session id',
    });
    return;
  }

  const { role } = await client.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (role === UserRole.Student) {
    next();
    return;
  }

  res.send({
    success: false,
    error: 'Not a student',
  });
}

/**
 * Authenticate the session
 * @param { Request } req - Request
 * @param { Response } res - Response
 * @param { NextFunction } next - Next
 */
export async function authUser(req, res, next) {
  const { SESSION_ID } = req.cookies;
  if (!SESSION_ID) {
    res.send({
      success: false,
      error: 'Not logged in',
    });
    return;
  }

  const { userId } = await client.session.findFirst({
    where: {
      id: SESSION_ID,
    },
  });

  if (!userId) {
    res.send({
      success: false,
      error: 'Invalid session id',
    });
    return;
  }

  next();
}
