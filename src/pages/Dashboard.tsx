import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, BookOpen, Trophy, TrendingUp } from 'lucide-react';
import { useCourse } from '../context/CourseContext';

const Dashboard: React.FC = () => {
  const { activeCourses, completedCourses } = useCourse();
  const activeCourse = activeCourses[0];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Welcome back! Track your learning progress and manage your courses.
        </p>
      </div>

      <div className="card-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Active Course</h3>
              <div className="card-value">
                {activeCourse ? activeCourse.name : 'No active course'}
              </div>
              {activeCourse && (
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                  Progress: {activeCourse.progress}% complete
                </p>
              )}
            </div>
            <BookOpen size={32} style={{ color: '#3b82f6' }} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Completed Courses</h3>
              <div className="card-value">{completedCourses}</div>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Great progress this month!
              </p>
            </div>
            <Trophy size={32} style={{ color: '#10b981' }} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Add New Course</h3>
              <p style={{ color: '#64748b', margin: '0.5rem 0' }}>
                Create a personalized learning path
              </p>
              <Link to="/create-course" className="btn btn-primary">
                <Plus size={20} />
                ADD Course
              </Link>
            </div>
            <TrendingUp size={32} style={{ color: '#3b82f6' }} />
          </div>
        </div>
      </div>

      {activeCourse && (
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '1rem' }}>
            Current Learning Session
          </h3>
          <div style={{ 
            background: '#f8faff', 
            padding: '1.5rem', 
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <h4 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>
              Today's Focus: {activeCourse.tableOfContents[0]}
            </h4>
            <p style={{ color: '#64748b', marginBottom: '1rem' }}>
              Continue your journey with {activeCourse.name}. 
              You're making excellent progress!
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/active-course" className="btn btn-primary">
                Continue Learning
              </Link>
              <Link to="/course-overview" className="btn btn-secondary">
                View Course Details
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;