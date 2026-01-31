
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building, Users, DollarSign, CheckCircle, Home } from 'lucide-react';

const Dormitory: React.FC = () => {
  const { dormRooms, myRegistration, registerDorm, userBalance } = useApp();
  const [selectedBuilding, setSelectedBuilding] = useState('All');
  const [registeringRoom, setRegisteringRoom] = useState<string | null>(null);
  const [months, setMonths] = useState(5); // Default 1 semester

  const buildings = ['All', ...Array.from(new Set(dormRooms.map(r => r.building)))];

  const filteredRooms = dormRooms.filter(r => selectedBuilding === 'All' || r.building === selectedBuilding);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleRegister = (roomId: string, price: number) => {
      const total = price * months;
      if (total > userBalance) {
          alert('Số dư VNU Pay không đủ để thanh toán phí nội trú.');
          return;
      }
      if (window.confirm(`Xác nhận đăng ký phòng này trong ${months} tháng với tổng phí ${formatCurrency(total)}?`)) {
          const success = registerDorm(roomId, months);
          if (success) {
              alert('Đăng ký thành công!');
              setRegisteringRoom(null);
          } else {
              alert('Đăng ký thất bại. Vui lòng thử lại.');
          }
      }
  };

  if (myRegistration) {
      return (
          <div className="w-full max-w-2xl mx-auto pb-24 px-4 pt-6 animate-in fade-in">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-3xl p-8 text-center">
                  <Home className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">Đã đăng ký thành công!</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Bạn hiện đang cư trú tại Ký túc xá ĐHQGHN.</p>
                  
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm text-left max-w-sm mx-auto space-y-3">
                      <div className="flex justify-between">
                          <span className="text-gray-500">Tòa nhà:</span>
                          <span className="font-bold">{myRegistration.building}</span>
                      </div>
                      <div className="flex justify-between">
                          <span className="text-gray-500">Kỳ học:</span>
                          <span className="font-bold">{myRegistration.semester}</span>
                      </div>
                      <div className="flex justify-between">
                          <span className="text-gray-500">Trạng thái:</span>
                          <span className="text-green-600 font-bold uppercase">{myRegistration.status}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 mt-2">
                          <span className="text-gray-500">Tổng phí đã đóng:</span>
                          <span className="text-blue-600 font-bold">{formatCurrency(myRegistration.totalFee)}</span>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 px-4 pt-6 animate-in fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Building className="w-7 h-7 text-indigo-600" /> Đăng Ký Ký Túc Xá
        </h1>
      </div>

      {/* Building Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
          {buildings.map(b => (
              <button
                key={b}
                onClick={() => setSelectedBuilding(b)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${selectedBuilding === b ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
              >
                  {b === 'All' ? 'Tất cả' : `Nhà ${b}`}
              </button>
          ))}
      </div>

      <div className="space-y-4">
          {filteredRooms.map(room => (
              <div key={room.id} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                      <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                              Phòng {room.roomNumber} <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-normal">Nhà {room.building}</span>
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {room.type === 'service' ? 'Phòng Dịch vụ (Điều hòa, NL)' : 'Phòng Chuẩn'} • {room.gender === 'male' ? 'Nam' : 'Nữ'}
                          </p>
                      </div>
                      <div className="text-right">
                          <p className="text-xl font-bold text-indigo-600">{formatCurrency(room.price)}</p>
                          <p className="text-xs text-gray-400">/tháng</p>
                      </div>
                  </div>

                  <div className="flex items-center gap-4 my-4">
                      <div className="flex-1 bg-gray-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${room.currentOccupancy >= room.maxOccupancy ? 'bg-red-500' : 'bg-green-500'}`} 
                            style={{ width: `${(room.currentOccupancy / room.maxOccupancy) * 100}%` }}
                          ></div>
                      </div>
                      <div className="text-xs font-bold text-gray-600 dark:text-gray-300 whitespace-nowrap">
                          {room.currentOccupancy} / {room.maxOccupancy} chỗ
                      </div>
                  </div>

                  {room.currentOccupancy < room.maxOccupancy ? (
                      registeringRoom === room.id ? (
                          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl mt-4 animate-in slide-in-from-top-2">
                              <p className="text-sm font-bold text-indigo-800 dark:text-indigo-300 mb-2">Chọn thời gian đăng ký:</p>
                              <div className="flex gap-2 mb-4">
                                  {[5, 10, 12].map(m => (
                                      <button 
                                        key={m}
                                        onClick={() => setMonths(m)}
                                        className={`flex-1 py-2 rounded-lg text-xs font-bold border ${months === m ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200'}`}
                                      >
                                          {m} tháng
                                      </button>
                                  ))}
                              </div>
                              <div className="flex justify-between items-center mb-4">
                                  <span className="text-sm text-gray-600">Tổng cộng:</span>
                                  <span className="text-lg font-bold text-indigo-700">{formatCurrency(room.price * months)}</span>
                              </div>
                              <div className="flex gap-2">
                                  <button onClick={() => setRegisteringRoom(null)} className="flex-1 py-2 text-gray-500 font-bold hover:bg-gray-200 rounded-lg">Hủy</button>
                                  <button onClick={() => handleRegister(room.id, room.price)} className="flex-[2] py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-500/30">Thanh toán & Đăng ký</button>
                              </div>
                          </div>
                      ) : (
                          <button 
                            onClick={() => setRegisteringRoom(room.id)}
                            className="w-full py-3 mt-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                          >
                              Đăng ký ngay
                          </button>
                      )
                  ) : (
                      <button disabled className="w-full py-3 mt-2 bg-gray-100 text-gray-400 font-bold rounded-xl cursor-not-allowed">
                          Đã hết chỗ
                      </button>
                  )}
              </div>
          ))}
      </div>
    </div>
  );
};

export default Dormitory;
