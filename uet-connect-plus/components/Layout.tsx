
import React, { useState } from 'react';
import { ViewState } from '../types';
import Logo from './Logo';
import { useApp } from '../context/AppContext';
import { Home, MessageCircle, Ghost, User, LogOut, AlertCircle, Calendar, Calculator, BookOpen, Bell, CreditCard, GraduationCap, Medal, Settings, ShieldAlert, Server, LayoutDashboard, FileQuestion, QrCode, Utensils, Wallet, FileText, TrendingUp, Book, Building, Terminal, Users, Briefcase } from 'lucide-react';

interface LayoutProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, onNavigate, onLogout, children }) => {
  const { notifications, markNotificationRead, user, themeColor } = useApp();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const isAdmin = user?.role === 'admin';
  const isLecturer = user?.role === 'lecturer';
  const isExternalStudent = user?.role === 'external_student';
  const isDeveloper = user?.role === 'developer';
  const isUEB = user?.schoolCode === 'ueb';
  const isUET = user?.schoolCode === 'uet';

  // Define Desktop Items
  let desktopNavItems;
  if (isDeveloper) {
    desktopNavItems = [
      { id: ViewState.DEV_TOOLS, label: 'VNU Core Tools', icon: Terminal },
      { id: ViewState.STUDENT_MANAGEMENT, label: 'Quản lý Sinh viên', icon: Users },
      { id: ViewState.ADMIN_MODERATION, label: 'Duyệt bài', icon: ShieldAlert },
      { id: ViewState.ADMIN_SERVER, label: 'Server Status', icon: Server },
      { id: ViewState.NEWS_FEED, label: 'Bảng Tin', icon: Home },
      { id: ViewState.PROFILE, label: 'Root Access', icon: User },
    ];
  } else if (isAdmin) {
    desktopNavItems = [
      { id: ViewState.ADMIN_MODERATION, label: 'Duyệt bài', icon: ShieldAlert },
      { id: ViewState.ADMIN_SERVER, label: 'Quản lý Server', icon: Server },
      { id: ViewState.NEWS_FEED, label: 'Bảng Tin', icon: Home },
      { id: ViewState.PROFILE, label: 'Hồ sơ Admin', icon: User },
    ];
  } else if (isLecturer) {
    desktopNavItems = [
      { id: ViewState.LECTURER_DASHBOARD, label: 'Bảng điều khiển', icon: LayoutDashboard },
      { id: ViewState.NEWS_FEED, label: 'Bảng Tin', icon: Home },
      { id: ViewState.CANTEEN, label: 'UET Food', icon: Utensils },
      { id: ViewState.BANKING, label: 'VNU Pay', icon: Wallet },
      { id: ViewState.CHAT, label: 'Tin Nhắn', icon: MessageCircle },
      { id: ViewState.PROFILE, label: 'Hồ sơ Giảng viên', icon: User },
    ];
  } else if (isExternalStudent) {
    desktopNavItems = [
      { id: ViewState.PROFILE, label: 'Trang cá nhân', icon: User },
      { id: ViewState.LIBRARY, label: 'VNU-LIC', icon: Book },
      { id: ViewState.DORMITORY, label: 'Ký Túc Xá', icon: Building },
      { id: ViewState.CANTEEN, label: 'UET Food', icon: Utensils },
      { id: ViewState.BANKING, label: 'VNU Pay', icon: Wallet },
    ];
    // Special addition for UEB External Students
    if (isUEB) {
      desktopNavItems.splice(1, 0, { id: ViewState.STOCK_TRADING, label: 'Chứng khoán', icon: TrendingUp });
    }
  } else {
    // Regular Student
    desktopNavItems = [
      { id: ViewState.NEWS_FEED, label: 'Bảng Tin', icon: Home },
      { id: ViewState.SCHEDULE, label: 'Lịch Học', icon: Calendar },
      { id: ViewState.LIBRARY, label: 'VNU-LIC', icon: Book },
      { id: ViewState.ASSIGNMENTS, label: 'Bài Tập & Quiz', icon: FileQuestion },
      { id: ViewState.ATTENDANCE, label: 'Điểm Danh QR', icon: QrCode },
      { id: ViewState.DORMITORY, label: 'Ký Túc Xá', icon: Building },
      { id: ViewState.CANTEEN, label: 'UET Food', icon: Utensils },
      { id: ViewState.BANKING, label: 'VNU Pay', icon: Wallet }, 
      { id: ViewState.ONE_STOP_SERVICE, label: 'Thủ Tục 1 Cửa', icon: FileText },
      { id: ViewState.CHAT, label: 'Tin Nhắn', icon: MessageCircle },
      { id: ViewState.CONFESSIONS, label: 'Confessions', icon: Ghost },
      { id: ViewState.REGISTRATION, label: 'Đăng Ký', icon: BookOpen },
      { id: ViewState.TUITION, label: 'Học Phí', icon: CreditCard },
      { id: ViewState.GRADES, label: 'Điểm Thi', icon: GraduationCap },
      { id: ViewState.TRAINING, label: 'Điểm Rèn Luyện', icon: Medal },
      { id: ViewState.GPA, label: 'Tính Tín Chỉ', icon: Calculator },
      { id: ViewState.PROFILE, label: 'Cá Nhân', icon: User },
    ];
    // Special addition for UET Students
    if (isUET) {
      desktopNavItems.splice(1, 0, { id: ViewState.UET_JOB_FAIR, label: 'UET Job Fair', icon: Briefcase });
    }
  }

  // Define Mobile Items
  let mobileNavItems;
  if (isDeveloper) {
    mobileNavItems = [
       { id: ViewState.DEV_TOOLS, label: 'Core', icon: Terminal },
       { id: ViewState.STUDENT_MANAGEMENT, label: 'Users', icon: Users },
       { id: ViewState.ADMIN_SERVER, label: 'Server', icon: Server },
       { id: ViewState.PROFILE, label: 'Root', icon: User },
    ];
  } else if (isAdmin) {
    mobileNavItems = [
       { id: ViewState.NEWS_FEED, label: 'Home', icon: Home },
       { id: ViewState.ADMIN_MODERATION, label: 'Duyệt', icon: ShieldAlert },
       { id: ViewState.ADMIN_SERVER, label: 'Server', icon: Server },
       { id: ViewState.PROFILE, label: 'Admin', icon: User },
    ];
  } else if (isLecturer) {
    mobileNavItems = [
       { id: ViewState.NEWS_FEED, label: 'Home', icon: Home },
       { id: ViewState.LECTURER_DASHBOARD, label: 'Quản lý', icon: LayoutDashboard },
       { id: ViewState.CANTEEN, label: 'Food', icon: Utensils },
       { id: ViewState.BANKING, label: 'Ví', icon: Wallet },
       { id: ViewState.PROFILE, label: 'GV', icon: User },
    ];
  } else if (isExternalStudent) {
    mobileNavItems = [
      { id: ViewState.PROFILE, label: 'Tôi', icon: User },
      { id: ViewState.LIBRARY, label: 'LIC', icon: Book },
      { id: ViewState.CANTEEN, label: 'Food', icon: Utensils },
      { id: ViewState.BANKING, label: 'Ví', icon: Wallet },
    ];
    if (isUEB) {
      mobileNavItems.splice(1, 0, { id: ViewState.STOCK_TRADING, label: 'Trading', icon: TrendingUp });
    }
  } else {
    mobileNavItems = [
      { id: ViewState.NEWS_FEED, label: 'Home', icon: Home },
      { id: ViewState.SCHEDULE, label: 'Lịch', icon: Calendar },
      { id: ViewState.LIBRARY, label: 'LIC', icon: Book },
      { id: ViewState.DORMITORY, label: 'KTX', icon: Building },
      { id: ViewState.BANKING, label: 'Ví', icon: Wallet },
      { id: ViewState.PROFILE, label: 'Tôi', icon: User },
    ];
    if (isUET) {
      // Replace KTX with Job Fair for mobile or add it
      mobileNavItems.splice(3, 0, { id: ViewState.UET_JOB_FAIR, label: 'Job', icon: Briefcase });
      if (mobileNavItems.length > 6) mobileNavItems.pop(); // Keep mobile nav tight
    }
  }

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  return (
    <div className={`flex min-h-screen transition-colors duration-200 font-sans ${isDeveloper ? 'bg-slate-950 text-white' : 'bg-gray-50'}`}>
      {/* Sidebar (Desktop) */}
      <aside className={`hidden md:flex flex-col w-64 border-r fixed h-full z-40 overflow-y-auto no-scrollbar ${isDeveloper ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
        <div className="p-6">
          <Logo size="md" variant={isDeveloper ? 'light' : 'dark'} brandName={user?.schoolCode || 'UET'} />
          {isAdmin && <span className="inline-block mt-2 px-2 py-0.5 bg-red-100 text-red-600 rounded text-xs font-bold uppercase tracking-wider">Administrator</span>}
          {isLecturer && <span className="inline-block mt-2 px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-xs font-bold uppercase tracking-wider">Lecturer</span>}
          {isExternalStudent && <span className="inline-block mt-2 px-2 py-0.5 bg-purple-100 text-purple-600 rounded text-xs font-bold uppercase tracking-wider">VNU Member</span>}
          {isDeveloper && <span className="inline-block mt-2 px-2 py-0.5 bg-green-900/50 text-green-400 border border-green-800 rounded text-xs font-bold uppercase tracking-wider font-mono">SYSTEM ARCHITECT</span>}
        </div>

        {!isExternalStudent && !isDeveloper && (
          <div className="px-6 mb-2 relative">
             <button 
               onClick={() => setShowNotifDropdown(!showNotifDropdown)}
               className="flex items-center gap-3 w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-100"
             >
               <div className="relative">
                 <Bell className="w-5 h-5 text-gray-600" />
                 {unreadCount > 0 && (
                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                     {unreadCount}
                   </span>
                 )}
               </div>
               <span className="font-medium text-gray-700 text-sm">Thông báo</span>
             </button>

             {showNotifDropdown && (
               <div className="absolute top-16 left-6 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                 <div className="p-3 border-b border-gray-100 bg-gray-50 font-bold text-gray-700 text-sm">
                   Thông báo mới
                 </div>
                 <div className="max-h-64 overflow-y-auto no-scrollbar">
                   {notifications.length === 0 ? (
                     <div className="p-4 text-center text-gray-400 text-xs">Không có thông báo nào</div>
                   ) : (
                     notifications.map(n => (
                       <div 
                         key={n.id} 
                         onClick={() => markNotificationRead(n.id)}
                         className={`p-3 border-b border-gray-50 cursor-pointer hover:bg-blue-50 transition-colors ${!n.isRead ? 'bg-blue-50/50' : 'bg-white'}`}
                       >
                          <p className={`text-sm ${!n.isRead ? 'font-bold text-gray-900' : 'text-gray-700'}`}>{n.title}</p>
                          <p className="text-xs text-gray-500 truncate">{n.message}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                       </div>
                     ))
                   )}
                 </div>
               </div>
             )}
          </div>
        )}

        <nav className="flex-1 px-4 space-y-2 mt-2">
          {desktopNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isDeveloper 
                  ? currentView === item.id ? 'bg-slate-800 text-green-400 border border-green-900' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : ''
              }`}
              style={!isDeveloper ? {
                backgroundColor: currentView === item.id ? `${themeColor}15` : 'transparent',
                color: currentView === item.id ? themeColor : '#6b7280',
                fontWeight: currentView === item.id ? 600 : 400
              } : {}}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className={`p-4 border-t ${isDeveloper ? 'border-slate-800' : 'border-gray-100'}`}>
          <button 
            onClick={handleLogoutClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${isDeveloper ? 'text-red-400 hover:bg-red-900/20' : 'text-red-500 hover:bg-red-50'}`}
          >
            <LogOut className="w-5 h-5" />
            Đăng xuất
          </button>
        </div>
      </aside>

      <main className="flex-1 md:ml-64 w-full relative no-scrollbar">
        <div className="md:hidden absolute top-4 left-4 z-30">
           {isExternalStudent && (
             <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-white/20">
                <Logo size="sm" brandName={user?.schoolCode} />
             </div>
           )}
        </div>

        {!isExternalStudent && !isDeveloper && (
          <div className="md:hidden absolute top-4 right-4 z-30">
             <button 
               onClick={() => setShowNotifDropdown(!showNotifDropdown)}
               className="relative p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-white/20"
             >
                <Bell className="w-6 h-6 text-gray-700" />
                {unreadCount > 0 && (
                   <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                     {unreadCount}
                   </span>
                 )}
             </button>
             {showNotifDropdown && (
               <div className="absolute top-14 right-4 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                 <div className="max-h-80 overflow-y-auto no-scrollbar">
                  {notifications.length === 0 ? (
                     <div className="p-6 text-center text-gray-400 text-sm">Không có thông báo mới</div>
                   ) : (
                     notifications.map(n => (
                       <div key={n.id} onClick={() => markNotificationRead(n.id)} className={`p-4 border-b border-gray-50 active:bg-gray-100 transition-colors ${!n.isRead ? 'bg-blue-50/50' : ''}`}>
                          <p className="text-sm font-bold text-gray-800 mb-0.5">{n.title}</p>
                          <p className="text-xs text-gray-500 leading-snug">{n.message}</p>
                          <p className="text-[10px] text-gray-400 mt-2 text-right">{n.time}</p>
                       </div>
                     ))
                   )}
                 </div>
               </div>
             )}
          </div>
        )}
        
        <div className="pb-20 md:pb-0 h-full">
           {children}
        </div>
      </main>

      <div className="md:hidden fixed bottom-0 left-0 w-full z-50">
        <div className={`${isDeveloper ? 'bg-slate-900/90 border-slate-800' : 'bg-white/85 border-gray-200/50'} backdrop-blur-xl border-t pb-safe`}>
          <div className="flex justify-around items-center h-16 px-2">
            {mobileNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center justify-center w-full h-full relative group active:scale-95 transition-transform duration-100"
              >
                {currentView === item.id && (
                  <span 
                    className="absolute -top-[1px] w-8 h-1 rounded-b-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    style={{ backgroundColor: themeColor }}
                  ></span>
                )}
                
                <div 
                  className={`p-1.5 rounded-xl transition-all duration-300 ${currentView === item.id ? 'translate-y-[-2px]' : ''}`}
                  style={!isDeveloper ? { backgroundColor: currentView === item.id ? `${themeColor}15` : 'transparent' } : {}}
                >
                   <item.icon 
                     className={`w-6 h-6 transition-all duration-300`} 
                     style={{ 
                       color: currentView === item.id ? (isDeveloper ? '#4ade80' : themeColor) : (isDeveloper ? '#64748b' : '#9ca3af'),
                       fill: currentView === item.id ? (isDeveloper ? '#4ade8020' : `${themeColor}10`) : 'none'
                     }}
                     strokeWidth={currentView === item.id ? 2.5 : 2} 
                   />
                </div>
                <span 
                  className="text-[10px] font-medium mt-0.5 transition-colors"
                  style={{ color: currentView === item.id ? (isDeveloper ? '#4ade80' : themeColor) : (isDeveloper ? '#64748b' : '#9ca3af') }}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6 transform scale-100 transition-all border border-white/20">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600 ring-4 ring-red-50">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Đăng xuất?</h3>
              <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                Bạn sẽ cần đăng nhập lại để truy cập vào tài khoản của mình.
              </p>
              
              <div className="flex flex-col gap-3 w-full">
                <button 
                  onClick={confirmLogout}
                  className="w-full py-3.5 px-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-red-500/30"
                >
                  Đăng xuất ngay
                </button>
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="w-full py-3.5 px-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 active:scale-95 transition-all"
                >
                  Ở lại
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
