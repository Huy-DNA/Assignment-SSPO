import React from "react";
import { useEffect } from "react";
import axios from 'axios';

function PrintFile() {

  useEffect(() => {
    axios.get('http://localhost:3000/api/files').then((data) => {
      console.log(data)
    })
      .catch(error => {
        console.log(error)
      });
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-medium pl-80 pb-4">IN TÀI LIỆU</h1>
      <div className="w-[50rem] h-[40rem] mx-auto bg-blue-200 rounded-3xl">
        <div className="w-full flex justify-between">
          <div className="w-4/6 flex justify-start flex-col mt-4 mb-3 ml-8">
            <div>
              <label className="font-medium mb-1 text-xl">Chọn file để in</label>
              <select
                id="role"
                className="input min-w-[30rem] min-h-[2.5rem] text-sm text-slate-500 rounded-lg"
                style={{ fontSize: '18px', padding: '6px' }}
              >
                <option style={{ fontSize: '18px', padding: '6px' }}>Chọn file đã tải lên</option>
                <option value="DSA" style={{ fontSize: '18px', padding: '6px' }}>Cấu trúc dl&gt</option>
                <option value="MD" style={{ fontSize: '18px', padding: '6px' }}>Mô hình hóa toán học</option>
              </select>
            </div>
          </div>
          <div className="w-1/5 h-[41px] text-xl font-medium py-2 px-[2.4rem] mt-[44px] bg-white mr-8 rounded-lg hover:cursor-pointer items-center hover:bg-gray-200">
            <button className="">Xác nhận</button>
          </div>
        </div>
        <div className="h-28 bg-white mx-8 my-8 rounded-lg"></div>
        <div className="mx-8">
          <label className="font-medium mb-1 text-xl">Chọn khổ giấy in in</label>
          <select
            id="role"
            className="input w-full min-h-[2.5rem] text-sm text-slate-500 rounded-lg"
            style={{ fontSize: '18px', padding: '6px' }}
          >
            <option style={{ fontSize: '18px', padding: '6px' }}>Chọn khổ giấy in</option>
            <option value="DSA" style={{ fontSize: '18px', padding: '6px' }}>A4</option>
            <option value="MD" style={{ fontSize: '18px', padding: '6px' }}>A3</option>
          </select>
        </div>
        <div className="mx-8 flex justify-between mt-8">
          <div>
            <div className="font-medium mb-1 text-xl">Số trang giấy in</div>
            <div className="w-3/8 h-[41px] bg-white text-xl px-20 py-2 rounded-lg">
              100 trang
            </div>
          </div>
          <div>
          <div className="font-medium mb-1 text-xl">Số trang giấy in còn lại</div>
            <div className="w-3/8 h-[41px] bg-white text-xl px-20 py-2 rounded-lg">
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
            <option value="Printer1" style={{ fontSize: '18px', padding: '6px' }}>Máy in 1 - H6-219</option>
            <option value="Printer2" style={{ fontSize: '18px', padding: '6px' }}>Máy in 2 - H2-123</option>
            <option value="Printer3" style={{ fontSize: '18px', padding: '6px' }}>Máy in 3 - H6-212</option>
            <option value="Printer4" style={{ fontSize: '18px', padding: '6px' }}>Máy in 4 - H2-122</option>
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