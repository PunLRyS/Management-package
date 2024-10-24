"use client"; 
import { useState } from 'react';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddProductForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); // Trạng thái tìm kiếm
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const [product, setProduct] = useState({
    maHang: '',
    tenHang: '',
    moTa: '',
    soLuong: '',
    gia: '',
    ngayNhapHang: '', 
    nhaCungCap: {
      maNCC: '',
      tenNCC: '',
      diaChi: '',
      soDienThoai: ''
    }
  });

  const router = useRouter();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in product.nhaCungCap) {
      setProduct((prevState) => ({
        ...prevState,
        nhaCungCap: {
          ...prevState.nhaCungCap,
          [name]: value
        }
      }));
    } else {
      setProduct({
        ...product,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedProductList = [...productList];
      updatedProductList[editingIndex] = product;
      setProductList(updatedProductList);
      setEditingIndex(null); // Đặt lại chỉ số sau khi cập nhật
    } else {
      setProductList([...productList, product]);
    }
    resetForm();
    setIsOpen(false); // Đóng form sau khi lưu
  };

  const resetForm = () => {
    setProduct({
      maHang: '',
      tenHang: '',
      moTa: '',
      soLuong: '',
      gia: '',
      ngayNhapHang: '', 
      nhaCungCap: {
        maNCC: '',
        tenNCC: '',
        diaChi: '',
        soDienThoai: ''
      }
    });
  };

  const handleEdit = (index) => {
    setProduct(productList[index]);
    setEditingIndex(index);
    setIsOpen(true); // Mở form khi sửa
  };

  const handleDelete = (index) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      setProductList(productList.filter((_, i) => i !== index));
    }
  };

  // Hàm xử lý tìm kiếm
  const filteredProducts = productList.filter(item => 
    item.tenHang.toLowerCase().includes(searchTerm.toLowerCase()) || // Tìm theo tên hàng
    item.maHang.toLowerCase().includes(searchTerm.toLowerCase())   // Tìm theo mã hàng
  );

  const handleConfirmSend = () => {
    localStorage.setItem('productList', JSON.stringify(productList));
    // Chuyển hướng đến trang billproduct và truyền dữ liệu sản phẩm
    router.push('/im_package/BillProduct');
    setProductList([]);
  };

  return (
    <div className="flex flex-col space-y-4 mt-8">
        <h1 className="text-2xl font-bold mr-4 text-center">Hãy thêm hàng hóa bạn cần nhập tại đây</h1> 
        <div class="w-full flex justify-center">
          <div class="w-3/5 border-t-2 border-blue-700"></div>
        </div>
      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full mt-4 shadow-sm focus:outline-none focus:border-blue-500 focus:border-2"
      />

      <button
          className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-lg w-[50%] mx-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Quay lại' : 'Hãy thêm sản phẩm tại đây'}
      </button>

      {isOpen && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4 text-blue-500">Thêm sản phẩm</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Mã hàng</label>
                <input
                  type="text"
                  name="maHang"
                  value={product.maHang}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Tên hàng</label>
                <input
                  type="text"
                  name="tenHang"
                  value={product.tenHang}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium">Mô tả</label>
                <textarea
                  name="moTa"
                  value={product.moTa}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Số lượng</label>
                <input
                  type="number"
                  name="soLuong"
                  value={product.soLuong}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Giá</label>
                <input
                  type="number"
                  name="gia"
                  value={product.gia}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
             
              <div className="col-span-2">
                <h3 className="text-lg font-semibold mb-2 text-blue-500">Nhà cung cấp</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Mã nhà cung cấp</label>
                    <input
                      type="text"
                      name="maNCC"
                      value={product.nhaCungCap.maNCC}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Tên nhà cung cấp</label>
                    <input
                      type="text"
                      name="tenNCC"
                      value={product.nhaCungCap.tenNCC}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Địa chỉ cung cấp</label>
                    <input
                      type="text"
                      name="diaChi"
                      value={product.nhaCungCap.diaChi}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Số điện thoại</label>
                    <input
                      type="text"
                      name="soDienThoai"
                      value={product.nhaCungCap.soDienThoai}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded w-full"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
               <div>
                  <label className="block text-sm font-medium">Ngày nhập hàng</label>
                  <input
                    type="date"
                    name="ngayNhapHang"
                    value={product.ngayNhapHang}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="style-button"
                >
                  {editingIndex !== null ? 'Cập nhật' : 'Lưu thông tin '}
                </button>
            </div>
          </form>
        </div>
      )}
      {filteredProducts.length === 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-500">Không có sản phẩm phù hợp với tìm kiếm của bạn.</p>
        </div>
      )}
      {filteredProducts.length > 0 && ( // Sử dụng danh sách đã lọc
        <div className="mt-8 w-full">
          <div className="flex items-center">
          <h2 className="text-xl font-bold ml-4 text-blue-500">Danh sách sản phẩm</h2>
          <button
            className="ml-auto text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-lg mr-4"
            onClick={() => setConfirmationOpen(true)}>
            Gửi đơn hàng tới đại lý
          </button>
          </div>
          <div className="mt-4 space-y-4">
            {filteredProducts.map((item, index) => {
              const totalAmount = item.soLuong * item.gia; // Tính tổng số tiền
              return (
              <div key={index} className="bg-gray-200 p-4 rounded-md flex justify-between items-center">
                <div>
                  <p><strong>Ngày nhập hàng:</strong> {item.ngayNhapHang}</p>
                  <p><strong>Mã hàng:</strong> {item.maHang}</p>
                  <p><strong>Tên hàng:</strong> {item.tenHang}</p>
                  <p><strong>Mô tả:</strong> {item.moTa}</p>
                  <p><strong>Số lượng:</strong> {item.soLuong}</p>
                  <p><strong>Giá:</strong> {item.gia}</p>
                  <p><strong>Nhà cung cấp:</strong> {item.nhaCungCap.maNCC} - {item.nhaCungCap.tenNCC} - {item.nhaCungCap.diaChi} - {item.nhaCungCap.soDienThoai}</p>
                  <p><strong>Tổng số tiền:</strong> {totalAmount}</p> 
                </div>
                <div className="flex space-x-2">
                  <button
                    className="style-button"
                    onClick={() => handleEdit(index)}
                  >
                    Sửa
                  </button>
                  <button
                    className="style-button"
                    onClick={() => handleDelete(index)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
              );
  })}
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
}
