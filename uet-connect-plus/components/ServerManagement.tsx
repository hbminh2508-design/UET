
import React from 'react';
import { useApp } from '../context/AppContext';
import { Server, Cpu, HardDrive, Activity, Power, Zap, AlertTriangle } from 'lucide-react';

const ServerManagement: React.FC = () => {
  const { serverStats, toggleMaintenance } = useApp();

  const getLoadColor = (value: number) => {
    if (value < 50) return 'bg-green-500';
    if (value < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 px-4 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Server className="w-7 h-7 text-indigo-600" /> Quản Lý Server
        </h1>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${serverStats.status === 'optimal' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
           <span className={`w-2 h-2 rounded-full ${serverStats.status === 'optimal' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
           {serverStats.status === 'optimal' ? 'SYSTEM ONLINE' : 'MAINTENANCE'}
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
         <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
               <Cpu className="w-5 h-5" />
               <span className="text-sm font-medium">CPU Load</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{serverStats.cpu.toFixed(1)}%</div>
            <div className="w-full h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
               <div className={`h-full rounded-full transition-all duration-500 ${getLoadColor(serverStats.cpu)}`} style={{ width: `${serverStats.cpu}%` }}></div>
            </div>
         </div>
         <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
               <HardDrive className="w-5 h-5" />
               <span className="text-sm font-medium">RAM Usage</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{serverStats.ram.toFixed(1)}%</div>
            <div className="w-full h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
               <div className={`h-full rounded-full transition-all duration-500 ${getLoadColor(serverStats.ram)}`} style={{ width: `${serverStats.ram}%` }}></div>
            </div>
         </div>
      </div>

      {/* Live Traffic */}
      <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-xl mb-6 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4 opacity-20">
            <Activity className="w-24 h-24 text-blue-500" />
         </div>
         <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-400" /> Real-time Traffic</h3>
         <div className="grid grid-cols-2 gap-8 relative z-10">
            <div>
               <p className="text-gray-400 text-sm">Active Users</p>
               <p className="text-4xl font-mono font-bold text-blue-400 mt-1">{serverStats.activeUsers}</p>
            </div>
            <div>
               <p className="text-gray-400 text-sm">Req/Sec</p>
               <p className="text-4xl font-mono font-bold text-green-400 mt-1">{serverStats.requestsPerSec}</p>
            </div>
         </div>
      </div>

      {/* Actions */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
         <h3 className="font-bold text-gray-800 dark:text-white mb-4">Control Panel</h3>
         <div className="flex flex-col gap-3">
            <button 
              onClick={toggleMaintenance}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 ${
                 serverStats.status === 'maintenance' 
                 ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-500/30' 
                 : 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/30'
              }`}
            >
               {serverStats.status === 'maintenance' ? <Power className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
               {serverStats.status === 'maintenance' ? 'Tắt chế độ bảo trì (Go Online)' : 'Bật chế độ bảo trì (Emergency)'}
            </button>
            <button className="w-full py-4 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
               <Activity className="w-5 h-5" />
               Xóa Cache hệ thống
            </button>
         </div>
      </div>
    </div>
  );
};

export default ServerManagement;
