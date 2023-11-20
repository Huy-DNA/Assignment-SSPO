import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import images from '../../../../assets/images/images';
import '../../../../styles.css';
import { useSelector } from 'react-redux';
import { LoginStatus } from '../../../constants/loginStatus';

const MANAGER_ITEMS = [
  {
    title: 'Quản lí máy in',
    to: '/printers',
  },
  {
    title: 'Quản lí tài khoản',
    to: '/accounts',
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

const USER_ITEMS = [
  {
    title: 'Xem máy in',
    to: '/printers',
  },
  {
    title: 'Quản lý tài liệu',
    to: '/files',
  },
  {
    title: 'In tài liệu',
    to: '/printfile',
  },
  {
    title: 'Xem lịch sử',
    to: '/history',
  },
  {
    title: 'Xem đánh giá',
    to: '/feedbacks',
  },
];

const GUEST_ITEMS = [
  {
    title: 'Xem máy in',
    to: '/printers',
  },
  {
    title: 'Xem đánh giá',
    to: '/feedbacks',
  },
]

function Header() {
  const loginStatus = useSelector(state => state.loginStatus.value);
  const menuItems = loginStatus === LoginStatus.NOT_LOGGED_IN
    ? GUEST_ITEMS
    : loginStatus === LoginStatus.MANAGER
    ? MANAGER_ITEMS
    : USER_ITEMS;

  return (
    loginStatus !== LoginStatus.NOT_LOGGED_IN ? (
      <div className="flex flex-row items-center justify-between bg-slate-100 px-5">
        <div className="w-12 h-12 mx-2 ml-16">
          <Link to="/">
            <img src={images.logo} alt="logo-web" />
          </Link>
        </div>
        <div className="self-stretch flex flex-row items-stretch">
          {
            menuItems.map(
              (item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex flex-row justify-center items-center hover:cursor-pointer hover:bg-slate-50 transition ease-in-out px-6 py-2 text-lg"
                >
                  {item.title}
                </Link>
              ),
            )
          }
        </div>
        <div className="flex flex-row self-end items-center">
          <div className="m-4 hover:cursor-pointer scale-125">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <img
            className="rounded-full w-10 h-10 m-4 mr-12 self-end hover:cursor-pointer"
            src={images.avatar}
            alt="user avatar"
            width={40}
            height={40}
          />
        </div>
      </div>
    ) : (
      <div className="flex flex-row items-center justify-between bg-slate-100 px-5">
        <div className="w-12 h-12 mx-2 ml-16">
          <img src={images.logo} alt="logo-web" />
        </div>

        <div>
          <a href="/login" className="flex flex-row justify-center items-center hover:cursor-pointer hover:bg-slate-50 transition ease-in-out px-5 mr-16 my-[21px] text-lg">
            Đăng nhập
          </a>
        </div>
      </div>
    )
  );
}

export default Header;
