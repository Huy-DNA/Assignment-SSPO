import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import images from '../../../../assets/images/images';
import '../../../../styles.css';
import { useSelector } from 'react-redux';
import { LoginStatus } from '../../../constants/loginStatus';

const MENU_ITEMS = [
  {
    title: 'Quản lí máy in',
    to: '/printers',
  },
  {
    title: 'Quản lí tài khoản',
    to: '/account',
  },
  {
    title: 'Xem lịch sử',
    to: '/history',
  },
  {
    title: 'Xem báo cáo',
    to: '/reports',
  },
  {
    title: 'Xem đánh giá',
    to: '/feedbacks',
  },
];

function Header() {
  const loginStatus = useSelector(state => state.loginStatus.value);

  return (
    loginStatus !== LoginStatus.NOT_LOGGED_IN ? (
      <div className="flex flex-row items-center justify-between bg-slate-100 px-5">
        <div className="w-16 h-16 m-4">
          <Link to="/">
            <img src={images.logo} alt="logo-web" />
          </Link>
        </div>
        <div className="self-stretch flex flex-row items-stretch">
          {
            MENU_ITEMS.map(
              (item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex flex-row justify-center items-center hover:cursor-pointer hover:bg-slate-50 transition ease-in-out p-5 text-lg"
                >
                  {item.title}
                </Link>
              ),
            )
          }
        </div>
        <div className="flex flex-row self-end items-center">
          <div className="m-4 hover:cursor-pointer">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <img
            className="rounded-full w-10 h-10 m-4 self-end hover:cursor-pointer"
            src={images.avatar}
            alt="user avatar"
            width={40}
            height={40}
          />
        </div>
      </div>
    ) : (
      <div className="flex flex-row items-center justify-between bg-slate-100 px-5">
        <div className="w-10 h-10 m-4">
          <img src={images.logo} alt="logo-web" />
        </div>

        <div>
          <Link to="/login">Đăng nhập</Link>
        </div>
      </div>
    )
  );
}

export default Header;
