import React from 'react';
import { useState } from 'react';

export default function PaymentMethod() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authen, setAuthen] = useState("");

  return (
    <div className="w-full mx-8">
      <h1 className="text-blue-900 my-6 font-bold text-3xl">
        THANH TOÁN
      </h1>
      <div className="w-[46rem] h-[30rem] mx-auto bg-blue-200 rounded-3xl">
        <div className="w-full flex justify-between">
          <div className="w-full flex justify-start flex-col mt-4 mb-3 ml-8">
            <div>
              <label className="font-medium mb-1 text-xl">Chọn ngân hàng bạn muốn thanh toán</label>
              <select
                id="role"
                className="input min-w-[42rem] min-h-[2.5rem] text-sm text-slate-500 rounded-lg"
                style={{ fontSize: '18px', padding: '6px' }}
              >
                <option style={{ fontSize: '18px', padding: '6px' }}>Chọn ngân hàng bạn muốn thanh toán</option>
                <option value="MB" style={{ fontSize: '18px', padding: '6px' }}>Ngân hàng MB Bank</option>
                <option value="OCB" style={{ fontSize: '18px', padding: '6px' }}>Ngân hàng OCB</option>
                <option value="VCB" style={{ fontSize: '18px', padding: '6px' }}>Ngân hàng Vietcombank</option>
                <option value="BIDV" style={{ fontSize: '18px', padding: '6px' }}>Ngân hàng BIDV</option>
                <option value="PVCB" style={{ fontSize: '18px', padding: '6px' }}>Ngân hàng PVCB</option>
              </select>
            </div>
            <div className="flex justify-between mt-8 mr-8">
              <div>
                <div className="font-medium mb-1 text-xl">Nhập username</div>
                <input
                  className="w-80 h-[41px] bg-white text-xl px-2 py-2 rounded-lg"
                  placeholder="Nhập username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

              </div>
              <div>
                <div className="font-medium mb-1 text-xl mr-8">Nhập password</div>
                <input
                  className="w-80 h-[41px] bg-white text-xl px-2 py-2 rounded-lg"
                  placeholder="Nhập password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

              </div>
            </div>
            <div className="w-[42rem] mt-6">
              <div className="font-medium mb-1 text-xl mr-8">Nhập mã xác thực</div>
              <input
                className="w-[42rem] h-[41px] bg-white text-xl px-2 py-2 rounded-lg"
                placeholder="Nhập mã xác thực gửi về điện thoại"
                value={authen}
                onChange={(e) => setAuthen(e.target.value)}
              />

            </div>
            <div className="w-[42rem] mt-6">
              Số tiền cần thanh toán: 200,000 VND
            </div>
            <div className="mr-8 mt-12 flex justify-between">
              <button className="w-32 h-10 bg-red-500 hover:cursor-pointer hover:bg-red-800 text-white text-xl rounded-lg">
                Hủy
              </button>
              <button className="w-32 h-10 bg-blue-600 hover:cursor:pointer hover:bg-blue-800 text-white text-xl rounded-lg">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
