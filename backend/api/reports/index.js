import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { authManager } from '../../middleware/auth.js';
import ErrorCode from '../../../errorcodes.js';

const router = Router();
const client = new PrismaClient();

/**
 * Return a list of available reports
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function getReports(req, res) {
  res.send({
    success: true,
    value: await client.report.findMany({
      select: {
        id: true,
        week: true,
        year: true,
      },
    }),
  });
}

/**
 * Return the report with the id in request param `id`
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function getReport(req, res) {
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

  const reportInfo = await client.report.findFirst({
    select: {
      id: true,
      printer_jobs: true,
      transactions: true,
      week: true,
      year: true,
    },
    where: {
      id,
    },
  });

  if (reportInfo === null) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.RESOURCE_NOT_FOUND,
        message: 'Report not found',
      },
    });
    return;
  }

  res.send({
    success: true,
    value: reportInfo,
  });
}

router.get('/', authManager, getReports);
router.get('/info/:id', authManager, getReport);

export default router;
