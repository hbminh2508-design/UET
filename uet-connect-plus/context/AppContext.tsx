
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Post, ChatContact, Message, ScheduleItem, Course, Comment, AppNotification, TuitionBill, ExamGrade, TrainingTask, ServerStats, Quiz, Restaurant, CartItem, Order, Transaction, ServiceRequest, VnuEvent, Stock, PortfolioItem, Book, DormRoom, DormRegistration, StudentRecord } from '../types';
import { MOCK_OFFICIAL_NEWS, MOCK_STUDENT_NEWS, MOCK_CONFESSIONS, MOCK_CONTACTS, MOCK_MESSAGES, MOCK_SCHEDULE, MOCK_COURSES, MOCK_NOTIFICATIONS, MOCK_TUITION, MOCK_GRADES, MOCK_TRAINING_TASKS, MOCK_VNU_EVENTS, MOCK_RESTAURANTS, MOCK_BOOKS, MOCK_DORM_ROOMS, MOCK_ALL_STUDENTS } from '../constants';

interface User {
  id: string;
  name: string;
  avatar?: string;
  role: 'student' | 'admin' | 'lecturer' | 'external_student' | 'developer';
  schoolCode: string; // 'uet', 'ussh', 'ulis', etc.
  schoolName: string; // Full display name
}

const SCHOOL_MAP: Record<string, string> = {
  'uet': 'Trường Đại học Công nghệ',
  'ussh': 'Trường ĐH KHXH&NV',
  'ulis': 'Trường Đại học Ngoại ngữ',
  'ueb': 'Trường Đại học Kinh tế',
  'hus': 'Trường ĐH Khoa học Tự nhiên',
  'ump': 'Trường ĐH Y Dược',
  'ul': 'Khoa Luật',
  'is': 'Trường Quốc tế',
  'sis': 'Trường Khoa học Liên ngành và Nghệ thuật',
  'vnu': 'Đại học Quốc gia Hà Nội'
};

const SCHOOL_THEME_COLORS: Record<string, string> = {
  'uet': '#2563EB',
  'ussh': '#881337',
  'ueb': '#DC2626',
  'ulis': '#059669',
  'hus': '#4F46E5',
  'ump': '#BE123C',
  'ul': '#B45309',
  'is': '#EA580C',
  'sis': '#9333EA',
  'vnu': '#0F172A',
};

const INITIAL_STOCKS: Stock[] = [
  { symbol: 'VNUIT', name: 'VNU Technology Corp', price: 45200, change: 0, changePercent: 0, volume: 125000, history: [44000, 44200, 43900, 44500, 45200] },
  { symbol: 'UEBECO', name: 'UEB Economics Group', price: 78500, change: 0, changePercent: 0, volume: 89000, history: [77000, 77500, 78100, 78000, 78500] },
  { symbol: 'HUSSCI', name: 'HUS Science & Research', price: 32100, change: 0, changePercent: 0, volume: 45000, history: [31000, 31500, 31800, 32000, 32100] },
  { symbol: 'ULISFL', name: 'ULIS Foreign Language', price: 21400, change: 0, changePercent: 0, volume: 32000, history: [22000, 21800, 21500, 21400, 21400] },
  { symbol: 'VNULAW', name: 'VNU Law Institution', price: 15600, change: 0, changePercent: 0, volume: 15000, history: [15000, 15200, 15400, 15500, 15600] },
];

interface AppContextType {
  user: User | null;
  login: (id: string) => void;
  logout: () => void;
  updateUserProfile: (name: string, avatar?: string) => void;
  themeColor: string;
  setThemeColor: (color: string) => void;
  posts: Post[];
  pendingPosts: Post[];
  confessions: Post[];
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  addConfession: (content: string) => void;
  createPost: (content: string, image?: string) => void; 
  approvePost: (postId: string) => void;
  rejectPost: (postId: string) => void;
  serverStats: ServerStats;
  toggleMaintenance: () => void;
  contacts: ChatContact[];
  messages: Record<string, Message[]>;
  sendMessage: (contactId: string, text: string) => void;
  addContact: (name: string) => void;
  schedule: ScheduleItem[];
  vnuEvents: VnuEvent[];
  courses: Course[];
  toggleCourseRegistration: (courseId: string) => void;
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  tuitionBills: TuitionBill[];
  payTuition: (billId: string) => boolean;
  examGrades: ExamGrade[];
  trainingTasks: TrainingTask[];
  submitTrainingTask: (taskId: string, proof?: File) => void;
  quizzes: Quiz[];
  addQuiz: (quiz: Quiz) => void;
  completeQuiz: (quizId: string) => void;
  activeAttendanceCode: string | null;
  setActiveAttendanceCode: (code: string | null) => void;
  restaurants: Restaurant[];
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  userBalance: number;
  setUserBalance: (amount: number) => void;
  placeOrder: (type: 'pickup' | 'delivery', paymentMethod: 'wallet' | 'cod', location?: string) => boolean;
  orders: Order[];
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  serviceRequests: ServiceRequest[];
  createServiceRequest: (type: string, cost: number, note?: string) => boolean;
  
