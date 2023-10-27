import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('header')}>Đây là header</h1>
    </div>
  );
}

export default Header;