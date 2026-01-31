
import { Post, ChatContact, Message, ScheduleItem, Course, AppNotification, TuitionBill, ExamGrade, TrainingTask, VnuEvent, Restaurant, Book, DormRoom, StudentRecord, JobPosting } from './types';

export const MOCK_OFFICIAL_NEWS: Post[] = [
  {
    id: '1',
    author: 'Phòng Đào Tạo',
    role: 'admin',
    content: '📢 Thông báo về lịch thi cuối kỳ học kỳ I năm học 2024-2025. Sinh viên lưu ý theo dõi lịch thi trên cổng thông tin sinh viên.',
    timestamp: '2 giờ trước',
    likes: 154,
    comments: 12,
    commentList: [],
  },
  {
    id: '2',
    author: 'Đoàn Thanh Niên',
    role: 'admin',
    content: '🔥 Sự kiện "UET Tech Day 2025" sắp diễn ra! Đăng ký ngay để nhận vé tham dự và cơ hội bốc thăm trúng thưởng Macbook Pro.',
    timestamp: '5 giờ trước',
    likes: 342,
    comments: 56,
    image: 'https://picsum.photos/800/400',
    commentList: [],
  },
  {
    id: 'off3',
    author: 'Phòng Công Tác Sinh Viên',
    role: 'admin',
    content: 'Thông báo nhận học bổng khuyến khích học tập kỳ phụ. Sinh viên thuộc diện đối tượng vui lòng nộp hồ sơ trước ngày 30/10.',
    timestamp: '1 ngày trước',
    likes: 89,
    comments: 5,
    commentList: [],
  },
  {
    id: 'off4',
    author: 'UET Job Fair',
    role: 'admin',
    content: 'Ngày hội việc làm lớn nhất năm. Hơn 50 doanh nghiệp công nghệ hàng đầu sẽ có mặt tại sân nhà G2.',
    timestamp: '2 ngày trước',
    likes: 412,
    comments: 32,
    image: 'https://picsum.photos/800/401',
    commentList: [],
  }
];

export const MOCK_STUDENT_NEWS: Post[] = [
  {
    id: '3',
    author: 'Nguyễn Văn An',
    role: 'student',
    content: 'Mình cần tìm team làm bài tập lớn môn Lập trình mạng .NET 10.0. Bạn nào chưa có nhóm inbox mình nhé!',
    timestamp: '30 phút trước',
    likes: 5,
    comments: 2,
    commentList: [
      { id: 'c1', author: 'Lê Văn B', content: 'Check inbox nhé bạn ơi', timestamp: '10 phút trước' }
    ],
  },
  {
    id: '4',
    author: 'CLB Guitar',
    role: 'student',
    content: 'Tuyển thành viên đợt 2 cho CLB. Buổi casting sẽ diễn ra vào thứ 7 tuần này tại G3.',
    timestamp: '1 ngày trước',
    likes: 89,
    comments: 15,
    commentList: [],
  },
  {
    id: 'st5',
    author: 'Trần Thu Hà',
    role: 'student',
    content: 'Pass lại giáo trình Giải tích 1 và Đại số tuyến tính giá rẻ cho K68. Sách còn mới tinh do mình... học lại.',
    timestamp: '3 giờ trước',
    likes: 12,
    comments: 4,
    commentList: [],
  }
];

export const MOCK_CONFESSIONS: Post[] = [
  {
    id: 'c1',
    author: 'Confession #2910',
    role: 'student',
    content: 'Crush bạn nữ mặc áo hoodie đen ngồi bàn đầu G2 sáng nay quá. Có ai biết info không ạ? 🥺',
    timestamp: '15 phút trước',
    likes: 1024,
    comments: 103,
    isConfession: true,
    commentList: [],
  },
  {
    id: 'c2',
    author: 'Confession #2909',
    role: 'student',
    content: 'Deadline dí chạy không kịp thở. Ai cứu tôi môn Giải tích 2 với...',
    timestamp: '1 giờ trước',
    likes: 567,
    comments: 45,
    isConfession: true,
    commentList: [],
  },
  {
    id: 'c3',
    author: 'Confession #2908',
    role: 'student',
    content: 'Cảm ơn bác bảo vệ nhà G2 đã dắt xe giúp cháu lúc trời mưa. UET mãi đỉnh ❤️',
    timestamp: '2 giờ trước',
    likes: 888,
    comments: 22,
    isConfession: true,
    commentList: [],
  }
];

