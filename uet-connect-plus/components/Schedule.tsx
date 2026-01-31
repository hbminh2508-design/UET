
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Clock, MapPin, User, CalendarDays, Flag, BookOpen, PartyPopper } from 'lucide-react';

const Schedule: React.FC = () => {
  const { schedule, vnuEvents, themeColor } = useApp();
  const [activeTab, setActiveTab] = useState<'weekly' | 'events'>('weekly');

  const getEventTypeIcon = (type: string) => {
    switch(type) {
      case 'academic': return <BookOpen className="w-5 h-5 text-blue-500" />;
      case 'activity': return <Flag className="w-5 h-5 text-orange-500" />;
      case 'holiday': return <PartyPopper className="w-5 h-5 text-red-500" />;
      default: return <CalendarDays className="w-5 h-5 text-gray-500" />;
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch(type) {
      case 'academic': return 'Học thuật';
      case 'activity': return 'Hoạt động';
      case 'holiday': return 'Nghỉ lễ';
      default: return 'Sự kiện';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'academic': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'activity': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'holiday': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 px-4 pt-6">
       <div className="flex items-center justify-between mb-4">
         <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
           <Calendar className="w-7 h-7" style={{ color: themeColor }} /> Lịch Trình
         </h1>
         <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">HK1 (2024-2025)</span>
       </div>

       {/* Tab Switcher */}
       <div className="flex p-1 bg-gray-100 dark:bg-slate-800 rounded-xl mb-6">
          <button 
            onClick={() => setActiveTab('weekly')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'weekly' 
                ? 'bg-white shadow-sm text-gray-900' 
                : 'text-gray-500'
            }`}
          >
             <Clock className={`w-4 h-4 ${activeTab === 'weekly' ? 'text-blue-500' : ''}`} />
             Lịch học
          </button>
          <button 
            onClick={() => setActiveTab('events')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'events' 
                ? 'bg-white shadow-sm text-gray-900' 
                : 'text-gray-500'
            }`}
          >
             <CalendarDays className={`w-4 h-4 ${activeTab === 'events' ? 'text-purple-500' : ''}`} />
             Sự kiện VNU
          </button>
       </div>

       {activeTab === 'weekly' ? (
         <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
           {schedule.map((item) => (
             <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
               <div className="border-l-4 p-4" style={{ borderLeftColor: themeColor }}>
                 <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-lg text-gray-900">{item.subject}</h3>
                   <span className="text-xs font-bold bg-gray-50 text-gray-700 px-2 py-1 rounded-lg border border-gray-200">{item.day}</span>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 mt-3">
                   <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {item.time}
                   </div>
                   <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {item.room}
                   </div>
                   <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
                      <User className="w-4 h-4 text-gray-400" />
                      {item.lecturer}
                   </div>
                 </div>
                 
                 <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-mono">{item.code}</span>
                    <button className="text-xs font-semibold hover:underline" style={{ color: themeColor }}>Chi tiết</button>
                 </div>
               </div>
             </div>
           ))}
           {schedule.length === 0 && (
              <div className="text-center py-10 text-gray-400 italic">Chưa có lịch học nào.</div>
           )}
         </div>
       ) : (
         <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
           {vnuEvents.map((event) => (
             <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                   <div className={`px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1.5 ${getEventTypeColor(event.type)}`}>
                      {getEventTypeIcon(event.type)}
                      {getEventTypeLabel(event.type)}
                   </div>
                   <div className="text-right">
                      <p className="font-bold text-gray-900 text-sm">{event.date}</p>
                      <p className="text-xs text-gray-500">{event.time}</p>
                   </div>
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-2">{event.title}</h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                   <MapPin className="w-4 h-4 text-gray-400" />
                   {event.location}
                </div>

                {event.description && (
                  <p className="text-sm text-gray-500 bg-gray-50 p-2 rounded-lg italic">
                    "{event.description}"
                  </p>
                )}
             </div>
           ))}
           {vnuEvents.length === 0 && (
              <div className="text-center py-10 text-gray-400 italic">Không có sự kiện nào sắp tới.</div>
           )}
           <div className="text-center mt-6">
              <p className="text-xs text-gray-400">Dữ liệu được đồng bộ từ VNU Calendar API</p>
           </div>
         </div>
       )}
    </div>
  );
};

export default Schedule;
