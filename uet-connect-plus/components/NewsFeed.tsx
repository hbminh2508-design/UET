
import React, { useState } from 'react';
import { NewsTab } from '../types';
import { useApp } from '../context/AppContext';
import { MessageSquare, Heart, Share2, MoreHorizontal, ShieldCheck, UserCircle, Search, Filter, Send, GraduationCap, Edit3, Image as ImageIcon } from 'lucide-react';
import ShareModal from './ShareModal';

const NewsFeed: React.FC = () => {
  const { user, posts, likePost, addComment, createPost } = useApp();
  const [activeTab, setActiveTab] = useState<NewsTab>(NewsTab.OFFICIAL);
  const [keyword, setKeyword] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'student' | 'lecturer'>('all');
  const [shareModalData, setShareModalData] = useState<{ isOpen: boolean; content: string }>({ isOpen: false, content: '' });
  
  // State for commenting
  const [openCommentId, setOpenCommentId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  // State for creating post (student)
  const [newPostContent, setNewPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const filteredPosts = posts.filter(post => {
    // Logic: Official tab includes Admin AND Lecturer
    if (activeTab === NewsTab.OFFICIAL && post.role !== 'admin' && post.role !== 'lecturer') return false;
    
    // Logic: Student tab includes only students
    if (activeTab === NewsTab.STUDENT && post.role === 'admin') return false;
    if (activeTab === NewsTab.STUDENT && post.role === 'lecturer') return false;

    const matchKeyword = 
      post.content.toLowerCase().includes(keyword.toLowerCase()) || 
      post.author.toLowerCase().includes(keyword.toLowerCase());
    
    const matchRole = filterRole === 'all' || post.role === filterRole;
    
    return matchKeyword && matchRole;
  });

  const handleShare = async (content: string) => {
    const shareData = {
      title: 'UET Connect Plus',
      text: content,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      setShareModalData({ isOpen: true, content });
    }
  };

  const submitComment = (postId: string) => {
    if (!commentText.trim()) return;
    addComment(postId, commentText);
    setCommentText('');
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    setIsPosting(true);
    // Simulate delay
    setTimeout(() => {
        createPost(newPostContent);
        setNewPostContent('');
        setIsPosting(false);
        if (user?.role === 'student') {
            alert("Bài viết của bạn đã được gửi và đang chờ duyệt!");
        }
    }, 800);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ShareModal 
        isOpen={shareModalData.isOpen} 
        onClose={() => setShareModalData({ ...shareModalData, isOpen: false })} 
        content={shareModalData.content} 
      />

      {/* Tabs & Search Header - Glassmorphism Mobile Friendly */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-100/50 dark:border-slate-800/50 pt-2 px-4 shadow-sm transition-colors duration-200">
        <div className="flex items-center justify-between mb-3 pt-2">
           <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Bảng Tin</h1>
        </div>
        
        {/* Filter Controls */}
        <div className="flex gap-3 mb-3">
          <div className="relative flex-1 group">
             <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
             <input 
               type="text" 
               placeholder="Tìm kiếm..."
               value={keyword}
               onChange={(e) => setKeyword(e.target.value)}
               className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-slate-800 dark:text-white rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
             />
          </div>
          <div className="relative">
             <select 
               value={filterRole}
               onChange={(e) => setFilterRole(e.target.value as any)}
               className="appearance-none bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200 pl-9 pr-8 py-2.5 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer h-full border-none transition-colors"
             >
               <option value="all">Tất cả</option>
               <option value="admin">Admin</option>
               <option value="student">SV</option>
               <option value="lecturer">GV</option>
             </select>
             <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Tab Switcher - Mobile Optimized Touch Targets */}
        <div className="flex space-x-1 pb-1">
          <button
            onClick={() => setActiveTab(NewsTab.OFFICIAL)}
            className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-all duration-300 ${
              activeTab === NewsTab.OFFICIAL
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            Chính thống
          </button>
          <button
            onClick={() => setActiveTab(NewsTab.STUDENT)}
            className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-all duration-300 ${
              activeTab === NewsTab.STUDENT
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            Sinh viên
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="p-4 space-y-6 mt-2 pb-24">
        
        {/* Student Create Post Box */}
        {activeTab === NewsTab.STUDENT && user?.role === 'student' && (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 shadow-sm border border-gray-100 dark:border-slate-700 mb-6">
                <div className="flex gap-3 mb-3">
                    <img src={user.avatar} alt="Me" className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                    <textarea 
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder={`Bạn đang nghĩ gì, ${user.name}?`}
                        className="flex-1 bg-gray-50 dark:bg-slate-900 dark:text-white rounded-2xl p-3 text-sm border-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 resize-none h-20 transition-all"
                    />
                </div>
                <div className="flex justify-between items-center px-1">
                    <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700 px-3 py-1.5 rounded-xl transition-colors text-sm font-medium">
                        <ImageIcon className="w-4 h-4 text-green-500" />
                        <span>Ảnh/Video</span>
                    </button>
                    <button 
                        onClick={handleCreatePost}
                        disabled={!newPostContent.trim() || isPosting}
                        className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:shadow-none flex items-center gap-2"
                    >
                        {isPosting ? 'Đang gửi...' : <><Send className="w-4 h-4" /> Đăng bài</>}
                    </button>
                </div>
            </div>
        )}

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 flex flex-col items-center">
            <div className="bg-gray-100 dark:bg-slate-800 rounded-full w-20 h-20 flex items-center justify-center mb-4 shadow-inner">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Không tìm thấy bài viết nào.</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden hover:shadow-md transition-all duration-300">
              {/* Header */}
              <div className="p-4 flex justify-between items-start">
                <div className="flex gap-3">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                    post.role === 'admin' 
                      ? 'bg-gradient-to-tr from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30' 
                      : post.role === 'lecturer'
                      ? 'bg-gradient-to-tr from-green-100 to-emerald-50 dark:from-green-900/30 dark:to-emerald-800/30'
                      : 'bg-gradient-to-tr from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-800/30'
                  }`}>
                    {post.role === 'admin' ? (
                       <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    ) : post.role === 'lecturer' ? (
                       <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400" />
                    ) : (
                       <UserCircle className="w-7 h-7 text-indigo-500 dark:text-indigo-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5 text-[15px]">
                      {post.author}
                      {post.role === 'admin' && (
                        <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wide">
                          Official
                        </span>
                      )}
                      {post.role === 'lecturer' && (
                        <span className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wide">
                          Giảng viên
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{post.timestamp}</p>
                  </div>
                </div>
                <button className="p-2 -mr-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="px-4 pb-2">
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap text-[15px]">
                  {post.content}
                </p>
              </div>

              {/* Image attachment if any - Full width on mobile */}
              {post.image && (
                <div className="mt-3">
                  <img src={post.image} alt="Post attachment" className="w-full h-auto object-cover max-h-96 bg-gray-100 dark:bg-slate-900" />
                </div>
              )}

              {/* Actions - Larger Touch Targets */}
              <div className="px-2 py-2 border-t border-gray-50 dark:border-slate-700 flex items-center justify-between mt-2">
                <div className="flex gap-1">
                  <button 
                    onClick={() => likePost(post.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all active:scale-95 ${
                      post.isLiked 
                      ? 'text-red-500 bg-red-50 dark:bg-red-900/10' 
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm font-bold">{post.likes}</span>
                  </button>
                  <button 
                    onClick={() => setOpenCommentId(openCommentId === post.id ? null : post.id)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-blue-500 transition-all active:scale-95"
                  >
                    <MessageSquare className="w-6 h-6" />
                    <span className="text-sm font-bold">{post.comments}</span>
                  </button>
                </div>
                <button 
                  onClick={() => handleShare(post.content)}
                  className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-xl transition-all active:scale-95"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Comment Section */}
              {openCommentId === post.id && (
                <div className="px-4 pb-4 pt-1 bg-gray-50/80 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-700">
                  <div className="mb-4 space-y-3 mt-3">
                    {post.commentList && post.commentList.length > 0 ? (
                      post.commentList.map(comment => (
                        <div key={comment.id} className="flex gap-2">
                           <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                             {comment.author.charAt(0)}
                           </div>
                           <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm border border-gray-100 dark:border-slate-700 flex-1">
                              <span className="font-bold text-gray-900 dark:text-white block text-xs mb-0.5">{comment.author}</span>
                              <span className="text-gray-700 dark:text-gray-300 leading-snug">{comment.content}</span>
                              <span className="block text-[10px] text-gray-400 mt-1.5">{comment.timestamp}</span>
                           </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-xs text-gray-400 py-4 italic">Chưa có bình luận nào. Hãy là người đầu tiên!</p>
                    )}
                  </div>
                  <div className="flex gap-2 items-end">
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Viết bình luận..."
                        className="w-full px-4 py-3 text-sm rounded-2xl border border-gray-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        onKeyDown={(e) => e.key === 'Enter' && submitComment(post.id)}
                      />
                    </div>
                    <button 
                      onClick={() => submitComment(post.id)}
                      disabled={!commentText.trim()}
                      className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:shadow-none active:scale-95 transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        {filteredPosts.length > 0 && (
          <div className="text-center py-8 text-gray-400 text-xs font-medium uppercase tracking-widest">
            — Bạn đã xem hết tin mới —
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
