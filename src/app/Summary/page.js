"use client";

import { useEffect, useState } from 'react';

const SummaryPage = () => {
  const [savedGood, setSavedGood] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu hàng hóa đã lưu từ localStorage
    const goodData = localStorage.getItem('selectedGood');
    if (goodData) {
      setSavedGood(JSON.parse(goodData));
    }
  }, []);

  if (!savedGood) {
    return <div>Không có dữ liệu để hiển thị.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Thông tin đơn hàng đã lưu</h2>
      <p><strong>Hàng hóa:</strong> {savedGood.name}</p>
      <p><strong>Số lượng:</strong> {savedGood.quantity}</p>
      <p><strong>Đơn giá:</strong> {savedGood.price} VNĐ</p>
    </div>
  );
};

export default SummaryPage;
