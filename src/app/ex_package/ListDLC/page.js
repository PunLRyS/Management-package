"use client";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav_bar from "@/app/components/Nav/Nav_bar";
import Link from "next/link";

export default function ListDLC() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentDealer, setCurrentDealer] = useState(null);
  const [backendDLC, setBackendDLC] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newDealer, setNewDealer] = useState({
    ten: "",
    ma: "",
    diaChi: "",
    soDienThoai: "",
  });
  const [selectedDealers, setSelectedDealers] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchDLC = async () => {
      try {
        const response = await fetch('http://localhost:3000/nha-cung-cap'); // Thay đổi URL cho phù hợp với backend của bạn
        if (!response.ok) {
          throw new Error('Network response was not ok'); // Kiểm tra phản hồi
        }
        const data = await response.json(); // Chuyển đổi phản hồi sang JSON
        setBackendDLC(data); // Lưu dữ liệu vào state
      } catch (error) {
        setError(error); // Lưu lỗi vào state nếu có
      } finally {
        setLoading(false); // Đặt loading về false khi hoàn thành
      }
    };
  
    fetchDLC(); // Gọi hàm fetchData
  }, []);

  const filteredPosts = backendDLC.filter(
    (item) =>
      item.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.number?.includes(searchTerm) ||
      item.ma.includes(searchTerm)
  );

  const handleAddDealerSubmit = async (e) => {
    e.preventDefault();
    const maxNumber = backendDLC.length
      ? Math.max(...backendDLC.map((item) => parseInt(item.number, 10)))
      : 0;

    const newDealerData = {
      number: (maxNumber + 1).toString(),
      ...newDealer,
      goods: [],
    };

    try {
      // Gửi yêu cầu POST đến API để lưu đại lý mới
      const response = await fetch('http://localhost:3000/nha-cung-cap/create-dai-ly', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDealerData),
      });
  
      if (!response.ok) {
        throw new Error('Không thể thêm đại lý!');
      }
  
      // Nhận phản hồi từ API (nếu cần)
      const result = await response.json();
      console.log('Đại lý đã được lưu:', result);
      
    setBackendDLC((prevBackendDLC) => [...prevBackendDLC, newDealerData],
    );

    setShowAddForm(false);
    setNewDealer({
      ten: "",
      ma: "",
      diaChi: "",
      soDienThoai: "",
    });
  } catch (error) {
    console.error('Lỗi khi thêm đại lý:', error);
    alert('Đã xảy ra lỗi khi thêm đại lý!');
  }
  };

  const handleEditClick = (dealer) => {
    setCurrentDealer(dealer);
    setNewDealer({
      ten: dealer.ten,
      ma: dealer.ma,
      diaChi: dealer.diaChi,
      soDienThoai: dealer.soDienThoai,
    });
    setShowEditForm(true);
  };

  const handleEditDealerSubmit = (e) => {
    e.preventDefault();
    console.log('Current Dealer:', currentDealer);
    console.log('New Dealer Data:', newDealer);
    setBackendDLC((prevBackendDLC) => 
      prevBackendDLC.map((dealer) =>
        dealer.id === currentDealer.id ? { ...dealer, ...newDealer } : dealer
      ),
    );

    setShowEditForm(false);
    setCurrentDealer(null);
    setNewDealer({
      ten: "",
      ma: "",
      diaChi: "",
      soDienThoai: "",
    });
  };

  const handleDeleteClick = (dealerId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đại lý này không?")) {
      setBackendDLC((prevBackendDLC) => {
        return prevBackendDLC.filter((dealer) => dealer.id !== dealerId);
      });
    }
  };
  

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowAddForm(false);
      setShowEditForm(false);
    }
  };

  const handleDealerSelect = (dealerId) => {
    const updatedSelection = selectedDealers.includes(dealerId)
      ? selectedDealers.filter((id) => id !== dealerId)
      : [...selectedDealers, dealerId];
  
    setSelectedDealers(updatedSelection);
  
    // Lưu vào localStorage
    const selectedDealersData = backendDLC.filter(item => updatedSelection.includes(item.id));
    localStorage.setItem('selectedDealersData', JSON.stringify(selectedDealersData));
  };
  
