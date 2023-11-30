import React, { useEffect, useState } from 'react';
import images from '../../../assets/images/images';
import { GET_PACKAGES_URL } from '../../constants/url';
import axios from 'axios';
import { useSessionStorage } from 'usehooks-ts';
import extractAPIResponse from '../../utils/extractAPIResponse';
import { NotificationStatus } from '../../constants/notification';
import { CircularProgress, Grid, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import getId from '../../utils/getId';
import useNotification from '../../hooks/useNotification';

export default function PackagesPage() {
  const notify = useNotification();
  const [cart, setCart] = useSessionStorage(getId(), []);

  const [packages, setPackages] = useState(null);

  const handleAddCart = (item) => {
    if (!cart.find(({ item: _item }) => item.id === _item.id)) {
      setCart([...cart, { item, quantity: 1 }]);
    } else {
      notify(NotificationStatus.OK, "The item is already in cart");
    }
  };

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

  const handlePaymentClick = () => {

  };

  useEffect(() => {
    axios.get(GET_PACKAGES_URL)
      .then(({ data }) => extractAPIResponse(data))
      .then((res) => {

        return res;
      })
      .then(setPackages)
      .catch((e) => notify(NotificationStatus.ERR, e.message));
  }, []);

  return (
    <div className="h-full">
      <h1 className="text-blue-900 my-6 font-bold text-3xl">
        GÓI GIẤY IN
      </h1>
      <div className="lg:flex lg:flex-row items-stretch lg:gap-10 lg:min-h-[90vh]">
        <div className="flex-1">
          {
            packages === null ? 
            <div className="flex flex-row justify-center items-center">
              <CircularProgress size={80}/>
            </div> :
            <div className="bg-white rounded-lg p-10 scroll-auto lg:min-h-screen max-h-screen">
              <Grid container rowSpacing={4} columnSpacing={4}>
                { packages && packages.map((item, index) => (
                  <Grid item key={index} xs={12} sm={6}>
                    <div onClick={() => handleAddCart(item)} className={`flex flex-row p-5 gap-6 rounded-lg bg-blue-100 hover:bg-blue-200 border border-solid border-gray-400 hover:cursor-pointer transform transition-transform hover:scale-105`}> 
                      {
                        item.description &&
                        <Tooltip title={item.description}>
                          <InfoIcon className="absolute top-3 right-3" fontSize="sm"/>
                        </Tooltip>
                      }
                      <img src={item.thumbnailUrl || images.paper} alt="Paper" className="block w-[30%]" />
                      <div>
                        <h2 className="text-xl">{item.name}</h2>
                        <p className="mb-2">Số giấy: {item.paperNo}</p>
                        <p className="font-bold text-blue-800 text-lg">₫ {item.price}</p>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid> 
            </div>
          }
        </div>
        <div className="bg-white rounded-lg lg:min-w-[50%] h-full p-5 self-stretch mt-10 lg:mt-0 lg:sticky lg:top-20">
          <div>
            <h2 className="font-2xl font-bold mb-2 flex flex-row items-center gap-5">
              <span>GIỎ HÀNG</span> 
              <button onClick={handlePaymentClick} className="rounded-lg bg-blue-500 active:bg-blue-700 font-bold text-white p-1 text-sm"> Thanh toán </button>
            </h2>
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
                            <button onClick={() => handleIncreaseItem(item)} className="border-2 border-gray-600 active:bg-gray-300 bg-gray-100 m-0 rounded-l-lg p-0 sm:p-1 shadow-inner">
                              <AddIcon fontSize="sm" />
                            </button>
                            <input type="number" onChange={(e) => setItemNumber(item, e.target.value)} min={0} value={quantity} className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center border-y-2 border-gray-600 focus:black shadow-inner w-12 m-0 sm:p-1"/>
                            <button onClick={() => handleDecreaseItem(item)} className="border-2 border-gray-600 active:bg-gray-300 bg-gray-100 m-0 rounded-r-lg p-0 sm:p-1 shadow-inner">
                              <RemoveIcon fontSize="sm" />
                            </button>
                          </td>
                          <td className="text-right">₫ { (item.price * quantity).toLocaleString() }</td>
                          <td className="text-right">
                            { item.paperNo * quantity }
                          </td>
                          <td className="p-2">
                            <button onClick={() => handleDeleteItem(item)} className="border-2 bg-red-500 active:bg-red-700 font-bold text-white m-0 rounded-lg p-0 sm:p-1" >
                              <CloseIcon fontSize="sm" />
                            </button>
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
          </div> 
        </div>
      </div>
    </div>
  );
}
