"use client"
import React, { useState } from 'react';
import { Inventory_dataMock } from '../../im_package/SearchProduct/Mock/Inventory_data';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function InventoryTable() {
  // Khởi tạo các state cần thiết
  const [posts, setPosts] = useState(Inventory_dataMock.posts); // Danh sách hàng hóa
  const [isOpen, setIsOpen] = useState(false); // Trạng thái của popup xuất hàng
  const [selectedItem, setSelectedItem] = useState(null); // Mặt hàng được chọn để xuất
  const [quantity, setQuantity] = useState(''); // Số lượng hàng xuất
  const [price, setPrice] = useState(''); // Giá hàng xuất
  const [searchTerm, setSearchTerm] = useState(''); // Từ khóa tìm kiếm
  const [exportedItems, setExportedItems] = useState([]); // Danh sách hàng đã xuất
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const router = useRouter();

  // Hàm xử lý khi nhấn nút "Xuất hàng"
  const handleExportClick = (item) => {
    setSelectedItem(item); // Lưu mặt hàng được chọn
    setIsOpen(true); // Mở popup
    setIsEditing(false); // Thiết lập chế độ thêm mới
  };

  // Hàm xử lý khi đóng popup
  const handleClose = () => {
    setIsOpen(false); // Đóng popup
    setQuantity(''); // Đặt lại giá trị số lượng
    setPrice(''); // Đặt lại giá trị giá
    setSelectedItem(null); // Xóa mặt hàng đã chọn
  };

  // Hàm xử lý khi gửi thông tin xuất hàng
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
  
    const exportedQuantity = parseInt(quantity); // Chuyển đổi số lượng xuất sang số nguyên
    const exportedPrice = parseFloat(price); // Chuyển đổi giá xuất sang số thực
  
    if (isNaN(exportedQuantity) || isNaN(exportedPrice) || exportedQuantity <= 0 || exportedPrice <= 0) {
      alert('Số lượng và giá phải là số dương.');
      return;
    }

    if(!isEditing){
    const currentPost = posts.find(post => post.id === selectedItem.id);
  if (exportedQuantity > currentPost.soLuong) {
    alert(`Số lượng xuất không được vượt quá ${currentPost.soLuong}.`);
    return;
  }
}


    const updatedItem = {
      id: selectedItem.id,
      maHang: selectedItem.maHang,
      tenHang: selectedItem.tenHang,
      soLuong: exportedQuantity,
      gia: exportedPrice,
    };
  
    if (isEditing) {
      // Tìm hàng đã xuất trước đó
      const previousItem = exportedItems.find(item => item.id === selectedItem.id);
      const previousQuantity = previousItem ? previousItem.soLuong : 0;
  
      // Tính sự thay đổi số lượng
      const quantityDifference = previousQuantity - exportedQuantity;
  
      // Cập nhật số lượng trong danh sách hàng hóa
      const newPosts = posts.map(post =>
        post.id === selectedItem.id
          ? { ...post, soLuong: post.soLuong + quantityDifference }
          : post
      );
      setPosts(newPosts); // Cập nhật danh sách hàng hóa
  
      // Cập nhật danh sách hàng đã xuất
      setExportedItems(exportedItems.map(item =>
        item.id === selectedItem.id ? updatedItem : item
      ));
    } else {
      // Thêm mới vào danh sách hàng đã xuất
      setExportedItems([...exportedItems, updatedItem]);
  
      // Trừ số lượng xuất khỏi danh sách hàng hóa
      const newPosts = posts.map(post =>
        post.id === selectedItem.id
          ? { ...post, soLuong: post.soLuong - exportedQuantity }
          : post
      );
      setPosts(newPosts);
    }
  
    handleClose(); // Đóng popup
  };
  
  // Hàm xử lý khi nhấn nút "Sửa" trên mục đã xuất
  const handleEdit = (item) => {
    setSelectedItem(item); // Lưu mặt hàng được chọn
    setQuantity(item.soLuong); // Đặt số lượng hiện có vào input
    setPrice(item.gia); // Đặt giá hiện có vào input
    setIsOpen(true); // Mở popup
    setIsEditing(true); // Kích hoạt chế độ chỉnh sửa
  };

  // Hàm xử lý khi nhấn nút "Xóa" trên mục đã xuất
  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa không?')) {
      // Xác nhận xóa
      setExportedItems(exportedItems.filter(item => item.id !== id)); // Lọc và xóa mục
    }
  };

  // Lọc danh sách hàng hóa theo từ khóa tìm kiếm
  const filteredPosts = posts.filter(item =>
    item.tenHang.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.maHang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConfirmSend = () => {
    localStorage.setItem('exportedItems', JSON.stringify(exportedItems)); // Lưu vào localStorage
    router.push('/ex_package/BillExport'); // Điều hướng tới trang BillExport
  };

  ////////hàm khi có api/////////
  // const handleConfirmSend = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/api/exports', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(exportedItems), // Gửi dữ liệu về backend
  //     });
  
  //     if (!response.ok) {
  //       throw new Error('Không thể gửi dữ liệu xuất hàng!');
  //     }
  
  //     const result = await response.json(); // Phản hồi từ server (nếu có)
  //     console.log('Dữ liệu đã được gửi thành công:', result);
  
  //     // Điều hướng tới trang BillExport sau khi gửi thành công
  //     router.push('/ex_package/BillExport');
  //   } catch (error) {
  //     console.error('Lỗi khi gửi dữ liệu:', error);
  //     alert('Đã xảy ra lỗi khi gửi dữ liệu!');
  //   }
  // };

  return (
    <div>
      <div className="flex gap-x-4 my-4 justify-center">
      <Link href="/ex_package/ListDLC">
      <button className="style-button">
        Quay lại trang đại lý 
      </button>
      </Link>
      <Link href="/ex_package/BillExport">
      <button className="style-button">
        Xem hóa đơn xuất hàng tại đây
      </button>
      </Link>
      </div>
      <h1 className="text-xl text-blue-500 font-bold my-4 text-center">Danh sách hàng hóa</h1>

      {/* Input tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm theo mã hàng hoặc tên hàng"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật từ khóa tìm kiếm
        className="border border-gray-300 p-2 mb-4 w-full"
      />

      {/* Bảng danh sách hàng hóa */}
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">ID</th>
            <th className="border border-gray-200 p-2">Mã hàng</th>
            <th className="border border-gray-200 p-2">Tên hàng</th>
            <th className="border border-gray-200 p-2">Số lượng</th>
            <th className="border border-gray-200 p-2">Giá</th>
            <th className="border border-gray-200 p-2">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map(item => (
            <tr key={item.id}>
              <td className="border border-gray-200 p-2 text-center">{item.id}</td>
              <td className="border border-gray-200 p-2 text-center">{item.maHang}</td>
              <td className="border border-gray-200 p-2 text-center">{item.tenHang}</td>
              <td className="border border-gray-200 p-2 text-center">{item.soLuong}</td>
              <td className="border border-gray-200 p-2 text-center">{item.gia.toLocaleString()} VNĐ</td>
              <td className="border border-gray-200 p-2 text-center">
                <button
                  onClick={() => handleExportClick(item)} // Gọi hàm xuất hàng khi nhấn nút
                  className="style-button"
                  disabled={item.soLuong === 0} // Vô hiệu hóa nút nếu không còn hàng
                >
                  Xuất hàng
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bảng danh sách hàng đã xuất */}
      <div className="flex items-center w-[92%] mx-auto">
      <h2 className="text-xl font-bold my-4 text-blue-500">Danh sách hàng đã xuất</h2>
      <button
            className="ml-auto text-white bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded-lg mr-4"
            onClick={() => setConfirmationOpen(true)}>
            Ra bill xuất hàng
          </button>
        </div>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">ID</th>
            <th className="border border-gray-200 p-2">Mã hàng</th>
            <th className="border border-gray-200 p-2">Tên hàng</th>
            <th className="border border-gray-200 p-2">Số lượng</th>
            <th className="border border-gray-200 p-2">Giá</th>
            <th className="border border-gray-200 p-2">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {exportedItems.map(item => (
            <tr key={item.id}>
              <td className="border border-gray-200 p-2 text-center">{item.id}</td>
              <td className="border border-gray-200 p-2 text-center">{item.maHang}</td>
              <td className="border border-gray-200 p-2 text-center">{item.tenHang}</td>
              <td className="border border-gray-200 p-2 text-center">{item.soLuong}</td>
              <td className="border border-gray-200 p-2 text-center">{item.gia.toLocaleString()} VNĐ</td>
              <td className="border border-gray-200 p-2 text-center">
                <button
                  onClick={() => handleEdit(item)} // Gọi hàm chỉnh sửa khi nhấn nút
                  className="style-button"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(item.id)} // Gọi hàm xóa khi nhấn nút
                  className="style-button ml-2"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup nhập thông tin xuất hàng */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              Nhập thông tin xuất hàng cho {selectedItem.tenHang}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Số lượng:</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)} // Cập nhật số lượng
                  className="border border-gray-300 p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Giá:</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)} // Cập nhật giá
                  className="border border-gray-300 p-2 w-full"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="style-button">
                  Xác nhận
                </button>
                <button type="button" onClick={handleClose} className="style-button">
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {confirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Bạn có chắc chắn với thông tin của mình không?</h2>
            <div className="flex justify-end">
              <button 
                className="style-button mr-4" 
                onClick={() => setConfirmationOpen(false)}
              >
                Không
              </button>
              {/* <Link href={{ pathname: '/billproduct', query: { products: JSON.stringify(productList) } }}> */}

            <button 
              className="style-button"
              onClick={handleConfirmSend}
            >
              Có
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

