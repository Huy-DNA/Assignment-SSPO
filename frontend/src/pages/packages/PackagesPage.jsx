import React, { useEffect, useState } from 'react';
import images from '../../../assets/images/images';
import { GET_PACKAGES_URL } from '../../constants/url';
import axios from 'axios';
import { useSessionStorage } from 'usehooks-ts';
import extractAPIResponse from '../../utils/extractAPIResponse';
import { NotificationStatus } from '../../constants/notification';
import { CircularProgress, Grid, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import getId from '../../utils/getId';
import useNotification from '../../hooks/useNotification';
import { useNavigate } from 'react-router';
import Cart from '../../components/Cart/Cart';

export default function PackagesPage() {
  const notify = useNotification();
  const [cart, setCart] = useSessionStorage(getId(), []);
  const navigate = useNavigate();

  const [packages, setPackages] = useState(null); 

  useEffect(() => {
    axios.get(GET_PACKAGES_URL)
      .then(({ data }) => extractAPIResponse(data))
      .then((res) => {
        const ids = res.map(({ id }) => id);
        const availableItems = [];
        for (const cartItem of cart) {
          if (ids.includes(cartItem.item.id)) {
            availableItems.push(cartItem);
          }
        }
        setCart(availableItems);
        return res;
      })
      .then(setPackages)
      .catch((e) => notify(NotificationStatus.ERR, e.message));
  }, []);

  const handlePaymentClick = () => {
    navigate('/payment');
  };

  const handleAddCart = (item) => {
    if (!cart.find(({ item: _item }) => item.id === _item.id)) {
      setCart([...cart, { item, quantity: 1 }]);
    } else {
      notify(NotificationStatus.OK, "The item is already in cart");
    }
  };

  return (
    <div className="h-full">
      <h1 className="text-blue-900 my-6 font-bold text-3xl">
        GÓI GIẤY IN
      </h1>
      <div className="lg:flex lg:flex-row items-stretch lg:gap-10">
        <div className="flex-1">
          {
            packages === null ? 
            <div className="flex flex-row justify-center items-center">
              <CircularProgress size={80}/>
            </div> :
            <div className="bg-white rounded-lg p-10 scroll-auto lg:min-h-[50vh] max-h-screen">
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
                        <h2 className="text-sm text-blue-900 font-light">{item.name}</h2>
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
            <Cart cart={cart} setCart={setCart} modifiable />
          </div> 
        </div>
      </div>
    </div>
  );
}
