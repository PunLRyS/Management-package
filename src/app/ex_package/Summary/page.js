"use client";
import React, { useEffect, useState } from "react";
import InventoryTable from "./InventoryTable";
import Nav_bar from "@/app/components/Nav/Nav_bar";

 export default function Summary() {
  const [selectedDealers, setSelectedDealers] = useState([]);
  const [dealers, setDealers] = useState([]); // Lưu trữ danh sách đại lý
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const dealersData = localStorage.getItem('selectedDealersData');
    if (dealersData) {
      setSelectedDealers(JSON.parse(dealersData));
    }
  }, []);

  return (
    <>
    <Nav_bar />
    <div className="pt-20">
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
                <td className="border border-gray-200 p-2 text-center">{item.ten}</td>
                <td className="border border-gray-200 p-2 text-center">{item.ma}</td>
                <td className="border border-gray-200 p-2 text-center">{item.diaChi}</td>
                <td className="border border-gray-200 p-2 text-center">{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <InventoryTable />
    </div>
    </>
  );
};

