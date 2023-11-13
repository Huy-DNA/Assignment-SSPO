import axios from 'axios';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from '../../pages/PrinterManagement/PrinterManagement.module.scss';

const cx = classNames.bind(styles);

function GetPrinters({ apiURL, recallRender, setPrinters }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(apiURL.URL)
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
  }, [recallRender]);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  return (
    <div></div>
  );
}

const displayPrinter = (
  printers,
  handleCheckboxGetID,
  setPrinters,
  iseditPrinters,
  printerArr
) => {
  const deepCopiedPrinters = [...printers];
  return (
    <div>
      {deepCopiedPrinters.map((printer, index) => (
        <div
          className={cx('body-content')}
          key={index}
        >
          <div className={cx('content-select')}>
            <input
              type="checkbox"
              className={cx('select-icon')}
              onChange={(e) => {
                handleCheckboxGetID(e);
              }}
              id={printer.id}
            />
          </div>
          <div className={cx('content-id-printer')}>
            <p className={cx('content-text')}>{index}</p>
          </div>
          {iseditPrinters && printerArr.includes(printer.id) ? (
            <>
              <div className={cx('content-name-printer')}>
                <input
                  type="text"
                  className={cx('content-text')}
                  value={deepCopiedPrinters[index]['name']}
                  onChange={(e) => handleInputChange(e.target.value, 'name', index, deepCopiedPrinters, setPrinters)}
                />
              </div>
              <div className={cx('content-location-printer')}>
                <input
                  type="text"
                  className={cx('content-text')}
                  value={deepCopiedPrinters[index]['location']}
                  onChange={(e) => handleInputChange(e.target.value, 'location', index, deepCopiedPrinters, setPrinters)}
                />
              </div>
              <div className={cx('content-condition-printer')}>
                <input
                  type="text"
                  className={cx('content-text')}
                  value={deepCopiedPrinters[index]['enabled']}
                  onChange={(e) => handleInputChange(e.target.value, 'enabled', index, deepCopiedPrinters, setPrinters)}
                />
              </div>
            </>
          ) : (
            <>
              <div className={cx('content-name-printer')}>
                <p className={cx('content-text')}>{deepCopiedPrinters[index]['name']}</p>
              </div>
              <div className={cx('content-location-printer')}>
                <p className={cx('content-text')}>{deepCopiedPrinters[index]['location']}</p>
              </div>
              <div className={cx('content-condition-printer')}>
                <p className={cx('content-text')}>{deepCopiedPrinters[index]['enabled'] && 'Enabled' || 'Disabled'}</p>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

// Call API to delete printer
const deletePrinters = (printerArr, deletePrinterURL, setRecallRender) => {
  axios({
    method: deletePrinterURL.method,
    url: deletePrinterURL.URL,
    data: printerArr,
  })
    .then((response) => {
      console.log('Printer deleted successfully', response.data);
      setRecallRender((prevState) => !prevState);
    })
    .catch((error) => {
      console.error('Error deleting printer', error);
    });
};

const handleInputChange = (value, name, index, deepCopiedPrinters, setPrinters) => {
  const updatedPrinter = [...deepCopiedPrinters];
  updatedPrinter[index][name] = value;
  setPrinters(updatedPrinter);
};

const editPrinters = (printerArr, editPrinterURL, setRecallRender, printers) => {
  printerArr.map((printerId) => {
    // Tìm phần tử trong mảng `printers` có id tương ứng với printerId
    const foundPrinter = printers.find((printer) => printer.id === printerId);
    console.log(foundPrinter);
  });
}


export { deletePrinters, editPrinters, displayPrinter };
export default GetPrinters;
