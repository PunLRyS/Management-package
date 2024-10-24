"use client";
import { useEffect, useState } from "react";
import { Inventory_dataMock as dataMock } from "./Mock/Inventory_data";

export default function Inventory() {
  const [localProducts, setLocalProducts] = useState([]);
  
  useEffect(() => {
    // Lấy danh sách sản phẩm từ localStorage
    const storedProducts = localStorage.getItem('productList');
    if (storedProducts) {
      setLocalProducts(JSON.parse(storedProducts));
    }
  }, []);

  // Kết hợp dữ liệu từ dataMock và localStorage
  const combinedData = [...dataMock.posts, ...localProducts];
  // Tính tổng giá trị hàng hóa
  const totalValue = dataMock.posts.reduce((total, item) => {
    return total + (item.soLuong * item.gia);
  }, 0);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center text-blue-800">Danh sách hàng hóa</h1>
      <div className="overflow-x-auto mt-4">
        <table className="bg-white border border-blue-400 w-full">
          <thead>
            <tr className="bg-blue-200">
              <th className="border border-blue-400 p-2 text-blue-800">Số thứ tự</th>
              <th className="border border-blue-400 p-2 text-blue-800">Mã hàng</th>
              <th className="border border-blue-400 p-2 text-blue-800">Tên hàng</th>
              <th className="border border-blue-400 p-2 text-blue-800">Mã đại lý</th>
              <th className="border border-blue-400 p-2 text-blue-800">Tên đại lý</th>
              <th className="border border-blue-400 p-2 text-blue-800">Địa chỉ đại lý</th>
              <th className="border border-blue-400 p-2 text-blue-800">Số điện thoại</th>
              <th className="border border-blue-400 p-2 text-blue-800">Số lượng</th>
              <th className="border border-blue-400 p-2 text-blue-800">Giá</th>
              <th className="border border-blue-400 p-2 text-blue-800">Tổng giá</th>
            </tr>
          </thead>
          <tbody>
            {combinedData.map((item, index) => {
              const totalAmount = item.soLuong * item.gia; // Tính tổng giá cho từng sản phẩm
              return (
                <tr key={item.id} className="hover:bg-blue-100">
                  <td className="border border-blue-400 p-2 text-center">{index + 1}</td>
                  <td className="border border-blue-400 p-2">{item.maHang}</td>
                  <td className="border border-blue-400 p-2">{item.tenHang}</td>
                  <td className="border border-blue-400 p-2">{item.nhaCungCap.maNCC}</td>
                  <td className="border border-blue-400 p-2">{item.nhaCungCap.tenNCC}</td>
                  <td className="border border-blue-400 p-2">{item.nhaCungCap.diaChi}</td>
                  <td className="border border-blue-400 p-2">{item.nhaCungCap.soDienThoai}</td>
                  <td className="border border-blue-400 p-2 text-center">{item.soLuong}</td>
                  <td className="border border-blue-400 p-2 text-right">{item.gia}</td>
                  <td className="border border-blue-400 p-2 text-right">{totalAmount}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="9" className="border border-blue-400 p-2 text-right font-bold">Tổng giá trị hàng hóa:</td>
              <td className="border border-blue-400 p-2 text-right">{totalValue}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
