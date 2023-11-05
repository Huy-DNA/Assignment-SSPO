import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import ErrorCode from '../../../errorcodes.js';

const router = Router();
const client = new PrismaClient();

/**
 * Return a list of available users
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function getUsers(req, res) {
  res.send({
    success: true,
    data: await client.user.findMany(),
  });
}

/**
 * Return the user with the specified id in the request param `id`
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function getUser(req, res) {
  const { id } = req.params;
  if (typeof id !== 'string') {
    res.send({
      success: false,
      error: {
        code: ErrorCode.BAD_REQUEST,
        message: 'Bad id',
      },
    });
    return;
  }

  const userInfo = await client.user.findFirst({
    where: {
      id,
    },
  });

  if (userInfo === null) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.RESOURCE_NOT_FOUND,
        message: 'User not found',
      },
    });
    return;
  }

  res.send({
    success: true,
    value: userInfo,
  });
}

/**
 * Search users
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function searchUsers(req, res) {
  const options = req.query;

  const {
    name,
  } = options;

  const users = await client.user.findMany({
    where: {
      name: {
        contains: name?.trim(),
      },
    },
  });

  res.send({
    success: true,
    value: users,
  });
}

router.get('/', getUsers);
router.get('/search', searchUsers);
router.get('/info/:id', getUser);

export default router;
