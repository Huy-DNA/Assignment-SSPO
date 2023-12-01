import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';

export default function Cart({ cart, setCart, modifiable }) { 
  const handleIncreaseItem = (item) => { 
    setCart((cart) => {
      const index = cart.findIndex(({ item: _item }) => item.id === _item.id);
      const cartItem = cart[index];
      if (index === -1) {
        return;
      }
      return [...cart.slice(0, index), { item, quantity: cartItem.quantity + 1 }, ...cart.slice(index + 1)]
    });
  };

  const handleDecreaseItem = (item) => { 
    setCart((cart) => {
      const index = cart.findIndex(({ item: _item }) => item.id === _item.id);
      const cartItem = cart[index]; 
      if (index === -1 || cartItem.quantity < 1) {
        return cart;
      }
      if (cartItem.quantity === 1) {
        return [...cart.slice(0, index), ...cart.slice(index + 1)];
      }

      return [...cart.slice(0, index), { item, quantity: cartItem.quantity - 1 }, ...cart.slice(index + 1)]
    });
  };

  const setItemNumber = (item, number) => {
    setCart((cart) => {
      const index = cart.findIndex(({ item: _item }) => item.id === _item.id);
      return [...cart.slice(0, index), { item, quantity: number }, ...cart.slice(index + 1)]
    });
  }

  const handleDeleteItem = (item) => {
    setCart((cart) => {
      const index = cart.findIndex(({ item: _item }) => item.id === _item.id);
      if (index === -1) {
        return cart;
      }
      return [...cart.slice(0, index), ...cart.slice(index + 1)];
    });
  }

  return (
    <div className="overflow-y-auto">
      {
        cart.length === 0 ? <p>Chưa có gì trong giỏ hàng</p> :
        <table className="w-screen lg:w-[45vw] table-fixed">
          <thead>
            <tr>
              <th className="w-[35%]">Tên gói</th>
              <th className="w-[20%]">Số lượng</th>
              <th className="w-[20%]">Tổng giá</th>
              <th className="w-[20%]">Tổng giấy</th>
              <th className="w-[5%]"></th>
            </tr>
          </thead>
          <tbody>
            {
              cart.map(({ item, quantity }) => (
                <tr key={item.name} className="p-5 py-1">
                  <td className="text-left font-bold text-blue-600" >{ item.name }</td>
                  <td className="text-center py-2">
                    {
                      modifiable &&
                      <button onClick={() => handleIncreaseItem(item)} className="border-2 border-gray-600 active:bg-gray-300 bg-gray-100 m-0 rounded-l-lg p-0 sm:p-1 shadow-inner">
                        <AddIcon fontSize="sm" />
                      </button>
                    }
                    <input type="number" disabled={!modifiable} onChange={(e) => setItemNumber(item, e.target.value)} min={0} value={quantity} className={`[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center border-y-2 ${modifiable ? "" : "border-2"} border-gray-600 focus:black shadow-inner w-12 m-0 sm:p-1`}/>
                    {
                      modifiable &&
                      <button onClick={() => handleDecreaseItem(item)} className="border-2 border-gray-600 active:bg-gray-300 bg-gray-100 m-0 rounded-r-lg p-0 sm:p-1 shadow-inner">
                        <RemoveIcon fontSize="sm" />
                      </button>
                    }
                  </td>
                  <td className="text-right">₫ { (item.price * quantity).toLocaleString() }</td>
                  <td className="text-right">
                    { item.paperNo * quantity }
                  </td>
                  <td className="p-2">
                    {
                      modifiable &&
                      <button onClick={() => handleDeleteItem(item)} className="border-2 bg-red-500 active:bg-red-700 font-bold text-white m-0 rounded-lg p-0 sm:p-1" >
                        <CloseIcon fontSize="sm" />
                      </button>
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr>
              <td><hr/></td>
              <td><hr/></td>
              <td><hr/></td>
              <td><hr/></td>
              <td><hr/></td>
            </tr>
            <tr className="py-5">
              <td className="font-bold text-center">Tổng</td>
              <td></td>
              <td className="text-right">₫ { cart.reduce((acc, { quantity, item }) => acc + quantity * item.price, 0).toLocaleString() }</td>
              <td className="text-right">{ cart.reduce((acc, { quantity }) => acc + quantity, 0).toLocaleString() }</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      }
    </div>
  )
}