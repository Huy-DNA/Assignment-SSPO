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
    value: await client.printer.findMany({
      select: {
        brand: true,
        building: true,
        campus: true,
        code: true,
        description: true,
        enabled: true,
        id: true,
        name: true,
        room: true,
      },
      where: {
        isDeleted: false,
      },
    }),
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
 * Generate a printer
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function generatePrinter(req, res) {
  const printer = await client.printer.create({
    data: {
      brand: '',
      building: 'H1',
      campus: 'BK1',
      description: '',
      enabled: true,
      name: '',
      room: 100,
    },
  });

  res.send({
    success: true,
    value: {
      ...printer,
      isDeleted: undefined,
    },
  });
}

/**
 * Add the provided printer information to the database
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function addPrinters(req, res) {
  const schema = Joi.array(Joi.object({
    id: Joi.string().optional(),
    campus: Joi.string().uppercase().valid('BK1', 'BK2').required(),
    building: Joi.string().uppercase().required(),
    room: Joi.number().required(),
    brand: Joi.string().optional(),
    description: Joi.string().optional(),
    name: Joi.string().required(),
    enabled: Joi.boolean().default(true),
  }));

  const { error, value: printersInfo } = schema.validate(req.body);

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
      error: {
        code: ErrorCode.BAD_PAYLOAD,
        message: error.details[0].message,
      },
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
    id: Joi.string().required(),
    campus: Joi.string().uppercase().valid('BK1', 'BK2').optional(),
    building: Joi.string().uppercase().optional(),
    room: Joi.number().optional(),
    code: Joi.number().optional(),
    description: Joi.string().allow('').optional(),
    brand: Joi.string().allow('').optional(),
    enabled: Joi.boolean().optional(),
    name: Joi.string().optional(),
  }));
  const { error, value: printerModifiers } = schema.validate(req.body);

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

  res.send(
    {
      success: true,
      data: {
        count: (await Promise.all(
          printerModifiers.map((modifier) => client.printer.upsert({
            where: {
              id: modifier.id,
              code: modifier.code,
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
router.post('/gen', authManager, generatePrinter);
router.post('/add', authManager, addPrinters);
router.post('/delete', authManager, deletePrinters);
router.post('/update', authManager, modifyPrinters);
router.get('/info/:id', getPrinter);

export default router;
