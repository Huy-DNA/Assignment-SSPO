import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import Joi from 'joi';
import getUserFromSession from '../../utils/getUserFromSession.js';
import { authStudent, authUser } from '../../middleware/auth.js';
import ErrorCode from '../../../errorcodes.js';

const router = Router();
const client = new PrismaClient();

/**
 * Get all feedbacks
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function getFeedbacks(req, res) {
  const options = req.query;
  const { userId, start, end } = options;

  const startNum = start && Number.parseInt(start, 10);
  const endNum = end && Number.parseInt(end, 10);

  const total = await client.feedback.count();
  const feedbacks = await client.feedback.findMany({
    select: {
      content: true,
      id: true,
      postedAt: true,
      userId: true,
      user: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    where: {
      userId,
    },
    skip: Number.isNaN(startNum) && startNum >= 0 ? undefined : startNum,
    take: Number.isNaN(endNum) && endNum > startNum ? undefined : endNum - startNum,
    orderBy: [
      {
        postedAt: 'desc',
      },
    ],
  });

  res.send({
    success: true,
    value: {
      feedbacks,
      total,
    },
  });
}

/**
 * Get the feedback with a given id
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function getFeedback(req, res) {
  const { id: feedbackId } = req.params;

  if (typeof feedbackId !== 'string') {
    res.send({
      success: false,
      error: {
        code: ErrorCode.BAD_REQUEST,
        message: 'Bad id',
      },
    });
    return;
  }

  const feedback = await client.feedback.findFirst({
    select: {
      content: true,
      id: true,
      postedAt: true,
      userId: true,
      user: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    where: {
      id: feedbackId,
    },
  });

  if (feedback === null) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.RESOURCE_NOT_FOUND,
        message: 'Feedback not found',
      },
    });
    return;
  }

  res.send({
    success: true,
    value: feedback,
  });
}

/**
 * Upload feedbacks
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function uploadFeedbacks(req, res) {
  const schema = Joi.array().items(Joi.object({
    content: Joi.string().required(),
  }));

  const { error, value: feedbackInfos } = schema.validate(req.body);

  if (error) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.BAD_PAYLOAD,
        message: error.message,
      },
    });
    return;
  }

  const { SESSION_ID } = req.cookies;

  const user = await getUserFromSession(SESSION_ID);

  res.send({
    success: true,
    value: await client.feedback.createMany({
      data: feedbackInfos.map((feedback) => ({
        ...feedback,
        userId: user.id,
      })),
    }),
  });
}

/**
 * Remove all the feedbacks with the given ids
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function deleteFeedbacks(req, res) {
  const schema = Joi.array().items(Joi.string());
  const { error, value: feedbackIds } = schema.validate(req.body);

  if (error) {
    res.send({
      success: false,
      error,
    });
    return;
  }

  const { SESSION_ID } = req.cookies;

  const user = await getUserFromSession(SESSION_ID);

  res.send({
    success: true,
    value: await client.feedback.deleteMany({
      where: {
        id: {
          in: feedbackIds,
        },
        userId: user.isManager ? undefined : user.id,
      },
    }),
  });
}

/**
 * Modify feedbacks
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function modifyFeedbacks(req, res) {
  const schema = Joi.array().items(Joi.object({
    id: Joi.string().required(),
    content: Joi.string().optional(),
  }));

  const { error, value: feedbackModifiers } = schema.validate(req.body);

  if (error) {
    res.send({
      success: false,
      error,
    });
    return;
  }

  const { SESSION_ID } = req.cookies;

  const user = await getUserFromSession(SESSION_ID);

  res.send(
    {
      success: true,
      value: {
        count: (await Promise.all(
          feedbackModifiers.map((modifier) => client.feedback.update({
            where: {
              id: modifier.id,
              userId: user.id,
            },
            data: {
              ...modifier,
              id: undefined,
            },
          }).then(() => 1).catch(() => 0)),
        )).reduce((acc, cur) => acc + cur, 0),
      },
    },
  );
}

/**
 * Search for feedbacks
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function searchFeedbacks(req, res) {
  const options = req.query;

  const {
    userId,
  } = options;

  res.send({
    success: true,
    value: await client.feedback.findMany({
      select: {
        content: true,
        id: true,
        postedAt: true,
        userId: true,
        user: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      where: {
        userId,
      },
    }),
  });
}

router.get('/', getFeedbacks);
router.get('/info/:id', getFeedback);
router.post('/upload', authStudent, uploadFeedbacks);
router.post('/update', authStudent, modifyFeedbacks);
router.post('/delete', authUser, deleteFeedbacks);
router.get('/search', searchFeedbacks);

export default router;
