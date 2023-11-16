import React from 'react';
import classNames from 'classnames/bind';
import styles from './printers.module.scss';
import DisplayPrinter from '../../components/PrinterGrid/PrinterGrid';

const cx = classNames.bind(styles);

function PrintersPage() {

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('header')}>
        QUẢN LÍ MÁY IN
      </h2>
      <div className={cx('content')}>
        <DisplayPrinter />
      </div>
    </div>
  );
}

export default PrintersPage;
