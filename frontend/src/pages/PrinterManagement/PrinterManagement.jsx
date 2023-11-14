import axios from 'axios';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';

import styles from './PrinterManagement.module.scss';
import GetPrinters, { deletePrinters, editPrinters, displayPrinter } from '../../components/GetPrinters/GetPrinters';
import DisplayPrinter from '../../components/DisplayPrinter/DisplayPrinter';

const cx = classNames.bind(styles);

function PrinterManagement() {
  const [printers, setPrinters] = useState([]);
  const [checkedIds, setCheckedIds] = useState([]);
  const [recallRender, setRecallRender] = useState(false);
  const [isEditPrinters, setIsEditPrinters] = useState(false);
  // Define URL for API Printer
  const getPrinterURL = {
    URL: 'http://localhost:3000/api/printers',
    method: 'get',
  };

  const deletePrinterURL = {
    URL: 'http://localhost:3000/api/printers/delete',
    method: 'post',
  };

  const handleEditPrinter = () => {
    setIsEditPrinters(true);
  }

  const handleSavePrinter = () => {
    setIsEditPrinters(false);
  }

  const handleButtonClick = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
      setCheckedIds([]);
    });
  };

  // Push id checkbox into Array checkedIds
  const handleCheckboxGetID = (e) => {
    const id = e.target.id;
    if (e.target.checked) {
      setCheckedIds([...checkedIds, id]);
    } else {
      const updatedIds = checkedIds.filter((checkedId) => checkedId !== id);
      setCheckedIds(updatedIds);
    }
  };

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
        <DisplayPrinter printers={printers} />
      </div>
    </div>
  );
}

export default PrinterManagement;
