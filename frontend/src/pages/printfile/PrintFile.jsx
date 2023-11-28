import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

import images from "../../../assets/images/images";

function PrintFile() {
  let fileIndex;
  const [files, setFiles] = useState([]);
  const [fileToPrint, setFileToPrint] = useState({
    file: '',
    pageType: '',
    numberPage: '',
    idPrinter: '',
  });
  const [printers, setPrinters] = useState([])

  useEffect(() => {
    const getFiles = async () => axios.get('http://localhost:3000/api/files').then((response) => {
      setFiles(response.data.value);
    })
      .catch(error => {
        console.log(error)
      });

    getFiles();
  }, []);

  useEffect(() => {
    const getPrinters = async () => axios.get('http://localhost:3000/api/printers').then((response) => {
      setPrinters(response.data.value);
      console.log(response.data.value);
    })
      .catch(error => {
        console.log(error)
      });

    getPrinters();

  }, [])

  const getInfoFile = (fileName) => {
    return files.findIndex((value) => value.name === fileName);
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-medium pl-80 pb-4">IN TÀI LIỆU</h1>
      <div className="w-[50rem] h-[40rem] mx-auto bg-blue-200 rounded-3xl">
        <div className="w-full flex justify-between">
          <div className="w-full flex justify-start flex-col mt-4 mb-3 mx-8">
            <div>
              <label className="font-medium mb-1 text-xl">Chọn file để in</label>
              <select
                id="file"
                className="input w-full min-w-[30rem] min-h-[2.5rem] text-sm text-slate-500 rounded-lg"
                style={{ fontSize: '18px', padding: '6px' }}
                onChange={(e) => {
                  e.target.value === 'Chọn file đã tải lên' ? (
                    setFileToPrint({ ...fileToPrint, file: '' })
                  ) : (
                    setFileToPrint({ ...fileToPrint, file: e.target.value, numberPage: 44 })
                  );
                }}
              >
                <option style={{ fontSize: '18px', padding: '6px' }}>Chọn file đã tải lên</option>
                {
                  files && files.map((file, index) => (
                    <option value={file.name} key={file.id} style={{ fontSize: '18px', padding: '6px' }}>{file.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
        <div className="h-28 bg-white mx-8 my-8 rounded-lg flex">
          {
            fileToPrint.file ? (
              <div className="mt-2 ml-2 flex">
                <img src={images.file} className="w-24 h-24 mr-4" />
                <div className="">
                  <h2 className="font-medium text-2xl">{files[getInfoFile(fileToPrint.file)].name}</h2>
                  <h2 className="font-normal text-xl">Loại file: {files[getInfoFile(fileToPrint.file)].name.split('.').pop()}</h2>
                  <h2 className="font-normal text-xl">Số trang: 44</h2>
                </div>
              </div>
            ) : (
              <div className="mt-2 ml-2">
              </div>
            )
          }
        </div>
        <div className="mx-8">
          <div className="flex justify-between">
            <select
              id="role"
              className="w-3/8 input w-full min-h-[2.5rem] text-sm text-slate-500 rounded-lg mr-8"
              style={{ fontSize: '18px', padding: '6px' }}
              onChange={(e) => {
                setFileToPrint({ ...fileToPrint, pageType: e.target.value })
              }}
            >
              <option style={{ fontSize: '18px', padding: '6px' }}>Chọn số bản in muốn in</option>
              <option value="1" style={{ fontSize: '18px', padding: '6px' }}>1</option>
              <option value="2" style={{ fontSize: '18px', padding: '6px' }}>2</option>
              <option value="3" style={{ fontSize: '18px', padding: '6px' }}>3</option>
              <option value="4" style={{ fontSize: '18px', padding: '6px' }}>4</option>
            </select>
            <select
              id="role"
              className="w-3/8 input w-full min-h-[2.5rem] text-sm text-slate-500 rounded-lg ml-8"
              style={{ fontSize: '18px', padding: '6px' }}
              onChange={(e) => {
                setFileToPrint({ ...fileToPrint, pageType: e.target.value })
              }}
            >
              <option style={{ fontSize: '18px', padding: '6px' }}>Chọn khổ giấy in</option>
              <option value="A4" style={{ fontSize: '18px', padding: '6px' }}>A4</option>
              <option value="A3" style={{ fontSize: '18px', padding: '6px' }}>A3</option>
            </select>
          </div>
        </div>
        <div className="mx-8 flex justify-between mt-4">
          <div className="w-3/8">
            <div className="w-full font-medium mb-1 text-xl">Số trang giấy in</div>
            <div className="w-[337px] h-[41px] bg-white text-xl py-2 rounded-lg pl-32">
              {
                fileToPrint.file && fileToPrint.pageType === 'A4' ? (
                  fileToPrint.numberPage
                ) : (
                  fileToPrint.file && fileToPrint.pageType === 'A3' ? (
                    fileToPrint.numberPage * 2
                  ) : (
                    <></>
                  )
                )
              }
            </div>
          </div>
          <div className="w-3/8">
            <div className="w-full font-medium mb-1 text-xl">Số trang giấy in còn lại</div>
            <div className="w-[337px] h-[41px] bg-white text-xl py-2 rounded-lg align-top pl-32">
              200 trang
            </div>
          </div>
        </div>
        <div className="mx-8 mt-8">
          <label className="font-medium mb-1 text-xl">Chọn máy in</label>
          <select
            id="role"
            className="input w-full min-h-[2.5rem] text-sm text-slate-500 rounded-lg"
            style={{ fontSize: '18px', padding: '6px' }}
          >
            <option style={{ fontSize: '18px', padding: '6px' }}>Chọn máy in</option>
            {
              printers && printers.map((printer, index) => (
                <option value={printer.id} key={printer.id} style={{ fontSize: '18px', padding: '6px' }}>
                  {printer.campus} {printer.building} {printer.room}
                </option>
              ))
            }
          </select>
        </div>
        <div className="mx-8 mt-8 flex justify-between">
          <button className="w-32 h-10 bg-red-500 hover:cursor-pointer hover:bg-red-800 text-white text-xl rounded-lg">
            Hủy
          </button>
          <button className="w-32 h-10 bg-blue-600 hover:cursor:pointer hover:bg-blue-800 text-white text-xl rounded-lg">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrintFile;