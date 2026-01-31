
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, User, Edit, Ban, RotateCcw, CheckCircle, GraduationCap } from 'lucide-react';

const StudentManagement: React.FC = () => {
  const { managedStudents, updateStudentStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = managedStudents.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'suspended': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'graduated': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-24 px-4 pt-6 text-white animate-in fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <User className="w-7 h-7 text-green-500" /> Quản Lý Sinh Viên
        </h1>
        <div className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700 text-xs font-mono">
           Database: vnu_students_main
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 mb-6">
         <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Tìm kiếm theo tên hoặc MSSV..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
         </div>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-950 text-slate-400 text-xs uppercase font-bold">
                  <tr>
                     <th className="px-6 py-4">Sinh viên</th>
                     <th className="px-6 py-4">Trường</th>
                     <th className="px-6 py-4">GPA</th>
                     <th className="px-6 py-4">Trạng thái</th>
                     <th className="px-6 py-4 text-right">Thao tác</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-800">
                  {filteredStudents.map(student => (
                     <tr key={student.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4">
                           <div>
                              <p className="font-bold text-white">{student.name}</p>
                              <p className="text-xs text-slate-500 font-mono">{student.id}</p>
                              <p className="text-xs text-slate-600">{student.email}</p>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <span className="bg-slate-800 px-2 py-1 rounded text-xs font-bold">{student.school}</span>
                        </td>
                        <td className="px-6 py-4 font-mono font-bold text-yellow-500">
                           {student.gpa}
                        </td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getStatusColor(student.status)}`}>
                              {student.status.toUpperCase()}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex justify-end gap-2">
                              {student.status === 'active' && (
                                 <button 
                                    onClick={() => updateStudentStatus(student.id, 'suspended')}
                                    className="p-2 bg-red-500/10 hover:bg-red-500/30 text-red-500 rounded-lg transition-colors"
                                    title="Đình chỉ"
                                 >
                                    <Ban className="w-4 h-4" />
                                 </button>
                              )}
                              {student.status === 'suspended' && (
                                 <button 
                                    onClick={() => updateStudentStatus(student.id, 'active')}
                                    className="p-2 bg-green-500/10 hover:bg-green-500/30 text-green-500 rounded-lg transition-colors"
                                    title="Kích hoạt lại"
                                 >
                                    <CheckCircle className="w-4 h-4" />
                                 </button>
                              )}
                              {student.status !== 'graduated' && (
                                 <button 
                                    onClick={() => updateStudentStatus(student.id, 'graduated')}
                                    className="p-2 bg-blue-500/10 hover:bg-blue-500/30 text-blue-500 rounded-lg transition-colors"
                                    title="Xét tốt nghiệp"
                                 >
                                    <GraduationCap className="w-4 h-4" />
                                 </button>
                              )}
                              <button className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors" title="Reset Mật khẩu">
                                 <RotateCcw className="w-4 h-4" />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         {filteredStudents.length === 0 && (
            <div className="p-8 text-center text-slate-500">
               Không tìm thấy sinh viên nào.
            </div>
         )}
      </div>
    </div>
  );
};

export default StudentManagement;
