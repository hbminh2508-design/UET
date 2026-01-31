import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, MessageCircle, Send, Ghost, Share2, PenLine, X } from 'lucide-react';
import ShareModal from './ShareModal';

const Confessions: React.FC = () => {
  const { confessions, likePost, addConfession } = useApp();
  const [shareModalData, setShareModalData] = useState<{ isOpen: boolean; content: string }>({ isOpen: false, content: '' });
  const [showForm, setShowForm] = useState(false);
  const [newContent, setNewContent] = useState('');

  const handleShare = async (content: string) => {
    const shareData = {
      title: 'UET Confessions',
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

  const handleSubmit = () => {
    if (!newContent.trim()) return;
    addConfession(newContent);
    setNewContent('');
    setShowForm(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-24">
      <ShareModal 
        isOpen={shareModalData.isOpen} 
        onClose={() => setShareModalData({ ...shareModalData, isOpen: false })} 
        content={shareModalData.content} 
      />

      {/* Hero Header */}
      <div className="sticky top-0 z-30 bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-6 shadow-lg rounded-b-3xl mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              UET CFS <Ghost className="w-6 h-6 animate-bounce" />
            </h1>
            <p className="text-purple-200 text-sm mt-1">Nơi cảm xúc thăng hoa (ẩn danh)</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all border border-white/20 flex items-center gap-2"
          >
            {showForm ? <X className="w-4 h-4" /> : <PenLine className="w-4 h-4" />}
            {showForm ? 'Đóng' : 'Gửi CFS'}
          </button>
        </div>
      </div>

      {/* Submission Form */}
      {showForm && (
        <div className="px-4 mb-6 animate-fade-in-down">
          <div className="bg-white rounded-2xl p-4 shadow-xl border-2 border-purple-100">
            <h3 className="text-purple-900 font-bold mb-2">Viết Confession Mới</h3>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Chia sẻ câu chuyện của bạn (sẽ được ẩn danh)..."
              className="w-full h-32 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm"
            />
            <div className="flex justify-end mt-2">
              <button 
                onClick={handleSubmit}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-purple-200 transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Gửi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="px-4 space-y-6">
        {confessions.map((cfs) => (
          <div key={cfs.id} className="bg-white rounded-2xl p-6 shadow-sm border border-purple-50 relative overflow-hidden group hover:shadow-md transition-all">
             {/* Decor */}
             <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-[100px] -z-0 opacity-50 group-hover:scale-110 transition-transform"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm">
                  ?
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{cfs.author}</h3>
                  <p className="text-xs text-gray-400">{cfs.timestamp}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 italic font-medium leading-relaxed font-serif text-lg">
                  "{cfs.content}"
                </p>
              </div>

              <div className="flex items-center gap-6 border-t border-dashed border-gray-100 pt-4">
                 <button 
                    onClick={() => likePost(cfs.id)}
                    className={`flex items-center gap-2 transition-colors ${cfs.isLiked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'}`}
                 >
                    <Heart className={`w-6 h-6 ${cfs.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm font-bold">{cfs.likes}</span>
                 </button>
                 <button className="flex items-center gap-2 text-gray-400 hover:text-purple-500 transition-colors">
                    <MessageCircle className="w-6 h-6" />
                    <span className="text-sm font-bold">{cfs.comments}</span>
                 </button>
                 <button 
                    onClick={() => handleShare(cfs.content)}
                    className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors"
                 >
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm font-bold">Share</span>
                 </button>
              </div>
            </div>
          </div>
        ))}
        
        {!showForm && (
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8 text-center border border-dashed border-purple-200">
            <p className="text-gray-500 mb-4">Bạn có tâm sự thầm kín?</p>
            <button 
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center gap-2 w-full sm:w-auto mx-auto bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-purple-200 transition-all"
            >
              <Send className="w-4 h-4" /> Viết Confession ngay
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Confessions;
