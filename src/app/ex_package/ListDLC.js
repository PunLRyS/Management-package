"use client"; 
import React, { useState } from 'react';
import { ListDLC_dataMock as dataMock } from './Mock/ListDLC_data';
import GoodList from './GoodList';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const DataList = () => {
    const [data, setData] = useState(dataMock); // Lưu mock data trong state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGoods, setSelectedGoods] = useState(null);
  const [goodsSearchTerm, setGoodsSearchTerm] = useState('');
  const [selectedGood, setSelectedGood] = useState(null); // State để lưu hàng hóa được chọn
  const [quantity, setQuantity] = useState(''); // State để lưu số lượng
  const [price, setPrice] = useState(''); // State để lưu đơn giá

  const router = useRouter();

  const filteredPosts = dataMock.posts.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.number.includes(searchTerm) ||
    item.code.includes(searchTerm)
  );

  const handleSelectDealer = (goods) => {
    if (selectedGoods && selectedGoods === goods) {
      setSelectedGoods(null);
      setGoodsSearchTerm('');
    } else {
      setSelectedGoods(goods);
    }
  };

  const handleSelectGood = (good) => {
    if (selectedGood && selectedGood.id === good.id) {
      setSelectedGood(null);
      setQuantity('');
      setPrice('');
    } else {
      setSelectedGood(good);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedGoods = selectedGoods.map((good) => {
      if (good.id === selectedGood.id) {
        // Giảm số lượng và cập nhật giá
        return {
          ...good,
          quantity: good.quantity - parseInt(quantity),
          price: parseInt(price),
        };
      }
      return good;
    });

    // Cập nhật danh sách hàng hóa sau khi thay đổi
    const updatedData = data.posts.map((dealer) => {
      if (dealer.goods === selectedGoods) {
        return { ...dealer, goods: updatedGoods };
      }
      return dealer;
    });

    setData({ posts: updatedData }); // Cập nhật state data

    // Lưu thông tin vào localStorage (có thể thay bằng context hoặc API lưu server)
    localStorage.setItem(
      'selectedGood',
      JSON.stringify({ name: selectedGood.name, quantity, price })
    );

    // Chuyển hướng sang trang khác để xem chi tiết
    router.push('/ex_package/Summary');
  };


  return (
    <div>
      {/* Ô tìm kiếm đại lý */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm đại lý..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <div className="grid grid-rows-3 gap-4 mt-4">
        {filteredPosts.length ? (
          filteredPosts.map((item) => (  
            <div key={item.id} className="bg-gray-200 p-4 rounded-md flex space-x-4">
              <div><strong>Số thứ tự:</strong> {item.number}</div>
              <div><strong>Tên:</strong> {item.name}</div>
              <div><strong>Mã:</strong> {item.code}</div>
              <div><strong>Địa chỉ:</strong> {item.address}</div>
              <div><strong>SDT:</strong> {item.sdt}</div>
              <button
                className="style-button ml-auto"
                onClick={() => handleSelectDealer(item.goods)}
              >
                {selectedGoods && selectedGoods === item.goods ? 'Ẩn' : 'Xem'} 
              </button>
            </div>
          ))
        ) : (
          <div className="no-data col-span-3">
            <p>No posts available.</p>
          </div>
        )}
      </div>

      {/* Hiển thị danh sách hàng hóa khi có đại lý được chọn */}
      {selectedGoods && (
        <div className="mt-4">
          {/* Ô tìm kiếm hàng hóa */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Tìm kiếm hàng hóa..."
              value={goodsSearchTerm}
              onChange={(e) => setGoodsSearchTerm(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          {/* Danh sách hàng hóa */}
          <GoodList goods={selectedGoods.filter(good => 
            good.name.toLowerCase().includes(goodsSearchTerm.toLowerCase())
          )} onSelectGood={handleSelectGood} />

          {/* Hiển thị form khi chọn hàng hóa */}
          {selectedGood && (
            <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-bold mb-2">Thông tin đơn hàng</h3>
              <div>
                <p><strong>Hàng hóa:</strong> {selectedGood.name}</p>
                <label className="block text-sm font-medium">Số lượng</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">Đơn giá (VNĐ)</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Nhập đơn giá"
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="style-button"
                >
                  Lưu
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default DataList;
