
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RotateCw, ShieldCheck, Wifi, CreditCard, Building2, BookOpen, Gem, Sparkles } from 'lucide-react';

const PedagogicalCard: React.FC = () => {
  const { user, userBalance } = useApp();
  const [isFlipped, setIsFlipped] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Generate SHB-like BIN: 9704 18...
  const cardBin = "9704 1800"; 
  const cardLast = "6868";

  // Mock department data based on context
  const departmentInfo = user?.schoolCode === 'uet' ? 'KHOA CÔNG NGHỆ THÔNG TIN' : 'KHOA SƯ PHẠM';
  const majorCode = user?.schoolCode === 'uet' ? 'CN1 - 7480201' : 'SP1 - 7140201';

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Container with Vertical Aspect Ratio ~ 1 / 1.58 */}
      <div className="w-full max-w-[280px] aspect-[1/1.58] cursor-pointer group select-none relative perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* --- FRONT SIDE (Vertical SHB Style - Enhanced Patterns) --- */}
          <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#f36f21] via-[#d95508] to-[#9a3412] border border-orange-600/50 text-white">
             
             {/* 1. Complex Guilloche Pattern Background */}
             <div className="absolute inset-0 opacity-20 pointer-events-none" 
                  style={{ 
                    backgroundImage: `radial-gradient(circle at 100% 100%, transparent 10px, #ffffff 11px, transparent 12px), 
                                      radial-gradient(circle at 0% 0%, transparent 10px, #ffffff 11px, transparent 12px)`,
                    backgroundSize: '30px 30px'
                  }}>
             </div>

             {/* 2. Abstract Curves (Flowing Lines) */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[50%] w-[150%] h-[60%] border-[2px] border-yellow-400/20 rounded-[100%] transform rotate-12"></div>
                <div className="absolute top-[10%] -left-[40%] w-[150%] h-[50%] border-[2px] border-white/10 rounded-[100%] transform -rotate-12"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[200px] h-[200px] bg-yellow-500/10 rounded-full blur-3xl"></div>
             </div>
             
             {/* 3. Fine Texture Overlay */}
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/sativa.png')] pointer-events-none mix-blend-overlay"></div>

             {/* 4. Holographic Seal Simulation */}
             <div className="absolute top-1/2 right-0 w-24 h-24 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-30 transform -rotate-45 pointer-events-none"></div>

             <div className="relative h-full flex flex-col p-5 z-10">
                
                {/* Header: Logos */}
                <div className="flex justify-between items-start mb-4">
                   <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                         <div className="bg-white p-1 rounded-md shadow-lg border border-yellow-500/30">
                            <img src="https://cdn-icons-png.flaticon.com/512/9703/9703596.png" className="w-6 h-6" alt="VNU" />
                         </div>
                         <div className="leading-tight">
                            <p className="font-bold text-[10px] uppercase tracking-wider text-white drop-shadow-md">VNU</p>
                            <p className="font-bold text-[8px] uppercase text-yellow-200">Member Card</p>
                         </div>
                      </div>
                   </div>
                   {/* SHB Mock Logo */}
                   <div className="bg-white px-2 py-1 rounded shadow-lg border-b-2 border-orange-700">
                      <span className="font-black text-[#f36f21] text-lg tracking-tighter leading-none block">SHB</span>
                      <span className="text-[5px] text-[#005aab] font-bold uppercase block text-center leading-none tracking-widest">Solid Partners</span>
                   </div>
                </div>

                {/* School Name Banner */}
                <div className="mb-5 text-center relative">
                    <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
                    <div className="relative inline-block bg-[#d95508] px-3 py-1 rounded-full border border-yellow-500/30 shadow-sm">
                       <p className="font-bold text-[10px] uppercase leading-tight text-white tracking-wide">{user?.schoolName || 'ĐẠI HỌC QUỐC GIA HÀ NỘI'}</p>
                    </div>
                </div>

                {/* Main Content: Large Avatar with Gold Ring */}
                <div className="flex-1 flex flex-col items-center">
                   <div className="relative mb-3 group-hover:scale-105 transition-transform duration-500">
                      {/* Outer Glow */}
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-yellow-300 to-orange-600 opacity-70 blur-sm"></div>
                      
                      <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-sm border border-white/50 relative z-10">
                         <img 
                           src={user?.avatar} 
                           alt="Lecturer" 
                           className="w-full h-full rounded-full object-cover border-2 border-white shadow-inner" 
                         />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-1.5 rounded-full border-2 border-white shadow-lg z-20">
                         <ShieldCheck className="w-4 h-4" />
                      </div>
                   </div>

                   <h2 className="text-xl font-black uppercase text-center text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] mb-1 px-2 leading-tight font-serif tracking-wide">
                      {user?.name}
                   </h2>
                   
                   {/* Department & Major Code */}
                   <div className="flex flex-col items-center gap-1.5 mt-2 w-full">
                      <div className="bg-black/20 backdrop-blur-sm text-white text-[9px] font-bold uppercase px-3 py-1 rounded-sm border-l-2 border-r-2 border-yellow-500 flex items-center gap-1 w-full justify-center">
                        <Building2 className="w-3 h-3 text-yellow-400" /> {departmentInfo}
                      </div>
                      <div className="text-yellow-100 text-[8px] font-mono px-2 py-0.5 rounded flex items-center gap-1 opacity-90">
                        <BookOpen className="w-3 h-3" /> {majorCode}
                      </div>
                   </div>
                </div>

                {/* Footer: Card Number & Chip */}
                <div className="mt-auto pt-2">
                   <div className="flex justify-between items-center mb-3">
                      {/* Enhanced EMV Chip */}
                      <div className="w-11 h-8 bg-gradient-to-br from-[#eebc5d] via-[#f2d896] to-[#b78628] rounded-md border border-[#966b1c] relative overflow-hidden shadow-md">
                         <div className="absolute inset-0 border-[0.5px] border-black/20 rounded-[4px] m-[3px]"></div>
                         <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/20"></div>
                         <div className="absolute left-1/3 top-0 w-[1px] h-full bg-black/20"></div>
                         <div className="absolute left-2/3 top-0 w-[1px] h-full bg-black/20"></div>
                      </div>
                      <Wifi className="w-6 h-6 text-white/90 rotate-90 drop-shadow-md" />
                   </div>

                   {/* Card Number - Embossed Look with Gold Tint */}
                   <div className="font-mono text-lg font-bold tracking-widest text-white flex justify-between w-full mb-1"
                        style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5), -1px -1px 0px rgba(255,255,255,0.2)' }}>
                      <span>{cardBin.substring(0,4)}</span>
                      <span>{cardBin.substring(4,8)}</span>
                      <span>{user?.id?.substring(0,4) || '0000'}</span>
                      <span>{cardLast}</span>
                   </div>
                   
                   <div className="flex justify-between items-end text-[9px] uppercase font-bold text-yellow-100">
                      <span className="opacity-80">Valid Thru: 12/28</span>
                      <span className="text-white text-xs tracking-wider">NAPAS</span>
                   </div>
                </div>
             </div>
          </div>

          {/* --- BACK SIDE --- */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-2xl bg-[#f8f9fa] border border-gray-300">
             
             {/* Magnetic Stripe */}
             <div className="w-full h-12 bg-[#1a1a1a] mt-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,#333_5px,#333_10px)]"></div>
             </div>

             <div className="p-5 flex flex-col h-[calc(100%-48px)] relative">
                {/* Background Watermark on Back */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                    <img src="https://cdn-icons-png.flaticon.com/512/9703/9703596.png" className="w-48 h-48 grayscale" alt="watermark" />
                </div>

                <div className="flex items-center gap-2 mb-4 mt-2 relative z-10">
                   <div className="flex-1 h-9 bg-white border border-gray-300 relative flex items-center px-2 overflow-hidden shadow-inner">
                      <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/linen.png')]"></div>
                      <span className="font-[cursive] text-slate-800 text-sm relative z-10 italic transform -rotate-1">{user?.name}</span>
                   </div>
                   <div className="w-12 h-9 bg-white border border-gray-300 flex items-center justify-center font-mono font-bold text-slate-900 italic text-xs shadow-inner">
                      189
                   </div>
                </div>

                {/* SPECIAL PRIVILEGE SECTION - Enhanced Gold Stamp Style */}
                <div className="relative border border-yellow-400 bg-gradient-to-r from-yellow-50 via-white to-yellow-50 p-3 rounded-lg mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                   <div className="absolute -top-3 -right-3 text-yellow-500 bg-white rounded-full p-1 border border-yellow-200 shadow-sm">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                   </div>
                   <div className="relative z-10">
                      <h4 className="text-[10px] font-black text-[#b45309] uppercase mb-1.5 flex items-center gap-1 border-b border-yellow-200 pb-1">
                         <Gem className="w-3 h-3" /> VNU Lecturer Privilege
                      </h4>
                      <p className="text-[9px] font-bold text-slate-700 leading-snug">
                         Hoàn tiền <span className="text-red-600 text-xs font-black bg-red-50 px-1 rounded">15%</span> cho mọi giao dịch trong khuôn viên ĐHQGHN.
                      </p>
                      <div className="flex gap-2 mt-1.5 overflow-x-auto no-scrollbar opacity-80">
                         <span className="text-[8px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 whitespace-nowrap">Vé xe</span>
                         <span className="text-[8px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 whitespace-nowrap">Canteen</span>
                         <span className="text-[8px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 whitespace-nowrap">Nhà sách</span>
                      </div>
                   </div>
                </div>

                <div className="flex-1 relative z-10">
                   <p className="text-[8px] text-gray-400 text-justify leading-snug mb-2 italic">
                      Thẻ này có giá trị định danh giảng viên và thanh toán nội địa. Vui lòng bảo quản cẩn thận.
                   </p>
                   
                   <div className="border-t border-gray-200 pt-2 space-y-1">
                      <div className="flex justify-between items-center">
                         <span className="text-[9px] font-bold text-gray-600 uppercase">Hotline SHB</span>
                         <span className="text-[9px] font-bold text-orange-600">1800 5888 56</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-[9px] font-bold text-gray-600 uppercase">Hỗ trợ VNU</span>
                         <span className="text-[9px] text-blue-600">1900 8888</span>
                      </div>
                   </div>
                </div>

                <div className="mt-auto bg-gradient-to-r from-gray-50 to-white p-3 rounded-xl border border-gray-200 shadow-inner relative z-10">
                   <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-bold text-gray-500 uppercase flex items-center gap-1">
                         <CreditCard className="w-3 h-3" /> Số dư khả dụng
                      </span>
                   </div>
                   <p className="text-lg font-bold text-slate-800 text-right font-mono tracking-tight text-[#f36f21]">{formatCurrency(userBalance)}</p>
                </div>
             </div>
          </div>

        </div>
        
        {/* Flip Hint */}
        <div className="absolute top-3 right-3 z-20">
           <div className="bg-black/20 hover:bg-black/40 text-white p-1.5 rounded-full backdrop-blur-md transition-all border border-white/20 shadow-lg cursor-pointer">
              <RotateCw className="w-4 h-4" />
           </div>
        </div>
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

export default PedagogicalCard;
