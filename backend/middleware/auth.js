import { PrismaClient, UserRole } from '@prisma/client';
import ErrorCode from '../../errorcodes.js';

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
      error: {
        code: ErrorCode.NOT_LOGGED_IN,
        message: 'Not logged in',
      },
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
      error: {
        code: ErrorCode.INVALID_SESSION,
        message: 'Invalid session id',
      },
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
    error: {
      code: ErrorCode.MANAGER_EXPECTED,
      message: 'Not a manager',
    },
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
      error: {
        code: ErrorCode.NOT_LOGGED_IN,
        message: 'Not logged in',
      },
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
      error: {
        code: ErrorCode.INVALID_SESSION,
        message: 'Invalid session id',
      },
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
    error: {
      code: ErrorCode.STUDENT_EXPECTED,
      message: 'Not a student',
    },
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
      error: {
        code: ErrorCode.NOT_LOGGED_IN,
        message: 'Not logged in',
      },
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
      error: {
        code: ErrorCode.INVALID_SESSION,
        message: 'Invalid session id',
      },
    });
    return;
  }

  next();
}
