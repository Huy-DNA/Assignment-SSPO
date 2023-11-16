import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faArrowUpFromBracket,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Upload.module.scss';
import images from '../../../assets/images/images';

const cx = classNames.bind(styles);

function Upload() {
  const FILES = [
    {
      title: 'Cấu trúc dữ liệu và giải thuật',
      fileType: 'PDF',
      numPages: '200',
    },
    {
      title: 'Cấu trúc dữ liệu và giải thuật',
      fileType: 'PDF',
      numPages: '200',
    },
    {
      title: 'Cấu trúc dữ liệu và giải thuật',
      fileType: 'PDF',
      numPages: '200',
    },
    {
      title: 'Cấu trúc dữ liệu và giải thuật',
      fileType: 'PDF',
      numPages: '200',
    },
    {
      title: 'Cấu trúc dữ liệu và giải thuật',
      fileType: 'PDF',
      numPages: '200',
    },
  ]
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
      <div className={cx('upload-file')}>
        <FontAwesomeIcon icon={faArrowUpFromBracket} className={cx('upload-icon')}/>
        <h3 className={cx('upload-context')}>Tải lên ảnh của bạn ở đây</h3>
      </div>
      <div className={cx('file-uploaded')}>
        {
          FILES.map((file, index) => (
            <div key={index} className={cx('file-item')}>
              <img
                className={cx('file-image')}
                src={images.file}
                alt=""
                width={100}
                height={140}
              />
              <div className={cx('file-context')}>
                <h2 className={cx('file-context-header')}>
                  Tên file: {file.title}
                </h2>
                <h3 className={cx('file-context-body')}>
                  Loại file: {file.fileType}
                </h3>
                <h3 className={cx('file-context-body')}>
                  Số trang: {file.numPages}
                </h3>
                <button className={cx('delete-file-btn')}>
                  Xóa file
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Upload;