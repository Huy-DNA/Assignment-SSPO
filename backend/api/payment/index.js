import _stripe from 'stripe';
import { Router } from 'express';

const router = Router();

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = _stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const calculateOrderAmount = (items) => {
  console.log(items);
  return 1400;
};

/**
 * Create a payment intent
 * @param {Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>} req - Express request
 * @param {Response<any, Record<string, any>, number>} res - Express response
 */
async function createPaymentIntent(req, res) {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}

router.post('/create-payment-intent', createPaymentIntent);

export default router;
