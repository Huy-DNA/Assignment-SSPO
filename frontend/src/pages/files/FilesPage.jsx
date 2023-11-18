import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faArrowUpFromBracket,
} from '@fortawesome/free-solid-svg-icons';

import images from '../../../assets/images/images';

function FilesPage() {
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
    <div>
      <div>
        <input placeholder="Tìm kiếm" />
        <button
          type="button"
          
     >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div>
        <FontAwesomeIcon icon={faArrowUpFromBracket} />
        <h3>Tải lên ảnh của bạn ở đây</h3>
      </div>
      <div>
        {
          FILES.map((file, index) => (
            <div key={index}>
              <img
                src={images.file}
                alt=""
                width={100}
                height={140}
              />
              <div>
                <h2>
                  Tên file: {file.title}
                </h2>
                <h3>
                  Loại file: {file.fileType}
                </h3>
                <h3>
                  Số trang: {file.numPages}
                </h3>
                <button>
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

export default FilesPage;
