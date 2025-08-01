import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { useCourse } from '../context/CourseContext';

const ActiveCourse: React.FC = () => {
  const navigate = useNavigate();
  const { currentCourse } = useCourse();

  if (!currentCourse) {
    return (
      <div className="card">
        <p>No active course found. Please create a course first.</p>
      </div>
    );
  }

  const handleUseTutor = () => {
    navigate('/ai-tutor');
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Active Course</h1>
        <p className="page-subtitle">
          Continue your learning journey with {currentCourse.name}
        </p>
      </div>

      <div className="card-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Today's Session</h3>
              <div style={{ color: '#3b82f6', fontWeight: '600' }}>
                {currentCourse.tableOfContents[0]}
              </div>
            </div>
            <BookOpen size={32} style={{ color: '#3b82f6' }} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Progress</h3>
              <div className="card-value">15%</div>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Module 1 of {currentCourse.tableOfContents.length}
              </p>
            </div>
            <CheckCircle size={32} style={{ color: '#10b981' }} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Time Remaining</h3>
              <div className="card-value">45 min</div>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Today's session
              </p>
            </div>
            <Clock size={32} style={{ color: '#f59e0b' }} />
          </div>
        </div>
      </div>

      <div className="course-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: '#1e293b' }}>
            Module 1: {currentCourse.tableOfContents[0]}
          </h2>
          <button
            className="btn btn-primary"
            onClick={handleUseTutor}
            style={{ fontSize: '1rem' }}
          >
            <Bot size={20} />
            USE AI TUTOR
          </button>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #f8faff 0%, #eff6ff 100%)',
          padding: '2rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          border: '1px solid #dbeafe'
        }}>
          <h3 style={{ color: '#1e40af', marginBottom: '1rem' }}>
            Welcome to Your Learning Session!
          </h3>
          <p style={{ color: '#1e293b', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            {currentCourse.content || `
              Today we're diving into the fundamentals of ${currentCourse.name}. 
              This session will provide you with a solid foundation and practical understanding 
              of the core concepts you'll need to master.
            `}
          </p>
          
          <div style={{ 
            background: 'white', 
            padding: '1.5rem', 
            borderRadius: '8px',
            marginBottom: '1.5rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
          }}>
            <h4 style={{ color: '#374151', marginBottom: '1rem' }}>
              Learning Objectives for Today:
            </h4>
            <ul style={{ color: '#4b5563', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Understand the fundamental concepts and terminology</li>
              <li>Learn best practices and industry standards</li>
              <li>Complete hands-on exercises to reinforce learning</li>
              <li>Prepare for tomorrow's advanced topics</li>
            </ul>
          </div>

          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <p style={{ color: '#1e40af', fontWeight: '500', margin: 0 }}>
              💡 Pro Tip: Use the AI Tutor for personalized explanations, 
              practice questions, and instant feedback on your progress!
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h4 style={{ color: '#374151', marginBottom: '0.5rem' }}>
              📚 Reading Material
            </h4>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Essential concepts and theory
            </p>
          </div>
          
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h4 style={{ color: '#374151', marginBottom: '0.5rem' }}>
              🛠️ Hands-on Practice
            </h4>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Interactive exercises and projects
            </p>
          </div>
          
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h4 style={{ color: '#374151', marginBottom: '0.5rem' }}>
              ✅ Knowledge Check
            </h4>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Quiz and assessment
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-secondary">
            Previous Module
          </button>
          <button
            className="btn btn-primary"
            onClick={handleUseTutor}
            style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}
          >
            <Bot size={20} />
            Start with AI Tutor
          </button>
          <button className="btn btn-secondary">
            Next Module
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveCourse;