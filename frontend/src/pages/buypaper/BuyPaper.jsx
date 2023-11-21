import React from "react";
import images from "../../../assets/images/images";

function BuyPaper() {

  const PAPERS = [
    {
      title: '200 trang giấy in A4',
      price: '200k'
    },
    {
      title: '200 trang giấy in A4',
      price: '200k'
    },
    {
      title: '200 trang giấy in A4',
      price: '200k'
    },
    {
      title: '200 trang giấy in A4',
      price: '200k'
    },
    {
      title: '200 trang giấy in A4',
      price: '200k'
    },
    {
      title: '200 trang giấy in A4',
      price: '200k'
    },
    {
      title: '200 trang giấy in A4',
      price: '200k'
    },
    {
      title: '200 trang giấy in A4',
      price: '200k'
    },
    {
      title: '200 trang giấy in A4',
      price: '200k'
    },
  ]

  return (
    <div className="w-full mx-8">
      <h1 className="text-3xl font-semibold pl-8">MUA GIẤY IN</h1>
      <div className="w-full flex flex-wrap">
        {PAPERS.map((item, index) => (
          <div key={index} className="w-88 h-40 flex mx-8 my-8 py-2 px-8 rounded-lg bg-blue-100 hover:bg-blue-200 border border-solid border-gray-400 hover:cursor-pointer transform transition-transform hover:scale-105">
            <img src={images.paper} alt="Paper" className="w-32" />
            <div className="pl-8 pt-8">
              <h2 className="text-xl font-meidum">{item.title}</h2>
              <h2 className="text-lg font-medium">Giá: {item.price}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuyPaper;