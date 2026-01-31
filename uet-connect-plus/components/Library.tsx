
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Book, Search, BookOpen, Clock, CheckCircle } from 'lucide-react';

const Library: React.FC = () => {
  const { books, borrowBook } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'physical' | 'digital'>('all');

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || book.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleBorrow = (bookId: string) => {
    if (confirm('Bạn có chắc chắn muốn mượn cuốn sách này không?')) {
        borrowBook(bookId);
        alert('Đăng ký mượn thành công! Vui lòng đến thư viện nhận sách trong 24h.');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 px-4 pt-6 animate-in fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Book className="w-7 h-7 text-yellow-600" /> VNU-LIC
        </h1>
        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">
            Thư viện Trung tâm
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm sách, giáo trình, tài liệu số..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
        />
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-gray-100 dark:bg-slate-800 rounded-xl mb-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'all' ? 'bg-white dark:bg-slate-700 shadow-sm text-yellow-600' : 'text-gray-500'}`}
        >
          Tất cả
        </button>
        <button
          onClick={() => setActiveTab('physical')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'physical' ? 'bg-white dark:bg-slate-700 shadow-sm text-yellow-600' : 'text-gray-500'}`}
        >
          Sách in
        </button>
        <button
          onClick={() => setActiveTab('digital')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'digital' ? 'bg-white dark:bg-slate-700 shadow-sm text-yellow-600' : 'text-gray-500'}`}
        >
          Tài liệu số
        </button>
      </div>

      {/* Book List */}
      <div className="space-y-4">
        {filteredBooks.map(book => (
          <div key={book.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex gap-4">
            <img src={book.image} alt={book.title} className="w-20 h-28 object-cover rounded-lg shadow-sm" />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">{book.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{book.author}</p>
                <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${book.type === 'physical' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                        {book.type === 'physical' ? 'Sách in' : 'E-Book'}
                    </span>
                    {book.type === 'physical' && (
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                            <BookOpen className="w-3 h-3" /> {book.location}
                        </span>
                    )}
                </div>
              </div>

              <div className="flex justify-between items-end mt-2">
                 {book.status === 'available' ? (
                     <span className="text-green-600 text-xs font-bold flex items-center gap-1">
                         <CheckCircle className="w-3 h-3" /> Có sẵn
                     </span>
                 ) : book.status === 'borrowed' ? (
                     <span className="text-orange-600 text-xs font-bold flex items-center gap-1">
                         <Clock className="w-3 h-3" /> Hạn trả: {book.dueDate}
                     </span>
                 ) : (
                     <span className="text-gray-400 text-xs font-bold">Đã hết</span>
                 )}

                 {book.type === 'physical' && book.status === 'available' && (
                     <button 
                        onClick={() => handleBorrow(book.id)}
                        className="bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-yellow-700 transition-colors"
                     >
                         Đăng ký mượn
                     </button>
                 )}
                 {book.type === 'digital' && (
                     <button className="bg-purple-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-purple-700 transition-colors">
                         Đọc ngay
                     </button>
                 )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
