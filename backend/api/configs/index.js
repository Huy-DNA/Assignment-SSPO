import Joi from 'joi';
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
  const schema = Joi.array().items(Joi.string());
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
 * Add page sizes to the page size list
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function addPageSizes(req, res) {
  const schema = Joi.array().items(Joi.string());
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
    pageSizeConfig.addFormat(pageSize);
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
  const schema = Joi.array().items(Joi.string());
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
    pageSizeConfig.rmFormat(pageSize);
  }

  res.send({
    success: true,
    value: 'Successful',
  });
}

/**
 * Delete format to the format list
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function delFormats(req, res) {
  const schema = Joi.array().items(Joi.string());
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

router.get('/formats', authManager, getFormats);
router.get('/pageSizes', authManager, getPageSizes);
router.post('/formats', authManager, addFormats);
router.post('/pageSizes', authManager, addPageSizes);
router.delete('/formats', authManager, delFormats);
router.delete('/pageSizes', authManager, delPageSizes);

export default router;
