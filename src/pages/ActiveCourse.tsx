import React from 'react';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import ElevenLabsAgent from '../components/ElevenLabsAgent';
import { angularStudyMaterial } from '../data/demoAngularDoc';

const ActiveCourse: React.FC = () => {
  const { currentCourse } = useCourse();

  if (!currentCourse) {
    return (
      <div className="card">
        <p>No active course found. Please create a course first.</p>
      </div>
    );
  }

  // Extract course plan data
  const coursePlan = currentCourse.coursePlan;
  const basicInfo = coursePlan?.basic_info;
  
  // Get all day entries from course plan
  const courseDays = coursePlan ? Object.keys(coursePlan)
    .filter(key => key.startsWith('day'))
    .sort((a, b) => {
      const dayA = parseInt(a.replace('day', ''));
      const dayB = parseInt(b.replace('day', ''));
      return dayA - dayB;
    })
    .map(dayKey => coursePlan[dayKey]) : [];

  // Get current day (for demo, we'll show day 1)
  const currentDay = courseDays[0];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Active Course</h1>
        <p className="page-subtitle">
          Continue your learning journey with {basicInfo?.course_title || currentCourse.name}
        </p>
      </div>

      <div className="card-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Today's Session</h3>
              <div style={{ color: '#3b82f6', fontWeight: '600' }}>
                {currentDay ? `Day ${currentDay.day}: ${currentDay.main_topic}` : currentCourse.tableOfContents[0]}
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
                Day 1 of {courseDays.length || currentCourse.tableOfContents.length}
              </p>
            </div>
            <CheckCircle size={32} style={{ color: '#10b981' }} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Daily Commitment</h3>
              <div className="card-value">{basicInfo?.daily_hours || currentCourse.dailyCommitment}</div>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Hours per day
              </p>
            </div>
            <Clock size={32} style={{ color: '#f59e0b' }} />
          </div>
        </div>
      </div>

      {/* Course Content Section */}
      <div className="course-content">
        <h2 style={{ color: '#1e293b', marginBottom: '1.5rem' }}>
          {currentDay ? `Day ${currentDay.day}: ${currentDay.main_topic}` : `Module 1: ${currentCourse.tableOfContents[0]}`}
        </h2>

        {currentDay && (
          <>
            {/* Learning Objectives */}
            {currentDay.learning_objectives && currentDay.learning_objectives.length > 0 && (
              <div style={{
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '2rem',
                border: '1px solid #bae6fd'
              }}>
                <h3 style={{ color: '#0369a1', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🎯 Learning Objectives
                </h3>
                <ul style={{ color: '#0c4a6e', paddingLeft: '1.5rem', lineHeight: '1.7' }}>
                  {currentDay.learning_objectives.map((objective: string, index: number) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>{objective}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Subtopics */}
            {currentDay.subtopics && currentDay.subtopics.length > 0 && (
              <div style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '2rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
              }}>
                <h3 style={{ color: '#374151', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  📚 Topics We'll Cover Today
                </h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '1rem' 
                }}>
                  {currentDay.subtopics.map((subtopic: string, index: number) => (
                    <div key={index} style={{
                      background: '#f8fafc',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        color: '#475569',
                        fontWeight: '500'
                      }}>
                        <span style={{
                          width: '1.5rem',
                          height: '1.5rem',
                          borderRadius: '50%',
                          background: '#3b82f6',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {index + 1}
                        </span>
                        {subtopic}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Time Allocation */}
            {currentDay.estimated_time_allocation && (
              <div style={{
                background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '2rem',
                border: '1px solid #fde68a'
              }}>
                <h3 style={{ color: '#92400e', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  ⏰ Time Allocation for Today
                </h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem' 
                }}>
                  {Object.entries(currentDay.estimated_time_allocation).map(([activity, time]) => (
                    <div key={activity} style={{
                      background: 'white',
                      padding: '1rem',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                    }}>
                      <span style={{ color: '#374151', fontWeight: '500' }}>{activity}</span>
                      <span style={{ color: '#92400e', fontWeight: '700' }}>{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Default content if no course plan data */}
        {!currentDay && (
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
          </div>
        )}

        {/* AI Tutor Section */}
        <div style={{
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          padding: '2rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          border: '1px solid #bae6fd'
        }}>
          <h3 style={{ color: '#0369a1', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🤖 AI Learning Assistant
          </h3>
          <p style={{ color: '#0c4a6e', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Your personal AI tutor is ready to help you understand today's concepts. 
            Ask questions, get explanations, and receive personalized guidance throughout your learning session.
          </p>
          
          {/* ElevenLabs Widget Container */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #bae6fd',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '1rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #e0f2fe'
            }}>
              <h4 style={{ color: '#0369a1', margin: 0 }}>Voice AI Tutor</h4>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(16, 185, 129, 0.1)',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                color: '#059669',
                fontWeight: '500'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981'
                }} />
                Active
              </div>
            </div>
            
            <div style={{ flex: 1 }}>
              <ElevenLabsAgent 
                agentId="your-agent-id" 
                userName="Student"
                learningMaterial={angularStudyMaterial}
              />
            </div>
          </div>
        </div>

        {/* Learning Activities */}
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
            border: '1px solid #e5e7eb',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
          }}>
            <h4 style={{ color: '#374151', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📖 Study Material
            </h4>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
              Review key concepts and theoretical foundations
            </p>
          </div>
          
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
          }}>
            <h4 style={{ color: '#374151', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🛠️ Hands-on Practice
            </h4>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
              Apply what you learn with interactive exercises
            </p>
          </div>
          
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
          }}>
            <h4 style={{ color: '#374151', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ✅ Knowledge Check
            </h4>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
              Test your understanding with quizzes
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-secondary">
            Previous Day
          </button>
          <button className="btn btn-primary">
            Mark as Complete
          </button>
          <button className="btn btn-secondary">
            Next Day
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveCourse;