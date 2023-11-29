import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';
import { authManager } from '../../middleware/auth.js';
import ErrorCode from '../../../errorcodes.js';
import getUserFromSession from '../../utils/getUserFromSession.js';

const router = Router();
const client = new PrismaClient();

/**
 * Return a list of available packages
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function getPackages(req, res) {
  res.send({
    success: true,
    value: await client.paperPackage.findMany({
      select: {
        id: true,
        createdAt: true,
        description: true,
        thumbnailUrl: true,
        name: true,
        paperNo: true,
        price: true,
        _count: true,
      },
      where: {
        isDeleted: false,
      },
    }),
  });
}

/**
 * Return the package with the specified id in the request param `id`
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function getPackage(req, res) {
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

  const { SESSION_ID } = req.cookies;

  const user = await getUserFromSession(SESSION_ID);

  const packageInfo = await client.paperPackage.findFirst({
    select: {
      createdAt: true,
      description: true,
      id: true,
      isDeleted: true,
      name: true,
      paperNo: true,
      price: true,
      thumbnailUrl: true,
      transactions: {
        select: {
          id: true,
        },
        where: {
          success: true,
          userId: user.isManager ? undefined : user.id,
        },
      },
    },
    where: {
      id,
    },
  });

  if (packageInfo === null) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.RESOURCE_NOT_FOUND,
        message: 'Package not found',
      },
    });
    return;
  }

  res.send({
    success: true,
    value: packageInfo,
  });
}

/**
 * Add the provided package information to the database
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function addPackages(req, res) {
  const schema = Joi.array().items(Joi.object({
    id: Joi.string(),
    name: Joi.string(),
    thumbnailUrl: Joi.string().optional(),
    description: Joi.string().optional().default(''),
    price: Joi.number().positive(),
    paperNo: Joi.number().integer().positive(),
  }));

  const { error, value: packagesInfo } = schema.validate(req.body);

  if (error) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.BAD_PAYLOAD,
        message: error.details[0].message,
      },
    });
    return;
  }

  res.send({
    success: true,
    data: await client.paperPackage.createMany({
      data: packagesInfo,
    }),
  });
}

/**
 * Remove all the packages with the given ids
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function deletePackages(req, res) {
  const schema = Joi.array().items(Joi.string());
  const { error, value: packageIds } = schema.validate(req.body);

  if (error) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.BAD_PAYLOAD,
        message: error.details[0].message,
      },
    });
    return;
  }

  res.send({
    success: true,
    data: await client.paperPackage.updateMany({
      data: {
        isDeleted: true,
      },
      where: {
        id: {
          in: packageIds,
        },
      },
    }),
  });
}

router.get('/', getPackages);
router.post('/add', authManager, addPackages);
router.post('/delete', authManager, deletePackages);
router.get('/info/:id', getPackage);

export default router;
