import _stripe from 'stripe';
import Joi from 'joi';
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import CC from 'currency-converter-lt';
import ErrorCode from '../../../errorcodes.js';
import { authStudent } from '../../middleware/auth.js';
import getUserFromSession from '../../utils/getUserFromSession.js';

const client = new PrismaClient();
const router = Router();

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = _stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

/**
 * Create a payment intent
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function createPaymentIntent(req, res) {
  const schema = Joi.array().items(Joi.object({
    id: Joi.string().required(),
    quantity: Joi.number().integer().positive().required(),
  }));

  const { error, value: items } = schema.validate(req.body);

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

  if (items.length === 0) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.BAD_PAYLOAD,
        message: 'Empty transaction',
      },
    });
    return;
  }

  const { SESSION_ID } = req.cookies;

  const user = await getUserFromSession(SESSION_ID);

  if (user.isManager) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.STUDENT_EXPECTED,
        message: 'Only students can make transactions',
      },
    });
  }

  const packages = await client.paperPackage.findMany({
    select: {
      id: true,
      price: true,
      paperNo: true,
    },
    where: {
      id: {
        in: items.map((item) => item.id),
      },
      isDeleted: false,
    },
  });

  if (packages.length < items.length) {
    res.send({
      success: false,
      error: {
        code: ErrorCode.RESOURCE_NOT_FOUND,
        message: 'Packages not found',
      },
    });
    return;
  }

  const amount = items.map(
    (item) => item.quantity * packages.find((pkg) => pkg.id === item.id).price,
  ).reduce((acc, cur) => cur + acc, 0);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.ceil(await (new CC({ from: 'VND', to: 'USD', amount })).convert() * 100),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  // -----------------------------------------------------
  // SHOULDN'T UPDATE CUSTOMER STATUS HERE
  // BUT FOR SIMPLICITY AND FOR DESMONTRATION PURPOSES
  // I DO IT HERE ANYWAYS
  // TOTALLY IGNORING WHETHER THE TRANSACTION FAILS OR NOT
  const totalPaper = packages.map(
    (pkg) => pkg.paperNo * items.find((item) => item.id === pkg.id).quantity,
  ).reduce((acc, cur) => acc + cur, 0);

  await client.student.update({
    data: {
      paperNo: {
        increment: totalPaper,
      },
    },
    where: {
      id: user.id,
    },
  });

  const transaction = await client.transaction.create({
    data: {
      userId: user.id,
      paperNo: totalPaper,
      price: amount,
      success: true,
    },
  });

  await Promise.all(items.map((item) => client.transactionPackage.create({
    data: {
      quantity: item.quantity,
      package_id: item.id,
      transaction_id: transaction.id,
    },
  })));

  // -----------------------------------------------------

  res.send({
    success: true,
    value: {
      clientSecret: paymentIntent.client_secret,
    },
  });
}

router.post('/create-payment-intent', authStudent, createPaymentIntent);

export default router;
