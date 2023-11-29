import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import Joi from 'joi';
import getUserFromSession from '../../utils/getUserFromSession.js';
import { authStudent, authUser } from '../../middleware/auth.js';
import ErrorCode from '../../../errorcodes.js';
import getNumberOfPages from '../../utils/getNumberOfPages.js';

const router = Router();
const client = new PrismaClient();

/**
 * Get all file's metadata
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function getFiles(req, res) {
  const { SESSION_ID } = req.cookies;

  const user = await getUserFromSession(SESSION_ID);

  const files = await client.file.findMany({
    select: {
      id: true,
      name: true,
      uploadedAt: true,
      userId: true,
      pageNo: true,
    },
    where: {
      userId: user.isManager ? undefined : user.id,
      isDeleted: false,
    },
  });

  res.send({
    success: true,
    value: files,
  });
}

/**
 * Get the file with a given id
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function getFile(req, res) {
  const { id: fileId } = req.params;

  if (typeof fileId !== 'string') {
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

  const file = await client.file.findFirst({
    select: {
      id: true,
      content: true,
      name: true,
      uploadedAt: true,
      userId: true,
      pageNo: true,
    },
    where: {
      id: fileId,
    },
  });

  if (file === null) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.RESOURCE_NOT_FOUND,
        message: 'File not found',
      },
    });
    return;
  }

  if (user.id === file.userId) {
    res.send({
      success: true,
      value: {
        ...file,
        content: file.content.toString('base64'),
      },
    });
    return;
  }

  if (user.isManager) {
    res.send({
      success: true,
      value: {
        ...file,
        content: undefined,
      },
    });
  }

  res.send({
    success: false,
    error: {
      code: ErrorCode.UNAUTHORIZED,
      message: 'The user has not permission to access this file',
    },
  });
}

/**
 * Upload files
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function uploadFiles(req, res) {
  const schema = Joi.array().items(Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().allow('').required(),
    content: Joi.string().allow('').required(),
    uploadedAt: Joi.date().optional(),
  }));

  const { error, value: fileInfos } = schema.validate(req.body);

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

  const { SESSION_ID } = req.cookies;

  const user = await getUserFromSession(SESSION_ID);

  const fileData = (await Promise.all(fileInfos.map(async (file) => {
    const pageNo = await getNumberOfPages(file.name, file.content);
    return pageNo === undefined ? [] : [{
      id: file.id,
      name: file.name,
      content: file.content,
      uploadedAt: file.uploadedAt,
      pageNo,
      userId: user.id,
    }];
  }))).flatMap((e) => e);

  if (fileData.length < fileInfos.length) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.BAD_REQUEST,
        message: 'Some files are corrupted or files with unknown extensions were uploaded',
      },
    });
    return;
  }

  res.send({
    success: true,
    value: await client.file.createMany({
      data: fileData,
    }),
  });
}

/**
 * Remove all the files with the given ids
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function deleteFiles(req, res) {
  const schema = Joi.array().items(Joi.string());
  const { error, value: fileIds } = schema.validate(req.body);

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
    data: await client.file.updateMany({
      data: {
        isDeleted: true,
      },
      where: {
        id: {
          in: fileIds,
        },
      },
    }),
  });
}

/**
 * Modify files
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function modifyFiles(req, res) {
  const schema = Joi.array().items(Joi.object({
    id: Joi.string(),
    name: Joi.string().allow('').optional(),
  }));

  const { error, value: fileModifiers } = schema.validate(req.body);

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

  const { SESSION_ID } = req.cookies;

  const user = await getUserFromSession(SESSION_ID);

  const newFileModifiers = (await Promise.all(fileModifiers.map(async (modifier) => {
    if (modifier.content) {
      return modifier;
    }
    const pageNo = await getNumberOfPages(modifier.name, modifier.content);
    return pageNo === undefined ? [] : [{
      ...modifier,
      pageNo,
    }];
  }))).flatMap((e) => e);

  if (newFileModifiers.length !== fileModifiers.length) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.BAD_REQUEST,
        message: 'Some files are corrupted or have unknown extensions',
      },
    });
    return;
  }

  res.send(
    {
      success: true,
      data: {
        count: (await Promise.all(
          fileModifiers.map((modifier) => client.file.upsert({
            where: {
              id: modifier.id,
              userId: user.id,
            },
            create: {
              ...modifier,
              userId: user.id,
            },
            update: {
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
 * Search for files
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function searchFiles(req, res) {
  const options = req.query;

  const {
    filename,
  } = options;

  const { SESSION_ID } = req.cookies;

  const user = await getUserFromSession(SESSION_ID);

  res.send({
    success: true,
    value: await client.file.findMany({
      select: {
        id: true,
        name: true,
        uploadedAt: true,
        userId: true,
      },
      where: {
        name: {
          contains: filename?.trim(),
        },
        userId: user.isManager ? undefined : user.id,
      },
    }),
  });
}

router.get('/', authUser, getFiles);
router.get('/info/:id', authUser, getFile);
router.post('/upload', authStudent, uploadFiles);
router.post('/update', authStudent, modifyFiles);
router.post('/delete', authStudent, deleteFiles);
router.get('/search', authUser, searchFiles);

export default router;
