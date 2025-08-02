import React from 'react';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import ElevenLabsAgent from '../components/ElevenLabsAgent';

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

  // Prepare learning material for ElevenLabs (combine all detailed explanations)
  const learningMaterial = currentDay?.detailed_explanations 
    ? currentDay.detailed_explanations.join('\n\n')
    : 'No detailed content available for this session.';
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

      {/* Course Content Document */}
      <div className="course-content">
        <h1 style={{ 
          color: '#1e293b', 
          marginBottom: '2rem',
          fontSize: '2.5rem',
          fontWeight: '700',
          borderBottom: '3px solid #3b82f6',
          paddingBottom: '1rem'
        }}>
          {currentDay ? `Day ${currentDay.day}: ${currentDay.main_topic}` : `Module 1: ${currentCourse.tableOfContents[0]}`}
        </h1>

        {currentDay ? (
          <>
            {/* Learning Objectives Section */}
            {currentDay.learning_objectives && currentDay.learning_objectives.length > 0 && (
              <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ 
                  color: '#374151', 
                  fontSize: '1.75rem',
                  fontWeight: '600',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  🎯 Learning Objectives
                </h2>
                <div style={{
                  background: '#f8faff',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #e0e7ff'
                }}>
                  <p style={{ 
                    color: '#475569', 
                    fontSize: '1.1rem',
                    marginBottom: '1.5rem',
                    lineHeight: '1.7'
                  }}>
                    By the end of today's session, you will be able to:
                  </p>
                  <ul style={{ 
                    color: '#374151', 
                    fontSize: '1rem',
                    lineHeight: '1.8',
                    paddingLeft: '1.5rem'
                  }}>
                    {currentDay.learning_objectives.map((objective: string, index: number) => (
                      <li key={index} style={{ marginBottom: '0.75rem' }}>
                        <strong>{objective}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Main Content Section */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ 
                color: '#374151', 
                fontSize: '1.75rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                📚 Today's Learning Content
              </h2>
              
              {/* Subtopics with detailed content */}
              {currentDay.subtopics && currentDay.subtopics.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ 
                    color: '#475569', 
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem'
                  }}>
                    Topics Covered:
                  </h3>
                  
                  {currentDay.subtopics.map((subtopic: string, index: number) => (
                    <div key={index} style={{
                      background: 'white',
                      padding: '2rem',
                      marginBottom: '1.5rem',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                    }}>
                      <h4 style={{
                        color: '#1e293b',
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}>
                        <span style={{
                          width: '2rem',
                          height: '2rem',
                          borderRadius: '50%',
                          background: '#3b82f6',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.875rem',
                          fontWeight: '700'
                        }}>
                          {index + 1}
                        </span>
                        {subtopic}
                      </h4>
                      
                      {/* Display detailed explanation for this subtopic */}
                      {currentDay.detailed_explanations && currentDay.detailed_explanations[index] && (
                        <div style={{
                          color: '#374151',
                          fontSize: '1rem',
                          lineHeight: '1.7',
                          marginBottom: '1rem'
                        }}>
                          <div dangerouslySetInnerHTML={{ 
                            __html: currentDay.detailed_explanations[index].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          }} />
                        </div>
                      )}
                      
                      {/* Time allocation for this subtopic */}
                      {currentDay.estimated_time_allocation && currentDay.estimated_time_allocation[subtopic] && (
                        <div style={{
                          background: '#fef3c7',
                          padding: '0.75rem 1rem',
                          borderRadius: '6px',
                          marginBottom: '1rem',
                          display: 'inline-block'
                        }}>
                          <span style={{ 
                            color: '#92400e', 
                            fontSize: '0.875rem',
                            fontWeight: '600'
                          }}>
                            ⏱️ Estimated Time: {currentDay.estimated_time_allocation[subtopic]}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Time Allocation Summary */}
            {currentDay.estimated_time_allocation && (
              <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ 
                  color: '#374151', 
                  fontSize: '1.75rem',
                  fontWeight: '600',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  ⏰ Time Management Plan
                </h2>
                <div style={{
                  background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #fde68a'
                }}>
                  <p style={{ 
                    color: '#92400e', 
                    fontSize: '1.1rem',
                    marginBottom: '1.5rem',
                    lineHeight: '1.6'
                  }}>
                    Here's how we recommend you structure your {basicInfo?.daily_hours || currentCourse.dailyCommitment} learning session today:
                  </p>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '1rem' 
                  }}>
                    {Object.entries(currentDay.estimated_time_allocation).map(([activity, time]) => (
                      <div key={activity} style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}>
                        <h4 style={{ 
                          color: '#374151', 
                          fontWeight: '600',
                          marginBottom: '0.5rem'
                        }}>
                          {activity}
                        </h4>
                        <div style={{ 
                          color: '#92400e', 
                          fontWeight: '700',
                          fontSize: '1.25rem'
                        }}>
                          {time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Additional Study Notes */}
            {currentDay.detailed_explanations && currentDay.detailed_explanations.length > 0 && (
              <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ 
                  color: '#374151', 
                  fontSize: '1.75rem',
                  fontWeight: '600',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  📝 Additional Study Notes
                </h2>
                <div style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{ 
                    color: '#374151', 
                    fontSize: '1rem',
                    lineHeight: '1.8'
                  }}>
                    <p style={{ marginBottom: '1rem', fontStyle: 'italic', color: '#64748b' }}>
                      Review these key concepts and explanations to reinforce your understanding:
                    </p>
                    {currentDay.detailed_explanations.map((explanation: string, index: number) => (
                      <div key={index} style={{
                        marginBottom: '1.5rem',
                        padding: '1.5rem',
                        background: '#f8fafc',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                      }}>
                        <div dangerouslySetInnerHTML={{ 
                          __html: explanation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        }} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          /* Default content if no course plan data */
          <section style={{ marginBottom: '3rem' }}>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <h2 style={{ 
                color: '#1e40af', 
                fontSize: '1.5rem',
                marginBottom: '1rem'
              }}>
                Welcome to Your Learning Session!
              </h2>
              <div style={{ 
                color: '#374151', 
                fontSize: '1rem',
                lineHeight: '1.7'
              }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  {currentCourse.content || `
                    Today we're diving into the fundamentals of ${currentCourse.name}. 
                    This session will provide you with a solid foundation and practical understanding 
                    of the core concepts you'll need to master.
                  `}
                </p>
                
                <h3 style={{ 
                  color: '#475569', 
                  fontSize: '1.25rem',
                  marginBottom: '1rem'
                }}>
                  Course Modules:
                </h3>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  {currentCourse.tableOfContents.map((item, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>
                      <strong>Module {index + 1}:</strong> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ElevenLabs AI Tutor Widget */}
        <ElevenLabsAgent 
          agentId="your-agent-id" 
          userName="Student"
          learningMaterial={learningMaterial}
        />

        {/* Navigation */}
        <div style={{ 
          marginTop: '3rem',
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          paddingTop: '2rem',
          borderTop: '1px solid #e5e7eb'
        }}>
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