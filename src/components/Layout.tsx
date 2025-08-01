import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Plus, 
  BookOpen, 
  Users, 
  History,
  GraduationCap
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/create-course', label: 'Create Course', icon: Plus },
    { path: '/active-course', label: 'Active Course', icon: BookOpen },
    { path: '/employee-tracker', label: 'Employee Tracker', icon: Users },
    { path: '/course-history', label: 'Course History', icon: History },
  ];

  // Don't show layout for AI Tutor page
  if (location.pathname === '/ai-tutor') {
    return <>{children}</>;
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/" className="logo">
            <GraduationCap size={32} />
            SkillyBilly.ai
          </Link>
        </div>
        <nav>
          <ul className="nav-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path} className="nav-item">
                  <Link
                    to={item.path}
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    <Icon size={20} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;