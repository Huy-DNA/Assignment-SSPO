import { Router } from "express";
import Joi from "joi";
import _ from "lodash";
import { PrinterJobStatus, PrismaClient } from "@prisma/client";
import { authStudent, authUser } from "../../middleware/auth.js";
import ErrorCode from "../../../errorcodes.js";
import getUserFromSession from "../../utils/getUserFromSession.js";
import { configs, formatConfig } from "../../core/systemConfig.js";
import estimatePrintTime from "../../utils/estimatePrintTime.js";
import printerManager from "../../core/printerManager.js";

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
    value: await client.printerJob.findMany({
      select: {
        id: true,
        userId: true,
        building: true,
        campus: true,
        room: true,
        copiesNo: true,
        createdAt: true,
        startPage: true,
        endPage: true,
        status: true,
        oneSided: true,
        pageSize: true,
        fileId: true,
        startAt: true,
      },
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
  if (typeof id !== "string") {
    res.send({
      success: false,
      error: {
        code: ErrorCode.BAD_REQUEST,
        message: "Bad id",
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
        message: "Printer job not found",
      },
    });
    return;
  }

  res.send({
    success: true,
    value: printerJobInfo,
  });
}

/**
 * Return the printer job with the specified id in the request param `id`
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
export async function addPrinterJob(req, res) {
  const schema = Joi.object({
    fileId: Joi.string().required(),
    printerId: Joi.string().required(),
    oneSided: Joi.boolean().default(false),
    pageSize: Joi.string().required(),
    copiesNo: Joi.number().integer().positive().default(1),
    startPage: Joi.number().integer().positive().required(),
    endPage: Joi.number().integer().positive().required(),
  });

  const { error, value: printerJobInfo } = schema.validate(req.body);

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

  const userInfo = await getUserFromSession(SESSION_ID);

  const file = await client.file.findFirst({
    select: {
      name: true,
      pageNo: true,
    },
    where: {
      isDeleted: false,
      id: printerJobInfo.fileId,
      userId: userInfo.id,
    },
  });

  if (!file) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.RESOURCE_NOT_FOUND,
        message: "File not found",
      },
    });
    return;
  }

  if (
    printerJobInfo.startPage > printerJobInfo.endPage ||
    printerJobInfo.endPage > file.pageNo
  ) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.BAD_REQUEST,
        message: "Invalid page range",
      },
    });
    return;
  }

  if (!formatConfig.isAllowed(_.last(file.name.split(".")) || "")) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.FORMAT_NOT_ALLOWED,
        message: "Format not allowed",
      },
    });
    return;
  }

  const printer = await client.printer.findFirst({
    select: {
      building: true,
      campus: true,
      room: true,
    },
    where: {
      id: printerJobInfo.printerId,
    },
  });

  if (!printer) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.RESOURCE_NOT_FOUND,
        message: "Printer not found",
      },
    });
    return;
  }

  try {
    const student = await client.student.findFirst({
      where: {
        id: userInfo.id,
      },
    });

    const { equiv: equivPages } = configs.allowedPageSize.get(printerJobInfo.pageSize);

    if (equivPages === undefined) {
      res.send({
        success: false,
        error: {
          code: ErrorCode.PAGESIZE_NOT_ALLOWED,
          message: "Invalid page size",
        },
      });
      return;
    }

    if (
      student.paperNo <
      (printerJobInfo.endPage - printerJobInfo.startPage + 1) *
        printerJobInfo.copiesNo *
        equivPages
    ) {
      res.send({
        success: false,
        error: {
          code: ErrorCode.NOT_ENOUGH_PAPER,
          message: "Not enough paper",
        },
      });
      return;
    }

    const pageUsed = (printerJobInfo.endPage - printerJobInfo.startPage + 1)
      * printerJobInfo.copiesNo * equivPages;

    const printerJob = await client.printerJob.create({
      data: {
        building: printer.building,
        campus: printer.campus,
        room: printer.room,
        copiesNo: printerJobInfo.copiesNo,
        oneSided: printerJobInfo.oneSided,
        status: PrinterJobStatus.Waiting,
        pageSize: printerJobInfo.pageSize,
        startPage: printerJobInfo.startPage,
        endPage: printerJobInfo.endPage,
        fileId: printerJobInfo.fileId,
        userId: userInfo.id,
        estimatedTime: estimatePrintTime(pageUsed),
        printerId: printerJobInfo.printerId,
      },
    });

    // Possible concurrency issues due to restriction in expressiveness when describing transactions
    await client.student.update({
      data: {
        paperNo: student.paperNo - pageUsed,
      },
      where: {
        id: userInfo.id,
      },
    });
    printerManager.pushJob(printerJob, printerJob.printerId);
    res.send({
      success: true,
      value: printerJob,
    });
  } catch (e) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.UNKNOWN,
        message: "Failed to create printer job",
      },
    });
  }
}

router.get('/', authUser, getPrinterJobs);
router.get('/info/:id', authUser, getPrinterJob);
router.post('/', authStudent, addPrinterJob);

export default router;