export const MOCK_CONTACTS: ChatContact[] = [
  {
    id: 'ai_bot',
    name: 'UET Assistant AI',
    lastMessage: 'Mình có thể giúp gì cho bạn hôm nay?',
    time: 'Now',
    unread: 0,
    avatar: 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png',
    isAI: true
  },
  {
    id: 'u1',
    name: 'Trần Thị B',
    lastMessage: 'Tối nay họp nhóm nhé?',
    time: '10:30',
    unread: 2,
    avatar: 'https://picsum.photos/200/200?random=1'
  },
  {
    id: 'u2',
    name: 'Lê Văn C',
    lastMessage: 'Đã gửi file slide thuyết trình.',
    time: 'Yesterday',
    unread: 0,
    avatar: 'https://picsum.photos/200/200?random=2'
  },
  {
    id: 'u3',
    name: 'Nhóm Lớp K67',
    lastMessage: 'Thông báo nghỉ học sáng mai.',
    time: 'Yesterday',
    unread: 5,
    avatar: 'https://picsum.photos/200/200?random=3'
  }
];

export const MOCK_MESSAGES: Message[] = [
  { id: 'm1', senderId: 'ai_bot', text: 'Chào bạn! Mình là trợ lý ảo hỗ trợ sinh viên UET. Bạn cần tìm thông tin gì không?', timestamp: 'Now', isMe: false },
];

export const MOCK_SCHEDULE: ScheduleItem[] = [
  { id: 's1', day: 'Thứ 2', subject: 'Lập trình mạng .NET', code: 'INT3306', room: '304-G2', time: '07:00 - 09:50', lecturer: 'TS. Nguyễn Văn A' },
  { id: 's2', day: 'Thứ 2', subject: 'Tiếng Anh B1', code: 'FLF1107', room: '201-GGD', time: '13:00 - 15:50', lecturer: 'Ms. Sarah' },
];

export const MOCK_VNU_EVENTS: VnuEvent[] = [
  { id: 'ev1', title: 'Lễ khai giảng năm học 2024-2025', date: '05/09/2024', time: '07:30', location: 'Hội trường Nguyễn Văn Đạo', type: 'academic', description: 'Yêu cầu sinh viên mặc đồng phục VNU.' },
  { id: 'ev2', title: 'Ngày hội việc làm UET Job Fair', date: '15/11/2024', time: '08:00 - 16:00', location: 'Sân nhà G2', type: 'activity', description: 'Hơn 50 doanh nghiệp tham gia tuyển dụng.' },
  { id: 'ev3', title: 'Nghỉ Tết Dương Lịch', date: '01/01/2025', time: 'Cả ngày', location: 'Toàn trường', type: 'holiday', description: 'Nghỉ theo quy định của nhà nước.' },
  { id: 'ev4', title: 'Hội thảo khoa học VNU-LIC', date: '20/11/2024', time: '14:00', location: 'Thư viện ĐHQGHN', type: 'academic' },
  { id: 'ev5', title: 'Chung kết Bóng đá nam VNU Cup', date: '10/12/2024', time: '16:00', location: 'Sân vận động Quốc gia', type: 'activity' },
];

