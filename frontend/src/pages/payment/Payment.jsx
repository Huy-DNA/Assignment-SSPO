import React from "react";

function PaymentMethod() {
  return (
    <div className="w-full mx-8">
      <h1 className="text-3xl font-semibold pl-40">CHỌN PHƯƠNG THỨC THANH TOÁN</h1>
      <div className="w-full pl-40">
        <div className="w-4/5 h-20 mt-8 text-2xl pt-[1.5rem] pl-4 bg-blue-200 rounded-xl hover:cursor-pointer hover:bg-blue-300">
          Thanh toán qua tài khoản ngân hàng
        </div>
        <div className="w-4/5 h-20 mt-8 text-2xl pt-[1.5rem] pl-4 bg-blue-200 rounded-xl hover:cursor-pointer hover:bg-blue-300">
          Thanh toán qua MoMo
        </div>
        <div className="w-4/5 h-20 mt-8 text-2xl pt-[1.5rem] pl-4 bg-blue-200 rounded-xl hover:cursor-pointer hover:bg-blue-300">
          Thanh toán qua ZaloPay
        </div>
        <div className="w-4/5 h-20 mt-8 text-2xl pt-[1.5rem] pl-4 bg-blue-200 rounded-xl hover:cursor-pointer hover:bg-blue-300">
          Thanh toán qua VNPay
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;