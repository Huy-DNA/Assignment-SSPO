import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authUser } from '../../middleware/auth.js';
import ErrorCode from '../../../errorcodes.js';
import getUserFromSession from '../../utils/getUserFromSession.js';

const router = Router();
const client = new PrismaClient();

/**
 * Return a list of available printer jobs
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function getPrinterJobs(req, res) {
  const { SESSION_ID } = req.cookies;

  const user = await getUserFromSession(SESSION_ID);

  res.send({
    success: true,
    data: await client.printerJob.findMany({
      where: {
        userId: user.isManager ? undefined : user.id,
      },
    }),
  });
}

/**
 * Return the printer job with the specified id in the request param `id`
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function getPrinterJob(req, res) {
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

  const printerJobInfo = await client.printerJob.findFirst({
    where: {
      id,
      userId: user.isManager ? undefined : user.id,
    },
  });

  if (printerJobInfo === null) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.RESOURCE_NOT_FOUND,
        message: 'Printer job not found',
      },
    });
    return;
  }

  res.send({
    success: true,
    value: printerJobInfo,
  });
}

router.get('/', authUser, getPrinterJobs);
router.get('/info/:id', authUser, getPrinterJob);

export default router;
