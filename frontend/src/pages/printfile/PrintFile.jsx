import React, { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import images from "../../../assets/images/images";

function PrintFile() {

  const [files, setFiles] = useState([]);
  const [printers, setPrinters] = useState([]);
  const [fileSelected, setFileSelected] = useState();
  const [fileToPrint, setFileToPrint] = useState({
    fileId: '',
    printerId: '',
    pageSize: '',
    copiesNo: 0,
    startPage: '',
    endPage: ''
  });

  useEffect(() => {
    const cookieValue = Cookies.get('id');
    console.log('Giá trị từ cookie:', cookieValue);
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/api/files').then((response) => {
      setFiles(response.data.value);
    })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/api/files').then((data) => {
      console.log(data)
      setFiles(data.data.value);
    })
      .catch((error) => {
        console.log(error)
      });

    getFiles();
  }, []);

  useEffect(() => {
    const getPrinters = async () => axios.get('http://localhost:3000/api/printers').then((response) => {
      setPrinters(response.data.value);
      console.log(response.data.value);
    })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  const getInfoFile = (fileId) => {
    const index = files.findIndex((value) => value.id === fileId);
    setFileSelected(files[index]);
  }

  const handleRequestPrintFile = () => {
    console.log(fileToPrint);
    axios.post('http://localhost:3000/api/printerJobs', fileToPrint).then((response) => {
      console.log(response);
    })
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-medium pl-80 pb-4">IN TÀI LIỆU</h1>
      <div className="w-[50rem] h-[41rem] mx-auto bg-blue-200 rounded-3xl">
        <div className="w-full flex justify-between">
          <div className="w-full flex justify-start flex-col mt-4 mb-3 mx-8">
            <div>
              <label className="font-medium mb-1 text-xl">Chọn file để in</label>
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
                  files && files.map((file, index) => (
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
                  <h2 className="font-medium text-2xl">{fileSelected && fileSelected.name}</h2>
                  <h2 className="font-normal text-xl">
                    Loại file:
                    {fileSelected && fileSelected.name.split('.').pop()}
                  </h2>
                  <h2 className="font-normal text-xl">Số trang: {fileSelected && fileSelected.pageNo}</h2>
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
            <label className="font-medium mb-1 text-xl">Chọn khổ giấy in</label>
            <select
              id="role"
              className="input w-full min-h-[2.5rem] text-sm text-slate-500 rounded-lg"
              style={{ fontSize: '18px', padding: '6px' }}
              onChange={(e) => {
                setFileToPrint({ ...fileToPrint, pageSize: e.target.value });
                console.log('render-render');
              }}
            >
              <option style={{ fontSize: '18px', padding: '6px' }}>Chọn khổ giấy in</option>
              <option value="A4" style={{ fontSize: '18px', padding: '6px' }}>A4</option>
              <option value="A3" style={{ fontSize: '18px', padding: '6px' }}>A3</option>
            </select>
          </div>
          <div className="w-2/5 mr-8">
            <label className="font-medium mb-1 text-xl">Chọn máy in</label>
            <select
              id="role"
              className="input w-full min-h-[2.5rem] text-sm text-slate-500 rounded-lg"
              style={{ fontSize: '18px', padding: '6px' }}
              onChange={(e) => {
                setFileToPrint({ ...fileToPrint, printerId: e.target.value })
              }}
            >
              <option value="" style={{ fontSize: '18px', padding: '6px' }}>Chọn máy in</option>
              {
                printers && printers.map((printer, index) => (
                  <option value={printer.id} key={printer.id} style={{ fontSize: '18px', padding: '6px' }}>{printer.campus} {printer.building} {printer.room}</option>
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
              onChange={(e) => setFileToPrint({ ...fileToPrint, startPage: e.target.value })}
            />
          </div>
          <div className="w-2/5 h-16 mr-8">
            <div className="font-medium mb-1 text-xl">Nhập trang kết thúc</div>
            <input
              className="w-full h-[2.5rem] rounded-lg py-[1px] pl-2"
              placeholder="Trang kết thúc"
              value={fileToPrint.endPage}
              onChange={(e) => setFileToPrint({ ...fileToPrint, endPage: e.target.value })}
            />
            {
              fileSelected && fileSelected.pageNo && fileToPrint.endPage && fileSelected.pageNo < fileToPrint.endPage ? (
                <div className="font-normal text-base">Giá trị bạn nhập vào không hợp lệ</div>
              ) : (
                <></>
              )
            }
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-2/5 ml-8">
            <label className="font-medium mb-1 text-xl">Chọn số bảng copy</label>
            <select
              id="role"
              className="input w-full min-h-[2.5rem] text-sm text-slate-500 rounded-lg"
              style={{ fontSize: '18px', padding: '6px' }}
              onChange={(e) => {
                setFileToPrint({ ...fileToPrint, copiesNo: e.target.value })
              }}
            >
              <option value="0" style={{ fontSize: '18px', padding: '6px' }}>Chọn số bảng copy</option>
              <option value="1" style={{ fontSize: '18px', padding: '6px' }}>1</option>
              <option value="2" style={{ fontSize: '18px', padding: '6px' }}>2</option>
              <option value="3" style={{ fontSize: '18px', padding: '6px' }}>3</option>
              <option value="4" style={{ fontSize: '18px', padding: '6px' }}>4</option>
            </select>
          </div>
          <div className="w-2/5 mt-6 mr-8">
            <div className="font-medium mb-1 text-base">
              Số trang giấy in:
              {
                fileToPrint.fileId && fileToPrint.pageSize === 'A4' ? (
                  (fileToPrint.endPage - fileToPrint.startPage)
                ) : (
                  fileToPrint.fileId && fileToPrint.pageSize === 'A3' ? (
                    (fileToPrint.endPage - fileToPrint.startPage) * 2
                  ) : (
                    <></>
                  )
                )
              }
            </div>
            <div className="font-medium mb-1 text-base">
              Số trang còn lại: 200
            </div>
          </div>
        </div>
        <div className="mx-8 mt-8 flex justify-between">
          <button className="w-32 h-10 bg-red-500 hover:cursor-pointer hover:bg-red-800 text-white text-xl rounded-lg">
            Hủy
          </button>
          <button
            className="w-32 h-10 bg-blue-600 hover:cursor:pointer hover:bg-blue-800 text-white text-xl rounded-lg"
            onClick={() => handleRequestPrintFile()}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrintFile;