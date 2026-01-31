
import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import Logo from './Logo';
import { Shield, LogOut, ChevronRight, Mail, BookOpen, Camera, Edit2, Check, X, CreditCard as IdCardIcon, Settings, ShieldAlert, GraduationCap, ExternalLink, Bell, Lock, Fingerprint, Palette, CheckCircle2, Terminal } from 'lucide-react';
import StudentIdCard from './StudentIdCard';
import SpecialEnvoyCard from './SpecialEnvoyCard';
import PedagogicalCard from './PedagogicalCard';
import DeveloperCard from './DeveloperCard';

const Profile: React.FC = () => {
  const { user, logout, updateUserProfile, themeColor, setThemeColor } = useApp();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [showIdCard, setShowIdCard] = useState(false);
  
  // Settings Toggles
  const [biometrics, setBiometrics] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAdmin = user?.role === 'admin';
  const isLecturer = user?.role === 'lecturer';
  const isExternal = user?.role === 'external_student';
  const isDeveloper = user?.role === 'developer';
  
  const schoolCode = user?.schoolCode ? user.schoolCode.toUpperCase() : 'UET';
  const isUET = schoolCode === 'UET';

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUserProfile(user?.name || '', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveName = () => {
    if (editName.trim()) {
      updateUserProfile(editName, user?.avatar);
      setIsEditingName(false);
    }
  };

  const getRoleBadge = () => {
    if (isDeveloper) return (
      <span className="bg-slate-800 text-green-400 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border border-green-900 flex items-center gap-1 font-mono shadow-md shadow-green-900/20">
        <Terminal className="w-3 h-3" /> System Architect
      </span>
    );
    if (isAdmin) return (
      <span className="bg-yellow-100 text-yellow-700 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border border-yellow-200 flex items-center gap-1">
        <ShieldAlert className="w-3 h-3" /> Quản trị viên
      </span>
    );
    if (isLecturer) return (
      <span className="bg-green-100 text-green-700 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border border-green-200 flex items-center gap-1">
        <GraduationCap className="w-3 h-3" /> Giảng Viên
      </span>
    );
    return (
       <>
         <span className={`bg-blue-100 text-blue-700 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${isExternal ? 'bg-purple-100 text-purple-700' : ''}`}>
           {isExternal ? `Sinh viên ${user?.schoolCode?.toUpperCase()}` : 'Sinh viên'}
         </span>
       </>
    );
  };

  const THEME_PRESETS = [
    { color: '#2563EB', name: 'UET Blue' },
    { color: '#881337', name: 'USSH Wine' },
    { color: '#DC2626', name: 'UEB Red' },
    { color: '#059669', name: 'ULIS Green' },
    { color: '#9333EA', name: 'SIS Purple' },
    { color: '#0F172A', name: 'VNU Dark' },
  ];

  return (
    <div className={`pb-24 ${isDeveloper ? 'bg-slate-950 text-white' : 'bg-gray-50/50'}`}>
      {/* Cover Image */}
      <div 
        className="h-56 relative transition-colors duration-500"
        style={{ background: isDeveloper ? '#0f172a' : `linear-gradient(135deg, ${themeColor}, ${themeColor}dd, #1e293b)` }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        {isDeveloper ? (
           <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        ) : (
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        )}
        <div className={`absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t ${isDeveloper ? 'from-slate-950' : 'from-gray-50/50'} to-transparent`}></div>
      </div>

      {/* Main Content Container */}
      <div className="px-4 max-w-lg mx-auto -mt-24 relative z-10">
        
        {/* Profile Card */}
        <div className={`${isDeveloper ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'} rounded-3xl shadow-xl p-6 text-center mb-6 border backdrop-blur-sm`}>
           {/* Avatar */}
           <div className="relative w-32 h-32 mx-auto mb-4 group cursor-pointer">
              <div 
                className={`w-full h-full rounded-full p-1.5 shadow-2xl overflow-hidden border-4 transition-all duration-300 group-hover:scale-105 ${isDeveloper ? 'bg-slate-800 border-green-500' : 'bg-white'}`}
                style={!isDeveloper ? { borderColor: isAdmin ? '#EAB308' : isLecturer ? '#22C55E' : themeColor } : {}}
              >
                <img 
                  src={user?.avatar} 
                  className={`w-full h-full rounded-full object-cover border-2 ${isDeveloper ? 'border-slate-900' : 'border-gray-50'}`}
                  alt="Profile" 
                />
              </div>
              <div 
                onClick={handleAvatarClick}
                className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="text-white w-8 h-8" />
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
           </div>

           {/* Name Editing */}
           {isEditingName ? (
             <div className="flex items-center justify-center gap-2 mb-2">
               <input 
                 type="text" 
                 value={editName}
                 onChange={(e) => setEditName(e.target.value)}
                 className={`border-b-2 bg-transparent text-center font-black focus:outline-none text-2xl ${isDeveloper ? 'text-white border-green-500' : 'text-gray-900'}`}
                 style={!isDeveloper ? { borderColor: themeColor } : {}}
                 autoFocus
               />
               <button onClick={saveName} className="text-green-500 hover:scale-110 transition-transform"><Check className="w-6 h-6" /></button>
               <button onClick={() => setIsEditingName(false)} className="text-red-500 hover:scale-110 transition-transform"><X className="w-6 h-6" /></button>
             </div>
           ) : (
             <h2 className={`text-3xl font-black mb-1 flex items-center justify-center gap-2 tracking-tight ${isDeveloper ? 'text-white font-mono' : 'text-gray-900'}`}>
               {user?.name}
               <button onClick={() => setIsEditingName(true)} className="text-gray-300 hover:text-blue-500 transition-colors">
                 <Edit2 className="w-4 h-4" />
               </button>
             </h2>
           )}

           <div className="flex items-center justify-center gap-2 mb-4">
             {getRoleBadge()}
           </div>

           {/* Stats Grid */}
           {!isAdmin && !isLecturer && !isDeveloper && (
             <div className="grid grid-cols-3 gap-2 border-t border-gray-50 pt-6 mt-2">
                <div className="bg-gray-50/50 p-2 rounded-2xl">
                   <p className="text-[10px] text-gray-400 font-black uppercase mb-1">GPA</p>
                   <p className="text-xl font-black text-gray-900">{isExternal ? '--' : '3.6'}</p>
                </div>
                <div className="bg-gray-50/50 p-2 rounded-2xl">
                   <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Tín chỉ</p>
                   <p className="text-xl font-black text-gray-900">{isExternal ? '--' : '85'}</p>
                </div>
                <div className="bg-gray-50/50 p-2 rounded-2xl">
                   <p className="text-[10px] text-gray-400 font-black uppercase mb-1">ĐRL</p>
                   <p className="text-xl font-black text-gray-900">{isExternal ? '--' : '92'}</p>
                </div>
             </div>
           )}
        </div>

        {/* Card Toggle */}
        <div className="mb-6">
           <button 
             onClick={() => setShowIdCard(!showIdCard)}
             className="w-full text-white p-5 rounded-3xl shadow-xl flex items-center justify-between hover:scale-[1.01] transition-all group overflow-hidden relative"
             style={{ 
                background: isDeveloper
                  ? 'linear-gradient(to right, #000000, #111827)'
                  : isAdmin 
                  ? 'linear-gradient(to right, #1f2937, #000000)' 
                  : isLecturer 
                    ? 'linear-gradient(to right, #1e3a8a, #0f172a)'
                    : `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` 
             }}
           >
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
              <span className={`font-black flex items-center gap-3 relative z-10 ${isAdmin ? 'text-yellow-400' : isDeveloper ? 'text-green-400' : 'text-white'}`}>
                 <IdCardIcon className="w-6 h-6"/> 
                 {isDeveloper ? 'SYSTEM ROOT KEY' : isAdmin ? 'THẺ ĐẶC PHÁI VIÊN' : isLecturer ? 'THẺ NGÀNH SƯ PHẠM' : 'THẺ SINH VIÊN ĐIỆN TỬ'}
              </span>
              <ChevronRight className={`w-6 h-6 transition-transform relative z-10 ${showIdCard ? 'rotate-90' : ''} ${isAdmin ? 'text-yellow-400' : isDeveloper ? 'text-green-400' : 'text-white'}`} />
           </button>
           
           {showIdCard && (
             <div className="mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
               {isDeveloper ? <DeveloperCard /> : isAdmin ? <SpecialEnvoyCard /> : isLecturer ? <PedagogicalCard /> : <StudentIdCard />}
             </div>
           )}
        </div>

        {/* Integrated Settings Section */}
        <div className="space-y-4 mb-8">
          <div className={`${isDeveloper ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'} rounded-[2rem] shadow-xl border overflow-hidden`}>
             <div className={`p-6 border-b ${isDeveloper ? 'border-slate-800 bg-slate-800/50' : 'border-gray-50 bg-gray-50/30'}`}>
                <h3 className={`font-black flex items-center gap-3 text-lg ${isDeveloper ? 'text-white' : 'text-gray-900'}`}>
                   <Settings className="w-5 h-5 text-gray-400" /> CÀI ĐẶT & RIÊNG TƯ
                </h3>
             </div>

             <div className={`divide-y ${isDeveloper ? 'divide-slate-800' : 'divide-gray-50'}`}>
                {/* Theme Color Picker */}
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                       <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isDeveloper ? 'bg-slate-800 text-green-400' : 'bg-blue-50 text-blue-600'}`}>
                          <Palette className="w-5 h-5" />
                       </div>
                       <span className={`font-bold ${isDeveloper ? 'text-gray-200' : 'text-gray-800'}`}>Màu sắc chủ đề</span>
                    </div>
                    <div className="flex gap-3 justify-between px-2">
                       {THEME_PRESETS.map((preset) => (
                          <button
                            key={preset.color}
                            onClick={() => setThemeColor(preset.color)}
                            className="w-10 h-10 rounded-full border-4 border-white shadow-lg flex items-center justify-center transition-all hover:scale-125 active:scale-95"
                            style={{ backgroundColor: preset.color }}
                          >
                            {themeColor === preset.color && <CheckCircle2 className="w-6 h-6 text-white drop-shadow-md" />}
                          </button>
                       ))}
                    </div>
                </div>
                
                {/* Information Item */}
                <div className="p-6 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isDeveloper ? 'bg-slate-800 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                         <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="text-[10px] text-gray-400 font-black uppercase">Trường/Khoa</p>
                         <p className={`font-bold text-sm ${isDeveloper ? 'text-white' : 'text-gray-800'}`}>{user?.schoolName}</p>
                      </div>
                   </div>
                </div>

                {/* Biometrics Toggle */}
                <div className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-3">
                       <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isDeveloper ? 'bg-slate-800 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                          <Fingerprint className="w-5 h-5" />
                       </div>
                       <span className={`font-bold ${isDeveloper ? 'text-gray-200' : 'text-gray-800'}`}>Vân tay / FaceID</span>
                    </div>
                    <button 
                      onClick={() => setBiometrics(!biometrics)}
                      className="w-14 h-8 rounded-full relative transition-all shadow-inner"
                      style={{ backgroundColor: biometrics ? themeColor : (isDeveloper ? '#334155' : '#e2e8f0') }}
                    >
                       <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all shadow-md ${biometrics ? 'left-[26px]' : 'left-1'}`}></div>
                    </button>
                </div>

                {/* Notifications Toggle */}
                <div className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-3">
                       <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isDeveloper ? 'bg-slate-800 text-pink-400' : 'bg-pink-50 text-pink-600'}`}>
                          <Bell className="w-5 h-5" />
                       </div>
                       <span className={`font-bold ${isDeveloper ? 'text-gray-200' : 'text-gray-800'}`}>Thông báo đẩy</span>
                    </div>
                    <button 
                      onClick={() => setNotifications(!notifications)}
                      className="w-14 h-8 rounded-full relative transition-all shadow-inner"
                      style={{ backgroundColor: notifications ? themeColor : (isDeveloper ? '#334155' : '#e2e8f0') }}
                    >
                       <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all shadow-md ${notifications ? 'left-[26px]' : 'left-1'}`}></div>
                    </button>
                </div>

                {/* Logout Button */}
                <div 
                  onClick={logout}
                  className={`flex items-center justify-between p-6 cursor-pointer transition-colors group ${isDeveloper ? 'hover:bg-red-900/20' : 'hover:bg-red-50'}`}
                >
                    <div className="flex items-center gap-3">
                       <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${isDeveloper ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-600 group-hover:bg-red-100'}`}>
                          <LogOut className="w-5 h-5" />
                       </div>
                       <span className="font-black text-red-600 text-sm">ĐĂNG XUẤT</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-red-300 group-hover:translate-x-1 transition-transform" />
                </div>
             </div>
          </div>
        </div>

        {/* UET Advertisement Banner - Hidden for Dev */}
        {isUET && !isDeveloper && (
          <div className="relative w-full overflow-hidden rounded-[2rem] shadow-2xl border border-indigo-100 mb-8 group cursor-pointer active:scale-[0.98] transition-transform">
             <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-950"></div>
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
             <div className="relative p-8 flex flex-col items-center text-center">
                <span className="text-[10px] bg-yellow-500 text-white px-3 py-1 rounded-full mb-3 font-black tracking-widest animate-pulse">HOT NEWS</span>
                <h3 className="text-xl font-black text-white mb-1 uppercase tracking-tight">Tuyển sinh 2025</h3>
                <p className="text-blue-200 text-sm mb-6 font-medium">Vươn tới đỉnh cao cùng UET Connect Plus</p>
                <div className="flex items-center gap-2 text-white font-black text-xs bg-white/10 px-6 py-3 rounded-2xl hover:bg-white/20 transition-all border border-white/20">
                   KHÁM PHÁ NGAY <ExternalLink className="w-4 h-4" />
                </div>
             </div>
          </div>
        )}

        <div className="text-center opacity-30 pb-4">
          <Logo size="sm" variant={isDeveloper ? 'light' : 'dark'} brandName={schoolCode} />
          <p className="text-[10px] mt-2 text-gray-500 font-bold uppercase tracking-widest">Version 3.0.0 • Powered by VNU IT Center</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
