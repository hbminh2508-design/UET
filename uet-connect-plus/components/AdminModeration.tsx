
import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, Check, X, Clock } from 'lucide-react';

const AdminModeration: React.FC = () => {
  const { pendingPosts, approvePost, rejectPost } = useApp();

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 px-4 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <ShieldAlert className="w-7 h-7 text-red-600" /> Duyệt Bài Viết
        </h1>
        <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold px-3 py-1 rounded-full text-sm">
          {pendingPosts.length} chờ duyệt
        </span>
      </div>

      {pendingPosts.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
           <ShieldAlert className="w-12 h-12 text-green-500 mx-auto mb-3" />
           <h3 className="text-lg font-bold text-gray-800 dark:text-white">Tất cả bài viết đã được xử lý!</h3>
           <p className="text-gray-500 dark:text-gray-400 text-sm">Không còn bài viết nào đang chờ duyệt.</p>
        </div>
      ) : (
        <div className="space-y-4">
           {pendingPosts.map(post => (
             <div key={post.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
                <div className="p-4 border-b border-gray-50 dark:border-slate-700 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{post.timestamp}</span>
                   </div>
                   <span className="text-xs font-bold uppercase tracking-wider text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded">
                     Pending
                   </span>
                </div>
                
                <div className="p-5">
                   <h3 className="font-bold text-gray-900 dark:text-white mb-2">{post.author}</h3>
                   <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-slate-900/50 p-3 rounded-xl">
                      {post.content}
                   </p>
                </div>

                <div className="grid grid-cols-2 divide-x divide-gray-100 dark:divide-slate-700 border-t border-gray-100 dark:border-slate-700">
                   <button 
                     onClick={() => rejectPost(post.id)}
                     className="py-3 flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-bold"
                   >
                      <X className="w-5 h-5" /> Từ chối
                   </button>
                   <button 
                     onClick={() => approvePost(post.id)}
                     className="py-3 flex items-center justify-center gap-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors font-bold"
                   >
                      <Check className="w-5 h-5" /> Duyệt bài
                   </button>
                </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
};

export default AdminModeration;
