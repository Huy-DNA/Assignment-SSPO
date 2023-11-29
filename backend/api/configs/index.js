import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';
import { authManager } from '../../middleware/auth.js';
import ErrorCode from '../../../errorcodes.js';
import { configs, formatConfig, pageSizeConfig } from '../../core/systemConfig.js';

const router = Router();

/**
 * Return a list of allowed formats
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function getFormats(req, res) {
  res.send({
    success: true,
    value: configs.allowedFormats,
  });
}

/**
 * Add a format to the format list
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function addFormats(req, res) {
  const schema = Joi.array().items(Joi.string().lowercase().trim());
  const { error, value: formats } = schema.validate(req.body);

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

  for (const format of formats) {
    formatConfig.addFormat(format);
  }

  res.send({
    success: true,
    value: 'Successful',
  });
}

/**
 * Return a list of allowed page sizes
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function getPageSizes(req, res) {
  res.send({
    success: true,
    value: configs.allowedPageSize,
  });
}

/**
 * Generate a page size
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function genPageSizes(req, res) {
  res.send({
    success: true,
    value: {
      name: '',
      equiv: 0,
      id: uuidv4(),
    },
  });
}

/**
 * Set the formats list
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function setFormats(req, res) {
  const schema = Joi.array().items(Joi.string().lowercase().trim());
  const { error, value: formats } = schema.validate(req.body);

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

  configs.allowedFormats = [];
  for (const format of formats) {
    formatConfig.addFormat(format);
  }

  res.send({
    success: true,
    value: 'Successful',
  });
}

/**
 * Set the page sizes
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function setPageSizes(req, res) {
  const schema = Joi.array().items(Joi.object({
    name: Joi.string(),
    equiv: Joi.number().custom((value, helpers) => {
      if (value <= 0 || Math.floor(value) !== value) {
        return helpers.error('Equivalent unit pages must be a valid positive integer');
      }
      return true;
    }),
    id: Joi.string(),
  }));
  const { error, value: pageSizes } = schema.validate(req.body);

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

  configs.allowedPageSize = [];
  for (const pageSize of pageSizes) {
    pageSizeConfig.addPageSize(pageSize);
  }

  res.send({
    success: true,
    value: 'Successful',
  });
}

/**
 * Upsert page sizes to the page size list
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function updatePageSizes(req, res) {
  const schema = Joi.array().items(Joi.object({
    name: Joi.string().optional(),
    equiv: Joi.number().custom((value, helpers) => {
      if (value <= 0 || Math.floor(value) !== value) {
        return helpers.error('Equivalent page units must be a positive integer');
      }
      return true;
    }).optional(),
    id: Joi.string(),
  }));
  const { error, value: pageSizes } = schema.validate(req.body);

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

  for (const pageSize of pageSizes) {
    pageSizeConfig.updatePageSize(pageSize);
  }

  res.send({
    success: true,
    value: 'Successful',
  });
}

/**
 * Add page sizes to the page size list
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function addPageSizes(req, res) {
  const schema = Joi.array().items(Joi.object({
    name: Joi.string(),
    equiv: Joi.number().custom((value, helpers) => {
      if (value <= 0 || Math.floor(value) !== value) {
        return helpers.error('Equivalent page units must be a positive integer');
      }
      return true;
    }),
    id: Joi.string(),
  }));
  const { error, value: pageSizes } = schema.validate(req.body);

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

  for (const pageSize of pageSizes) {
    pageSizeConfig.addPageSize(pageSize);
  }

  res.send({
    success: true,
    value: 'Successful',
  });
}

/**
 * Delete page sizes to the page size list
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function delPageSizes(req, res) {
  const schema = Joi.array().items(Joi.string().lowercase().trim());
  const { error, value: pageSizes } = schema.validate(req.body);

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

  for (const pageSize of pageSizes) {
    pageSizeConfig.rmPageSize(pageSize);
  }

  res.send({
    success: true,
    value: 'Successful',
  });
}

/**
 * Delete format from the format list
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function delFormats(req, res) {
  const schema = Joi.array().items(Joi.string().lowercase().trim());
  const { error, value: formats } = schema.validate(req.body);

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

  for (const format of formats) {
    formatConfig.rmFormat(format);
  }

  res.send({
    success: true,
    value: 'Successful',
  });
}

router.get('/formats', getFormats);
router.get('/pageSizes', getPageSizes);
router.post('/formats', authManager, setFormats);
router.post('/pageSizes', authManager, setPageSizes);
router.post('/formats/add', authManager, addFormats);
router.post('/pageSizes/add', authManager, addPageSizes);
router.post('/pageSizes/gen', authManager, genPageSizes);
router.post('/pageSizes/update', authManager, updatePageSizes);
router.post('/formats/delete', authManager, delFormats);
router.post('/pageSizes/delete', authManager, delPageSizes);

export default router;
