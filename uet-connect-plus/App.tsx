
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import { Layout } from './components/Layout';
import NewsFeed from './components/NewsFeed';
import Chat from './components/Chat';
import Confessions from './components/Confessions';
import Schedule from './components/Schedule';
import GPACalculator from './components/GPACalculator';
import CourseRegistration from './components/CourseRegistration';
import Tuition from './components/Tuition';
import Grades from './components/Grades';
import TrainingPoints from './components/TrainingPoints';
import Profile from './components/Profile';
import AdminModeration from './components/AdminModeration';
import ServerManagement from './components/ServerManagement';
import LecturerDashboard from './components/LecturerDashboard';
import Assignments from './components/Assignments';
import StudentAttendance from './components/StudentAttendance';
import Canteen from './components/Canteen';
import Banking from './components/Banking';
import OneStopService from './components/OneStopService';
import StockMarket from './components/StockMarket';
import Library from './components/Library';
import Dormitory from './components/Dormitory';
import StudentManagement from './components/StudentManagement';
import DevTools from './components/DevTools';
import UetJobFair from './components/UetJobFair';
import { ViewState } from './types';
import { useApp } from './context/AppContext';

const App: React.FC = () => {
  const { user, logout } = useApp();
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.NEWS_FEED);

  useEffect(() => {
    if (user?.role === 'external_student') {
      setCurrentView(ViewState.PROFILE);
    } else if (user?.role === 'developer') {
      setCurrentView(ViewState.DEV_TOOLS);
    } else {
      setCurrentView(ViewState.NEWS_FEED);
    }
  }, [user]);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12' || e.keyCode === 123) e.preventDefault();
      if ((e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) || (e.metaKey && e.altKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key))) e.preventDefault();
      if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!user) return <Login />;

  const renderContent = () => {
    switch (currentView) {
      case ViewState.NEWS_FEED: return <NewsFeed />;
      case ViewState.CHAT: return <Chat />;
      case ViewState.CONFESSIONS: return <Confessions />;
      case ViewState.SCHEDULE: return <Schedule />;
      case ViewState.GPA: return <GPACalculator />;
      case ViewState.REGISTRATION: return <CourseRegistration />;
      case ViewState.TUITION: return <Tuition />;
      case ViewState.GRADES: return <Grades />;
      case ViewState.TRAINING: return <TrainingPoints />;
      case ViewState.PROFILE: return <Profile />;
      case ViewState.ADMIN_MODERATION: return <AdminModeration />;
      case ViewState.ADMIN_SERVER: return <ServerManagement />;
      case ViewState.LECTURER_DASHBOARD: return <LecturerDashboard />;
      case ViewState.ASSIGNMENTS: return <Assignments />;
      case ViewState.ATTENDANCE: return <StudentAttendance />;
      case ViewState.CANTEEN: return <Canteen />;
      case ViewState.BANKING: return <Banking />;
      case ViewState.ONE_STOP_SERVICE: return <OneStopService />;
      case ViewState.STOCK_TRADING: return <StockMarket />;
      case ViewState.LIBRARY: return <Library />;
      case ViewState.DORMITORY: return <Dormitory />;
      case ViewState.STUDENT_MANAGEMENT: return <StudentManagement />;
      case ViewState.DEV_TOOLS: return <DevTools />;
      case ViewState.UET_JOB_FAIR: return <UetJobFair />;
      default: return user.role === 'external_student' ? <Profile /> : <NewsFeed />;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView} onLogout={logout}>
      {renderContent()}
    </Layout>
  );
};

export default App;
