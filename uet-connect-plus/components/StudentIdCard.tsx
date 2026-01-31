
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Info, RotateCw, Shield, QrCode } from 'lucide-react';

const StudentIdCard: React.FC = () => {
  const { user, userBalance } = useApp();
  const [isFlipped, setIsFlipped] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Generate a mock barcode pattern
  const barcodePattern = "repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 4px, #000 4px, #000 5px, transparent 5px, transparent 7px, #000 7px, #000 10px, transparent 10px, transparent 12px)";

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
      {/* 3D Card Container */}
      <div 
        className="w-full aspect-[1.58/1] cursor-pointer group select-none relative perspective-1000" 
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* --- FRONT SIDE --- */}
          <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-200">
            
            {/* Background Texture & Watermark */}
            <div className="absolute inset-0 bg-[#f8fcf9]">
                {/* Guilloche-like pattern simulation */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #006233 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-5 pointer-events-none">
                    <Shield className="w-full h-full text-[#006233]" />
                </div>
            </div>

            {/* Green Header Strip */}
            <div className="h-[22%] bg-[#006233] relative flex items-center justify-between px-4 z-10">
               <div className="flex items-center gap-2.5">
                 {/* VNU Logo Placeholder */}
                 <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="font-serif font-bold text-[#006233] text-[10px]">VNU</span>
                 </div>
                 <div className="text-white">
                   <p className="text-[9px] font-bold uppercase leading-none tracking-wide">Đại học Quốc gia Hà Nội</p>
                   <p className="text-[7px] uppercase leading-none mt-0.5 opacity-90 font-medium">{user?.schoolName}</p>
                 </div>
               </div>
               {/* Bank Logo */}
               <div className="bg-white px-1.5 py-0.5 rounded shadow-sm">
                 <span className="font-black text-[#185596] text-[10px] tracking-tighter">BIDV</span>
               </div>
            </div>
            
            {/* Main Content Area */}
            <div className="flex p-4 gap-4 h-[78%] relative z-10">
               {/* Left Column: Photo & ID */}
               <div className="flex flex-col gap-1.5 w-[28%] flex-shrink-0">
                 <div className="relative w-full aspect-[3/4] bg-gray-100 border border-gray-300 shadow-inner overflow-hidden rounded-sm">
                   {user?.avatar ? (
                     <img src={user.avatar} alt="Student" className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-[8px]">NO PHOTO</div>
                   )}
                   {/* Verification Stamp */}
                   <div className="absolute -bottom-2 -right-2 w-10 h-10 border-2 border-red-600/60 rounded-full flex items-center justify-center rotate-[-15deg] opacity-70">
                      <div className="w-8 h-8 border border-red-600/40 rounded-full flex items-center justify-center">
                         <span className="text-[5px] font-bold text-red-600 uppercase text-center leading-[0.8]">ĐHQGHN<br/>Đã đối chiếu</span>
                      </div>
                   </div>
                 </div>
                 <div className="text-center bg-gray-50 rounded border border-gray-200 py-0.5">
                    <span className="block text-[6px] text-gray-500 uppercase font-bold">Mã sinh viên</span>
                    <span className="block text-[10px] font-mono font-bold text-gray-800 tracking-wide">{user?.id}</span>
                 </div>
               </div>
               
               {/* Right Column: Details */}
               <div className="flex-1 flex flex-col pt-1">
                  <h2 className="text-[#be1e2d] font-extrabold text-base uppercase leading-none tracking-tight mb-3">THẺ SINH VIÊN</h2>
                  
                  <div className="space-y-1.5 flex-1">
                     <div className="border-b border-gray-100 pb-1">
                       <p className="text-[8px] text-gray-500 uppercase font-bold leading-none mb-0.5">Họ và tên / Full name</p>
                       <p className="text-sm font-bold text-[#006233] uppercase leading-tight truncate">{user?.name}</p>
                     </div>
                     
                     <div className="flex gap-4">
                        <div className="flex-1">
                           <p className="text-[8px] text-gray-500 uppercase font-bold leading-none mb-0.5">Ngày sinh / DOB</p>
                           <p className="text-[10px] font-semibold text-gray-700">20/11/2003</p>
                        </div>
                        <div className="flex-1">
                           <p className="text-[8px] text-gray-500 uppercase font-bold leading-none mb-0.5">Lớp / Class</p>
                           <p className="text-[10px] font-semibold text-gray-700">QH-2021-I/CQ</p>
                        </div>
                     </div>

                     <div>
                       <p className="text-[8px] text-gray-500 uppercase font-bold leading-none mb-0.5">Ngành học / Major</p>
                       <p className="text-[10px] font-semibold text-gray-700 leading-tight line-clamp-1">Công nghệ thông tin (CN1)</p>
                     </div>
                     
                     <div>
                       <p className="text-[8px] text-gray-500 uppercase font-bold leading-none mb-0.5">Giá trị đến / Valid thru</p>
                       <p className="text-[10px] font-semibold text-gray-700">06/2025</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Holographic Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent pointer-events-none z-20 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-400/5 to-transparent pointer-events-none z-20"></div>
          </div>

          {/* --- BACK SIDE --- */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-2xl bg-[#f5f5f5] border border-gray-300">
             
             {/* Magnetic Stripe */}
             <div className="h-[18%] bg-[#2a2a2a] mt-4 w-full relative">
                <div className="absolute inset-0 opacity-20" style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #444 10px, #444 20px)' }}></div>
             </div>
             
             <div className="px-5 py-3 h-[calc(82%-16px)] flex flex-col">
                <div className="flex justify-between items-start gap-4 mb-2">
                   {/* Signature Strip */}
                   <div className="flex-1">
                      <div className="h-8 bg-white border border-gray-300 relative mb-1 flex items-center pl-2 overflow-hidden">
                         <span className="text-[6px] text-gray-300 absolute top-0.5 left-1 z-0">AUTHORIZED SIGNATURE</span>
                         <span className="font-[cursive] text-blue-900 text-sm relative z-10 ml-2 mt-1">{user?.name}</span>
                         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/linen.png')]"></div>
                      </div>
                      <p className="text-[7px] text-gray-500 text-center italic">Không chấp nhận thẻ nếu không có chữ ký</p>
                   </div>
                   {/* CVV Simulation */}
                   <div className="w-10 h-8 bg-white border border-gray-300 flex items-center justify-center font-mono text-[10px] italic text-gray-600">
                      123
                   </div>
                </div>

                {/* Info Text */}
                <div className="flex-1 flex gap-3">
                   <div className="flex-1 text-[7px] text-gray-500 text-justify leading-snug space-y-1">
                      <p>1. Thẻ này dùng để nhận diện sinh viên ra vào trường, thư viện và các khu vực khảo thí.</p>
                      <p>2. Thẻ đồng thời là thẻ ghi nợ nội địa liên kết với ngân hàng BIDV.</p>
                      <p>3. Nhặt được thẻ xin vui lòng gửi về Phòng CT&CTHSSV hoặc chi nhánh BIDV gần nhất.</p>
                      <p className="font-bold text-[#006233]">Hotline: 1900 9247</p>
                   </div>
                   <div className="w-16 flex flex-col items-center justify-end pb-1">
                      <div className="bg-white p-1 rounded border border-gray-200 mb-1">
                         <QrCode className="w-12 h-12 text-gray-800" />
                      </div>
                      <span className="text-[6px] text-gray-400 font-mono tracking-widest">SCAN ME</span>
                   </div>
                </div>

                {/* Bottom Barcode */}
                <div className="mt-auto h-8 w-full bg-white px-2 flex flex-col justify-center">
                   <div className="h-4 w-full" style={{ background: barcodePattern }}></div>
                   <div className="flex justify-between text-[7px] font-mono text-gray-600 mt-0.5">
                      <span>970418</span>
                      <span>{user?.id}</span>
                      <span>6868</span>
                   </div>
                </div>
             </div>
          </div>

        </div>
        
        {/* Flip Hint */}
        <div className="absolute top-3 right-3 z-30 animate-pulse">
           <div className="bg-black/10 hover:bg-black/20 text-gray-600 p-1.5 rounded-full backdrop-blur-sm transition-colors border border-white/50 shadow-sm">
              <RotateCw className="w-4 h-4" />
           </div>
        </div>
      </div>

      {/* Validity Note */}
      <div className="w-full bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl p-3 flex items-start gap-3 shadow-sm">
         <Info className="w-5 h-5 text-[#006233] dark:text-green-400 flex-shrink-0 mt-0.5" />
         <p className="text-xs text-green-900 dark:text-green-200 leading-relaxed text-justify">
           <span className="font-bold">Chứng nhận điện tử:</span> Thẻ này có giá trị pháp lý tương đương thẻ vật lý trong phạm vi ĐHQGHN.
         </p>
      </div>
      
      <style>{`
        .perspective-1000 { perspective: 1200px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default StudentIdCard;
