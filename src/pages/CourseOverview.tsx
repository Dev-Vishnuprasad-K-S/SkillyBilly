import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, BookOpen, Calendar, Play } from 'lucide-react';
import { useCourse } from '../context/CourseContext';

const CourseOverview: React.FC = () => {
  const navigate = useNavigate();
  const { currentCourse } = useCourse();

  if (!currentCourse) {
    return (
      <div className="card">
        <p>No course selected. Please create a course first.</p>
      </div>
    );
  }

  const handleStartCourse = () => {
    navigate('/active-course');
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Course Overview</h1>
        <p className="page-subtitle">
          Review your personalized learning path before starting
        </p>
      </div>

      <div className="card-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Estimated Duration</h3>
              <div className="card-value">{currentCourse.estimatedTime}</div>
            </div>
            <Clock size={32} style={{ color: '#3b82f6' }} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Daily Commitment</h3>
              <div className="card-value">{currentCourse.dailyCommitment}</div>
            </div>
            <Calendar size={32} style={{ color: '#10b981' }} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Total Modules</h3>
              <div className="card-value">{currentCourse.tableOfContents.length}</div>
            </div>
            <BookOpen size={32} style={{ color: '#f59e0b' }} />
          </div>
        </div>
      </div>

      <div className="course-content">
        <h2 style={{ marginBottom: '1rem', color: '#1e293b' }}>
          {currentCourse.name}
        </h2>
        <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1.1rem' }}>
          {currentCourse.description}
        </p>

        <h3 style={{ marginBottom: '1rem', color: '#374151' }}>
          Table of Contents
        </h3>
        <ul className="toc">
          {currentCourse.tableOfContents.map((item, index) => (
            <li key={index}>
              <div style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                background: '#eff6ff',
                color: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '0.875rem'
              }}>
                {index + 1}
              </div>
              <div>
                <h4 style={{ fontWeight: '600', color: '#1e293b' }}>
                  {item}
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                  Module {index + 1} • Estimated time: {Math.ceil((index + 1) * 0.5)} hours
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          borderRadius: '12px',
          border: '1px solid #bfdbfe'
        }}>
          <h4 style={{ color: '#1e40af', marginBottom: '0.5rem' }}>
            Your Daily Learning Plan
          </h4>
          <p style={{ color: '#1e40af', marginBottom: '1rem' }}>
            Based on your {currentCourse.dailyCommitment} daily commitment, 
            you'll complete this course in {currentCourse.estimatedTime}. 
            Each session is designed to build upon previous knowledge progressively.
          </p>
          <ul style={{ color: '#1e40af', paddingLeft: '1.5rem' }}>
            <li>Interactive lessons with real-world examples</li>
            <li>Hands-on exercises and projects</li>
            <li>AI tutor support available 24/7</li>
            <li>Progress tracking and personalized feedback</li>
          </ul>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button
            className="btn btn-primary"
            onClick={handleStartCourse}
            style={{ fontSize: '1rem', padding: '1rem 2rem' }}
          >
            <Play size={20} />
            Start Learning Journey
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/create-course')}
          >
            Modify Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;