
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Wallet, ArrowRight, ArrowUpRight, Plus, CreditCard, History, Coffee, BookOpen, ChevronLeft, CheckCircle, Loader2, Scan, Smartphone, Building, User, QrCode, Camera, Info, Copy } from 'lucide-react';

type BankingView = 'dashboard' | 'transfer' | 'topup' | 'link' | 'scan' | 'myqr';

const Banking: React.FC = () => {
  const { userBalance, setUserBalance, transactions, user, addTransaction, themeColor } = useApp();
  const [currentView, setCurrentView] = useState<BankingView>('dashboard');
  
  // --- Transfer State ---
  const [transferStep, setTransferStep] = useState(1);
  const [recipient, setRecipient] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferBank, setTransferBank] = useState('BIDV');
  const [isProcessing, setIsProcessing] = useState(false);

  // --- Topup State ---
  const [topupAmount, setTopupAmount] = useState(50000);
  
  // --- Link Card State ---
  const [linkStep, setLinkStep] = useState(1);
  const [cardNumber, setCardNumber] = useState('');

  // --- QR Scan State ---
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{name: string, id: string} | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'food': return <Coffee className="w-5 h-5 text-orange-500" />;
      case 'tuition': return <BookOpen className="w-5 h-5 text-blue-500" />;
      case 'topup': return <ArrowUpRight className="w-5 h-5 text-green-500" />;
      case 'transfer': return <ArrowRight className="w-5 h-5 text-purple-500" />;
      default: return <CreditCard className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleTransfer = () => {
    setIsProcessing(true);
    setTimeout(() => {
        const amount = parseInt(transferAmount);
        if (amount > userBalance) {
            alert("Số dư không đủ!");
            setIsProcessing(false);
            return;
        }
        setUserBalance(userBalance - amount);
        addTransaction({
            id: `tx_transfer_${Date.now()}`,
            type: 'out',
            title: `Chuyển tiền tới ${recipient}`,
            description: `NH: ${transferBank}`,
            amount: amount,
            timestamp: new Date().toLocaleString(),
            icon: 'transfer'
        });
        setTransferStep(3);
        setIsProcessing(false);
    }, 2000);
  };

  const handleTopup = () => {
      setIsProcessing(true);
      setTimeout(() => {
          setUserBalance(userBalance + topupAmount);
          addTransaction({
              id: `tx_topup_${Date.now()}`,
              type: 'in',
              title: 'Nạp tiền vào ví',
              description: 'Nguồn: BIDV **** 6868',
              amount: topupAmount,
              timestamp: new Date().toLocaleString(),
              icon: 'topup'
          });
          setIsProcessing(false);
          setCurrentView('dashboard');
          alert("Nạp tiền thành công!");
      }, 1500);
  };

  const handleLinkCard = () => {
      setIsProcessing(true);
      setTimeout(() => {
          setIsProcessing(false);
          setLinkStep(2); // Success view for linking
      }, 2000);
  };

  const startQRScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScanResult({ name: 'Nguyễn Văn Test', id: '21020001' });
      setIsScanning(false);
    }, 3000);
  };

  const handleProceedFromScan = () => {
    if (scanResult) {
      setRecipient(`${scanResult.name} (${scanResult.id})`);
      setTransferStep(1);
      setCurrentView('transfer');
    }
  };

  // --- Sub-Views ---

  const renderTransfer = () => (
    <div className="animate-in slide-in-from-right">
        <div className="flex items-center gap-3 mb-6">
            <button onClick={() => { setCurrentView('dashboard'); setTransferStep(1); }} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft /></button>
            <h2 className="text-xl font-bold">Chuyển tiền</h2>
        </div>

        {transferStep === 1 && (
            <div className="space-y-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <label className="text-xs font-bold text-gray-500 uppercase">Ngân hàng thụ hưởng</label>
                    <div className="flex items-center gap-2 mt-2 border-b pb-2">
                        <Building className="text-blue-600" />
                        <select 
                            value={transferBank} 
                            onChange={(e) => setTransferBank(e.target.value)}
                            className="w-full bg-transparent outline-none font-bold text-gray-800"
                        >
                            <option value="VNU Pay">VNU Pay - Ví nội bộ</option>
                            <option value="BIDV">BIDV - ĐT & PT Việt Nam</option>
                            <option value="VCB">Vietcombank</option>
                            <option value="TCB">Techcombank</option>
                            <option value="MB">MB Bank</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <label className="text-xs font-bold text-gray-500 uppercase">Số tài khoản / SĐT</label>
                    <div className="flex items-center gap-2 mt-2">
                        <CreditCard className="text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Nhập số tài khoản"
                            className="w-full outline-none font-bold text-lg"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                        />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <label className="text-xs font-bold text-gray-500 uppercase">Số tiền</label>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="font-bold text-2xl text-gray-400">₫</span>
                        <input 
                            type="number" 
                            placeholder="0"
                            className="w-full outline-none font-bold text-2xl text-blue-600"
                            value={transferAmount}
                            onChange={(e) => setTransferAmount(e.target.value)}
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Số dư khả dụng: {formatCurrency(userBalance)}</p>
                </div>

                <button 
                    disabled={!recipient || !transferAmount}
                    onClick={() => setTransferStep(2)}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
                >
                    Tiếp tục
                </button>
            </div>
        )}

        {transferStep === 2 && (
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center animate-in zoom-in-95">
                <h3 className="text-gray-500 font-medium mb-4">Xác nhận giao dịch</h3>
                <div className="text-3xl font-bold text-blue-600 mb-1">{formatCurrency(parseInt(transferAmount))}</div>
                <p className="text-sm text-gray-400 mb-6">Phí giao dịch: 0đ</p>

                <div className="bg-gray-50 p-4 rounded-xl text-left space-y-3 mb-6">
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Đến:</span>
                        <span className="font-bold">{recipient}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Ngân hàng:</span>
                        <span className="font-bold">{transferBank}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Nội dung:</span>
                        <span className="font-bold">{user?.name} chuyen tien</span>
                    </div>
                </div>

                <button 
                    onClick={handleTransfer}
                    disabled={isProcessing}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                    {isProcessing && <Loader2 className="animate-spin" />}
                    {isProcessing ? 'Đang xử lý...' : 'Xác nhận & Chuyển'}
                </button>
            </div>
        )}

        {transferStep === 3 && (
            <div className="text-center py-10 animate-in zoom-in">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Giao dịch thành công!</h2>
                <p className="text-gray-500 mb-8">Bạn đã chuyển {formatCurrency(parseInt(transferAmount))} tới {recipient}.</p>
                <button 
                    onClick={() => { setCurrentView('dashboard'); setTransferStep(1); setRecipient(''); setTransferAmount(''); }}
                    className="bg-gray-100 text-gray-800 px-8 py-3 rounded-xl font-bold hover:bg-gray-200"
                >
                    Về trang chủ
                </button>
            </div>
        )}
    </div>
  );

  const renderTopup = () => (
    <div className="animate-in slide-in-from-right">
        <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setCurrentView('dashboard')} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft /></button>
            <h2 className="text-xl font-bold">Nạp tiền vào ví</h2>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500 font-medium">Nguồn tiền</span>
                <span className="text-blue-600 font-bold text-sm">Thay đổi</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-blue-800 rounded flex items-center justify-center text-white text-[8px] font-bold">BIDV</div>
                <div>
                    <p className="font-bold text-gray-800">BIDV **** 6868</p>
                    <p className="text-xs text-gray-400">Thẻ ghi nợ nội địa</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
            {[50000, 100000, 200000, 500000, 1000000, 2000000].map(amount => (
                <button 
                    key={amount}
                    onClick={() => setTopupAmount(amount)}
                    className={`py-3 px-2 rounded-xl font-bold text-sm border transition-all ${topupAmount === amount ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-600'}`}
                >
                    {amount / 1000}k
                </button>
            ))}
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
             <label className="text-xs font-bold text-gray-500 uppercase">Nhập số tiền khác</label>
             <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-2xl text-gray-400">₫</span>
                <input 
                    type="number" 
                    value={topupAmount}
                    onChange={(e) => setTopupAmount(Number(e.target.value))}
                    className="w-full outline-none font-bold text-2xl text-blue-600"
                />
             </div>
        </div>

        <button 
            onClick={handleTopup}
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 flex items-center justify-center gap-2"
        >
            {isProcessing && <Loader2 className="animate-spin" />}
            {isProcessing ? 'Đang xử lý...' : `Nạp ${formatCurrency(topupAmount)}`}
        </button>
    </div>
  );

  const renderLinkCard = () => (
    <div className="animate-in slide-in-from-right">
        <div className="flex items-center gap-3 mb-6">
            <button onClick={() => { setCurrentView('dashboard'); setLinkStep(1); }} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft /></button>
            <h2 className="text-xl font-bold">Liên kết thẻ/Tài khoản</h2>
        </div>

        {linkStep === 1 ? (
            <div className="space-y-4">
                <div className="relative h-48 bg-gray-900 rounded-2xl p-6 text-white overflow-hidden shadow-2xl mx-auto w-full max-w-sm mb-6">
                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-800 to-black"></div>
                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start">
                            <CreditCard className="w-8 h-8 text-gray-400" />
                            <span className="font-bold text-lg tracking-widest italic">BANK</span>
                        </div>
                        <div>
                            <p className="font-mono text-xl tracking-widest mb-1">
                                {cardNumber || '•••• •••• •••• ••••'}
                            </p>
                            <p className="text-xs text-gray-400 uppercase">Card Holder Name</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="bg-white px-4 py-3 rounded-xl border border-gray-200">
                        <label className="text-xs text-gray-500 font-bold uppercase">Số thẻ</label>
                        <div className="flex items-center gap-2">
                            <input 
                                type="text" 
                                placeholder="Nhập số thẻ" 
                                className="w-full outline-none font-bold text-gray-800"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                maxLength={19}
                            />
                            <Scan className="w-5 h-5 text-blue-600 cursor-pointer" />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="bg-white px-4 py-3 rounded-xl border border-gray-200 flex-1">
                            <label className="text-xs text-gray-500 font-bold uppercase">Ngày hết hạn</label>
                            <input type="text" placeholder="MM/YY" className="w-full outline-none font-bold text-gray-800" />
                        </div>
                        <div className="bg-white px-4 py-3 rounded-xl border border-gray-200 w-24">
                            <label className="text-xs text-gray-500 font-bold uppercase">CVV</label>
                            <input type="password" placeholder="123" className="w-full outline-none font-bold text-gray-800" maxLength={3} />
                        </div>
                    </div>
                    <div className="bg-white px-4 py-3 rounded-xl border border-gray-200">
                        <label className="text-xs text-gray-500 font-bold uppercase">Tên chủ thẻ</label>
                        <input type="text" placeholder="NGUYEN VAN A" className="w-full outline-none font-bold text-gray-800 uppercase" />
                    </div>
                </div>

                <button 
                    onClick={handleLinkCard}
                    disabled={isProcessing || !cardNumber}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 flex items-center justify-center gap-2 mt-4"
                >
                    {isProcessing && <Loader2 className="animate-spin" />}
                    {isProcessing ? 'Đang xác thực...' : 'Liên kết ngay'}
                </button>
            </div>
        ) : (
            <div className="text-center py-10 animate-in zoom-in">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Liên kết thành công!</h2>
                <p className="text-gray-500 mb-8">Thẻ của bạn đã được thêm vào VNU Pay.</p>
                <button 
                    onClick={() => { setCurrentView('dashboard'); setLinkStep(1); setCardNumber(''); }}
                    className="bg-gray-100 text-gray-800 px-8 py-3 rounded-xl font-bold hover:bg-gray-200"
                >
                    Về trang chủ
                </button>
            </div>
        )}
    </div>
  );

  const renderScan = () => (
    <div className="animate-in slide-in-from-right h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
            <button onClick={() => { setCurrentView('dashboard'); setScanResult(null); }} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft /></button>
            <h2 className="text-xl font-bold">Quét mã chuyển tiền</h2>
        </div>

        {!scanResult ? (
          <div className="flex-1 flex flex-col">
             <div className="relative aspect-square w-full max-w-sm mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
                {isScanning ? (
                  <>
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                    <div className="relative z-20 w-64 h-64 border-2 border-blue-500/50 rounded-2xl flex items-center justify-center overflow-hidden">
                       <div className="w-full h-1 bg-blue-500 absolute top-0 animate-[scan_2s_infinite]"></div>
                       <p className="text-white font-bold text-xs mt-32 text-center px-4">Đang phân tích mã QR...</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-8">
                     <Camera className="w-16 h-16 text-slate-700 mb-4 mx-auto" />
                     <p className="text-slate-500 mb-6 text-sm">Căn chỉnh mã QR trong khung hình để thực hiện thanh toán/chuyển tiền</p>
                     <button 
                       onClick={startQRScan}
                       className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-2 mx-auto"
                     >
                       <Scan className="w-5 h-5" /> Bắt đầu quét
                     </button>
                  </div>
                )}
             </div>
             
             <div className="mt-8 bg-blue-50 p-4 rounded-2xl flex items-start gap-3 border border-blue-100">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-800 leading-relaxed">
                  Bạn có thể quét bất kỳ mã QR VNU Pay, VietQR hoặc mã QR ngân hàng nào để chuyển tiền nhanh chóng.
                </p>
             </div>
          </div>
        ) : (
          <div className="animate-in zoom-in-95 bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 text-center">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
             </div>
             <h3 className="text-gray-500 font-medium mb-1">Đã nhận diện người thụ hưởng</h3>
             <h2 className="text-2xl font-black text-gray-900 mb-1">{scanResult.name}</h2>
             <p className="text-blue-600 font-mono font-bold mb-8">VNU Pay ID: {scanResult.id}</p>

             <button 
                onClick={handleProceedFromScan}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
             >
                TIẾP TỤC CHUYỂN TIỀN <ArrowRight className="w-6 h-6" />
             </button>
          </div>
        )}
        
        <style>{`
          @keyframes scan {
            0% { top: 0; }
            50% { top: 100%; }
            100% { top: 0; }
          }
        `}</style>
    </div>
  );

  const renderMyQR = () => (
    <div className="animate-in slide-in-from-right flex flex-col items-center">
        <div className="w-full flex items-center gap-3 mb-6">
            <button onClick={() => setCurrentView('dashboard')} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft /></button>
            <h2 className="text-xl font-bold">Mã QR của tôi</h2>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 w-full max-w-sm flex flex-col items-center relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            
            <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg overflow-hidden -mt-4 mb-4">
               <img src={user?.avatar} alt="Me" className="w-full h-full object-cover" />
            </div>

            <h3 className="font-black text-gray-900 text-xl mb-1">{user?.name}</h3>
            <p className="text-blue-600 font-bold text-sm mb-6 flex items-center gap-1">
               VNU Pay • {user?.id}
            </p>

            {/* Simulated QR Code */}
            <div className="relative p-4 bg-white border-2 border-gray-100 rounded-3xl shadow-inner mb-6">
                <img 
                   src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=vnu_pay_transfer_${user?.id}`} 
                   alt="My QR" 
                   className="w-56 h-56 rounded-xl"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white p-1.5 rounded-xl shadow-md border border-gray-100">
                        <img src="https://cdn-icons-png.flaticon.com/512/9703/9703596.png" className="w-10 h-10 opacity-80" alt="Logo" />
                    </div>
                </div>
            </div>

            <p className="text-gray-500 text-xs text-center px-6 leading-relaxed mb-6 font-medium">
               Đưa mã này cho người khác để nhận tiền nhanh chóng qua ví VNU Pay hoặc các ứng dụng ngân hàng khác.
            </p>

            <div className="flex gap-2 w-full">
                <button className="flex-1 bg-slate-50 hover:bg-slate-100 py-3 rounded-xl text-gray-700 font-bold text-sm flex items-center justify-center gap-2 border border-slate-200 transition-colors">
                    <Copy className="w-4 h-4" /> Sao chép ID
                </button>
                <button className="flex-1 bg-slate-50 hover:bg-slate-100 py-3 rounded-xl text-gray-700 font-bold text-sm flex items-center justify-center gap-2 border border-slate-200 transition-colors">
                    <ArrowUpRight className="w-4 h-4" /> Lưu ảnh
                </button>
            </div>
        </div>
        
        <div className="mt-8 flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 text-indigo-700 font-bold text-xs uppercase tracking-wider">
           <Building className="w-3.5 h-3.5" /> Đối tác chấp nhận: BIDV, VCB, MB, TCB
        </div>
    </div>
  );

  if (currentView === 'transfer') return <div className="w-full max-w-2xl mx-auto pb-28 px-4 pt-6">{renderTransfer()}</div>;
  if (currentView === 'topup') return <div className="w-full max-w-2xl mx-auto pb-28 px-4 pt-6">{renderTopup()}</div>;
  if (currentView === 'link') return <div className="w-full max-w-2xl mx-auto pb-28 px-4 pt-6">{renderLinkCard()}</div>;
  if (currentView === 'scan') return <div className="w-full max-w-2xl mx-auto pb-28 px-4 pt-6 h-full">{renderScan()}</div>;
  if (currentView === 'myqr') return <div className="w-full max-w-2xl mx-auto pb-28 px-4 pt-6">{renderMyQR()}</div>;

  return (
    <div className="w-full max-w-2xl mx-auto pb-28 px-4 pt-6 animate-in fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Wallet className="w-7 h-7 text-blue-600" /> VNU Pay
        </h1>
      </div>

      {/* Main Card */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-800 rounded-3xl p-6 text-white shadow-xl mb-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
         <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400 opacity-10 rounded-full -ml-10 -mb-10 blur-xl"></div>

         <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
               <div>
                  <p className="text-blue-200 text-sm font-medium mb-1">Tổng số dư khả dụng</p>
                  <h2 className="text-4xl font-bold tracking-tight">{formatCurrency(userBalance)}</h2>
               </div>
               <div className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                  <span className="text-xs font-bold tracking-wider">PREMIUM</span>
               </div>
            </div>

            <div className="flex justify-between items-end">
               <div>
                  <p className="text-xs text-blue-300 uppercase tracking-widest mb-1">Chủ tài khoản</p>
                  <p className="font-bold text-lg uppercase">{user?.name}</p>
               </div>
               <div className="flex flex-col items-end">
                  <p className="text-xs text-blue-300 font-mono tracking-widest mb-1">**** 6868</p>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
               </div>
            </div>
         </div>
      </div>

      {/* Primary QR Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={() => setCurrentView('scan')}
            className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border-2 border-slate-50 hover:border-blue-500/30 transition-all group active:scale-95"
          >
             <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <Scan className="w-8 h-8" />
             </div>
             <span className="font-black text-gray-900 dark:text-white text-sm">QUÉT MÃ QR</span>
          </button>
          <button 
            onClick={() => setCurrentView('myqr')}
            className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border-2 border-slate-50 hover:border-indigo-500/30 transition-all group active:scale-95"
          >
             <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                <QrCode className="w-8 h-8" />
             </div>
             <span className="font-black text-gray-900 dark:text-white text-sm">MÃ QR CỦA TÔI</span>
          </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4 mb-8">
         <button onClick={() => setCurrentView('transfer')} className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-95 group">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
               <ArrowRight className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-gray-700">Chuyển tiền</span>
         </button>
         <button onClick={() => setCurrentView('topup')} className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-95 group">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
               <Plus className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-gray-700">Nạp tiền</span>
         </button>
         <button onClick={() => setCurrentView('link')} className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-95 group">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
               <CreditCard className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-gray-700">Liên kết</span>
         </button>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
         <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
               <History className="w-5 h-5 text-gray-500" /> Lịch sử giao dịch
            </h3>
            <button className="text-blue-600 text-sm font-bold hover:underline">Xem tất cả</button>
         </div>

         <div className="space-y-6">
            {transactions.length === 0 ? (
               <p className="text-center text-gray-400 py-4">Chưa có giao dịch nào.</p>
            ) : (
               transactions.map(tx => (
                  <div key={tx.id} className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100">
                        {getIcon(tx.icon)}
                     </div>
                     <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm">{tx.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{tx.timestamp}</p>
                     </div>
                     <div className="text-right">
                        <p className={`font-bold text-sm ${tx.type === 'in' ? 'text-green-600' : 'text-gray-900'}`}>
                           {tx.type === 'in' ? '+' : '-'}{formatCurrency(tx.amount)}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5 max-w-[100px] truncate ml-auto">{tx.description}</p>
                     </div>
                  </div>
               ))
            )}
         </div>
      </div>
    </div>
  );
};

export default Banking;
