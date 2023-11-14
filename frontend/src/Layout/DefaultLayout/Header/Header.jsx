import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import images from '../../../../assets/images/images';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
  {
    title: 'Quản lí máy in',
    to: '/manageprinter',
    classname: 'management-printer'
  },
  {
    title: 'Quản lí tài khoản',
    to: '/manageaccount',
    classname: 'management-account'
  },
  {
    title: 'Xem lịch sử',
    to: '/viewhistory',
    classname: 'view-history'
  },
  {
    title: 'Xem báo cáo',
    to: '/viewreport',
    classname: 'view-report'
  },
  {
    title: 'Xem đánh giá',
    to: '/viewrate',
    classname: 'view-rate'
  }
]
function Header() {
  const isLogin = true;
  const handleMenu = (menuItems) => {
    return menuItems.map((item, index) => (
      <a key={index} href={item.to} className={cx({ [item.classname]: true })}>
        {item.title}
      </a>
    ));
  }

  const renderMenu = handleMenu(MENU_ITEMS, 'action');
  return (
    <div className={cx('wrapper')}>
      {
        isLogin ? (
          <>
            <div className={cx('logo')}>
              <img src={images.logo} alt="logo-web" className={cx('logo-icon')} />
            </div>
            <div className={cx('action')}>
               {renderMenu}
            </div>          
            <div className={cx('user')}>
              <FontAwesomeIcon icon={faBell} className={cx('user-bell')}/>
              <img
                className={cx('user-avatar')}
                src={images.avatar}
                alt=""
                width={40}
                height={40}
                />
            </div>
          </>
        ) : (
          <>
            <div className={cx('logo')}>
              <img src={images.logo} alt="logo-web" className={cx('logo-icon')} />
            </div>

            <div className={cx('action')}>
              <a href="/login" to="/profile">Đăng nhập</a>
            </div>
          </>
        )
      }
    </div>
  );
}

export default Header;
