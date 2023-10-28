import React from 'react';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import images from '../../../../assets/images/images';

const cx = classNames.bind(styles);

function Header() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('logo')}>
        <img src={images.logo} alt="logo-web" className={cx('logo-icon')} />
        <div className={cx('logo-content')}>
          BK PRINTER SERVICE
        </div>
      </div>

      <div className={cx('action')}>
        <div className={cx('login')}>
          <a href="/login" to="/profile">Đăng nhập</a>
        </div>
      </div>
    </div>
  );
}

export default Header;
