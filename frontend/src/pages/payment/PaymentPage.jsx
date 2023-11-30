import React from 'react';
import PaymentCard from '../../components/PaymentCard/PaymentCard';
import { useSessionStorage } from 'usehooks-ts';
import getId from '../../utils/getId';
import Cart from '../../components/Cart/Cart';

export default function PaymentPage() {
  const [cart, setCart] = useSessionStorage(getId(), []);

  return (
    <div className="w-full">
      <h1 className="text-blue-900 my-6 font-bold text-3xl">
        THANH TOÁN
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        <div className="bg-white rounded-lg p-5 w-full">
          <Cart cart={cart} setCart={setCart} />
        </div>

        <div className="w-[90%]">
          <PaymentCard items={cart.map((cartItem) => ({
            quantity: cartItem.quantity,
            id: cartItem.item.id,
          }))} />
        </div>
      </div>
    </div>
  );
}
