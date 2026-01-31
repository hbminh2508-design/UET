import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Send, Phone, Video, ArrowLeft, MoreVertical, Check, CheckCheck, Bot, UserPlus, X } from 'lucide-react';

const Chat: React.FC = () => {
  const { contacts, messages, sendMessage, addContact } = useApp();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);

  const currentMessages = activeChatId ? (messages[activeChatId] || []) : [];
  const activeContact = contacts.find(c => c.id === activeChatId);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentMessages, isTyping, activeChatId]);

  // Simulate typing indicator trigger based on AI response timing (simple check)
  useEffect(() => {
    if (activeChatId) {
       // If last message is mine, "Other" is likely "thinking" or "typing" if we want to simulate it for everyone
       const lastMsg = currentMessages[currentMessages.length - 1];
       if (lastMsg && lastMsg.isMe) {
          setIsTyping(true);
       } else {
          setIsTyping(false);
       }
    }
  }, [currentMessages, activeChatId]);

  const handleSend = () => {
    if (!messageInput.trim() || !activeChatId) return;
    sendMessage(activeChatId, messageInput);
    setMessageInput('');
  };

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if(newFriendName.trim()) {
      addContact(newFriendName);
      setNewFriendName('');
      setShowAddFriend(false);
    }
  };

  // Contact List View
  if (!activeChatId) {
    return (
      <div className="w-full max-w-2xl mx-auto h-full flex flex-col pb-24 bg-gray-50 dark:bg-slate-900 transition-colors">
        <div className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 border-b border-gray-100/50 dark:border-slate-800/50">
          <div className="flex justify-between items-center mb-4 pt-2">
             <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Tin nhắn</h1>
             <button 
                onClick={() => setShowAddFriend(true)}
                className="p-2.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors active:scale-95"
             >
                <UserPlus className="w-5 h-5" />
             </button>
          </div>
          <div className="relative group">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-slate-800 dark:text-white rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {showAddFriend && (
          <div className="p-4 bg-white dark:bg-slate-800 mx-4 rounded-2xl mb-4 animate-in slide-in-from-top-4 border border-blue-100 dark:border-slate-700 shadow-lg z-20 mt-2">
            <div className="flex justify-between items-center mb-3">
               <h3 className="font-bold text-gray-700 dark:text-gray-200 text-sm">Thêm bạn mới</h3>
               <button onClick={() => setShowAddFriend(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"><X className="w-4 h-4 text-gray-500"/></button>
            </div>
            <form onSubmit={handleAddFriend} className="flex gap-2">
               <input 
                 autoFocus
                 type="text" 
                 value={newFriendName}
                 onChange={(e) => setNewFriendName(e.target.value)}
                 placeholder="Nhập tên hoặc MSSV..."
                 className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
               />
               <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 active:scale-95 transition-all">Thêm</button>
            </form>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-2 space-y-1 no-scrollbar">
          {contacts.map(contact => (
            <div 
              key={contact.id}
              onClick={() => setActiveChatId(contact.id)}
              className="flex items-center p-3.5 rounded-2xl hover:bg-white dark:hover:bg-slate-800 active:bg-gray-100 dark:active:bg-slate-700 transition-all cursor-pointer"
            >
              <div className="relative shrink-0">
                <img src={contact.avatar} alt={contact.name} className="w-14 h-14 rounded-full object-cover border border-gray-100 dark:border-slate-700 shadow-sm" />
                {contact.unread > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 min-w-[1.25rem] px-1 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                    {contact.unread}
                  </span>
                )}
                {contact.isAI && (
                   <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1 border-2 border-white dark:border-slate-900 shadow-sm">
                      <Bot className="w-3 h-3 text-white" />
                   </div>
                )}
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`font-semibold text-base text-gray-900 dark:text-white ${contact.unread > 0 ? 'font-bold' : ''} flex items-center gap-1 truncate`}>
                    {contact.name}
                  </h3>
                  <span className="text-xs text-gray-400 ml-2 shrink-0">{contact.time}</span>
                </div>
                <p className={`text-sm truncate ${contact.unread > 0 ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                  {contact.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Active Conversation View
  return (
    <div className="w-full max-w-2xl mx-auto h-[100dvh] flex flex-col bg-white dark:bg-slate-900 transition-colors fixed inset-0 z-50">
      {/* Chat Header - Glass */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-gray-100/50 dark:border-slate-800/50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-sm z-20 pt-safe-top">
        <div className="flex items-center">
          <button 
            onClick={() => setActiveChatId(null)}
            className="p-2.5 -ml-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full mr-1 transition-colors active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="relative">
             <img src={activeContact?.avatar} alt="avatar" className="w-10 h-10 rounded-full border border-gray-200 dark:border-slate-700" />
             <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
          </div>
          <div className="ml-3">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1">
              {activeContact?.name}
              {activeContact?.isAI && <Bot className="w-3 h-3 text-blue-500" />}
            </h3>
            <span className="text-xs text-green-500 font-medium">Đang hoạt động</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
          <button className="p-2.5 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-full active:scale-95 transition-all">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2.5 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-full active:scale-95 transition-all">
            <Video className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-900 no-scrollbar pb-24" ref={scrollRef}>
        <div className="text-center text-xs font-medium text-gray-400 my-4 bg-gray-200/50 dark:bg-slate-800 inline-block px-3 py-1 rounded-full mx-auto">Hôm nay, 10:00</div>
        
        {currentMessages.length === 0 && activeContact?.isAI && (
           <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-3xl text-blue-800 dark:text-blue-300 text-sm mx-4 shadow-sm border border-blue-100 dark:border-blue-800">
              <Bot className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              Đây là trợ lý ảo AI. Hãy hỏi về lịch học, điểm số, hoặc tâm sự nhé!
           </div>
        )}
        
        {currentMessages.length === 0 && !activeContact?.isAI && (
           <div className="text-center p-6 bg-gray-100 dark:bg-slate-800 rounded-3xl text-gray-500 dark:text-gray-400 text-sm mx-4">
              Bắt đầu cuộc trò chuyện với <span className="font-bold">{activeContact?.name}</span>
           </div>
        )}

        {currentMessages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} animate-fade-in`}
          >
            <div 
              className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-[15px] shadow-sm leading-relaxed ${
                msg.isMe 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-white rounded-bl-none border border-gray-100 dark:border-slate-700'
              }`}
            >
              {msg.text}
            </div>
            <div className="flex items-center gap-1 mt-1 mx-1">
              <span className="text-[10px] text-gray-400 font-medium">
                {msg.timestamp}
              </span>
              {msg.isMe && (
                msg.status === 'read' 
                  ? <CheckCheck className="w-3.5 h-3.5 text-blue-500" /> 
                  : <Check className="w-3.5 h-3.5 text-gray-400" />
              )}
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
           <div className="flex justify-start animate-fade-in">
             <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
               <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
               <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
               <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
             </div>
           </div>
        )}
      </div>

      {/* Input Area - Sticky Bottom with Glass */}
      <div className="p-3 bg-white/90 dark:bg-slate-900/90 border-t border-gray-100 dark:border-slate-800 pb-safe backdrop-blur-lg absolute bottom-0 left-0 right-0 z-30">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-end gap-2"
        >
          <div className="p-2.5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors active:scale-95">
             <MoreVertical className="w-6 h-6" />
          </div>
          <input 
            type="text" 
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Nhập tin nhắn..." 
            className="flex-1 bg-gray-100 dark:bg-slate-800 dark:text-white rounded-3xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all max-h-32"
          />
          <button 
            type="submit" 
            disabled={!messageInput.trim()}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30 active:scale-95 mb-0.5"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;