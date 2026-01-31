
import React, { useState } from 'react';
import { Terminal, Code, Settings, Database, Activity, Save, RefreshCw, Power } from 'lucide-react';

const DevTools: React.FC = () => {
  const [activeLog, setActiveLog] = useState<string[]>([
    '[SYSTEM] Initializing VNU Core...',
    '[AUTH] Developer access granted to session #9912.',
    '[DB] Connected to Student Database (Read/Write).',
    '[UI] Loaded Dark Theme override.',
  ]);
  const [customCss, setCustomCss] = useState('/* Inject Global CSS here */\nbody { \n  --primary: #10b981; \n}');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const addLog = (msg: string) => {
    setActiveLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleRunPatch = () => {
    addLog('Executing hot-patch...');
    setTimeout(() => {
        addLog('Patch applied successfully. UI reload not required.');
        alert('Applied UI Patch!');
    }, 1000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-24 px-4 pt-6 text-white animate-in fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 font-mono">
          <Terminal className="w-7 h-7 text-green-500" /> VNU_CORE_TOOLS
        </h1>
        <div className="flex items-center gap-2">
           <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
           <span className="text-green-500 font-mono text-sm">ONLINE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* System Controls */}
         <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-400">
               <Settings className="w-5 h-5" /> System Controls
            </h3>
            
            <div className="space-y-4">
               <div className="flex justify-between items-center p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div>
                     <p className="font-bold text-sm">Chế độ bảo trì toàn cục</p>
                     <p className="text-xs text-slate-500">Chặn truy cập sinh viên</p>
                  </div>
                  <button 
                    onClick={() => { setMaintenanceMode(!maintenanceMode); addLog(`Maintenance Mode set to ${!maintenanceMode}`); }}
                    className={`w-12 h-6 rounded-full relative transition-colors ${maintenanceMode ? 'bg-red-600' : 'bg-slate-700'}`}
                  >
                     <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${maintenanceMode ? 'left-7' : 'left-1'}`}></div>
                  </button>
               </div>

               <div className="flex justify-between items-center p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div>
                     <p className="font-bold text-sm">Force Update App</p>
                     <p className="text-xs text-slate-500">Yêu cầu tất cả client tải lại</p>
                  </div>
                  <button 
                    onClick={() => addLog('Triggered force update signal to all clients.')}
                    className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/40"
                  >
                     <RefreshCw className="w-4 h-4" />
                  </button>
               </div>

               <div className="flex justify-between items-center p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div>
                     <p className="font-bold text-sm">Reset Database Cache</p>
                     <p className="text-xs text-slate-500">Xóa Redis cache (Users, Grades)</p>
                  </div>
                  <button 
                    onClick={() => addLog('Cache cleared for user_sessions and grade_cache.')}
                    className="p-2 bg-orange-600/20 text-orange-400 rounded-lg hover:bg-orange-600/40"
                  >
                     <Database className="w-4 h-4" />
                  </button>
               </div>
            </div>
         </div>

         {/* Code Injector */}
         <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-yellow-400">
               <Code className="w-5 h-5" /> Live UI Patch
            </h3>
            <textarea 
               value={customCss}
               onChange={(e) => setCustomCss(e.target.value)}
               className="flex-1 bg-slate-950 text-green-400 font-mono text-xs p-4 rounded-xl border border-slate-800 outline-none focus:border-green-500 resize-none mb-4"
               spellCheck={false}
            />
            <button 
               onClick={handleRunPatch}
               className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-700"
            >
               <Save className="w-4 h-4" /> Inject Code
            </button>
         </div>
      </div>

      {/* Logs Terminal */}
      <div className="mt-6 bg-black rounded-2xl border border-slate-800 p-6 shadow-2xl font-mono text-sm">
         <h3 className="text-slate-500 font-bold mb-2 flex items-center gap-2 uppercase tracking-wider text-xs">
            <Activity className="w-4 h-4" /> System Logs Stream
         </h3>
         <div className="h-48 overflow-y-auto space-y-1 scroll-smooth">
            {activeLog.map((log, i) => (
               <div key={i} className="text-green-500/80 hover:text-green-400 transition-colors border-l-2 border-transparent hover:border-green-500 pl-2">
                  <span className="text-slate-600 mr-2">{'>'}</span> {log}
               </div>
            ))}
            <div className="animate-pulse text-green-500">_</div>
         </div>
      </div>
    </div>
  );
};

export default DevTools;
