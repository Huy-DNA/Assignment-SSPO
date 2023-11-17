import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';
import { authManager } from '../../middleware/auth.js';
import ErrorCode from '../../../errorcodes.js';

const router = Router();
const client = new PrismaClient();

/**
 * Return a list of available printers
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function getPrinters(req, res) {
  res.send({
    success: true,
    data: await client.printer.findMany(),
  });
}

/**
 * Return the printer with the specified id in the request param `id`
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function getPrinter(req, res) {
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

  const printerInfo = await client.printer.findFirst({
    where: {
      id,
    },
  });

  if (printerInfo === null) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.RESOURCE_NOT_FOUND,
        message: 'Printer not found',
      },
    });
    return;
  }

  res.send({
    success: true,
    value: printerInfo,
  });
}

/**
 * Add the provided printer information to the database
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function addPrinters(req, res) {
  const schema = Joi.array().items(Joi.object({
    id: Joi.string().optional(),
    code: Joi.string(),
    campus: Joi.string().uppercase().valid('BK1', 'BK2'),
    building: Joi.string().uppercase(),
    room: Joi.number(),
    brand: Joi.string().optional(),
    description: Joi.string().optional(),
    name: Joi.string(),
    enabled: Joi.boolean().default(true),
  }));

  const { error, value: printersInfo } = schema.validate(req.body);

  if (error) {
    res.send({
      success: false,
      error,
    });
    return;
  }

  res.send({
    success: true,
    data: await client.printer.createMany({
      data: printersInfo,
    }),
  });
}

/**
 * Remove all the printers with the given ids
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function deletePrinters(req, res) {
  const schema = Joi.array().items(Joi.string());
  const { error, value: printerIds } = schema.validate(req.body);

  if (error) {
    res.send({
      success: false,
      error,
    });
    return;
  }

  res.send({
    success: true,
    data: await client.printer.updateMany({
      data: {
        isDeleted: true,
      },
      where: {
        id: {
          in: printerIds,
        },
      },
    }),
  });
}

/**
 * Modify all the information of printers
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function modifyPrinters(req, res) {
  const schema = Joi.array().items(Joi.object({
    id: Joi.string(),
    campus: Joi.string().uppercase().valid('BK1', 'BK2').optional(),
    building: Joi.string().uppercase().optional(),
    room: Joi.number().optional(),
    code: Joi.string().optional(),
    description: Joi.string().allow('').optional(),
    brand: Joi.string().allow('').optional(),
    enabled: Joi.boolean().optional(),
    name: Joi.string().optional(),
  }));
  const { error, value: printerModifiers } = schema.validate(req.body);

  if (error) {
    res.send({
      success: false,
      error,
    });
    return;
  }

  res.send(
    {
      success: true,
      data: {
        count: (await Promise.all(
          printerModifiers.map((modifier) => client.printer.upsert({
            where: {
              id: modifier.id,
            },
            update: {
              ...modifier,
              id: undefined,
            },
            create: {
              ...modifier,
            },
          }).then(() => 1).catch(() => 0)),
        )).reduce((acc, cur) => acc + cur, 0),
      },
    },
  );
}

/**
 * Search printers
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function searchPrinters(req, res) {
  const options = req.query;

  const {
    location,
    name,
  } = options;

  const printers = await client.printer.findMany({
    where: {
      location: {
        contains: location?.trim(),
      },
      name: {
        contains: name?.trim(),
      },
    },
  });

  res.send({
    success: true,
    value: printers,
  });
}

router.get('/', getPrinters);
router.get('/search', searchPrinters);
router.post('/add', authManager, addPrinters);
router.post('/delete', authManager, deletePrinters);
router.post('/update', authManager, modifyPrinters);
router.get('/info/:id', getPrinter);

export default router;
