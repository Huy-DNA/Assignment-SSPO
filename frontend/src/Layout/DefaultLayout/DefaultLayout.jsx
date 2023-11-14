import React from 'react';
import classNames from 'classnames/bind';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx('content')}>
      <Header />
      <div className={cx('body')}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
