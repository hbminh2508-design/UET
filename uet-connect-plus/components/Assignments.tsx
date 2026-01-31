
import React from 'react';
import { useApp } from '../context/AppContext';
import { FileQuestion, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const Assignments: React.FC = () => {
  const { quizzes, completeQuiz } = useApp();

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 px-4 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <FileQuestion className="w-7 h-7 text-indigo-600" /> Bài Tập & Quiz
        </h1>
      </div>

      <div className="space-y-4">
        {quizzes.length === 0 ? (
          <div className="text-center py-12 text-gray-400">Hiện không có bài tập nào.</div>
        ) : (
          quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-700 relative overflow-hidden group">
               {/* Status Indicator */}
               <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${quiz.isCompleted ? 'bg-green-500' : 'bg-orange-500'}`}></div>
               
               <div className="pl-3">
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">{quiz.title}</h3>
                     {quiz.isCompleted ? (
                       <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                         <CheckCircle className="w-3 h-3" /> Đã xong
                       </span>
                     ) : (
                       <span className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-lg">
                         <Clock className="w-3 h-3" /> Chưa làm
                       </span>
                     )}
                  </div>
                  
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4">{quiz.subject} • {quiz.questionCount} câu hỏi</p>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-50 dark:border-slate-700">
                     <div className="text-xs text-gray-500 dark:text-gray-400">
                        Hạn nộp: <span className="font-bold text-gray-700 dark:text-gray-300">{quiz.deadline}</span>
                     </div>
                     
                     {!quiz.isCompleted && (
                       <button 
                         onClick={() => completeQuiz(quiz.id)}
                         className="flex items-center gap-1 text-sm font-bold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-3 py-1.5 rounded-lg transition-colors"
                       >
                         Làm bài <ArrowRight className="w-4 h-4" />
                       </button>
                     )}
                  </div>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Assignments;
