import React from 'react';

const GoodList = ({ goods, onSelectGood }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {goods.length ? (
        goods.map((good) => (
          <div
            key={good.id}
            className="bg-gray-200 p-4 rounded-md cursor-pointer hover:bg-gray-300"
            onClick={() => onSelectGood(good)} // Xử lý sự kiện bấm chọn
          >
            <div><strong>Tên hàng hóa:</strong> {good.name}</div>
            <div><strong>Số lượng:</strong> {good.quantity}</div> 
            <div><strong>Giá:</strong> {good.price}</div> 
          </div>
        ))
      ) : (
        <div className="no-data col-span-3">
          <p>No goods available.</p>
        </div>
      )}
    </div>
  );
};

export default GoodList;
