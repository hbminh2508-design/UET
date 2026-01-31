import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Medal, CheckCircle, Upload, Circle, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const TrainingPoints: React.FC = () => {
  const { trainingTasks, submitTrainingTask } = useApp();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  const totalScore = trainingTasks.reduce((sum, t) => sum + t.currentPoints, 0);
  const maxScore = 100; // Standard UET scale usually
  const progressPercent = Math.min((totalScore / maxScore) * 100, 100);
  
  // Categorize
  const categories: string[] = Array.from(new Set(trainingTasks.map(t => t.category)));
  
  const getRank = (score: number) => {
    if (score >= 90) return { label: 'Xuất sắc', color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400' };
    if (score >= 80) return { label: 'Tốt', color: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400' };
    if (score >= 65) return { label: 'Khá', color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400' };
    if (score >= 50) return { label: 'Trung bình', color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400' };
    return { label: 'Yếu', color: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400' };
  };

  const rank = getRank(totalScore);

  const handleTaskAction = (taskId: string, requireProof: boolean) => {
    if (requireProof) {
      // Simulate file click
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*,.pdf';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          submitTrainingTask(taskId, file);
        }
      };
      input.click();
    } else {
      submitTrainingTask(taskId);
    }
  };

  const toggleCategory = (cat: string) => {
    setExpandedCategory(expandedCategory === cat ? null : cat);
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 px-4 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Medal className="w-7 h-7 text-yellow-500" /> Điểm Rèn Luyện
        </h1>
      </div>

      {/* Score Dashboard */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-700 mb-8 relative overflow-hidden">
         <div className="relative z-10">
            <div className="flex justify-between items-end mb-2">
               <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Tổng điểm hiện tại</p>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{totalScore} <span className="text-lg text-gray-400 font-normal">/ {maxScore}</span></h2>
               </div>
               <div className={`px-4 py-1.5 rounded-full font-bold text-sm uppercase tracking-wider ${rank.color}`}>
                 {rank.label}
               </div>
            </div>

            {/* Linear Progress Bar */}
            <div className="w-full h-4 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
               <div 
                 className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 ease-out rounded-full"
                 style={{ width: `${progressPercent}%` }}
               ></div>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Hoàn thành các nhiệm vụ bên dưới để nâng cao điểm rèn luyện của bạn.
            </p>
         </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {categories.map(category => {
          const catTasks = trainingTasks.filter(t => t.category === category);
          const completedCount = catTasks.filter(t => t.status === 'approved').length;
          const isExpanded = expandedCategory === category;

          return (
            <div key={category} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
               <div 
                 onClick={() => toggleCategory(category)}
                 className="p-4 flex justify-between items-center cursor-pointer bg-gray-50/50 dark:bg-slate-700/30 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
               >
                 <div>
                   <h3 className="font-bold text-gray-800 dark:text-gray-200">{category}</h3>
                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Đã hoàn thành: {completedCount}/{catTasks.length}</p>
                 </div>
                 {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
               </div>

               {isExpanded && (
                 <div className="divide-y divide-gray-100 dark:divide-slate-700">
                    {catTasks.map(task => (
                      <div key={task.id} className="p-4 flex items-start gap-3">
                         <div className="mt-1">
                           {task.status === 'approved' ? (
                             <CheckCircle className="w-6 h-6 text-green-500" />
                           ) : task.status === 'pending' ? (
                             <Clock className="w-6 h-6 text-orange-500" />
                           ) : (
                             <Circle className="w-6 h-6 text-gray-300 dark:text-slate-600" />
                           )}
                         </div>
                         <div className="flex-1">
                           <div className="flex justify-between items-start">
                             <h4 className={`font-medium text-sm ${task.status === 'approved' ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                               {task.title}
                             </h4>
                             <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded ml-2 whitespace-nowrap">
                               +{task.maxPoints} đ
                             </span>
                           </div>
                           
                           <div className="mt-2">
                             {task.status === 'todo' && (
                               <button 
                                 onClick={() => handleTaskAction(task.id, task.requireProof)}
                                 className="text-xs font-medium bg-gray-100 dark:bg-slate-700 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                               >
                                 {task.requireProof ? <><Upload className="w-3 h-3" /> Nộp minh chứng</> : "Xác nhận hoàn thành"}
                               </button>
                             )}
                             {task.status === 'pending' && (
                               <span className="text-xs text-orange-500 italic flex items-center gap-1">
                                 Đang chờ duyệt minh chứng...
                               </span>
                             )}
                             {task.status === 'approved' && (
                               <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                 Đã cộng điểm
                               </span>
                             )}
                           </div>
                         </div>
                      </div>
                    ))}
                 </div>
               )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrainingPoints;