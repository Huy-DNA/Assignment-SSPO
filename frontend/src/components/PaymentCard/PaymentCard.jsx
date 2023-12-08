import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import extractAPIResponse from '../../utils/extractAPIResponse';
import useNotification from '../../hooks/useNotification';
import { NotificationStatus } from '../../constants/notification';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

/**
 *
 * @param root0
 * @param root0.items
 * @param root0.clearCart
 */
export default function PaymentCard({ items, clearCart }) {
  const [clientSecret, setClientSecret] = useState('');
  const notify = useNotification();

  useEffect(() => {
    fetch('/api/payment/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    })
      .then((res) => res.json())
      .then(extractAPIResponse)
      .then((data) => setClientSecret(data.clientSecret))
      .catch((e) => notify(NotificationStatus.ERR, e.message));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm handlePaymentClick={clearCart} />
        </Elements>
      )}
    </div>
  );
}
