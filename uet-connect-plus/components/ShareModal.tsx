import React from 'react';
import { X, Copy, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    alert("Đã sao chép nội dung vào bộ nhớ tạm!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden transform scale-100 transition-all">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-800">Chia sẻ</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
             <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
           <div className="grid grid-cols-4 gap-4 mb-6">
             <button className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Facebook className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs text-gray-600">Facebook</span>
             </button>
             <button className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                  <Twitter className="w-6 h-6 text-sky-500" />
                </div>
                <span className="text-xs text-gray-600">Twitter</span>
             </button>
             <button className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Linkedin className="w-6 h-6 text-blue-700" />
                </div>
                <span className="text-xs text-gray-600">LinkedIn</span>
             </button>
             <button onClick={handleCopy} className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <Copy className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-xs text-gray-600">Sao chép</span>
             </button>
           </div>
           
           <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2 border border-gray-100">
             <LinkIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
             <p className="text-xs text-gray-500 truncate flex-1">{content}</p>
           </div>
        </div>
      </div>
    </div>
  );
};
export default ShareModal;
