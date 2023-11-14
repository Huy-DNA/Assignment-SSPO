import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

import styles from './PrinterManagement.module.scss';
import DisplayPrinter from '../../components/DisplayPrinter/DisplayPrinter';

const cx = classNames.bind(styles);

function PrinterManagement() {

  return (
    <div className={cx('wrapper')}>
      <div className={cx('search')}>
        <input className={cx('search__input')} placeholder="Tìm kiếm" />
        <button
          type="button"
          className={cx('search__btn')}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div className={cx('content')}>
        <DisplayPrinter />
      </div>
    </div>
  );
}

export default PrinterManagement;
