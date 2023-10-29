import React from 'react';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import images from '../../../../assets/images/images';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
  {
    title: 'Quản lí máy in',
    to: '/manage-printer'
  },
  {
    title: 'Quản lí tài khoản',
    to: '/manage-account'
  },
  {
    title: 'Xem lịch sử',
    to: '/view-history'
  },
  {
    title: 'Xem báo cáo',
    to: '/view-report'
  },
  {
    title: 'Xem đánh giá',
    to: '/view-rate'
  }
]
function Header() {
  const isLogin = true;
  const handleMenu = (menuItems, classname) => {
    return menuItems.map((item, index) => (
      <a key={index} href={item.to} className={cx(classname)}>
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
              
            </div>
          </>
        ) : (
          <>
            <div className={cx('logo')}>
              <img src={images.logo} alt="logo-web" className={cx('logo-icon')} />
              <div className={cx('logo-content')}>
                BK PRINTER SERVICE
              </div>
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
