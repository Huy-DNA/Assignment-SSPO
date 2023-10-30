import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';
import { authManager } from '../../middleware/auth.js';

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
 * Add the provided printer information to the database
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function addPrinters(req, res) {
  const schema = Joi.array().items(Joi.object({
    location: Joi.string(),
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
    data: await client.printer.deleteMany({
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
    location: Joi.string(),
  }));
  const { error, value: printerModifiers } = schema.validate(req.body);

  if (error) {
    res.send(error);
    return;
  }

  res.send(await Promise.all(printerModifiers.map((modifier) => client.printer.upsert({
    where: {
      id: modifier.id,
    },
    update: {
      ...modifier,
      id: undefined,
    },
  }))));
}

router.get('/', getPrinters);
router.post('/add', authManager, addPrinters);
router.post('/delete', authManager, deletePrinters);
router.post('/update', authManager, modifyPrinters);

export default router;
