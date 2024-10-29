"use client";
import Nav_bar from '@/app/components/Nav/Nav_bar';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BillProduct() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // Lấy danh sách sản phẩm từ localStorage
    const storedProducts = localStorage.getItem('productList');
    if (storedProducts) {
      setProductList(JSON.parse(storedProducts));
    }
  }, []);

  // Tính tổng số tiền cần thanh toán
  const totalPayment = productList.reduce((total, item) => {
    return total + item.soLuong * item.gia;
  }, 0);

  return (
    <>
    <Nav_bar />
    
    <div className="flex flex-col space-y-4 mt-8 pt-16">
      <h1 className="text-2xl font-bold mr-4 text-center">Danh sách sản phẩm đã nhập</h1>
      <div className="w-full flex justify-center">
        <div className="w-3/5 border-t-2 border-blue-700"></div>
      </div>

      <div className="mx-auto">
      <Link href="/im_package/AddProduct">
      <button className="style-button">
        Quay lại trang nhập hàng 
      </button>
      </Link>
      </div>
      {productList.length === 0 ? (
        <div className="mt-8 text-center">
          <p className="text-gray-500">Không có sản phẩm nào được nhập.</p>
        </div>
      ) : (
        <div className="mt-8 w-full overflow-x-auto">
          <h2 className="text-xl font-bold ml-4 text-blue-500">Danh sách sản phẩm</h2>
          <table className="min-w-full mt-4 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-200">
                <th className="border border-gray-300 p-2">Số thứ tự</th>
                <th className="border border-gray-300 p-2">Mã hàng</th>
                <th className="border border-gray-300 p-2">Tên hàng</th>
                <th className="border border-gray-300 p-2">Mã đại lý</th>
                <th className="border border-gray-300 p-2">Tên đại lý</th>
                <th className="border border-gray-300 p-2">Địa chỉ đại lý</th>
                <th className="border border-gray-300 p-2">Số điện thoại</th>
                <th className="border border-gray-300 p-2">Số lượng</th>
                <th className="border border-gray-300 p-2">Giá</th>
                <th className="border border-gray-300 p-2">Tổng giá</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((item, index) => {
                const totalAmount = item.soLuong * item.gia;
                return (
                  <tr key={index} className="bg-gray-100">
                    <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                    <td className="border border-gray-300 p-2 text-center">{item.maHang}</td>
                    <td className="border border-gray-300 p-2 text-center">{item.tenHang}</td>
                    <td className="border border-gray-300 p-2 text-center">{item.nhaCungCap.maNCC}</td>
                    <td className="border border-gray-300 p-2 text-center">{item.nhaCungCap.tenNCC}</td>
                    <td className="border border-gray-300 p-2 text-center">{item.nhaCungCap.diaChi}</td>
                    <td className="border border-gray-300 p-2 text-center">{item.nhaCungCap.soDienThoai}</td>
                    <td className="border border-gray-300 p-2 text-center">{item.soLuong}</td>
                    <td className="border border-gray-300 p-2 text-right">{item.gia}</td>
                    <td className="border border-gray-300 p-2 text-right">{totalAmount}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="9" className="border border-gray-300 p-2 text-right font-bold">Tổng số tiền cần thanh toán:</td>
                <td className="border border-gray-300 p-2 text-right">{totalPayment}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
    </>
  );
}
