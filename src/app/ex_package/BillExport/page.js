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

  // const fetchExportRecords = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/phieuxuat');
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     setExportRecords(data); // Giả sử API trả về mảng phiếu xuất
  //   } catch (error) {
  //     console.error('Error fetching records:', error);
  //   }
  // };

  // // Gọi API để lấy dữ liệu phiếu xuất khi component được render
  // useEffect(() => {
  //   fetchExportRecords();
  // }, []);

  // useEffect(() => {
  //   const handleSubmit = async () => {
  //     // Tạo đối tượng phiếu
  //     const newRecord = {
  //       ma: `PHIÊU_${exportRecords.length + 1}`, // Mã phiếu
  //       totalAmount: exportedItems.reduce((total, item) => total + item.soLuong, 0), // Tổng số lượng từ danh sách hàng hóa
  //       listPhieuXuatDaiLy: selectedDealers.map(dealer => ({
  //         id: dealer.id, // giả sử mỗi dealer có id
  //         maDaiLy: dealer.maDaiLy, // trường maDaiLy trong đại lý
  //         ten: dealer.ten, // tên đại lý
  //         phone: dealer.phone // điện thoại
  //       })),
  //       listPhieuXuatHangHoa: exportedItems.map(item => ({
  //         id: item.id, // giả sử mỗi hàng hóa có id
  //         ten: item.ten, // tên hàng hóa
  //         maHangHoa: item.maHangHoa, // mã hàng hóa
  //         soLuong: item.soLuong, // số lượng
  //         giaNhap: item.giaNhap // giá nhập
  //       }))
  //     };

  //     try {
  //       const response = await fetch('http://localhost:3000/phieuxuat/create', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Accept': '*/*'
  //         },
  //         body: JSON.stringify(newRecord)
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       // Lấy lại dữ liệu phiếu xuất mới
  //       await fetchExportRecords(); // Giả sử hàm này đã được định nghĩa ở đâu đó
  //       // Xóa dữ liệu đã xuất để chuẩn bị cho lần xuất tiếp theo
  //       setSelectedDealers([]);
  //       setExportedItems([]);
  //       localStorage.removeItem('selectedDealersData');
  //       localStorage.removeItem('exportedItems');
  //     } catch (error) {
  //       console.error('Error sai creating record:', error);
  //     }
  //   };

  //   // Gọi hàm handleSubmit nếu có dữ liệu để lưu
  //   if (exportedItems.length > 0 && selectedDealers.length > 0) {
  //     handleSubmit();
  //   }
  // }, [exportedItems, selectedDealers, exportRecords]);

  const totalPayment = exportedItems.reduce((total,item) => {
    return total + item.soLuong * item.giaNhap;
  }, 0);

  return (
    <>
    <Nav_bar />
    <div className="flex flex-col space-y-4 mt-8 pt-16">
      <h1 className="text-2xl font-bold mr-4 text-center">Hóa đơn xuất hàng</h1>
      <div className="w-full flex justify-center">
        <div className="w-3/5 border-t-2 border-blue-700"></div>
      </div>
    
      <div className="flex justify-center my-4">
           <Link href="/ex_package/ListDLC">
              <button className="style-button ">
                Quay lại trang đại lý con
              </button>
            </Link>
      </div>
      <p className="font-bold text-blue-700 text-xl">Phiếu hàng đã xuất 1</p>
      <div className="w-[95%] mx-auto">
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

      {exportedItems.length === 0 ? (
        <div className="mt-8 text-center">
          <p className="text-gray-500">Không có sản phẩm nào được nhập.</p>
        </div>
      ) : (
        <div className="mt-8 w-full overflow-x-auto">
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
                const totalAmount = item.soLuong * item.giaNhap;
                return (
                  <tr key={index} className="bg-gray-100">
                    <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                    <td className="border border-gray-300 p-2 text-center">{item.ma}</td>
                    <td className="border border-gray-300 p-2 text-center">{item.ten}</td>
                    <td className="border border-gray-300 p-2 text-center">{item.soLuong}</td>
                    <td className="border border-gray-300 p-2 text-right">{item.giaNhap}</td>
                    <td className="border border-gray-300 p-2 text-right">{totalAmount}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" className="border border-gray-300 p-2 text-right font-bold">Tổng số tiền thanh toán:</td>
                <td className="border border-gray-300 p-2 text-right">{totalPayment}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
    </div>
    </>
  );
}
