import axios from 'axios';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './AddPrinters.module.scss';

const cx = classNames.bind(styles);

function AddPrinters() {
  return ( 
    <div className={cx('wrapper')}>
      Thêm máy in
    </div>
  );
}

export default AddPrinters;