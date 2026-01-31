
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Terminal, ShieldCheck, Cpu, Code, Database, Eye } from 'lucide-react';

const DeveloperCard: React.FC = () => {
  const { user } = useApp();
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="w-full perspective-1000 h-64 cursor-pointer group select-none relative" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front Side - Cyberpunk / Matrix Style */}
          <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-2xl bg-black border border-green-900/50">
             
             {/* Matrix Rain Effect Simulation (Static CSS background for now) */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-40"></div>
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 0, .3) 25%, rgba(0, 255, 0, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, .3) 75%, rgba(0, 255, 0, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 0, .3) 25%, rgba(0, 255, 0, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, .3) 75%, rgba(0, 255, 0, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}></div>
             
             {/* Glowing Green Border Pulse */}
             <div className="absolute inset-0 border-2 border-green-500/20 rounded-2xl animate-pulse"></div>

             <div className="relative p-6 h-full flex flex-col justify-between z-10">
                {/* Header */}
                <div className="flex justify-between items-start">
                   <div className="flex items-center gap-3">
                      <div className="bg-green-900/30 p-1.5 rounded border border-green-500/50">
                        <Terminal className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-green-500 font-mono font-bold text-sm tracking-widest leading-none">VNU ROOT</h3>
                        <p className="text-[9px] text-green-700 font-bold uppercase tracking-[0.2em] mt-1">System Architect</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="bg-green-500/10 border border-green-500/30 px-2 py-0.5 rounded text-[10px] font-mono text-green-400 animate-pulse">
                         ACCESS GRANTED
                      </div>
                   </div>
                </div>

                {/* Avatar & Info */}
                <div className="flex items-center gap-5 mt-2">
                   <div className="relative group/avatar">
                      <div className="w-20 h-20 rounded-lg border-2 border-green-500/50 overflow-hidden bg-black p-0.5 relative">
                         <img src={user?.avatar} className="w-full h-full object-cover filter grayscale contrast-125" alt="Dev" />
                         {/* Scan line over avatar */}
                         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/20 to-transparent w-full h-full animate-[scan_2s_linear_infinite]"></div>
                      </div>
                      {/* Decorative corners */}
                      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-green-500"></div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-green-500"></div>
                   </div>
                   
                   <div className="flex-1">
                      <h2 className="text-xl font-black text-white font-mono tracking-tighter uppercase mb-1">
                         {user?.name}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                         <span className="text-[9px] bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded border border-gray-700">ROOT</span>
                         <span className="text-[9px] bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded border border-gray-700">SSH</span>
                         <span className="text-[9px] bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded border border-gray-700">DB_ADMIN</span>
                      </div>
                   </div>
                </div>

                {/* Footer Code Stream */}
                <div className="mt-auto">
                   <div className="h-0.5 w-full bg-green-900/50 mb-2"></div>
                   <div className="flex justify-between items-end">
                      <div className="font-mono text-[8px] text-green-800 leading-tight">
                         ID: <span className="text-green-500">{user?.id}</span><br/>
                         HASH: 0x9928AF...<br/>
                         LEVEL: INF
                      </div>
                      <Cpu className="w-6 h-6 text-green-600 opacity-50" />
                   </div>
                </div>
             </div>
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-2xl bg-gray-900 border border-gray-800">
             <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <ShieldCheck className="w-48 h-48 text-white" />
             </div>
             
             <div className="p-6 h-full flex flex-col relative z-10">
                <h3 className="font-mono font-bold text-green-500 uppercase text-xs mb-4 flex items-center gap-2">
                   <Database className="w-4 h-4" /> System Privileges
                </h3>
                
                <ul className="space-y-2 text-[10px] font-mono text-gray-400">
                   <li className="flex items-center gap-2">
                      <span className="text-green-500">[✓]</span> View All Student Data
                   </li>
                   <li className="flex items-center gap-2">
                      <span className="text-green-500">[✓]</span> Modify Global Config
                   </li>
                   <li className="flex items-center gap-2">
                      <span className="text-green-500">[✓]</span> Bypass Auth Checks
                   </li>
                   <li className="flex items-center gap-2">
                      <span className="text-green-500">[✓]</span> Deploy Hot Patches
                   </li>
                </ul>

                <div className="mt-auto border border-green-500/30 bg-green-500/5 p-3 rounded">
                   <p className="text-[8px] text-green-600 uppercase mb-1">Encrypted Key</p>
                   <p className="font-mono text-[10px] text-green-400 break-all leading-none">
                      4A7F-9921-ROOT-ACCESS-GRANTED-VNU-ULTRA-CORE
                   </p>
                </div>
             </div>
          </div>
        </div>
        
        {/* Flip Hint */}
        <div className="absolute top-3 right-3 z-20">
           <div className="bg-black/50 hover:bg-green-500/20 text-green-500 p-1.5 rounded border border-green-500/30 backdrop-blur-md transition-all group-hover:scale-110 active:scale-95 cursor-pointer">
              <Eye className="w-4 h-4" />
           </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1200px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default DeveloperCard;
