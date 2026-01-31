
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, DollarSign, AlertCircle, CheckCircle, Clock, Loader2 } from 'lucide-react';

const Tuition: React.FC = () => {
  const { tuitionBills, payTuition, userBalance } = useApp();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const unpaidTotal = tuitionBills
    .filter(b => b.status === 'unpaid' || b.status === 'overdue')
    .reduce((sum, b) => sum + b.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400';
      case 'unpaid': return 'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/30 dark:border-orange-800 dark:text-orange-400';
      case 'overdue': return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400';
      default: return 'text-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Đã đóng';
      case 'unpaid': return 'Chưa đóng';
      case 'overdue': return 'Quá hạn';
      default: return '';
    }
  };

  const handlePayment = (bill: any) => {
    if (userBalance < bill.amount) {
      alert("Số dư VNU Pay không đủ để thanh toán. Vui lòng nạp thêm tiền.");
      return;
    }

    if (window.confirm(`Xác nhận thanh toán ${formatCurrency(bill.amount)} cho ${bill.semester}?`)) {
      setProcessingId(bill.id);
      setTimeout(() => {
        const success = payTuition(bill.id);
        setProcessingId(null);
        if (success) {
          alert("Thanh toán thành công!");
        } else {
          alert("Thanh toán thất bại. Vui lòng thử lại.");
        }
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 px-4 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <CreditCard className="w-7 h-7 text-indigo-600 dark:text-indigo-400" /> Học Phí
        </h1>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
        <p className="text-indigo-100 text-sm font-medium mb-1">Tổng dư nợ hiện tại</p>
        <h2 className="text-4xl font-bold mb-4">{formatCurrency(unpaidTotal)}</h2>
        
        <p className="text-xs text-indigo-200">
          Số dư VNU Pay: {formatCurrency(userBalance)}
        </p>
      </div>

      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 px-1">Danh sách hóa đơn</h3>

      <div className="space-y-4">
        {tuitionBills.map((bill) => (
          <div key={bill.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5 transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">{bill.semester}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{bill.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(bill.status)}`}>
                {getStatusLabel(bill.status)}
              </span>
            </div>
            
            <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-50 dark:border-slate-700">
               <div className="flex flex-col">
                 <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                   <Clock className="w-4 h-4" />
                   <span>Hạn: {bill.deadline}</span>
                 </div>
                 <span className="text-xl font-bold text-gray-800 dark:text-white">
                   {formatCurrency(bill.amount)}
                 </span>
               </div>

               {bill.status !== 'paid' && (
                 <button 
                   onClick={() => handlePayment(bill)}
                   disabled={processingId === bill.id}
                   className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
                 >
                   {processingId === bill.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <DollarSign className="w-4 h-4" />}
                   Thanh toán
                 </button>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tuition;
