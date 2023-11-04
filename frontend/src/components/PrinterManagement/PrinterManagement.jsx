import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

const cx = classNames.bind(styles);
function PrinterManagement() {
  const [numberChecked, setNumberChecked] = useState(0);
  const [isAnyCheckboxChecked, setIsAnyCheckboxChecked] = useState(false);
  const [printers, setPrinters] = useState([]);
  const [checkedIds, setCheckedIds] = useState([]);
  const [isDeletePrinter, setIsDeteltePrinter] = useState(false);

  // Define URL for API Printer
  const getPrinterURL = {
    URL: 'http://localhost:3000/api/printers',
    method: 'get'
  };
  const deletePrinterURL = {
    URL: 'http://localhost:3000/api/printers/delete',
    method: 'post'
  };

  // Logic for checkbox
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setNumberChecked(numberChecked + 1);
    }
    else {
      setNumberChecked(numberChecked - 1);
    }
    updateIsAnyCheckboxChecked(checked);
  };

  const updateIsAnyCheckboxChecked = (newChecked) => {
    if (newChecked) {
      setIsAnyCheckboxChecked(true);
    } else {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      const atLeastOneChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
      if (atLeastOneChecked) {
        setIsAnyCheckboxChecked(true);
      } else {
        setIsAnyCheckboxChecked(false);
      }
    }
  };

  // Call API to get printers list
  const getPrinter = (getPrinterURL) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {

      axios
        .get(getPrinterURL.URL)
        .then((response) => {
          const data = response.data;
          const printerList = data.data;

          setPrinters(printerList);
          setLoading(false);
        })
        .catch((error) => {
          console.error(`Error when call API: ${error}`);
          setLoading(false);
        });
    }, [isDeletePrinter]);
    
    if (loading) {
      return <p>Đang tải...</p>;
    }

    return (
      <div>
        {printers.map((printer, index) => (
          <div className={index % 2 === 1 ? (cx('body-content')) : (cx('body-content', 'odd-col'))} key={index}>
            <div className={cx('content-select')}>
              <input
                type="checkbox"
                className={cx('select-icon')}
                onChange={(e) => {
                  handleCheckboxChange(e);
                  handleCheckboxGetID(e);
                }}
                id={printer.id}
              />
            </div>
            <div className={cx('content-id-printer')}>
              <h4 className={cx('content-text')}>{index}</h4>
            </div>
            <div className={cx('content-name-printer')}>
              <h4 className={cx('content-text')}>{printer.name}</h4>
            </div>
            <div className={cx('content-location-printer')}>
              <h4 className={cx('content-text')}>{printer.location}</h4>
            </div>
            <div className={cx('content-condition-printer')}>
              <h4 className={cx('content-text')}>{printer.enabled && 'Available' || 'Unavailable'}</h4>
            </div>
          </div>
        ))}
      </div>
    );
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

  // Uncheck all checkbox
  const uncheckAllCheckboxes = () => {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  // Call API to delete printer
  const deletePrinter = (printerArr, deletePrinterURL) => {
    axios({
      method: deletePrinterURL.method,
      url: deletePrinterURL.URL,
      data: printerArr,
    })
      .then((response) => {
        console.log('Printer deleted successfully', response.data);
        setPrinters((prevPrinters) =>
          prevPrinters.filter((printer) => !printerArr.includes(printer.id))
        );
      })
      .catch((error) => {
        console.error('Error deleting printer', error);
      });
      setIsDeteltePrinter((prevState) => !prevState);
  };

  return (
    <div className={cx('wrapper')}>
      {!isAnyCheckboxChecked ? (
        <div className={cx('search')}>
          <input className={cx('search__input')} placeholder="Tìm kiếm" />
          <button className={cx('search__btn')}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      ) : (
        <div className={cx('printer-action')}>
          <FontAwesomeIcon icon={faCircleXmark} className={cx('close-printer-action')} />
          {numberChecked}
          máy in đã được chọn.
          <div className={cx('printer-action-list')}>
            <button
              className={cx('delete-printer')}
              onClick={(e) => {
                deletePrinter(checkedIds, deletePrinterURL);
                uncheckAllCheckboxes();
                handleCheckboxChange(e);
              }}
            >
              Xóa máy in
            </button>
            <button className={cx('edit-printer')}>Chỉnh sửa</button>
            <button className={cx('active-printer')}>Tắt/Mở</button>
          </div>
        </div>
      )}
      <div className={cx('content')}>
        <button
          className={cx('add-printer')}
        >
          Thêm máy in
        </button>
        <div className={cx('header-content')}>
          <div className={cx('content-select')}>
            <input
              type="checkbox"
              className={cx('select-icon')}
            />
            <h4 className={cx('content-text')}>All</h4>
          </div>
          <div className={cx('content-id-printer')}>
            <h4 className={cx('content-text')}>ID máy in</h4>
          </div>
          <div className={cx('content-name-printer')}>
            <h4 className={cx('content-text')}>Tên máy in</h4>
          </div>
          <div className={cx('content-location-printer')}>
            <h4 className={cx('content-text')}>Vị trí máy in</h4>
          </div>
          <div className={cx('content-condition-printer')}>
            <h4 className={cx('content-text')}>Trạng thái máy in</h4>
          </div>
        </div>
        {getPrinter(getPrinterURL)}
        <div className={cx('printer-view')}>
          <div className={cx('printer-view-action')}>
            <div className={cx('printer-view-text')}>
              1 - 9 of 1/10
            </div>
            <FontAwesomeIcon icon={faAngleLeft} />
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrinterManagement;
