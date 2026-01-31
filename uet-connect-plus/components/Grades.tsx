import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Award, Book } from 'lucide-react';

const Grades: React.FC = () => {
  const { examGrades } = useApp();

  const totalCredits = examGrades.reduce((sum, g) => sum + g.credits, 0);
  const weightedSum = examGrades.reduce((sum, g) => sum + (g.finalScore * g.credits), 0);
  const avgScore = totalCredits ? (weightedSum / totalCredits).toFixed(2) : "0.00";

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400';
    if (grade.startsWith('C')) return 'text-orange-600 bg-orange-50 dark:bg-orange-900/30 dark:text-orange-400';
    return 'text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400';
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 px-4 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-blue-600 dark:text-blue-400" /> Kết Quả Học Tập
        </h1>
        <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm font-bold px-3 py-1 rounded-lg">
          HK1 2023-2024
        </div>
      </div>

      {/* Summary Card */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
           <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
             <Award className="w-5 h-5 text-yellow-500" />
             <span className="text-sm font-medium">GPA Học kỳ</span>
           </div>
           <p className="text-3xl font-bold text-gray-900 dark:text-white">{avgScore}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
           <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
             <Book className="w-5 h-5 text-blue-500" />
             <span className="text-sm font-medium">Số tín chỉ</span>
           </div>
           <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalCredits}</p>
        </div>
      </div>

      <div className="space-y-4">
        {examGrades.map((grade) => (
          <div key={grade.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
             <div className="p-4 flex justify-between items-start border-b border-gray-50 dark:border-slate-700">
                <div>
                   <h3 className="font-bold text-gray-900 dark:text-white">{grade.subject}</h3>
                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">{grade.code} • {grade.credits} tín chỉ</p>
                </div>
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-lg ${getGradeColor(grade.letterGrade)}`}>
                   {grade.letterGrade}
                </div>
             </div>
             
             <div className="grid grid-cols-4 divide-x divide-gray-100 dark:divide-slate-700 bg-gray-50/50 dark:bg-slate-800/50">
                <div className="p-3 text-center">
                   <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Chuyên cần</p>
                   <p className="font-bold text-gray-700 dark:text-gray-300">{grade.componentScore.cc}</p>
                </div>
                <div className="p-3 text-center">
                   <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Giữa kỳ</p>
                   <p className="font-bold text-gray-700 dark:text-gray-300">{grade.componentScore.gk}</p>
                </div>
                <div className="p-3 text-center">
                   <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Cuối kỳ</p>
                   <p className="font-bold text-gray-700 dark:text-gray-300">{grade.componentScore.ck}</p>
                </div>
                <div className="p-3 text-center bg-blue-50/30 dark:bg-blue-900/10">
                   <p className="text-[10px] uppercase text-blue-500 font-bold mb-1">Tổng kết</p>
                   <p className="font-bold text-blue-700 dark:text-blue-300">{grade.finalScore}</p>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grades;