export const MOCK_COURSES: Course[] = [
  { id: 'cr1', code: 'INT3306', name: 'Lập trình mạng .NET', credits: 3, lecturer: 'TS. Nguyễn Văn A', schedule: 'T2 (7-10)', room: '304-G2', isRegistered: true },
  { id: 'cr2', code: 'INT3401', name: 'Trí tuệ nhân tạo', credits: 3, lecturer: 'PGS. TS. Trần D', schedule: 'T4 (7-10)', room: 'PM-G3', isRegistered: false },
  { id: 'cr3', code: 'INT3507', name: 'An toàn thông tin', credits: 3, lecturer: 'TS. Hoàng F', schedule: 'T5 (13-16)', room: '301-G2', isRegistered: false },
  { id: 'cr4', code: 'INT3312', name: 'Kiến trúc phần mềm', credits: 3, lecturer: 'ThS. Vũ G', schedule: 'T6 (7-10)', room: '202-G2', isRegistered: false },
  { id: 'cr5', code: 'PHY1101', name: 'Vật lý đại cương 1', credits: 3, lecturer: 'TS. Lý H', schedule: 'T3 (13-16)', room: '101-GGD', isRegistered: false },
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: 'n1', title: 'Điểm thi mới', message: 'Đã có điểm môn Giải tích 2.', time: '10 phút trước', isRead: false, type: 'grade' },
  { id: 'n2', title: 'Nhắc nhở đóng học phí', message: 'Hạn chót đóng học phí kỳ I là 15/11.', time: '1 giờ trước', isRead: false, type: 'system' },
  { id: 'n3', title: 'Lời mời kết bạn', message: 'Nguyễn Văn C đã gửi lời mời kết bạn.', time: '2 giờ trước', isRead: true, type: 'friend' },
];

export const MOCK_TUITION: TuitionBill[] = [
  { id: 'b1', semester: 'Học kỳ I (2024-2025)', amount: 8400000, status: 'unpaid', deadline: '15/11/2024', description: 'Học phí kỳ 1 năm học 2024-2025' },
  { id: 'b2', semester: 'Học kỳ II (2023-2024)', amount: 7800000, status: 'paid', deadline: '15/05/2024', description: 'Học phí kỳ 2 năm học 2023-2024' },
  { id: 'b3', semester: 'Bảo hiểm y tế', amount: 680000, status: 'paid', deadline: '30/09/2024', description: 'BHYT Sinh viên 12 tháng' },
];

export const MOCK_GRADES: ExamGrade[] = [
  { id: 'g1', subject: 'Giải tích 2', code: 'MAT1094', credits: 3, componentScore: { cc: 10, gk: 8.5, ck: 7.0 }, finalScore: 7.8, letterGrade: 'B' },
  { id: 'g2', subject: 'Lập trình hướng đối tượng', code: 'INT2204', credits: 3, componentScore: { cc: 9, gk: 9.0, ck: 9.5 }, finalScore: 9.3, letterGrade: 'A' },
  { id: 'g3', subject: 'Cấu trúc dữ liệu và giải thuật', code: 'INT2203', credits: 3, componentScore: { cc: 10, gk: 6.5, ck: 8.0 }, finalScore: 7.9, letterGrade: 'B+' },
  { id: 'g4', subject: 'Tiếng Anh B1', code: 'FLF1107', credits: 4, componentScore: { cc: 8, gk: 7.5, ck: 7.0 }, finalScore: 7.3, letterGrade: 'B' },
];

