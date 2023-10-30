import React from 'react';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

import styles from './PrinterManagement.module.scss';

const cx = classNames.bind(styles);
function PrinterManagement() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('search')}>
        <input className={cx('search__input')} placeholder="Tìm kiếm"></input>
        <button className={cx('search__btn')}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      
    </div>
  );
}

export default PrinterManagement;