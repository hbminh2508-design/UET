import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Check, User, Clock } from 'lucide-react';

const CourseRegistration: React.FC = () => {
  const { courses, toggleCourseRegistration } = useApp();

  const totalCredits = courses.filter(c => c.isRegistered).reduce((sum, c) => sum + c.credits, 0);

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 px-4 pt-6">
       <div className="flex items-center justify-between mb-6">
         <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
           <BookOpen className="w-7 h-7 text-indigo-600" /> Đăng Ký Học Phần
         </h1>
       </div>

       <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6 flex justify-between items-center sticky top-20 z-20 shadow-sm backdrop-blur-sm bg-opacity-90">
         <div>
           <p className="text-sm text-indigo-800">Số tín chỉ đã chọn</p>
           <p className="text-2xl font-bold text-indigo-900">{totalCredits} <span className="text-sm font-normal text-indigo-600">/ 25 tối đa</span></p>
         </div>
         <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-indigo-700 transition-colors text-sm">
           Gửi Đăng Ký
         </button>
       </div>

       <div className="space-y-4">
         {courses.map((course) => (
           <div key={course.id} className={`bg-white rounded-xl border-l-4 p-4 shadow-sm transition-all ${course.isRegistered ? 'border-green-500 bg-green-50/30' : 'border-gray-200'}`}>
             <div className="flex justify-between items-start">
               <div className="flex-1">
                 <div className="flex items-center gap-2 mb-1">
                   <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{course.code}</span>
                   <span className="text-xs font-bold text-orange-500">{course.credits} tín chỉ</span>
                 </div>
                 <h3 className="font-bold text-gray-900 text-lg mb-2">{course.name}</h3>
                 <div className="flex flex-col gap-1 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {course.lecturer}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {course.schedule}</span>
                 </div>
               </div>
               
               <button 
                 onClick={() => toggleCourseRegistration(course.id)}
                 className={`ml-3 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    course.isRegistered 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : 'border-gray-300 text-gray-300 hover:border-green-500 hover:text-green-500'
                 }`}
               >
                 <Check className="w-6 h-6" />
               </button>
             </div>
           </div>
         ))}
       </div>
    </div>
  );
};

export default CourseRegistration;
