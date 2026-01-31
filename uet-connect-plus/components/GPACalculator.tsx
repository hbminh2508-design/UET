import React, { useState } from 'react';
import { Calculator, Plus, Trash2, RefreshCcw } from 'lucide-react';

interface GradeItem {
  id: number;
  name: string;
  credits: number;
  grade: number; // 4.0 scale
}

const GPACalculator: React.FC = () => {
  const [items, setItems] = useState<GradeItem[]>([
    { id: 1, name: 'Môn 1', credits: 3, grade: 4.0 },
    { id: 2, name: 'Môn 2', credits: 3, grade: 3.0 },
  ]);

  const addSubject = () => {
    setItems([...items, { id: Date.now(), name: `Môn ${items.length + 1}`, credits: 3, grade: 4.0 }]);
  };

  const removeSubject = (id: number) => {
    setItems(items.filter(i => i.id !== id));
  };

  const updateItem = (id: number, field: keyof GradeItem, value: any) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const calculateGPA = () => {
    const totalCredits = items.reduce((sum, i) => sum + i.credits, 0);
    if (totalCredits === 0) return 0;
    const totalPoints = items.reduce((sum, i) => sum + (i.grade * i.credits), 0);
    return (totalPoints / totalCredits).toFixed(2);
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 px-4 pt-6">
       <div className="flex items-center justify-between mb-6">
         <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
           <Calculator className="w-7 h-7 text-green-600" /> Tính Tín Chỉ
         </h1>
       </div>

       <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg mb-6 flex flex-col items-center">
          <span className="text-green-100 text-sm font-medium uppercase tracking-wider">GPA Dự Kiến</span>
          <span className="text-5xl font-bold mt-2">{calculateGPA()}</span>
          <span className="text-green-100 text-sm mt-2">Trên thang điểm 4.0</span>
       </div>

       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
         <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-700">Danh sách môn học</h3>
            <button onClick={() => setItems([])} className="text-gray-400 hover:text-red-500">
               <RefreshCcw className="w-4 h-4" />
            </button>
         </div>
         
         <div className="space-y-3">
           {items.map((item) => (
             <div key={item.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
               <div className="flex-1">
                 <input 
                    type="text" 
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    className="w-full bg-transparent text-sm font-medium focus:outline-none text-gray-800"
                    placeholder="Tên môn"
                 />
               </div>
               <div className="w-16">
                 <input 
                    type="number" 
                    value={item.credits}
                    onChange={(e) => updateItem(item.id, 'credits', Number(e.target.value))}
                    className="w-full bg-white border border-gray-200 rounded px-1 py-1 text-center text-sm"
                    min="1" max="10"
                 />
                 <span className="text-[10px] text-gray-400 text-center block">Tín chỉ</span>
               </div>
               <div className="w-20">
                 <select
                    value={item.grade}
                    onChange={(e) => updateItem(item.id, 'grade', Number(e.target.value))}
                    className="w-full bg-white border border-gray-200 rounded px-1 py-1 text-sm font-bold text-gray-700"
                 >
                    <option value="4.0">A (4.0)</option>
                    <option value="3.7">A- (3.7)</option>
                    <option value="3.3">B+ (3.3)</option>
                    <option value="3.0">B (3.0)</option>
                    <option value="2.7">B- (2.7)</option>
                    <option value="2.3">C+ (2.3)</option>
                    <option value="2.0">C (2.0)</option>
                    <option value="0">F (0)</option>
                 </select>
               </div>
               <button onClick={() => removeSubject(item.id)} className="p-2 text-gray-400 hover:text-red-500">
                 <Trash2 className="w-4 h-4" />
               </button>
             </div>
           ))}
         </div>

         <button 
           onClick={addSubject}
           className="w-full mt-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-medium hover:border-green-500 hover:text-green-600 transition-colors flex items-center justify-center gap-2"
         >
           <Plus className="w-5 h-5" /> Thêm môn học
         </button>
       </div>
    </div>
  );
};

export default GPACalculator;
