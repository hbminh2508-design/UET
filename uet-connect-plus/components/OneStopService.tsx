
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Clock, Plus, CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';

const SERVICES = [
  { id: 'sv1', name: 'Xin bảng điểm (Tiếng Việt)', cost: 10000 },
  { id: 'sv2', name: 'Xin bảng điểm (Tiếng Anh)', cost: 20000 },
  { id: 'sv3', name: 'Giấy xác nhận sinh viên', cost: 0 },
  { id: 'sv4', name: 'Cấp lại thẻ sinh viên', cost: 50000 },
  { id: 'sv5', name: 'Giấy giới thiệu thực tập', cost: 0 },
  { id: 'sv6', name: 'Phúc khảo bài thi', cost: 30000 },
];

const OneStopService: React.FC = () => {
  const { serviceRequests, createServiceRequest, userBalance } = useApp();
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleCreateRequest = () => {
    if (selectedService.cost > userBalance) {
        alert("Số dư VNU Pay không đủ để thanh toán phí dịch vụ.");
        return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
        const success = createServiceRequest(selectedService.name, selectedService.cost, note);
        setIsSubmitting(false);
        if (success) {
            alert("Gửi yêu cầu thành công!");
            setActiveTab('history');
            setNote('');
        } else {
            alert("Có lỗi xảy ra.");
        }
    }, 1000);
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'pending': return 'text-orange-500 bg-orange-50';
          case 'processing': return 'text-blue-500 bg-blue-50';
          case 'completed': return 'text-green-500 bg-green-50';
          case 'rejected': return 'text-red-500 bg-red-50';
          default: return 'text-gray-500';
      }
  };

  const getStatusLabel = (status: string) => {
      switch(status) {
          case 'pending': return 'Chờ xử lý';
          case 'processing': return 'Đang xử lý';
          case 'completed': return 'Hoàn thành';
          case 'rejected': return 'Từ chối';
          default: return status;
      }
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 px-4 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <FileText className="w-7 h-7 text-teal-600" /> Thủ Tục 1 Cửa
        </h1>
      </div>

      <div className="flex p-1 bg-gray-100 dark:bg-slate-800 rounded-xl mb-6">
          <button 
            onClick={() => setActiveTab('new')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'new' ? 'bg-white dark:bg-slate-700 shadow-sm text-teal-600 dark:text-teal-400' : 'text-gray-500'}`}
          >
              Gửi Yêu Cầu
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'history' ? 'bg-white dark:bg-slate-700 shadow-sm text-teal-600 dark:text-teal-400' : 'text-gray-500'}`}
          >
              Lịch Sử ({serviceRequests.length})
          </button>
      </div>

      {activeTab === 'new' ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 animate-in fade-in">
              <h3 className="font-bold text-gray-800 dark:text-white mb-4">Chọn loại thủ tục</h3>
              <div className="space-y-3 mb-6">
                  {SERVICES.map(service => (
                      <div 
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className={`p-4 rounded-xl border flex justify-between items-center cursor-pointer transition-all ${
                            selectedService.id === service.id 
                            ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' 
                            : 'border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
                        }`}
                      >
                          <span className={`font-medium ${selectedService.id === service.id ? 'text-teal-700 dark:text-teal-300' : 'text-gray-700 dark:text-gray-300'}`}>{service.name}</span>
                          <span className={`font-bold text-sm ${service.cost === 0 ? 'text-green-600' : 'text-orange-600'}`}>
                              {service.cost === 0 ? 'Miễn phí' : formatCurrency(service.cost)}
                          </span>
                      </div>
                  ))}
              </div>

              <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ghi chú thêm (Số lượng, lý do...)</label>
                  <textarea 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 h-24 resize-none"
                    placeholder="VD: Xin 2 bản sao, gửi về khoa..."
                  />
              </div>

              <div className="flex justify-between items-center border-t border-gray-100 dark:border-slate-700 pt-4">
                  <div>
                      <p className="text-xs text-gray-500">Phí dịch vụ</p>
                      <p className="text-xl font-bold text-orange-600">{formatCurrency(selectedService.cost)}</p>
                  </div>
                  <button 
                    onClick={handleCreateRequest}
                    disabled={isSubmitting}
                    className="bg-teal-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-teal-500/30 hover:bg-teal-700 transition-all active:scale-95 disabled:opacity-50"
                  >
                      {isSubmitting ? 'Đang gửi...' : 'Gửi Yêu Cầu'}
                  </button>
              </div>
          </div>
      ) : (
          <div className="space-y-4 animate-in fade-in">
              {serviceRequests.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                      Chưa có yêu cầu nào.
                  </div>
              ) : (
                  serviceRequests.map(req => (
                      <div key={req.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-slate-700">
                          <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-gray-800 dark:text-white">{req.serviceType}</h4>
                              <span className={`text-xs px-2 py-1 rounded font-bold ${getStatusColor(req.status)}`}>
                                  {getStatusLabel(req.status)}
                              </span>
                          </div>
                          <p className="text-xs text-gray-500 mb-2">Ngày gửi: {req.requestDate}</p>
                          {req.note && (
                              <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-slate-900 p-2 rounded-lg mb-2">
                                  "{req.note}"
                              </p>
                          )}
                          <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-50 dark:border-slate-700">
                              <span className="text-xs font-mono text-gray-400">{req.id}</span>
                              <span className="text-sm font-bold text-orange-600">{formatCurrency(req.cost)}</span>
                          </div>
                      </div>
                  ))
              )}
          </div>
      )}
    </div>
  );
};

export default OneStopService;
