import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import images from '../../../assets/images/images';
import useNotification from '../../hooks/useNotification';
import { NotificationStatus } from '../../constants/notification';
import {
  CREATE_PRINTERJOB_URL, GET_CONFIGS_URL, GET_FILES_URL, GET_PRINTERS_URL, GET_USERS_URL,
} from '../../constants/url';
import extractAPIResponse from '../../utils/extractAPIResponse';

export default function PrintPage() {
  const notify = useNotification();
  const [files, setFiles] = useState([]);
  const [printers, setPrinters] = useState([]);
  const [infoUser, setInfoUser] = useState();
  const [pageSize, setPageSize] = useState();
  const [fileSelected, setFileSelected] = useState();
  const [fileToPrint, setFileToPrint] = useState({
    fileId: '',
    printerId: '',
    pageSize: '',
    copiesNo: 1,
    startPage: '',
    endPage: '',
    oneSided: false,
  });

  const isStartPageInvalid = fileSelected
    && fileSelected.pageNo
    && (fileToPrint.startPage === ''
      || (fileSelected.pageNo < fileToPrint.startPage
        || fileToPrint.startPage < 1
      ));
  const isEndPageInvalid = fileSelected
    && fileSelected.pageNo
    && (fileToPrint.endPage === ''
      || (fileSelected.pageNo < fileToPrint.endPage
        || fileToPrint.endPage < fileToPrint.startPage
        || fileToPrint.endPage < 0));
  const isCopiesNoInvalid = fileToPrint.copiesNo === '' || fileToPrint.copiesNo < 1;

  useEffect(() => {
    const cookieValue = Cookies.get('id');
    axios.get(`${GET_USERS_URL}/info/${cookieValue}`)
      .then(({ data }) => extractAPIResponse(data))
      .then(setInfoUser)
      .catch((e) => notify(NotificationStatus.ERR, e.message));
  }, []);

  useEffect(() => {
    axios.get(GET_FILES_URL)
      .then(({ data }) => extractAPIResponse(data))
      .then(setFiles)
      .catch((e) => notify(NotificationStatus.ERR, e.message));
  }, []);

  useEffect(() => {
    axios.get(`${GET_CONFIGS_URL}/pageSizes`)
      .then(({ data }) => extractAPIResponse(data))
      .then(setPageSize)
      .catch((e) => notify(NotificationStatus.ERR, e.message));
  }, []);

  useEffect(() => {
    axios.get(GET_PRINTERS_URL)
      .then(({ data }) => extractAPIResponse(data))
      .then(setPrinters)
      .catch((e) => notify(NotificationStatus.ERR, e.message));
  }, []);

  const getInfoFile = (fileId) => {
    const index = files.findIndex((value) => value.id === fileId);
    if (index !== -1) {
      const file = files[index];
      setFileSelected(file);
    }
  };

  const handleRequestPrintFile = () => {
    notify(NotificationStatus.WAITING);
    axios.post(CREATE_PRINTERJOB_URL, fileToPrint)
      .then(({ data }) => extractAPIResponse(data))
      .then(() => notify(NotificationStatus.OK, 'Successfully queue the printed file!.'))
      .then(() => {
        setFileSelected();
        setFileToPrint({
          fileId: '',
          printerId: '',
          pageSize: '',
          copiesNo: 1,
          startPage: '',
          endPage: '',
          oneSided: false,
        });
      })
      .catch((e) => notify(NotificationStatus.ERR, e.message));
  };

  return (
    <div className="w-full">
      <h1 className="text-blue-900 my-6 font-bold text-3xl">
        IN TÀI LIỆU
      </h1>
      <div className="w-[50rem] mx-auto bg-blue-200 rounded-3xl p-5">
        <div className="w-full flex justify-between">
          <div className="w-full flex justify-start flex-col mt-4 mb-3 mx-8">
            <div>
              <p className="font-medium mb-1 text-xl">
                Chọn file để in
              </p>
              <select
                id="file"
                className="input w-full min-w-[30rem] min-h-[2.5rem] text-sm text-slate-500 rounded-lg"
                style={{ fontSize: '18px', padding: '6px' }}
                onClick={(e) => {
                  setFileToPrint({ ...fileToPrint, fileId: e.target.value });
                  getInfoFile(e.target.value);
                }}
              >
                <option value="" style={{ fontSize: '18px', padding: '6px' }}>Chọn file đã tải lên</option>
                {
                  files && files.map((file) => (
                    <option value={file.id} key={file.id} style={{ fontSize: '18px', padding: '6px' }}>{file.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
        <div className="h-28 bg-white mx-8 my-8 rounded-lg flex">
          {
            fileToPrint.fileId ? (
              <div className="mt-2 ml-2 flex">
                <img src={images.file} className="w-24 h-24 mr-4" alt="" />
                <div className="">
                  <p className="font-medium text-2xl">{fileSelected && fileSelected.name}</p>
                  <p className="font-normal text-xl">
                    {`Loại file: ${fileSelected && fileSelected.name.split('.').pop()}`}
                  </p>
                  <p className="font-normal text-xl">
                    {`Số trang: ${fileSelected && fileSelected.pageNo}`}
                  </p>
                </div>
              </div>
            ) : (
              <>
              </>
            )
          }
        </div>
        <div className="flex justify-between items-center">
          <div className="w-2/5 ml-8">
            <p className="font-medium mb-1 text-xl">
              Chọn khổ giấy in
            </p>
            <select
              id="role"
              className="input w-full min-h-[2.5rem] text-sm text-slate-500 rounded-lg"
              style={{ fontSize: '18px', padding: '6px' }}
              onChange={(e) => {
                setFileToPrint({ ...fileToPrint, pageSize: e.target.value });
              }}
            >
              <option style={{ fontSize: '18px', padding: '6px' }}>Chọn khổ giấy in</option>
              {
                pageSize && pageSize.map((item) => (
                  <option value={item.id} key={item.id} style={{ fontSize: '18px', padding: '6px' }}>{item.name.toUpperCase()}</option>
                ))
              }
            </select>
          </div>
          <div className="w-2/5 mr-8">
            <p className="font-medium mb-1 text-xl">Chọn máy in</p>
            <select
              id="role"
              className="input w-full min-h-[2.5rem] text-sm text-slate-500 rounded-lg"
              style={{ fontSize: '18px', padding: '6px' }}
              onChange={(e) => {
                setFileToPrint({ ...fileToPrint, printerId: e.target.value });
              }}
            >
              <option value="" style={{ fontSize: '18px', padding: '6px' }}>Chọn máy in</option>
              {
                printers && printers.map((printer) => (
                  <option value={printer.id} key={printer.id} style={{ fontSize: '18px', padding: '6px' }}>
                    {
                      `Máy in số ${printer.code} - ${printer.campus}-${printer.building}-${printer.room}`
                    }
                  </option>
                ))
              }
            </select>
          </div>
        </div>
        <div className="flex justify-between items-center my-8">
          <div className="w-2/5 h-16 ml-8">
            <div className="font-medium mb-1 text-xl">Nhập trang bắt đầu</div>
            <input
              className="w-full h-[2.5rem] rounded-lg py-[1px] pl-2"
              placeholder="Trang bắt đầu"
              value={fileToPrint.startPage}
              onChange={(e) => setFileToPrint({
                ...fileToPrint,
                startPage: e.target.value === '' ? '' : Number.parseInt(e.target.value || 0, 10),
              })}
              type="number"
              disabled={!fileSelected}
            />
            {
              isStartPageInvalid
              && (
                <div className="font-normal text-base text-red-500">Giá trị bạn nhập vào không hợp lệ</div>
              )
            }
          </div>
          <div className="w-2/5 h-16 mr-8">
            <div className="font-medium mb-1 text-xl">Nhập trang kết thúc</div>
            <input
              className="w-full h-[2.5rem] rounded-lg py-[1px] pl-2"
              placeholder="Trang kết thúc"
              value={fileToPrint.endPage}
              onChange={(e) => setFileToPrint({
                ...fileToPrint,
                endPage: e.target.value === '' ? '' : Number.parseInt(e.target.value, 10),
              })}
              type="number"
              disabled={!fileSelected}
            />
            {
              isEndPageInvalid
              && (
                <div className="font-normal text-base text-red-500">Giá trị bạn nhập vào không hợp lệ</div>
              )
            }
          </div>
        </div>
        <div className="flex justify-between my-8">
          <div className="w-2/5 ml-8">
            <p className="font-medium mb-1 text-xl">Chọn số bản copy</p>
            <input
              id="role"
              className="input w-full min-h-[2.5rem] text-sm text-slate-500 rounded-lg"
              style={{ fontSize: '18px', padding: '6px' }}
              value={fileToPrint.copiesNo}
              onChange={(e) => {
                setFileToPrint({
                  ...fileToPrint,
                  copiesNo: e.target.value === '' ? '' : Number.parseInt(e.target.value || 0, 10),
                });
              }}
              type="number"
            />
            {
              isCopiesNoInvalid
              && (
                <div className="font-normal text-base text-red-500">Giá trị bạn nhập vào không hợp lệ</div>
              )
            }
          </div>
          <div className="w-2/5 mr-8">
            <div className="font-medium mb-1 text-xl">Chọn số mặt</div>
            <select
              id="sideNo"
              className="input w-full min-h-[2.5rem] text-sm text-slate-500 rounded-lg"
              style={{ fontSize: '18px', padding: '6px' }}
              value={fileToPrint.oneSided}
              onChange={(e) => setFileToPrint({ ...fileToPrint, oneSided: e.target.value })}
            >
              <option
                value={!false}
              >
                Một mặt
              </option>
              <option
                value={false}
              >
                Hai mặt
              </option>
            </select>
          </div>
        </div>
        <div className="flex justify-between my-8">
          <div className="w-2/5 mt-6 pt-2 ml-8 items-center flex">
            <div className="font-semibold">
              Số trang hiện có:
            </div>
            <div className="pl-1">
              {
                infoUser && infoUser.paperNo && (
                  infoUser.paperNo
                )
              }
            </div>
          </div>
        </div>
        <div className="mx-8 mt-8 flex justify-between">
          <button
            type="button"
            className="w-32 h-10 bg-blue-600 hover:cursor:pointer hover:bg-blue-800 text-white text-xl rounded-lg disabled:bg-blue-950 disabled:hover:cursor-default"
            onClick={handleRequestPrintFile}
            disabled={!fileSelected || isEndPageInvalid || isStartPageInvalid || isCopiesNoInvalid}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
