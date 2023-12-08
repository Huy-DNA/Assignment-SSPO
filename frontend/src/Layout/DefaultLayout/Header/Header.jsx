import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuIcon from '@mui/icons-material/Menu';
import { Popover } from '@mui/material';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import '../../../../styles.css';
import { useSelector } from 'react-redux';
import { LoginStatus } from '../../../constants/loginStatus';
import images from '../../../../assets/images/images';

const MANAGER_ITEMS = [
  {
    title: 'Máy in',
    to: '/printers',
  },
  {
    title: 'Người dùng',
    to: '/accounts',
  },
  {
    title: 'Lịch sử',
    to: '/history',
  },
  {
    title: 'Báo cáo',
    to: '/reports',
  },
  {
    title: 'Đánh giá',
    to: '/feedbacks',
  },
];

const USER_ITEMS = [
  {
    title: 'Máy in',
    to: '/printers',
  },
  {
    title: 'Quản lý tài liệu',
    to: '/files',
  },
  {
    title: 'In tài liệu',
    to: '/print',
  },
  {
    title: 'Mua giấy',
    to: '/packages',
  },
  {
    title: 'Lịch sử',
    to: '/history',
  },
  {
    title: 'Đánh giá',
    to: '/feedbacks',
  },
];

const GUEST_ITEMS = [
  {
    title: 'Máy in',
    to: '/printers',
  },
  {
    title: 'Đánh giá',
    to: '/feedbacks',
  },
];

/**
 *
 */
function Header() {
  const location = useLocation();
  const loginStatus = useSelector((state) => state.loginStatus.value);
  const menuItems = loginStatus === LoginStatus.NOT_LOGGED_IN
    ? GUEST_ITEMS
    : loginStatus === LoginStatus.MANAGER
      ? MANAGER_ITEMS
      : USER_ITEMS;

  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAccountIconClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuComponents = menuItems.map(
    (item) => (
      <Link
        key={item.to}
        to={item.to}
        className={`
          flex flex-row justify-start lg:justify-center items-start lg:items-center
          border-l-4 lg:border-l-0 ${item.to !== location.pathname ? 'border-blue-600 bg-blue-950' : 'lg:border-b-4 border-blue-400 bg-blue-900'}
          lg:hover:border-b-4  hover:border-blue-400 hover:bg-blue-900
          my-1 lg:my-0
          hover:cursor-pointer
          transition ease-in-out px-6 py-3 text-lg
        `}
        onClick={() => setIsMenuOpen(false)}
      >
        {item.title}
      </Link>
    ),
  );

  return (
    <div className="flex flex-row items-center bg-blue-950 px-10 h-24 gap-5 text-white">
      <div className="flex flex-row gap-5 items-center">
        <div className="block lg:hidden">
          <div className="hover:cursor-pointer mr-3" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <MenuIcon />
          </div>
          <div className={`fixed h-full w-60 left-0 top-0 bg-blue-950 z-50 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <div className="flex flex-row hover:cursor-pointer p-5 items-center justify-center gap-5 my-5">
                <img src={images.logo} alt="logo-web" width={50} className="max-w-none" />
                <p className="text-white font-bold text-xl">BK-SSPO</p>
              </div>
            </Link>
            { menuComponents }
          </div>
        </div>
        <Link to="/">
          <img src={images.logo} alt="logo-web" width={50} className="max-w-none" />
        </Link>
      </div>
      <div className="hidden lg:self-stretch lg:flex lg:flex-row lg:items-stretch gap-1">
        { menuComponents }
      </div>
      <div className="flex-[5]" />
      {
        loginStatus !== LoginStatus.NOT_LOGGED_IN
          ? (
            <div className="flex flex-row items-center justify-self-end flex-1">
              <div className="m-4 hover:cursor-pointer scale-125">
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
          )
          : (
            <div className="h-full">
              <a href="/login" className="flex items-center p-5 justify-center h-full hover:cursor-pointer hover:bg-blue-900 transition ease-in-out text-lg">
                Đăng nhập
              </a>
            </div>
          )
      }
    </div>
  );
}

export default Header;
