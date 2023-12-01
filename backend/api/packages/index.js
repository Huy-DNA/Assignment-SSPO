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
    value: (await client.paperPackage.findMany({
      select: {
        id: true,
        createdAt: true,
        description: true,
        thumbnailUrl: true,
        name: true,
        paperNo: true,
        price: true,
      },
      where: {
        isDeleted: false,
      },
    })).map((pkg) => ({ ...pkg, thumbnailUrl: pkg.thumbnailUrl || undefined })),
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
    value: {
      ...packageInfo,
      thumbnailUrl: packageInfo.thumbnailUrl || '',
    },
  });
}

/**
 * Add the provided package information to the database
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function addPackage(req, res) {
  const schema = Joi.object({
    name: Joi.string().required(),
    thumbnailUrl: Joi.string().allow('').optional(),
    description: Joi.string().allow('').optional(),
    price: Joi.number().positive().required(),
    paperNo: Joi.number().integer().positive().required(),
  });

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
    value: await client.paperPackage.create({
      data: {
        ...packagesInfo,
        description: packagesInfo.description || '',
      },
    }),
  });
}

/**
 * Modify a package
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function modifyPackage(req, res) {
  const schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().optional(),
    thumbnailUrl: Joi.string().allow('').optional(),
    price: Joi.number().positive().optional(),
    paperNo: Joi.number().integer().positive().optional(),
    description: Joi.string().allow('').optional(),
  });

  const { error, value: packageModifier } = schema.validate(req.body);

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

  try {
    if (packageModifier.price || packageModifier.paperNo) {
      const pkg = await client.paperPackage.update({
        data: {
          isDeleted: true,
        },
        where: {
          id: packageModifier.id,
        },
      });
      const newPkg = await client.paperPackage.create({
        data: {
          ...pkg,
          ...packageModifier,
          isDeleted: false,
          id: undefined,
        },
      });
      res.send({
        success: true,
        value: newPkg,
      });
      return;
    }

    const pkg = await client.paperPackage.update({
      data: {
        ...packageModifier,
      },
      where: {
        id: packageModifier.id,
      },
    });

    res.send({
      success: true,
      value: pkg,
    });
  } catch (e) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.BAD_REQUEST,
        message: 'Bad request',
      },
    });
  }
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
    value: await client.paperPackage.updateMany({
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
router.post('/add', authManager, addPackage);
router.post('/update', authManager, modifyPackage);
router.post('/delete', authManager, deletePackages);
router.get('/info/:id', getPackage);

export default router;
