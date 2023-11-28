import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
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
    title: 'In tài liệu',
    to: '/printfile',
  },
  {
    title: 'Mua giấy in',
    to: '/buypaper',
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAccountIconClick = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuComponents = menuItems.map(
    (item) => (
      <Link
        key={item.to}
        to={item.to}
        className="flex flex-row border-b-2 lg:border-0 border-gray-200 justify-start items-start lg:justify-center lg:items-center hover:cursor-pointer hover:bg-blue-400 lg:hover:bg-slate-200 transition ease-in-out px-6 py-2 text-lg"
        onClick={() => setIsMenuOpen(false)}
      >
        {item.title}
      </Link>
    ),
  );

  return (
    <div className="flex flex-row items-center justify-between bg-slate-100 px-10 h-24"> 
      <div className="flex flex-row gap-5 items-center">
        <div className="block lg:hidden">
          <MenuIcon onClick={() => setIsMenuOpen(!isMenuOpen)} className="hover:cursor-pointer"/>
          {
            isMenuOpen &&
            <div className="fixed h-full left-0 top-0 bg-white z-50">
              <div className="hover:cursor-pointer border-b-2 p-5" onClick={() => setIsMenuOpen(false)}>
                <CloseIcon />
              </div>
              { menuComponents }
            </div>
          }
          {
            isMenuOpen &&
            <div className="fixed h-screen w-screen left-0 top-0 z-40 bg-slate-200 opacity-70"></div>
          }
        </div>
        <Link to="/">
          <img src={images.logo} alt="logo-web" width={50} className='max-w-none'/>
        </Link>
      </div>
      <div className="hidden lg:self-stretch lg:flex lg:flex-row lg:items-stretch">
        { menuComponents }
      </div>
      {
        loginStatus !== LoginStatus.NOT_LOGGED_IN ?
        <div className="flex flex-row self-end items-center">
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
        </div> :
        <div className="h-full">
          <a href="/login" className="flex items-center p-5 justify-center h-full hover:cursor-pointer hover:bg-slate-50 transition ease-in-out text-lg">
            Đăng nhập
          </a>
        </div>
      }
    </div>
  );
}

export default Header;