  // Stock Trading
  stocks: Stock[];
  portfolio: PortfolioItem[];
  buyStock: (symbol: string, quantity: number) => boolean;
  sellStock: (symbol: string, quantity: number) => boolean;

  // Library
  books: Book[];
  borrowBook: (bookId: string) => void;

  // Dormitory
  dormRooms: DormRoom[];
  myRegistration: DormRegistration | null;
  registerDorm: (roomId: string, months: number) => boolean;

  // Deeper Admin
  managedStudents: StudentRecord[];
  updateStudentStatus: (id: string, status: 'active' | 'suspended' | 'graduated') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [themeColor, setThemeColor] = useState<string>('#2563EB');

  // --- Stocks State ---
  const [stocks, setStocks] = useState<Stock[]>(INITIAL_STOCKS);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  // --- Library State ---
  const [books, setBooks] = useState<Book[]>(MOCK_BOOKS);

  // --- Dorm State ---
  const [dormRooms, setDormRooms] = useState<DormRoom[]>(MOCK_DORM_ROOMS);
  const [myRegistration, setMyRegistration] = useState<DormRegistration | null>(null);

  // --- Deeper Admin State ---
  const [managedStudents, setManagedStudents] = useState<StudentRecord[]>(MOCK_ALL_STUDENTS);

