import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';
import { authManager } from '../../middleware/auth.js';
import ErrorCode from '../../../errorcodes.js';

const router = Router();
const client = new PrismaClient();

/**
 * Return a list of available packages
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function grantPaper(req, res) {
  const schema = Joi.object({
    paperNo: Joi.number().integer().positive().required(),
  });

  const { error, value: { paperNo } } = schema.validate(req.body);

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

  await client.student.updateMany({
    data: {
      paperNo: {
        increment: paperNo,
      },
    },
  });

  res.send({
    success: true,
    value: 'Grant successfully',
  });
}

router.post('/paper', authManager, grantPaper);

export default router;
