
import React, { useState } from 'react';
import { MOCK_JOBS } from '../constants';
import { Briefcase, MapPin, DollarSign, Clock, Search, Filter, Bookmark, Send, ExternalLink, ArrowRight } from 'lucide-react';

const UetJobFair: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState('All');

  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = activeType === 'All' || job.type === activeType;
    return matchesSearch && matchesType;
  });

  const handleApply = (jobTitle: string) => {
    alert(`Bạn đã ứng tuyển vào vị trí ${jobTitle} qua hệ thống OcaJob. Nhà tuyển dụng sẽ liên hệ sớm!`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 px-4 pt-6 animate-in fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
           <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
             <Briefcase className="w-7 h-7 text-indigo-600" /> UET Job Fair
           </h1>
           <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
             Powered by <span className="font-black text-indigo-500">OcaJob</span> Platform
           </p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-full border border-indigo-100 dark:border-indigo-800">
           <img src="https://ocajob.com/images/logo.png" alt="OcaJob" className="h-6 object-contain opacity-80" onError={(e) => e.currentTarget.style.display = 'none'} /> 
           {/* Fallback icon if image fails */}
           <Briefcase className="w-5 h-5 text-indigo-600" />
        </div>
      </div>

      {/* Search & Filter */}
      <div className="sticky top-0 z-20 bg-gray-50/95 dark:bg-slate-900/95 backdrop-blur-md py-2 -mx-4 px-4 border-b border-gray-200/50 dark:border-slate-800/50 mb-4">
         <div className="relative mb-3">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Tìm việc làm, công ty..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
         </div>
         <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {['All', 'Full-time', 'Part-time', 'Internship'].map(type => (
               <button
                 key={type}
                 onClick={() => setActiveType(type)}
                 className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
                    activeType === type 
                    ? 'bg-indigo-600 text-white border-indigo-600' 
                    : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700'
                 }`}
               >
                  {type}
               </button>
            ))}
         </div>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg mb-6 relative overflow-hidden group cursor-pointer">
         <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
         <div className="relative z-10">
            <span className="bg-yellow-400 text-yellow-900 text-[10px] font-black px-2 py-0.5 rounded uppercase mb-2 inline-block">Featured</span>
            <h3 className="text-xl font-bold mb-1">Samsung Talent Program 2025</h3>
            <p className="text-indigo-100 text-sm mb-4">Học bổng tài năng & Cơ hội thực tập hưởng lương.</p>
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-gray-100 transition-colors">
               Ứng tuyển ngay <ArrowRight className="w-3 h-3" />
            </button>
         </div>
      </div>

      {/* Job List */}
      <div className="space-y-4">
         {filteredJobs.map(job => (
            <div key={job.id} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all relative overflow-hidden">
               {job.isHot && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl">HOT</div>
               )}
               
               <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-xl border border-gray-100 dark:border-slate-600 p-1 bg-white flex items-center justify-center shrink-0">
                     <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                     <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">{job.title}</h3>
                     <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-2">{job.company}</p>
                     
                     <div className="flex flex-wrap gap-2 mb-3">
                        {job.tags.map(tag => (
                           <span key={tag} className="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-[10px] px-2 py-0.5 rounded font-medium">
                              {tag}
                           </span>
                        ))}
                     </div>

                     <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                        <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-bold"><DollarSign className="w-3 h-3" /> {job.salary}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.type}</span>
                     </div>

                     <div className="flex gap-2">
                        <button className="flex-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 py-2 rounded-lg text-sm font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors">
                           Chi tiết
                        </button>
                        <button 
                           onClick={() => handleApply(job.title)}
                           className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                        >
                           <Send className="w-3 h-3" /> Ứng tuyển
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

export default UetJobFair;