export const MOCK_TRAINING_TASKS: TrainingTask[] = [
  // 1. Learning
  { id: 't1', category: 'Ý thức học tập', title: 'Đi học đúng giờ, đầy đủ', maxPoints: 10, currentPoints: 10, status: 'approved', requireProof: false },
  { id: 't2', category: 'Ý thức học tập', title: 'Tham gia CLB học thuật (CLB Tin học, Tiếng Anh...)', maxPoints: 5, currentPoints: 0, status: 'todo', requireProof: true },
  { id: 't3', category: 'Ý thức học tập', title: 'Đạt kết quả học tập từ 3.2 trở lên', maxPoints: 10, currentPoints: 10, status: 'approved', requireProof: false },
  { id: 't4', category: 'Ý thức học tập', title: 'Có bài báo khoa học / NCKH', maxPoints: 15, currentPoints: 0, status: 'todo', requireProof: true },
  
  // 2. Discipline
  { id: 't5', category: 'Ý thức chấp hành quy chế', title: 'Không vi phạm quy chế thi', maxPoints: 10, currentPoints: 10, status: 'approved', requireProof: false },
  { id: 't6', category: 'Ý thức chấp hành quy chế', title: 'Đóng học phí đúng hạn', maxPoints: 10, currentPoints: 10, status: 'approved', requireProof: false },
  
  // 3. Activities
  { id: 't7', category: 'Hoạt động phong trào', title: 'Tham gia Hiến máu nhân đạo', maxPoints: 10, currentPoints: 0, status: 'todo', requireProof: true },
  { id: 't8', category: 'Hoạt động phong trào', title: 'Tham gia Mùa hè xanh / Tiếp sức mùa thi', maxPoints: 15, currentPoints: 0, status: 'todo', requireProof: true },
  { id: 't9', category: 'Hoạt động phong trào', title: 'Tham gia Tech Day 2025', maxPoints: 5, currentPoints: 5, status: 'approved', requireProof: true },
  { id: 't10', category: 'Hoạt động phong trào', title: 'Tham gia thi đấu thể thao cấp trường', maxPoints: 5, currentPoints: 0, status: 'todo', requireProof: true },

  // 4. Class
  { id: 't11', category: 'Công tác lớp', title: 'Tham gia đầy đủ các buổi họp lớp', maxPoints: 10, currentPoints: 10, status: 'approved', requireProof: false },
  { id: 't12', category: 'Công tác lớp', title: 'Là cán bộ lớp hoàn thành tốt nhiệm vụ', maxPoints: 5, currentPoints: 0, status: 'todo', requireProof: true },
];

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 'res1',
    name: 'Canteen Nhà G2',
    location: 'Tầng 1, Nhà G2',
    rating: 4.5,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1567529684892-0f299bb09694?auto=format&fit=crop&q=80&w=400',
    menu: [
      { id: 'm1', name: 'Cơm Gà Hải Nam', price: 35000, image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80&w=200', restaurantId: 'res1' },
      { id: 'm2', name: 'Bún Chả Hà Nội', price: 40000, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=200', restaurantId: 'res1' },
      { id: 'm3', name: 'Phở Bò', price: 45000, image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=200', restaurantId: 'res1' },
    ]
  },
  {
    id: 'res2',
    name: 'UET Coffee & Bakery',
    location: 'Sân nhà C1',
    rating: 4.8,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400',
    menu: [
      { id: 'm4', name: 'Bạc Xỉu', price: 25000, image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=200', restaurantId: 'res2' },
      { id: 'm5', name: 'Trà Đào Cam Sả', price: 30000, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=200', restaurantId: 'res2' },
    ]
  }
];

export const MOCK_BOOKS: Book[] = [
  { id: 'bk1', title: 'Clean Code: A Handbook of Agile Software Craftsmanship', author: 'Robert C. Martin', type: 'physical', status: 'available', image: 'https://images-na.ssl-images-amazon.com/images/I/41jEbK-jG+L._SX374_BO1,204,203,200_.jpg', location: 'Tầng 4 - Giá A3' },
  { id: 'bk2', title: 'Introduction to Algorithms (4th Edition)', author: 'Thomas H. Cormen', type: 'physical', status: 'borrowed', image: 'https://m.media-amazon.com/images/I/61Pgdn8Ys-L._AC_UF1000,1000_QL80_.jpg', location: 'Tầng 4 - Giá B1', dueDate: '15/12/2024' },
  { id: 'bk3', title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell', type: 'digital', status: 'available', image: 'https://m.media-amazon.com/images/I/81L-7HX0iVL._AC_UF1000,1000_QL80_.jpg' },
  { id: 'bk4', title: 'Design Patterns: Elements of Reusable Object-Oriented Software', author: 'Erich Gamma', type: 'physical', status: 'available', image: 'https://m.media-amazon.com/images/I/51szD9HC9pL._SL500_.jpg', location: 'Tầng 4 - Giá A3' },
  { id: 'bk5', title: 'Deep Learning', author: 'Ian Goodfellow', type: 'digital', status: 'available', image: 'https://m.media-amazon.com/images/I/61qj-0FfMTL._AC_UF1000,1000_QL80_.jpg' },
];

export const MOCK_DORM_ROOMS: DormRoom[] = [
  { id: 'r1', building: 'B1', roomNumber: '305', type: 'standard', maxOccupancy: 8, currentOccupancy: 6, price: 140000, gender: 'male' },
  { id: 'r2', building: 'B2', roomNumber: '402', type: 'service', maxOccupancy: 4, currentOccupancy: 3, price: 800000, gender: 'female' },
  { id: 'r3', building: 'B1', roomNumber: '306', type: 'standard', maxOccupancy: 8, currentOccupancy: 8, price: 140000, gender: 'male' },
  { id: 'r4', building: 'B2', roomNumber: '403', type: 'service', maxOccupancy: 4, currentOccupancy: 0, price: 800000, gender: 'female' },
  { id: 'r5', building: 'B3', roomNumber: '201', type: 'service', maxOccupancy: 4, currentOccupancy: 1, price: 800000, gender: 'male' },
];

export const MOCK_ALL_STUDENTS: StudentRecord[] = [
  { id: '21020001', name: 'Nguyễn Văn A', school: 'UET', gpa: 3.6, status: 'active', email: '21020001@vnu.edu.vn' },
  { id: '21020002', name: 'Trần Thị B', school: 'ULIS', gpa: 3.2, status: 'active', email: '21020002@vnu.edu.vn' },
  { id: '21020003', name: 'Lê Văn C', school: 'USSH', gpa: 3.8, status: 'graduated', email: '21020003@vnu.edu.vn' },
  { id: '21020004', name: 'Phạm Thị D', school: 'UEB', gpa: 2.5, status: 'suspended', email: '21020004@vnu.edu.vn' },
  { id: '21020005', name: 'Hoàng Văn E', school: 'UET', gpa: 3.9, status: 'active', email: '21020005@vnu.edu.vn' },
];

export const MOCK_JOBS: JobPosting[] = [
  {
    id: 'j1',
    company: 'FPT Software',
    title: 'Fresher Java Developer',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/11/FPT_logo_2010.svg',
    salary: '10M - 15M',
    type: 'Full-time',
    location: 'Cầu Giấy, Hà Nội',
    tags: ['Java', 'Spring Boot', 'Fresher'],
    isHot: true
  },
  {
    id: 'j2',
    company: 'Viettel Telecom',
    title: 'Thực tập sinh Data Analyst',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Viettel_logo_2021.svg',
    salary: 'Hỗ trợ 5M',
    type: 'Internship',
    location: 'Thanh Xuân, Hà Nội',
    tags: ['SQL', 'Python', 'Intern'],
  },
  {
    id: 'j3',
    company: 'VNG Corporation',
    title: 'Frontend Developer (ReactJS)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/VNG_Corporation_logo.svg/1200px-VNG_Corporation_logo.svg.png',
    salary: '15M - 25M',
    type: 'Full-time',
    location: 'Đống Đa, Hà Nội',
    tags: ['ReactJS', 'TypeScript', 'Junior'],
    isHot: true
  },
  {
    id: 'j4',
    company: 'Samsung R&D Center',
    title: 'Mobile Developer (Android)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    salary: 'Thỏa thuận',
    type: 'Full-time',
    location: 'Bắc Từ Liêm, Hà Nội',
    tags: ['Android', 'Kotlin', 'English'],
  }
];
