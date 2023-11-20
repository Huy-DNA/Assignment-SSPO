import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover } from '@mui/material';
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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleAccountIconClick = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    loginStatus !== LoginStatus.NOT_LOGGED_IN ? (
      <div className="flex flex-row items-center justify-between bg-slate-100 px-5">
        <div className="w-16 h-16 mx-10">
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
            onClick={handleAccountIconClick}
          />
          <Popover
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <div className="p-3 rounded-md">
              <p className="hover:bg-slate-200 p-2 rounded-md"><a href="/logout">Đăng xuất</a></p>
            </div>
          </Popover>
        </div>
      </div>
    ) : (
      <div className="flex flex-row items-center justify-between bg-slate-100 px-5">
        <div className="w-16 h-16 mx-10">
          <img src={images.logo} alt="logo-web" />
        </div>

        <div>
          <a href="/login" className="flex flex-row justify-center items-center hover:cursor-pointer hover:bg-slate-50 transition ease-in-out p-5 text-lg">
            Đăng nhập
          </a>
        </div>
      </div>
    )
  );
}

export default Header;
