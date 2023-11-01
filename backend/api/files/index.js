import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import Joi from 'joi';
import getUserFromSession from '../../utils/getUserFromSession.js';
import { authStudent, authUser } from '../../middleware/auth.js';

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
    },
    where: {
      userId: user.isManager ? undefined : user.id,
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
      error: 'bad id',
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
    },
    where: {
      id: fileId,
    },
  });

  if (file === false) {
    res.send({
      success: false,
      error: 'file not found',
    });
    return;
  }

  if (user.id === file.userId) {
    res.send({
      success: true,
      value: file,
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
    error: 'unauthorized',
  });
}

/**
 * Upload files
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function uploadFiles(req, res) {
  const schema = Joi.array().items(Joi.object({
    name: Joi.string(),
    content: Joi.string(),
  }));

  const { error, value: fileInfos } = schema.validate(req.body);

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
    value: await client.file.createMany({
      data: fileInfos.map((file) => ({
        ...file,
        userId: user.id,
      })),
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
      error,
    });
    return;
  }

  res.send({
    success: true,
    data: await client.file.deleteMany({
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
    name: Joi.string().optional(),
    content: Joi.string().optional(),
  }));

  const { error, value: fileModifiers } = schema.validate(req.body);

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
      data: {
        count: (await Promise.all(
          fileModifiers.map((modifier) => client.file.update({
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
          contains: filename,
        },
        userId: user.isManager ? undefined : user.id,
      },
    }),
  });
}

router.get('/', authUser, getFiles);
router.get('/:id', authUser, getFile);
router.post('/upload', authStudent, uploadFiles);
router.post('/update', authStudent, modifyFiles);
router.post('/delete', authStudent, deleteFiles);
router.get('/search', authUser, searchFiles);

export default router;
