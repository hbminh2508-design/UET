
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Utensils, Star, Plus, Minus, ShoppingBag, X, MapPin, Clock, Wallet, Truck, CreditCard, Search } from 'lucide-react';

const Canteen: React.FC = () => {
  const { restaurants, cart, addToCart, removeFromCart, clearCart, userBalance, placeOrder } = useApp();
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  
  // Checkout Form State
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'cod'>('wallet');
  const [deliveryLocation, setDeliveryLocation] = useState('');

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowCheckout(true);
    setShowCart(false);
  };

  const confirmOrder = () => {
    if (orderType === 'delivery' && !deliveryLocation.trim()) {
      alert("Vui lòng nhập địa điểm giao hàng");
      return;
    }

    const success = placeOrder(orderType, paymentMethod, deliveryLocation);
    if (success) {
      alert("Đặt hàng thành công!");
      setShowCheckout(false);
      setDeliveryLocation('');
    } else {
      alert("Số dư tài khoản không đủ. Vui lòng nạp thêm hoặc chọn thanh toán khi nhận hàng.");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-28 px-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Utensils className="w-7 h-7 text-orange-500" /> UET Food
        </h1>
        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full border border-blue-100 dark:border-blue-800">
           <Wallet className="w-4 h-4 text-blue-600 dark:text-blue-400" />
           <span className="font-bold text-blue-800 dark:text-blue-300 text-sm">{formatCurrency(userBalance)}</span>
        </div>
      </div>

      {/* Restaurant Selector */}
      {restaurants.length > 0 ? (
        <div className="flex overflow-x-auto gap-4 mb-8 no-scrollbar pb-2">
          {restaurants.map(res => (
            <div 
              key={res.id}
              onClick={() => setSelectedRestaurant(res)}
              className={`min-w-[200px] rounded-xl overflow-hidden shadow-sm border cursor-pointer transition-all ${
                 selectedRestaurant?.id === res.id 
                 ? 'border-orange-500 ring-2 ring-orange-200 dark:ring-orange-900' 
                 : 'border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800'
              }`}
            >
               <div className="h-24 overflow-hidden relative">
                  <img src={res.image} alt={res.name} className="w-full h-full object-cover" />
                  {!res.isOpen && <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-sm">Đóng cửa</div>}
               </div>
               <div className="p-3 bg-white dark:bg-slate-800">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm truncate">{res.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                     <Star className="w-3 h-3 text-yellow-500 fill-current" /> {res.rating}
                     <span>•</span>
                     <span className="truncate">{res.location}</span>
                  </div>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-gray-200 dark:border-slate-700 mb-8">
           <Search className="w-10 h-10 text-gray-300 mx-auto mb-2" />
           <p className="text-gray-400 text-sm">Hiện không có nhà hàng nào đang hoạt động</p>
        </div>
      )}

      {/* Menu */}
      <div className="space-y-6">
         <h2 className="font-bold text-xl text-gray-800 dark:text-white">Menu hôm nay</h2>
         <div className="grid grid-cols-1 gap-4">
            {selectedRestaurant?.menu ? (
              selectedRestaurant.menu.map(item => (
                <div key={item.id} className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-slate-700 flex gap-4">
                   <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                         <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                         <p className="text-orange-600 font-bold">{formatCurrency(item.price)}</p>
                      </div>
                      <button 
                        onClick={() => addToCart({ ...item, quantity: 1 })}
                        className="self-end bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
                      >
                         <Plus className="w-4 h-4" /> Thêm
                      </button>
                   </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-10 italic">Vui lòng chọn một nhà hàng để xem thực đơn.</p>
            )}
         </div>
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
         <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 animate-in slide-in-from-bottom-4 fade-in">
            <button 
               onClick={() => setShowCart(true)}
               className="bg-orange-600 text-white pl-4 pr-6 py-3 rounded-full shadow-lg shadow-orange-500/30 flex items-center gap-3 hover:bg-orange-700 transition-colors active:scale-95"
            >
               <div className="bg-white text-orange-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
               </div>
               <span className="font-bold">Giỏ hàng • {formatCurrency(cartTotal)}</span>
            </button>
         </div>
      )}

      {/* Cart Modal/Sheet */}
      {showCart && (
         <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in">
            <div className="bg-white dark:bg-slate-900 w-full max-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-full duration-300">
               <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-800">
                  <h3 className="font-bold text-lg flex items-center gap-2 text-gray-900 dark:text-white">
                     <ShoppingBag className="w-5 h-5" /> Giỏ hàng của bạn
                  </h3>
                  <button onClick={() => setShowCart(false)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700">
                     <X className="w-6 h-6 text-gray-500" />
                  </button>
               </div>
               
               <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {cart.map(item => (
                     <div key={item.id} className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                           <h4 className="font-bold text-sm text-gray-900 dark:text-white">{item.name}</h4>
                           <p className="text-orange-600 font-bold text-sm">{formatCurrency(item.price)}</p>
                        </div>
                        <div className="flex items-center gap-3 bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
                           <button 
                             onClick={() => item.quantity > 1 ? addToCart({ ...item, quantity: -1 }) : removeFromCart(item.id)}
                             className="w-6 h-6 flex items-center justify-center bg-white dark:bg-slate-700 rounded shadow-sm"
                           >
                              <Minus className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                           </button>
                           <span className="font-bold text-sm w-4 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                           <button 
                             onClick={() => addToCart({ ...item, quantity: 1 })}
                             className="w-6 h-6 flex items-center justify-center bg-white dark:bg-slate-700 rounded shadow-sm"
                           >
                              <Plus className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                           </button>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="p-4 border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900">
                  <div className="flex justify-between items-center mb-4">
                     <span className="text-gray-500 dark:text-gray-400">Tổng cộng:</span>
                     <span className="text-xl font-bold text-orange-600">{formatCurrency(cartTotal)}</span>
                  </div>
                  <div className="flex gap-3">
                     <button 
                        onClick={clearCart}
                        className="flex-1 py-3 text-red-500 font-bold bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40"
                     >
                        Xóa
                     </button>
                     <button 
                        onClick={handleCheckout}
                        className="flex-[2] py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 shadow-lg shadow-orange-500/20"
                     >
                        Thanh toán
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
               <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">Xác nhận đơn hàng</h3>
                  <button onClick={() => setShowCheckout(false)}><X className="w-6 h-6 text-gray-500" /></button>
               </div>
               
               <div className="p-6 space-y-6">
                  {/* Order Type */}
                  <div>
                     <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 block">Hình thức nhận</label>
                     <div className="grid grid-cols-2 gap-3">
                        <button 
                           onClick={() => setOrderType('pickup')}
                           className={`py-3 px-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${orderType === 'pickup' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600' : 'border-gray-200 dark:border-slate-700 text-gray-500'}`}
                        >
                           <MapPin className="w-5 h-5" />
                           <span className="text-xs font-bold">Lấy tại quán</span>
                        </button>
                        <button 
                           onClick={() => setOrderType('delivery')}
                           className={`py-3 px-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${orderType === 'delivery' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600' : 'border-gray-200 dark:border-slate-700 text-gray-500'}`}
                        >
                           <Truck className="w-5 h-5" />
                           <span className="text-xs font-bold">Giao hàng</span>
                        </button>
                     </div>
                  </div>

                  {orderType === 'delivery' && (
                     <div className="animate-in slide-in-from-top-2">
                        <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 block">Địa chỉ giao</label>
                        <input 
                          type="text" 
                          value={deliveryLocation}
                          onChange={(e) => setDeliveryLocation(e.target.value)}
                          placeholder="VD: Phòng 304 G2..."
                          className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
                        />
                     </div>
                  )}

                  {/* Payment Method */}
                  <div>
                     <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 block">Thanh toán</label>
                     <div className="space-y-2">
                        <button 
                           onClick={() => setPaymentMethod('wallet')}
                           className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${paymentMethod === 'wallet' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-slate-700'}`}
                        >
                           <div className="flex items-center gap-3">
                              <Wallet className={`w-5 h-5 ${paymentMethod === 'wallet' ? 'text-blue-600' : 'text-gray-400'}`} />
                              <div className="text-left">
                                 <p className={`text-sm font-bold ${paymentMethod === 'wallet' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>Ví UET</p>
                                 <p className="text-xs text-gray-400">Số dư: {formatCurrency(userBalance)}</p>
                              </div>
                           </div>
                           {paymentMethod === 'wallet' && <div className="w-4 h-4 rounded-full bg-blue-500"></div>}
                        </button>

                        <button 
                           onClick={() => setPaymentMethod('cod')}
                           className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${paymentMethod === 'cod' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-slate-700'}`}
                        >
                           <div className="flex items-center gap-3">
                              <CreditCard className={`w-5 h-5 ${paymentMethod === 'cod' ? 'text-green-600' : 'text-gray-400'}`} />
                              <div className="text-left">
                                 <p className={`text-sm font-bold ${paymentMethod === 'cod' ? 'text-green-700 dark:text-green-300' : 'text-gray-700 dark:text-gray-300'}`}>Tiền mặt (COD)</p>
                                 <p className="text-xs text-gray-400">Thanh toán khi nhận</p>
                              </div>
                           </div>
                           {paymentMethod === 'cod' && <div className="w-4 h-4 rounded-full bg-green-500"></div>}
                        </button>
                     </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                     <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Tổng thanh toán</span>
                        <span className="text-2xl font-bold text-orange-600">{formatCurrency(cartTotal)}</span>
                     </div>
                     <button 
                        onClick={confirmOrder}
                        className="w-full py-3.5 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 shadow-lg shadow-orange-500/30 transition-all active:scale-95"
                     >
                        Xác nhận đặt hàng
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default Canteen;