//////////////////////khi có api/////////////////////////
  // const handleDealerSelect = async (dealerNumber) => {
  //   try {
  //     const updatedSelection = selectedDealers.includes(dealerNumber)
  //       ? selectedDealers.filter((num) => num !== dealerNumber)
  //       : [...selectedDealers, dealerNumber];
  
  //     setSelectedDealers(updatedSelection);
  
  //     // Lọc thông tin đại lý đã chọn
  //     const selectedDealersData = data.posts.filter(item =>
  //       updatedSelection.includes(item.number)
  //     );
  
  //     // Gửi dữ liệu về backend
  //     const response = await fetch('http://localhost:3000/api/dealers', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(selectedDealersData),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error('Không thể gửi dữ liệu đại lý!');
  //     }
  
  //     const result = await response.json();
  //     console.log('Dữ liệu đã được lưu thành công:', result);
  
  //   } catch (error) {
  //     console.error('Lỗi khi gửi dữ liệu:', error);
  //     alert('Đã xảy ra lỗi khi lưu dữ liệu đại lý!');
  //   }
  // };

  
  const handleExportGoods = () => {
    if (selectedDealers.length === 0) {
      alert("Vui lòng chọn ít nhất một đại lý để xuất hàng.");
      return;
    }
    // Chuyển hướng đến form xuất hàng ở đây
    router.push("/ex_package/Summary");
  };

  return (
    <>
    <Nav_bar />
    <div className="pt-20">
      <h className="flex justify-center text-2xl text-blue-700 py-4 font-bold">Quản lý xuất hàng</h>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm đại lý..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <div className="mb-4 flex justify-center items-center space-x-4">
        <button
          onClick={() => setShowAddForm(true)}
          className="style-button w-[25%]"
        >
          Thêm đại lý
        </button>
        <button
          onClick={handleExportGoods}
          className="style-button w-[25%]"
        >
          Xuất hàng cho đại lý
        </button>
        <Link href="/ex_package/BillExport">
          <button className="style-button ">
            Xem hóa đơn xuất hàng tại đây
          </button>
        </Link>
      </div>

      {showAddForm && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
          onClick={handleOverlayClick}
        >
          <form
            onSubmit={handleAddDealerSubmit}
            className="bg-white p-6 rounded shadow-md w-[90%] max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">Thêm đại lý mới</h2>
            <div>
              <label className="block mb-1">Tên đại lý:</label>
              <input
                type="text"
                value={newDealer.ten}
                onChange={(e) =>
                  setNewDealer({ ...newDealer, ten: e.target.value })
                }
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Mã đại lý:</label>
              <input
                type="text"
                value={newDealer.ma}
                onChange={(e) =>
                  setNewDealer({ ...newDealer, ma: e.target.value })
                }
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Địa chỉ:</label>
              <input
                type="text"
                value={newDealer.diaChi}
                onChange={(e) =>
                  setNewDealer({ ...newDealer, diaChi: e.target.value })
                }
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Số điện thoại:</label>
              <input
                type="text"
                value={newDealer.soDienThoai}
                onChange={(e) =>
                  setNewDealer({ ...newDealer, soDienThoai: e.target.value })
                }
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div className="mt-4">
              <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full">
                Thêm đại lý
              </button>
            </div>
          </form>
        </div>
      )}

      {showEditForm && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
          onClick={handleOverlayClick}
        >
          <form
            onSubmit={handleEditDealerSubmit}
            className="bg-white p-6 rounded shadow-md w-[90%] max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Sửa đại lý</h2>
            <div>
              <label className="block mb-1">Tên đại lý:</label>
              <input
                type="text"
                value={newDealer.ten}
                onChange={(e) =>
                  setNewDealer({ ...newDealer, ten: e.target.value })
                }
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Mã đại lý:</label>
              <input
                type="text"
                value={newDealer.ma}
                onChange={(e) =>
                  setNewDealer({ ...newDealer, ma: e.target.value })
                }
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Địa chỉ:</label>
              <input
                type="text"
                value={newDealer.diaChi}
                onChange={(e) =>
                  setNewDealer({ ...newDealer, diaChi: e.target.value })
                }
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Số điện thoại:</label>
              <input
                type="text"
                value={newDealer.soDienThoai}
                onChange={(e) =>
                  setNewDealer({ ...newDealer, soDienThoai: e.target.value })
                }
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div className="mt-4">
              <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full">
                Cập nhật đại lý
              </button>
            </div>
          </form>
        </div>
      )}

      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">Chọn</th>
            <th className="border border-gray-200 p-2">STT</th>
            <th className="border border-gray-200 p-2">Tên đại lý</th>
            <th className="border border-gray-200 p-2">Mã đại lý</th>
            <th className="border border-gray-200 p-2">Địa chỉ</th>
            <th className="border border-gray-200 p-2">SĐT</th>
            <th className="border border-gray-200 p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((item, index) => (
            <tr key={item.number}>
              <td className="border border-gray-200 p-2 text-center">
                <input
                  type="checkbox"
                  onChange={() => handleDealerSelect(item.id)}
                />
              </td>
              <td className="border border-gray-200 p-2">{index + 1}</td>
              <td className="border border-gray-200 p-2">{item.ten}</td>
              <td className="border border-gray-200 p-2">{item.ma}</td>
              <td className="border border-gray-200 p-2">{item.diaChi}</td>
              <td className="border border-gray-200 p-2">{item.soDienThoai}</td>
              <td className="border border-gray-200 p-2">
                <div className="flex justify-center space-x-2">
                <button
                  onClick={() => handleEditClick(item)}
                  className="style-button"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className="style-button"
                >
                  Xóa
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}
