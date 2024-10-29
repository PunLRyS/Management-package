'use client'; // Với App Router trong Next.js 13+, cần 'use client' nếu dùng useEffect

import Nav_bar from '@/app/components/Nav/Nav_bar';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BillExport() {
  const [exportedItems, setExportedItems] = useState([]);
  const [selectedDealers, setSelectedDealers] = useState([]);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage của các đại lý
    const dealersData = localStorage.getItem('selectedDealersData');
    if (dealersData) {
      setSelectedDealers(JSON.parse(dealersData));
    }
  }, []);


  // Lấy dữ liệu từ localStorage khi trang được render
  useEffect(() => {
    const items = localStorage.getItem('exportedItems');
    if (items) {
      setExportedItems(JSON.parse(items));
    }
  }, []);

  const totalPayment = exportedItems.reduce((total,item) => {
    return total + item.soLuong * item.gia;
  }, 0);

  return (
    <>
    <Nav_bar />
    <div className="flex flex-col space-y-4 mt-8 pt-16">
      <h1 className="text-2xl font-bold mr-4 text-center">Danh sách hàng đã xuất</h1>
      <div className="w-full flex justify-center">
        <div className="w-3/5 border-t-2 border-blue-700"></div>
      </div>
      {/* <ul>
        {exportedItems.map((item, index) => (
          <li key={index}>
            {item.tenHang} - {item.soLuong} - {item.gia.toLocaleString()} VNĐ
          </li>
        ))}
      </ul> */}
      {exportedItems.length === 0 ? (
        <div className="mt-8 text-center">
          <p className="text-gray-500">Không có sản phẩm nào được nhập.</p>
        </div>
      ) : (
        <div className="mt-8 w-full overflow-x-auto">
          <div className="flex justify-center my-4">
           <Link href="/ex_package/ListDLC">
              <button className="style-button ">
                Quay lại trang đại lý con
              </button>
            </Link>
          </div>
          <h2 className="text-xl font-bold text-blue-500 text-center">Danh sách sản phẩm</h2>
          <table className="min-w-full mt-4 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-200">
                <th className="border border-gray-300 p-2">Số thứ tự</th>
                <th className="border border-gray-300 p-2">Mã hàng</th>
                <th className="border border-gray-300 p-2">Tên hàng</th>
                <th className="border border-gray-300 p-2">Số lượng</th>
                <th className="border border-gray-300 p-2">Giá</th>
                <th className="border border-gray-300 p-2">Tổng giá</th>
              </tr>
            </thead>
            <tbody>
              {exportedItems.map((item, index) => {
                const totalAmount = item.soLuong * item.gia;
                return (
                  <tr key={index} className="bg-gray-100">
                    <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                    <td className="border border-gray-300 p-2 text-center">{item.maHang}</td>
                    <td className="border border-gray-300 p-2 text-center">{item.tenHang}</td>
                    <td className="border border-gray-300 p-2 text-center">{item.soLuong}</td>
                    <td className="border border-gray-300 p-2 text-right">{item.gia}</td>
                    <td className="border border-gray-300 p-2 text-right">{totalAmount}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" className="border border-gray-300 p-2 text-right font-bold">Tổng số tiền cần thanh toán:</td>
                <td className="border border-gray-300 p-2 text-right font-bold">{totalPayment}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
      <div>
      <h1 className="text-xl font-bold text-blue-500 text-center">Danh sách đại lý đã chọn</h1>
      {selectedDealers.length === 0 ? (
        <div className="mt-8 text-center">
        <p className="text-gray-500">Không có đại lý nào được chọn.</p>
        </div>
      ) : (
        <table className="min-w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-200">
              <th className="border border-gray-200 p-2">STT</th>
              <th className="border border-gray-200 p-2">Tên đại lý</th>
              <th className="border border-gray-200 p-2">Mã đại lý</th>
              <th className="border border-gray-200 p-2">Địa chỉ</th>
              <th className="border border-gray-200 p-2">SĐT</th>
            </tr>
          </thead>
          <tbody>
            {selectedDealers.map((item, index) => (
              <tr key={item.number}>
                <td className="border border-gray-200 p-2 text-center">{index + 1}</td>
                <td className="border border-gray-200 p-2 text-center">{item.name}</td>
                <td className="border border-gray-200 p-2 text-center">{item.code}</td>
                <td className="border border-gray-200 p-2 text-center">{item.address}</td>
                <td className="border border-gray-200 p-2 text-center">{item.sdt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
    </>
  );
}
