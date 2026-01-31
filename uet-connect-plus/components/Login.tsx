
import React, { useState, useEffect, useRef } from 'react';
import { validateStudentId, generateUltraSecureOTP } from '../services/authService';
import Logo from './Logo';
import { useApp } from '../context/AppContext';
import { Mail, ArrowRight, Loader2, CheckCircle, Lock, User, RefreshCw, ShieldCheck, Smartphone, Cpu } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useApp();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState(''); // This will store the joined OTP
  const [otp, setOtp] = useState<string[]>(new Array(7).fill(''));
  const [step, setStep] = useState<'id' | 'device_check' | 'password'>('id');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedPass, setGeneratedPass] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [deviceStatus, setDeviceStatus] = useState('Đang quét thiết bị...');

  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleIdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateStudentId(studentId)) {
      setError('Mã số sinh viên không hợp lệ. Định dạng: 2x02cdfg');
      return;
    }

    // Step 2: Device Security Check (The "Ultra" part)
    setStep('device_check');
    setLoading(true);
    
    // Simulate complex security checks
    setTimeout(() => setDeviceStatus('Xác thực địa chỉ IP...'), 800);
    setTimeout(() => setDeviceStatus('Kiểm tra toàn vẹn trình duyệt...'), 1600);
    setTimeout(() => setDeviceStatus('Mã hóa phiên làm việc...'), 2400);

    setTimeout(() => {
      setLoading(false);
      const newPass = generateUltraSecureOTP(studentId);
      setGeneratedPass(newPass);
      
      // Auto-fill logic for the new OTP component
      const passArray = newPass.split('');
      setOtp(passArray);
      setPassword(newPass);
      
      setStep('password');
      setShowToast(true);
    }, 3200);
  };

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.toUpperCase();
    if (/[^a-zA-Z0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setPassword(newOtp.join(''));

    // Move to next input if value is entered
    if (value && index < 6) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== generatedPass) {
      setError('Mã xác nhận không đúng. Vui lòng kiểm tra lại.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(studentId);
    }, 1000);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Focus first OTP input when moving to password step
  useEffect(() => {
    if (step === 'password') {
      setTimeout(() => {
        otpInputs.current[0]?.focus();
      }, 500);
    }
  }, [step]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden font-sans">
      {/* Dynamic Matrix-like Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/40 via-slate-900 to-black"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse"></div>
      </div>
      
      <div className="z-10 mb-8 flex flex-col items-center animate-fade-in-down">
        <div className="relative hover:scale-105 transition-transform duration-300">
           <div className="bg-slate-900/50 p-4 rounded-3xl shadow-2xl mb-4 border border-blue-500/30 backdrop-blur-md">
              <Logo size="xl" variant="light" />
           </div>
        </div>
      </div>

      <div className="w-full max-w-md p-8 bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl z-10 mx-4 border border-blue-500/20 relative overflow-hidden">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

        {step === 'device_check' ? (
           <div className="flex flex-col items-center justify-center py-8">
              <div className="relative w-24 h-24 mb-6">
                 <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-ping"></div>
                 <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
                 <ShieldCheck className="absolute inset-0 m-auto text-blue-400 w-10 h-10" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Đang quét thiết bị</h3>
              <p className="text-blue-300 text-xs font-mono">{deviceStatus}</p>
           </div>
        ) : (
          <>
            <h2 className="text-2xl font-black text-white mb-2 text-center tracking-tight">
              {step === 'id' ? 'Đăng nhập an toàn' : 'Xác thực 2 lớp'}
            </h2>
            <p className="text-slate-400 text-center mb-8 text-sm">
              {step === 'id' 
                ? 'Hệ thống VNU Authentication Ultra' 
                : `Mã bảo mật OTP (One-Time Password)`
              }
            </p>

            {step === 'id' ? (
              <form onSubmit={handleIdSubmit} className="space-y-5">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Mã số định danh (Student ID)"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-700 bg-slate-800/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono"
                    autoFocus
                  />
                </div>
                {error && <p className="text-red-400 text-xs font-bold ml-1 animate-pulse">{error}</p>}
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin h-6 w-6" /> : (
                    <span className="flex items-center gap-2">
                      TIẾP TỤC <ArrowRight className="h-5 w-5" />
                    </span>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="flex justify-between gap-1.5 px-1">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      ref={(el) => { otpInputs.current[index] = el; }}
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-full h-14 text-center text-xl font-black text-white bg-slate-800/80 border border-slate-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all font-mono"
                    />
                  ))}
                </div>

                {error && <p className="text-red-400 text-xs font-bold text-center animate-pulse">{error}</p>}

                <button
                  type="submit"
                  disabled={loading || password.length < 7}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin h-6 w-6" /> : 'XÁC THỰC NGAY'}
                </button>
                
                <div className="flex flex-col items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => {
                      setStep('id');
                      setOtp(new Array(7).fill(''));
                      setPassword('');
                      setError('');
                      setShowToast(false);
                    }}
                    className="text-slate-500 text-xs font-bold hover:text-blue-400 py-2 uppercase tracking-tighter transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="w-3 h-3" /> Đăng nhập tài khoản khác
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>

      <div className="mt-8 text-center z-10 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
           <ShieldCheck className="w-3 h-3" /> Protected by UET Ultra Core
        </div>
        <div className="flex gap-4">
           <div className="flex items-center gap-1 text-slate-600 text-[9px]">
              <Smartphone className="w-3 h-3" /> Device Verified
           </div>
           <div className="flex items-center gap-1 text-slate-600 text-[9px]">
              <Cpu className="w-3 h-3" /> AI Analysis
           </div>
        </div>
      </div>

      {/* Security Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 max-w-sm w-full bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-500/30 p-5 transform transition-all duration-500 animate-slide-in z-50">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-2xl bg-blue-900/50 flex items-center justify-center border border-blue-500/20">
                <Lock className="h-6 w-6 text-blue-400 animate-pulse" />
              </div>
            </div>
            <div className="ml-4 w-0 flex-1">
              <p className="text-sm font-bold text-white mb-1">Mã xác thực 1 lần (OTP)</p>
              <div className="flex items-center gap-2 mb-1">
                 <span className="text-xs text-slate-400">Gửi tới:</span>
                 <span className="text-xs font-mono text-blue-300 bg-blue-900/30 px-1 rounded">{studentId}@vnu.edu.vn</span>
              </div>
              <div className="mt-2 flex items-baseline gap-2 bg-black/30 p-2 rounded-lg border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">CODE:</span>
                <span className="font-mono font-black text-green-400 text-lg tracking-widest">{generatedPass}</span>
              </div>
              <p className="mt-2 text-[10px] text-slate-500 italic">
                 *Hệ thống đã tự động điền để thuận tiện cho bạn.
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="rounded-full p-1 text-slate-500 hover:text-white focus:outline-none"
                onClick={() => setShowToast(false)}
              >
                <CheckCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
