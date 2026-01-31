
export enum ViewState {
  NEWS_FEED = 'NEWS_FEED',
  CHAT = 'CHAT',
  CONFESSIONS = 'CONFESSIONS',
  SCHEDULE = 'SCHEDULE',
  GPA = 'GPA',
  REGISTRATION = 'REGISTRATION',
  TUITION = 'TUITION',
  GRADES = 'GRADES',
  TRAINING = 'TRAINING',
  PROFILE = 'PROFILE',
  ASSIGNMENTS = 'ASSIGNMENTS',
  ATTENDANCE = 'ATTENDANCE',
  CANTEEN = 'CANTEEN',
  BANKING = 'BANKING',
  ONE_STOP_SERVICE = 'ONE_STOP_SERVICE',
  STOCK_TRADING = 'STOCK_TRADING', // New feature for UEB
  LIBRARY = 'LIBRARY', // VNU-LIC
  DORMITORY = 'DORMITORY', // CSS Dormitory
  UET_JOB_FAIR = 'UET_JOB_FAIR', // New exclusive feature for UET
  // Admin Views
  ADMIN_MODERATION = 'ADMIN_MODERATION',
  ADMIN_SERVER = 'ADMIN_SERVER',
  // Lecturer Views
  LECTURER_DASHBOARD = 'LECTURER_DASHBOARD',
  // Deeper Admin / Developer Views
  STUDENT_MANAGEMENT = 'STUDENT_MANAGEMENT',
  DEV_TOOLS = 'DEV_TOOLS'
}

export enum NewsTab {
  OFFICIAL = 'OFFICIAL',
  STUDENT = 'STUDENT'
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  author: string;
  avatar?: string;
  role: 'admin' | 'student' | 'lecturer' | 'developer';
  content: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  comments: number;
  commentList?: Comment[];
  image?: string;
  isConfession?: boolean;
  status?: 'approved' | 'pending' | 'rejected';
}

export interface ChatContact {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  isAI?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

export interface ScheduleItem {
  id: string;
  day: string;
  subject: string;
  code: string;
  room: string;
  time: string;
  lecturer: string;
  fromRegistration?: boolean;
}

export interface VnuEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'academic' | 'activity' | 'holiday';
  description?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  lecturer: string;
  schedule: string;
  room: string;
  isRegistered: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'grade' | 'system' | 'friend' | 'assignment';
}

export interface TuitionBill {
  id: string;
  semester: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'overdue';
  deadline: string;
  description: string;
}

export interface ExamGrade {
  id: string;
  subject: string;
  code: string;
  credits: number;
  componentScore: {
    cc: number;
    gk: number;
    ck: number;
  };
  finalScore: number;
  letterGrade: string;
}

export interface TrainingTask {
  id: string;
  category: string;
  title: string;
  maxPoints: number;
  currentPoints: number;
  status: 'todo' | 'pending' | 'approved';
  requireProof: boolean;
}

export interface ServerStats {
  cpu: number;
  ram: number;
  activeUsers: number;
  requestsPerSec: number;
  status: 'optimal' | 'high_load' | 'maintenance';
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  deadline: string;
  questionCount: number;
  author: string;
  isCompleted?: boolean;
}

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  restaurantId: string;
}

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  menu: FoodItem[];
  isOpen: boolean;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  type: 'pickup' | 'delivery';
  paymentMethod: 'wallet' | 'cod';
  timestamp: string;
  location?: string;
}

export interface Transaction {
  id: string;
  type: 'in' | 'out';
  title: string;
  description: string;
  amount: number;
  timestamp: string;
  icon: 'food' | 'tuition' | 'transfer' | 'topup' | 'stock' | 'dorm';
}

// One Stop Service Types
export interface ServiceRequest {
  id: string;
  serviceType: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  requestDate: string;
  note?: string;
  cost: number;
}

// --- Stock Trading Types ---
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  history: number[]; // For mini charts
}

export interface PortfolioItem {
  symbol: string;
  quantity: number;
  avgPrice: number;
}

// --- VNU-LIC Types ---
export interface Book {
  id: string;
  title: string;
  author: string;
  type: 'physical' | 'digital';
  status: 'available' | 'borrowed' | 'reserved';
  image: string;
  location?: string; // Physical location
  dueDate?: string; // If borrowed
}

// --- Dormitory Types ---
export interface DormRoom {
  id: string;
  building: string;
  roomNumber: string;
  type: 'standard' | 'service'; // Standard (8 beds), Service (4 beds, AC)
  maxOccupancy: number;
  currentOccupancy: number;
  price: number; // Monthly
  gender: 'male' | 'female';
}

export interface DormRegistration {
  id: string;
  roomId: string;
  building: string;
  semester: string;
  status: 'pending' | 'approved' | 'rejected';
  paymentStatus: 'unpaid' | 'paid';
  totalFee: number;
}

// --- Student Management Types (For Deeper Admin) ---
export interface StudentRecord {
  id: string;
  name: string;
  school: string;
  gpa: number;
  status: 'active' | 'suspended' | 'graduated';
  email: string;
}

// --- OcaJob / UET Job Fair Types ---
export interface JobPosting {
  id: string;
  company: string;
  title: string;
  logo: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Internship';
  location: string;
  tags: string[];
  isHot?: boolean;
}
