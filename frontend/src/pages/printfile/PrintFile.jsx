import React from "react";


function PrintFile() {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-medium pl-80 pb-4">IN TÀI LIỆU</h1>
      <div className="w-[50rem] h-[40rem] mx-auto bg-blue-300 rounded-3xl">
        <div className="w-full flex justify-start items-center flex-col mt-1 mb-3">
          <label className="text-xs font-semibold mb-1">Vai trò</label>
          <select
            id="role"
            className="input min-w-[30rem] min-h-[2.5rem] text-sm text-slate-500"
          >
            <option>Chọn file đã tải lên</option>
            <option value="DSA">Cấu trúc dl&gt</option>
            <option value="MD">Mô hình hóa toán học</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default PrintFile;