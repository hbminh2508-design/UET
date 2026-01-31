
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, TrendingDown, Briefcase, Activity, DollarSign, ArrowRight, ArrowLeft, Loader2, Info, ChevronRight, BarChart3 } from 'lucide-react';

const StockMarket: React.FC = () => {
  const { stocks, portfolio, userBalance, buyStock, sellStock, themeColor } = useApp();
  const [selectedStock, setSelectedStock] = useState<string>(stocks[0].symbol);
  const [quantity, setQuantity] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'market' | 'portfolio'>('market');

  const currentStock = stocks.find(s => s.symbol === selectedStock) || stocks[0];
  const myPos = portfolio.find(p => p.symbol === selectedStock);

  const formatCurrency = (val: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

  const handleTrade = (type: 'buy' | 'sell') => {
    setIsProcessing(true);
    setTimeout(() => {
      let success = false;
      if (type === 'buy') success = buyStock(selectedStock, quantity);
      else success = sellStock(selectedStock, quantity);

      if (success) {
        alert(`${type === 'buy' ? 'Mua' : 'Bán'} thành công ${quantity} cổ phiếu ${selectedStock}`);
      } else {
        alert('Giao dịch thất bại. Vui lòng kiểm tra lại số dư hoặc số lượng chứng khoán.');
      }
      setIsProcessing(false);
    }, 800);
  };

  const totalPortfolioValue = portfolio.reduce((acc, p) => {
    const s = stocks.find(stock => stock.symbol === p.symbol);
    return acc + (s ? s.price * p.quantity : 0);
  }, 0);

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 px-4 pt-6 animate-in fade-in">
      {/* Header Dashboard */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 opacity-20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Tổng tài sản ròng</p>
              <h2 className="text-3xl font-black">{formatCurrency(userBalance + totalPortfolioValue)}</h2>
            </div>
            <div className="bg-red-600/20 px-3 py-1 rounded-full border border-red-500/30">
               <span className="text-[10px] font-bold text-red-400 tracking-tighter uppercase">UEB Exclusive Access</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Số dư ví</p>
                <p className="font-bold text-lg">{formatCurrency(userBalance)}</p>
             </div>
             <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Giá trị CK</p>
                <p className="font-bold text-lg text-red-400">{formatCurrency(totalPortfolioValue)}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-xl mb-6">
        <button 
          onClick={() => setActiveTab('market')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'market' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500'}`}
        >
          <Activity className="w-4 h-4" /> Thị trường
        </button>
        <button 
          onClick={() => setActiveTab('portfolio')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'portfolio' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500'}`}
        >
          <Briefcase className="w-4 h-4" /> Danh mục ({portfolio.length})
        </button>
      </div>

      {activeTab === 'market' ? (
        <div className="space-y-4">
          {/* Real-time Ticker List */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-50 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-900/50 flex justify-between items-center">
               <h3 className="font-bold text-gray-800 dark:text-white text-sm">Bảng điện tử VNU-STOCK</h3>
               <span className="text-[10px] font-bold text-green-500 animate-pulse">LIVE</span>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-slate-700">
               {stocks.map(s => (
                 <div 
                   key={s.symbol} 
                   onClick={() => setSelectedStock(s.symbol)}
                   className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${selectedStock === s.symbol ? 'bg-red-50 dark:bg-red-900/10' : 'hover:bg-gray-50 dark:hover:bg-slate-700'}`}
                 >
                    <div className="flex items-center gap-3">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${s.change >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {s.symbol.substring(0, 2)}
                       </div>
                       <div>
                          <p className="font-black text-gray-900 dark:text-white">{s.symbol}</p>
                          <p className="text-[10px] text-gray-400 font-medium truncate w-32">{s.name}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="font-bold text-gray-900 dark:text-white">{s.price.toLocaleString()}</p>
                       <div className={`flex items-center justify-end gap-1 text-xs font-bold ${s.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {s.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {Math.abs(s.changePercent).toFixed(2)}%
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Trade Panel */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 p-6 shadow-xl animate-in slide-in-from-bottom-4">
             <div className="flex justify-between items-start mb-6">
                <div>
                   <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">{currentStock.symbol}</h3>
                   <p className="text-xs text-gray-400 font-bold">{currentStock.name}</p>
                </div>
                <div className="text-right">
                   <p className="text-2xl font-black text-red-600">{formatCurrency(currentStock.price)}</p>
                   <p className={`text-sm font-bold ${currentStock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {currentStock.change >= 0 ? '+' : ''}{currentStock.change.toLocaleString()} ({currentStock.changePercent.toFixed(2)}%)
                   </p>
                </div>
             </div>

             {/* Mini Visual Chart simulation */}
             <div className="h-20 flex items-end gap-1 mb-6 px-2">
                {currentStock.history.map((h, i) => (
                   <div 
                     key={i} 
                     className="flex-1 bg-red-500/20 rounded-t-sm relative group"
                     style={{ height: `${((h - 10000) / 80000) * 100}%` }}
                   >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                         {h.toLocaleString()}
                      </div>
                      <div className={`absolute bottom-0 w-full rounded-t-sm ${currentStock.change >= 0 ? 'bg-green-500' : 'bg-red-500'}`} style={{ height: '30%' }}></div>
                   </div>
                ))}
             </div>

             <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-2xl flex items-center justify-between">
                   <span className="text-sm font-bold text-gray-500">Số lượng mua/bán</span>
                   <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 flex items-center justify-center font-bold"
                      >-</button>
                      <input 
                        type="number" 
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-12 bg-transparent text-center font-black text-lg outline-none"
                      />
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 flex items-center justify-center font-bold"
                      >+</button>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                   <button 
                     onClick={() => handleTrade('buy')}
                     disabled={isProcessing || userBalance < (currentStock.price * quantity)}
                     className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-green-500/20 active:scale-95 transition-all flex flex-col items-center justify-center disabled:opacity-50"
                   >
                      {isProcessing ? <Loader2 className="animate-spin" /> : (
                        <>
                          <span className="text-sm">MUA VÀO</span>
                          <span className="text-[10px] opacity-80">{formatCurrency(currentStock.price * quantity)}</span>
                        </>
                      )}
                   </button>
                   <button 
                     onClick={() => handleTrade('sell')}
                     disabled={isProcessing || !myPos || myPos.quantity < quantity}
                     className="bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-red-500/20 active:scale-95 transition-all flex flex-col items-center justify-center disabled:opacity-50"
                   >
                      {isProcessing ? <Loader2 className="animate-spin" /> : (
                        <>
                          <span className="text-sm">BÁN RA</span>
                          <span className="text-[10px] opacity-80">{formatCurrency(currentStock.price * quantity)}</span>
                        </>
                      )}
                   </button>
                </div>
             </div>
             
             {myPos && (
               <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                     <Info className="w-4 h-4 text-blue-500" />
                     <span className="text-xs font-bold text-blue-800 dark:text-blue-300">Đang sở hữu: {myPos.quantity} CP</span>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] text-blue-500 font-bold uppercase">Lãi/Lỗ tạm tính</p>
                     <p className={`text-xs font-black ${(currentStock.price - myPos.avgPrice) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {(currentStock.price - myPos.avgPrice) >= 0 ? '+' : ''}
                        {formatCurrency((currentStock.price - myPos.avgPrice) * myPos.quantity)}
                     </p>
                  </div>
               </div>
             )}
          </div>
        </div>
      ) : (
        /* Portfolio View */
        <div className="animate-in fade-in slide-in-from-right duration-300">
           {portfolio.length === 0 ? (
             <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-gray-300 dark:border-slate-700">
                <BarChart3 className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-gray-400 font-bold">Bạn chưa sở hữu cổ phiếu nào</h3>
                <button onClick={() => setActiveTab('market')} className="mt-4 text-red-600 font-bold hover:underline">Khám phá thị trường</button>
             </div>
           ) : (
             <div className="space-y-4">
                {portfolio.map(p => {
                  const s = stocks.find(stock => stock.symbol === p.symbol);
                  if (!s) return null;
                  const profit = (s.price - p.avgPrice) * p.quantity;
                  const profitPercent = ((s.price - p.avgPrice) / p.avgPrice) * 100;

                  return (
                    <div 
                      key={p.symbol} 
                      onClick={() => { setSelectedStock(p.symbol); setActiveTab('market'); }}
                      className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                       <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                             <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xs">
                                {p.symbol.substring(0, 2)}
                             </div>
                             <div>
                                <h4 className="font-black text-gray-900 dark:text-white text-lg">{p.symbol}</h4>
                                <p className="text-xs text-gray-400 font-bold">{p.quantity} Cổ phiếu</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] text-gray-400 font-bold uppercase">Thị giá hiện tại</p>
                             <p className="font-black text-gray-900 dark:text-white">{formatCurrency(s.price)}</p>
                          </div>
                       </div>

                       <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-50 dark:border-slate-700">
                          <div>
                             <p className="text-[10px] text-gray-400 font-bold uppercase">Giá vốn TB</p>
                             <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">{formatCurrency(p.avgPrice)}</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] text-gray-400 font-bold uppercase">Lãi / Lỗ</p>
                             <p className={`font-black text-sm ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {profit >= 0 ? '+' : ''}{formatCurrency(profit)} ({profitPercent.toFixed(2)}%)
                             </p>
                          </div>
                       </div>
                    </div>
                  );
                })}
                
                <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-3xl text-center">
                   <p className="text-xs text-red-600 font-bold uppercase mb-2">Lời khuyên từ chuyên gia UEB</p>
                   <p className="text-sm text-red-800 dark:text-red-200 leading-relaxed italic">
                      "Hãy đa dạng hóa danh mục đầu tư và theo dõi tin tức chính thống từ VNU để có quyết định đúng đắn nhất."
                   </p>
                </div>
             </div>
           )}
        </div>
      )}

      {/* Market News Ticker (Bottom) */}
      <div className="fixed bottom-20 left-0 w-full bg-slate-900 text-white/50 text-[10px] py-1 overflow-hidden whitespace-nowrap z-30">
          <div className="animate-marquee flex gap-10">
             {stocks.map(s => (
               <span key={s.symbol}>
                 <span className="font-black text-white">{s.symbol}</span> {s.price.toLocaleString()} 
                 <span className={s.change >= 0 ? 'text-green-500' : 'text-red-500'}> {s.change >= 0 ? '▲' : '▼'} {Math.abs(s.changePercent).toFixed(1)}%</span>
               </span>
             ))}
             {/* Duplicate for infinite loop */}
             {stocks.map(s => (
               <span key={`${s.symbol}-dup`}>
                 <span className="font-black text-white">{s.symbol}</span> {s.price.toLocaleString()} 
                 <span className={s.change >= 0 ? 'text-green-500' : 'text-red-500'}> {s.change >= 0 ? '▲' : '▼'} {Math.abs(s.changePercent).toFixed(1)}%</span>
               </span>
             ))}
          </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default StockMarket;
