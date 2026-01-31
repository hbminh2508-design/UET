
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RotateCw, ShieldCheck, Star } from 'lucide-react';

const SpecialEnvoyCard: React.FC = () => {
  const { user } = useApp();
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="w-full perspective-1000 h-64 cursor-pointer group select-none relative" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front Side */}
          <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-2xl border-2 border-yellow-600/50 bg-gray-900">
             {/* Luxury Gradient Background */}
             <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
             {/* Texture */}
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
             
             {/* Gold Accents */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-500/30 to-transparent rounded-bl-full blur-xl"></div>
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-yellow-500/20 to-transparent rounded-tr-full blur-xl"></div>

            {/* Header */}
            <div className="relative h-16 flex items-center justify-between px-5 pt-4">
               <div>
                  <div className="text-yellow-500 font-serif font-bold tracking-widest text-lg flex items-center gap-2 drop-shadow-md">
                    <Star className="w-4 h-4 fill-current animate-pulse" /> VIP ACCESS
                  </div>
                  <div className="text-[10px] text-gray-300 uppercase tracking-[0.2em] opacity-80">UET Administration</div>
               </div>
               <ShieldCheck className="w-10 h-10 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
            </div>
            
            <div className="relative flex px-5 gap-4 mt-4">
               {/* Avatar Frame */}
               <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-800 shadow-[0_0_20px_rgba(234,179,8,0.4)] relative z-10">
                  <img 
                    src={user?.avatar} 
                    className="w-full h-full rounded-full object-cover border-4 border-black" 
                    alt="Admin" 
                  />
               </div>
               
               {/* Details */}
               <div className="flex-1 pt-1 z-10">
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 uppercase tracking-wide drop-shadow-sm">
                    {user?.name}
                  </h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-600 to-transparent my-2"></div>
                  <p className="text-white font-bold text-sm tracking-wider uppercase">Đặc Phái Viên</p>
                  <p className="text-yellow-500/80 text-xs mt-0.5">Cấp độ: Super Admin</p>
               </div>
            </div>

            <div className="absolute bottom-4 left-0 w-full px-5 flex justify-between items-end">
               <div className="font-mono text-yellow-500/50 text-[10px] tracking-widest">
                  ID: {user?.id}
               </div>
               <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-full border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-ping absolute opacity-75"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500 relative"></div>
                  <span className="text-[9px] text-green-400 font-bold uppercase">System Active</span>
               </div>
            </div>
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-2xl bg-black border-2 border-yellow-600/50">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 to-black"></div>
             
             <div className="relative p-6 flex flex-col h-full items-center justify-center text-center">
                <ShieldCheck className="w-16 h-16 text-yellow-500 mb-4 opacity-80" />
                <h3 className="text-yellow-400 font-bold uppercase tracking-widest text-lg mb-2">Quyền hạn đặc biệt</h3>
                <p className="text-gray-400 text-xs leading-relaxed max-w-[220px]">
                   Thẻ này cấp quyền truy cập toàn bộ hệ thống server, kiểm duyệt nội dung và quản lý cơ sở dữ liệu sinh viên.
                </p>
                
                <div className="mt-6 border border-yellow-500/30 px-4 py-1.5 rounded bg-yellow-500/5 flex flex-col items-center">
                   <span className="text-[8px] text-yellow-600 uppercase mb-0.5">Authentication Key</span>
                   <span className="font-mono text-yellow-500 text-xs tracking-widest">0x9923-ADMIN-KEY</span>
                </div>
             </div>
          </div>
        </div>
        
        {/* Flip Hint */}
        <div className="absolute top-2 right-2 z-20 animate-pulse">
           <div className="bg-yellow-500/20 text-yellow-500 p-1.5 rounded-full backdrop-blur-sm transition-colors border border-yellow-500/30">
              <RotateCw className="w-4 h-4" />
           </div>
        </div>
      </div>
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default SpecialEnvoyCard;