  useEffect(() => {
    // Stock Price Simulation
    const interval = setInterval(() => {
      setStocks(prev => prev.map(s => {
        const changeRate = (Math.random() * 0.02) - 0.009; // -0.9% to +1.1%
        const newPrice = Math.round(s.price * (1 + changeRate));
        const change = newPrice - s.price;
        const changePercent = (change / s.price) * 100;
        const newHistory = [...s.history.slice(1), newPrice];
        return { ...s, price: newPrice, change, changePercent, history: newHistory };
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const buyStock = (symbol: string, quantity: number): boolean => {
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock || !user) return false;

    const totalCost = stock.price * quantity;
    if (currentUserBalance < totalCost) return false;

    setUserBalance(currentUserBalance - totalCost);
    
    setPortfolio(prev => {
      const existing = prev.find(p => p.symbol === symbol);
      if (existing) {
        const newQuantity = existing.quantity + quantity;
        const newAvgPrice = ((existing.avgPrice * existing.quantity) + (stock.price * quantity)) / newQuantity;
        return prev.map(p => p.symbol === symbol ? { ...p, quantity: newQuantity, avgPrice: newAvgPrice } : p);
      }
      return [...prev, { symbol, quantity, avgPrice: stock.price }];
    });

    addTransaction({
      id: `tx_buy_${Date.now()}`,
      type: 'out',
      title: `Mua Cổ Phiếu ${symbol}`,
      description: `SL: ${quantity} x ${stock.price.toLocaleString()}`,
      amount: totalCost,
      timestamp: new Date().toLocaleString(),
      icon: 'stock'
    });

    return true;
  };

  const sellStock = (symbol: string, quantity: number): boolean => {
    const stock = stocks.find(s => s.symbol === symbol);
    const pos = portfolio.find(p => p.symbol === symbol);
    if (!stock || !pos || pos.quantity < quantity) return false;

    const totalReturn = stock.price * quantity;
    setUserBalance(currentUserBalance + totalReturn);

    setPortfolio(prev => {
      const remaining = pos.quantity - quantity;
      if (remaining === 0) return prev.filter(p => p.symbol !== symbol);
      return prev.map(p => p.symbol === symbol ? { ...p, quantity: remaining } : p);
    });

    addTransaction({
      id: `tx_sell_${Date.now()}`,
      type: 'in',
      title: `Bán Cổ Phiếu ${symbol}`,
      description: `SL: ${quantity} x ${stock.price.toLocaleString()}`,
      amount: totalReturn,
      timestamp: new Date().toLocaleString(),
      icon: 'stock'
    });

    return true;
  };

  const [posts, setPosts] = useState<Post[]>([...MOCK_OFFICIAL_NEWS, ...MOCK_STUDENT_NEWS]);
  const [pendingPosts, setPendingPosts] = useState<Post[]>([]);
  const [confessions, setConfessions] = useState<Post[]>(MOCK_CONFESSIONS);
  const [contacts, setContacts] = useState<ChatContact[]>(MOCK_CONTACTS);
  const [messages, setMessages] = useState<Record<string, Message[]>>({ 'ai_bot': [...MOCK_MESSAGES] });
  const [schedule, setSchedule] = useState<ScheduleItem[]>(MOCK_SCHEDULE);
  const [vnuEvents] = useState<VnuEvent[]>(MOCK_VNU_EVENTS);
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);
  const [tuitionBills, setTuitionBills] = useState<TuitionBill[]>(MOCK_TUITION);
  const [examGrades] = useState<ExamGrade[]>(MOCK_GRADES);
  const [trainingTasks, setTrainingTasks] = useState<TrainingTask[]>(MOCK_TRAINING_TASKS);
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    { id: 'q1', title: 'Kiểm tra chương 1: Mạng máy tính', subject: 'Lập trình mạng .NET', deadline: '20/11/2024', questionCount: 15, author: 'TS. Nguyễn Văn A', isCompleted: false },
    { id: 'q2', title: 'Review kiến thức Tuần 5', subject: 'Trí tuệ nhân tạo', deadline: '22/11/2024', questionCount: 10, author: 'PGS. TS. Trần D', isCompleted: true },
  ]);
  const [activeAttendanceCode, setActiveAttendanceCode] = useState<string | null>(null);
  const [restaurants] = useState<Restaurant[]>(MOCK_RESTAURANTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [userBalances, setUserBalances] = useState<Record<string, number>>({ 
    'VNU-AD': 999999999,
    'vnu-deep': 999999999999 
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);

  const currentUserBalance = user ? (userBalances[user.id] !== undefined ? userBalances[user.id] : 500000) : 0;

  const setUserBalance = (amount: number) => {
    if (user) {
      setUserBalances(prev => ({ ...prev, [user.id]: amount }));
    }
  };

  const [serverStats, setServerStats] = useState<ServerStats>({
    cpu: 45, ram: 60, activeUsers: 1254, requestsPerSec: 340, status: 'optimal'
  });

  const toggleMaintenance = () => setServerStats(prev => ({ ...prev, status: prev.status === 'maintenance' ? 'optimal' : 'maintenance' }));

  const login = (inputId: string) => {
    const lowerId = inputId.toLowerCase();
    let schoolCode = 'uet';
    if (lowerId === 'vnu-ad') {
      setUser({ id: 'VNU-AD', name: 'Quản Trị Viên', avatar: 'https://cdn-icons-png.flaticon.com/512/9703/9703596.png', role: 'admin', schoolCode: 'uet', schoolName: SCHOOL_MAP['uet'] });
    } else if (lowerId === 'vnu-lec') {
      setUser({ id: 'VNU-LEC', name: 'TS. Nguyễn Văn A', avatar: 'https://img.freepik.com/free-photo/portrait-smiling-handsome-man-eyeglasses_171337-4853.jpg', role: 'lecturer', schoolCode: 'uet', schoolName: SCHOOL_MAP['uet'] });
    } else if (lowerId === 'vnu-deep' || lowerId === 'root-er') {
      // Deeper Admin / Developer Account
      setUser({ id: 'vnu-deep', name: 'VNU Core Engineer', avatar: 'https://cdn-icons-png.flaticon.com/512/2040/2040653.png', role: 'developer', schoolCode: 'vnu', schoolName: 'VNU IT Center' });
      setThemeColor('#0F172A'); // Dark theme for dev
    } else {
      let idDisplay = lowerId;
      if (lowerId.includes('-')) {
        const parts = lowerId.split('-');
        idDisplay = parts[0];
        schoolCode = parts[1];
      }
      const role = schoolCode === 'uet' ? 'student' : 'external_student';
      setUser({ id: idDisplay, name: `Sinh viên ${idDisplay}`, avatar: 'https://picsum.photos/300', role, schoolCode, schoolName: SCHOOL_MAP[schoolCode] || 'VNU Member' });
    }
    if (lowerId !== 'vnu-deep' && lowerId !== 'root-er') {
        setThemeColor(SCHOOL_THEME_COLORS[schoolCode] || '#2563EB');
    }
  };

  const logout = () => { setUser(null); setThemeColor('#2563EB'); };
  const updateUserProfile = (name: string, avatar?: string) => { if (user) setUser({ ...user, name, avatar: avatar || user.avatar }); };
  const likePost = (postId: string) => { const upd = (l: Post[]) => l.map(p => p.id === postId ? { ...p, likes: p.isLiked ? p.likes - 1 : p.likes + 1, isLiked: !p.isLiked } : p); setPosts(prev => upd(prev)); setConfessions(prev => upd(prev)); };
  const addComment = (postId: string, content: string) => { const upd = (l: Post[]) => l.map(p => p.id === postId ? { ...p, comments: p.comments + 1, commentList: [...(p.commentList || []), { id: Date.now().toString(), author: user?.name || 'Tôi', content, timestamp: 'Vừa xong' }] } : p); setPosts(prev => upd(prev)); setConfessions(prev => upd(prev)); };
  
  // Fix: Explicitly type Post object 'n' and ensure status literal is correct.
  const createPost = (content: string, image?: string) => { 
    if (!user) return; 
    const status: 'approved' | 'pending' = (user.role === 'admin' || user.role === 'lecturer' || user.role === 'developer') ? 'approved' : 'pending'; 
    const n: Post = { id: `p_${Date.now()}`, author: user.name, role: (user.role === 'admin' || user.role === 'lecturer' || user.role === 'student' || user.role === 'developer') ? user.role : 'student', content, timestamp: 'Vừa xong', likes: 0, comments: 0, commentList: [], image, status }; 
    if (status === 'approved') setPosts(prev => [n, ...prev]); else setPendingPosts(prev => [n, ...prev]); 
  };
  
  // Fix: Explicitly type Post object 'n' and handle approved case correctly.
  const addConfession = (content: string) => { 
    const n: Post = { id: `c_${Date.now()}`, author: `Confession #${Math.floor(Math.random()*1000)+3000}`, role: 'student', content, timestamp: 'Vừa xong', likes: 0, comments: 0, isConfession: true, commentList: [], status: 'pending' }; 
    if (user?.role === 'admin' || user?.role === 'developer') { 
      const approvedConf: Post = { ...n, status: 'approved' };
      setConfessions(prev => [approvedConf, ...prev]); 
    } else {
      setPendingPosts(prev => [n, ...prev]); 
    }
  };

  const approvePost = (postId: string) => { const p = pendingPosts.find(p => p.id === postId); if (p) { const a = { ...p, status: 'approved' as any, timestamp: 'Vừa xong' }; if (a.isConfession) setConfessions(prev => [a, ...prev]); else setPosts(prev => [a, ...prev]); setPendingPosts(prev => prev.filter(p => p.id !== postId)); } };
  const rejectPost = (postId: string) => setPendingPosts(prev => prev.filter(p => p.id !== postId));
  const toggleCourseRegistration = (id: string) => { setCourses(prev => prev.map(c => c.id === id ? { ...c, isRegistered: !c.isRegistered } : c)); };
  const addContact = (name: string) => setContacts(prev => [{ id: `u_${Date.now()}`, name, lastMessage: 'Đã kết nối', time: 'Now', unread: 0, avatar: `https://ui-avatars.com/api/?name=${name}` }, ...prev]);
  const markNotificationRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  const payTuition = (id: string) => { const b = tuitionBills.find(b => b.id === id); if (!b || b.status === 'paid' || currentUserBalance < b.amount) return false; setUserBalance(currentUserBalance - b.amount); setTuitionBills(prev => prev.map(bill => bill.id === id ? { ...bill, status: 'paid' } : bill)); addTransaction({ id: `tx_t_${Date.now()}`, type: 'out', title: 'Học phí', description: b.semester, amount: b.amount, timestamp: new Date().toLocaleString(), icon: 'tuition' }); return true; };
  const submitTrainingTask = (id: string) => setTrainingTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'approved', currentPoints: t.maxPoints } : t));
  const addQuiz = (q: Quiz) => setQuizzes(prev => [q, ...prev]);
  const completeQuiz = (id: string) => setQuizzes(prev => prev.map(q => q.id === id ? { ...q, isCompleted: true } : q));
  const sendMessage = (id: string, text: string) => { const m = { id: Date.now().toString(), senderId: 'me', text, timestamp: 'Now', isMe: true }; setMessages(prev => ({ ...prev, [id]: [...(prev[id] || []), m] })); };
  const addToCart = (item: CartItem) => { setCart(prev => { const e = prev.find(i => i.id === item.id); if (e) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i); return [...prev, item]; }); };
  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id));
  const clearCart = () => setCart([]);
  const addTransaction = (t: Transaction) => setTransactions(prev => [t, ...prev]);
  const placeOrder = (type: any, pm: any) => { const total = cart.reduce((s, i) => s + i.price * i.quantity, 0); if (pm === 'wallet' && currentUserBalance < total) return false; if (pm === 'wallet') setUserBalance(currentUserBalance - total); setOrders(prev => [{ id: `o_${Date.now()}`, items: [...cart], total, status: 'pending', type, paymentMethod: pm, timestamp: new Date().toLocaleString() }, ...prev]); setCart([]); return true; };
  const createServiceRequest = (type: string, cost: number, note?: string) => { if (cost > 0 && currentUserBalance < cost) return false; if (cost > 0) setUserBalance(currentUserBalance - cost); setServiceRequests(prev => [{ id: `r_${Date.now()}`, serviceType: type, status: 'pending', requestDate: new Date().toLocaleDateString(), cost, note }, ...prev]); return true; };

  // --- Library Logic ---
  const borrowBook = (bookId: string) => {
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, status: 'borrowed', dueDate: '15 ngày nữa' } : b));
  };

  // --- Dormitory Logic ---
  const registerDorm = (roomId: string, months: number): boolean => {
    const room = dormRooms.find(r => r.id === roomId);
    if (!room || room.currentOccupancy >= room.maxOccupancy) return false;
    
    const totalFee = room.price * months;
    if (currentUserBalance < totalFee) return false;

    setUserBalance(currentUserBalance - totalFee);
    setDormRooms(prev => prev.map(r => r.id === roomId ? { ...r, currentOccupancy: r.currentOccupancy + 1 } : r));
    
    setMyRegistration({
      id: `drm_${Date.now()}`,
      roomId,
      building: room.building,
      semester: 'Học kỳ I (2024-2025)',
      status: 'approved',
      paymentStatus: 'paid',
      totalFee
    });

    addTransaction({
      id: `tx_dorm_${Date.now()}`,
      type: 'out',
      title: 'Phí nội trú KTX',
      description: `Phòng ${room.roomNumber} - ${months} tháng`,
      amount: totalFee,
      timestamp: new Date().toLocaleString(),
      icon: 'dorm'
    });

    return true;
  };

  // --- Deeper Admin Logic ---
  const updateStudentStatus = (id: string, status: 'active' | 'suspended' | 'graduated') => {
    setManagedStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  return (
    <AppContext.Provider value={{
      user, login, logout, updateUserProfile, themeColor, setThemeColor,
      posts, pendingPosts, confessions, likePost, addComment, addConfession, createPost,
      approvePost, rejectPost, serverStats, toggleMaintenance,
      contacts, messages, sendMessage, addContact,
      schedule, vnuEvents, courses, toggleCourseRegistration,
      notifications, markNotificationRead,
      tuitionBills, payTuition, examGrades,
      trainingTasks, submitTrainingTask,
      quizzes, addQuiz, completeQuiz,
      activeAttendanceCode, setActiveAttendanceCode,
      restaurants, cart, addToCart, removeFromCart, clearCart, 
      userBalance: currentUserBalance, setUserBalance, 
      placeOrder, orders, transactions, addTransaction,
      serviceRequests, createServiceRequest,
      stocks, portfolio, buyStock, sellStock,
      books, borrowBook,
      dormRooms, myRegistration, registerDorm,
      managedStudents, updateStudentStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
