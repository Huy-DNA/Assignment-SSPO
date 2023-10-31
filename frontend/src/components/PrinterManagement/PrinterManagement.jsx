import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import {
  faSquare,
} from '@fortawesome/free-regular-svg-icons';

import styles from './PrinterManagement.module.scss';

const cx = classNames.bind(styles);
function PrinterManagement() {
  const isChecked = false;
  const renderPrinter = () => {

  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('search')}>
        <input className={cx('search__input')} placeholder="Tìm kiếm"></input>
        <button className={cx('search__btn')}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div className={cx('content')}>
        <button className={cx('add-printer')}>Thêm máy in</button>
        <div className={cx('header-content')}>
          <div className={cx('header-select')}>
            <FontAwesomeIcon icon={faSquare} className={cx('select-icon')}/>
            <h4 className={cx('header-text')}>All</h4>
          </div>
          <div className={cx('header-id-printer')}>
            <h4 className={cx('header-text')}>ID máy in</h4>
          </div>
          <div className={cx('header-name-printer')}>
            <h4 className={cx('header-text')}>Tên máy in</h4>
          </div>
          <div className={cx('header-location-printer')}>
            <h4 className={cx('header-text')}>Vị trí máy in</h4>
          </div>
          <div className={cx('header-condition-printer')}>
            <h4 className={cx('header-text')}>Trạng thái máy in</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrinterManagement;