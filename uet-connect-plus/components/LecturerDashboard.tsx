
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, PenTool, FileQuestion, QrCode, Send, Plus, CheckCircle } from 'lucide-react';

const LecturerDashboard: React.FC = () => {
  const { createPost, addQuiz, activeAttendanceCode, setActiveAttendanceCode } = useApp();
  const [activeTab, setActiveTab] = useState<'post' | 'quiz' | 'attendance'>('post');
  
  // Post State
  const [postContent, setPostContent] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);

  // Quiz State
  const [quizTitle, setQuizTitle] = useState('');
  const [quizSubject, setQuizSubject] = useState('');
  const [quizDeadline, setQuizDeadline] = useState('');
  const [quizSuccess, setQuizSuccess] = useState(false);

  const handlePostSubmit = () => {
    if (!postContent.trim()) return;
    createPost(postContent);
    setPostContent('');
    setPostSuccess(true);
    setTimeout(() => setPostSuccess(false), 3000);
  };

  const handleQuizSubmit = () => {
    if (!quizTitle || !quizSubject || !quizDeadline) return;
    addQuiz({
      id: `q_${Date.now()}`,
      title: quizTitle,
      subject: quizSubject,
      deadline: quizDeadline,
      questionCount: 10, // Mock
      author: 'Tôi (Giảng viên)',
      isCompleted: false
    });
    setQuizTitle('');
    setQuizSubject('');
    setQuizDeadline('');
    setQuizSuccess(true);
    setTimeout(() => setQuizSuccess(false), 3000);
  };

  const generateAttendance = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setActiveAttendanceCode(code);
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 px-4 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <LayoutDashboard className="w-7 h-7 text-blue-600" /> Bảng Điều Khiển
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-xl mb-6">
        <button 
          onClick={() => setActiveTab('post')}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'post' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
        >
          <PenTool className="w-4 h-4" /> Đăng bài
        </button>
        <button 
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'quiz' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
        >
          <FileQuestion className="w-4 h-4" /> Tạo Quiz
        </button>
        <button 
          onClick={() => setActiveTab('attendance')}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'attendance' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
        >
          <QrCode className="w-4 h-4" /> Điểm danh
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 min-h-[300px]">
        
        {/* Post Tab */}
        {activeTab === 'post' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="font-bold text-gray-800 dark:text-white mb-4">Đăng thông báo mới</h3>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Nhập nội dung thông báo cho sinh viên..."
              className="w-full h-32 p-4 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-none"
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">Sẽ hiển thị tại tab "Chính thống"</span>
              <button 
                onClick={handlePostSubmit}
                disabled={!postContent.trim()}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" /> Đăng ngay
              </button>
            </div>
            {postSuccess && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl flex items-center gap-2 text-sm font-bold animate-pulse">
                <CheckCircle className="w-5 h-5" /> Đã đăng bài thành công!
              </div>
            )}
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-4">
             <h3 className="font-bold text-gray-800 dark:text-white mb-4">Giao bài tập (Quiz)</h3>
             
             <div>
               <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Tiêu đề bài tập</label>
               <input 
                 type="text" 
                 value={quizTitle}
                 onChange={(e) => setQuizTitle(e.target.value)}
                 className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                 placeholder="VD: Kiểm tra giữa kỳ..."
               />
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Môn học</label>
               <input 
                 type="text" 
                 value={quizSubject}
                 onChange={(e) => setQuizSubject(e.target.value)}
                 className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                 placeholder="VD: Lập trình mạng..."
               />
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Hạn nộp</label>
               <input 
                 type="date" 
                 value={quizDeadline}
                 onChange={(e) => setQuizDeadline(e.target.value)}
                 className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
               />
             </div>
             
             <button 
                onClick={handleQuizSubmit}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <Plus className="w-5 h-5" /> Tạo bài tập
              </button>

              {quizSuccess && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl flex items-center gap-2 text-sm font-bold animate-pulse">
                <CheckCircle className="w-5 h-5" /> Đã giao bài tập thành công!
              </div>
            )}
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 text-center py-8">
             <h3 className="font-bold text-gray-800 dark:text-white mb-6">Điểm danh nhanh</h3>
             
             {!activeAttendanceCode ? (
               <button 
                 onClick={generateAttendance}
                 className="w-48 h-48 rounded-full border-4 border-dashed border-gray-300 dark:border-slate-600 flex flex-col items-center justify-center mx-auto hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all group"
               >
                  <QrCode className="w-16 h-16 text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
                  <span className="text-sm font-bold text-gray-500 group-hover:text-blue-600">Tạo mã Code</span>
               </button>
             ) : (
               <div className="animate-in zoom-in duration-300">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Mã điểm danh của bạn</div>
                  <div className="text-6xl font-mono font-bold text-blue-600 dark:text-blue-400 tracking-widest mb-6">
                    {activeAttendanceCode}
                  </div>
                  <div className="w-48 h-48 bg-white p-2 mx-auto rounded-xl shadow-lg mb-6">
                     <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${activeAttendanceCode}`} alt="QR Code" className="w-full h-full" />
                  </div>
                  <button 
                    onClick={() => setActiveAttendanceCode(null)}
                    className="text-red-500 hover:text-red-600 font-bold text-sm"
                  >
                    Kết thúc phiên
                  </button>
               </div>
             )}
          </div>
        )}

      </div>
    </div>
  );
};

export default LecturerDashboard;
