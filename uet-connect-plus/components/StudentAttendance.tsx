
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { QrCode, Camera, CheckCircle, XCircle, Search } from 'lucide-react';

const StudentAttendance: React.FC = () => {
  const { activeAttendanceCode } = useApp();
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<'idle' | 'success' | 'fail'>('idle');
  const [manualCode, setManualCode] = useState('');

  // Simulate scanning process
  const startScan = () => {
    setIsScanning(true);
    setScanStatus('idle');
    setTimeout(() => {
       // Mock logic: If a code exists in context, assume we found it.
       // In a real app, the camera would read a string.
       if (activeAttendanceCode) {
         setScanStatus('success');
       } else {
         setScanStatus('fail');
       }
       setIsScanning(false);
    }, 2500);
  };

  const handleManualSubmit = () => {
    if (manualCode === activeAttendanceCode && activeAttendanceCode) {
      setScanStatus('success');
    } else {
      setScanStatus('fail');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 px-4 pt-6">
       <div className="flex items-center justify-between mb-6">
         <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
           <QrCode className="w-7 h-7 text-blue-600" /> Điểm Danh
         </h1>
       </div>

       {scanStatus === 'success' ? (
         <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-3xl p-8 text-center animate-in zoom-in">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">Điểm danh thành công!</h2>
            <p className="text-green-600 dark:text-green-300">Bạn đã xác nhận tham gia lớp học.</p>
            <button 
              onClick={() => { setScanStatus('idle'); setManualCode(''); }}
              className="mt-6 text-green-700 dark:text-green-400 font-bold hover:underline"
            >
              Quay lại
            </button>
         </div>
       ) : (
         <div className="space-y-6">
            {/* Scanner Viewfinder */}
            <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl relative h-80 flex flex-col items-center justify-center">
               {isScanning ? (
                 <>
                   <div className="absolute inset-0 bg-black/50 z-10"></div>
                   <div className="relative z-20 w-64 h-64 border-2 border-blue-500/50 rounded-2xl flex items-center justify-center">
                      <div className="w-full h-0.5 bg-red-500 absolute top-0 animate-[scan_2s_infinite]"></div>
                      <p className="text-white/80 text-xs mt-32">Đang tìm mã QR...</p>
                   </div>
                 </>
               ) : (
                 <div className="text-center p-6">
                    <Camera className="w-16 h-16 text-gray-600 mb-4 mx-auto" />
                    <p className="text-gray-400 mb-6">Hướng camera về phía mã QR của giảng viên</p>
                    <button 
                      onClick={startScan}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95"
                    >
                      Bắt đầu quét
                    </button>
                 </div>
               )}
            </div>

            {scanStatus === 'fail' && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3 animate-pulse">
                 <XCircle className="w-5 h-5" />
                 <span className="font-bold text-sm">Không tìm thấy mã hoặc mã không hợp lệ!</span>
              </div>
            )}

            {/* Manual Entry */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
               <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                 <Search className="w-4 h-4" /> Nhập mã thủ công
               </h3>
               <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    placeholder="Nhập mã 6 số..." 
                    className="flex-1 bg-gray-50 dark:bg-slate-900 dark:text-white border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-mono text-center tracking-widest text-lg"
                    maxLength={6}
                  />
                  <button 
                    onClick={handleManualSubmit}
                    disabled={manualCode.length < 6}
                    className="bg-gray-900 dark:bg-slate-700 text-white px-6 rounded-xl font-bold disabled:opacity-50"
                  >
                    Gửi
                  </button>
               </div>
            </div>
         </div>
       )}
       
       <style>{`
         @keyframes scan {
           0% { top: 0; }
           50% { top: 100%; }
           100% { top: 0; }
         }
       `}</style>
    </div>
  );
};

export default StudentAttendance;
