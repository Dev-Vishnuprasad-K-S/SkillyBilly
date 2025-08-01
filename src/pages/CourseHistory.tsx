import React, { useState } from 'react';
import { Search, Calendar, Clock, Award, TrendingUp, CheckCircle, Users } from 'lucide-react';

interface CourseHistoryItem {
  id: number;
  courseName: string;
  instructor: string;
  category: string;
  completedDate: string;
  duration: number; // in hours
  participants: number;
  rating: number;
  status: 'Completed' | 'Archived';
  description: string;
}

const CourseHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Mock data for course history
  const [courseHistory] = useState<CourseHistoryItem[]>([
    {
      id: 1,
      courseName: 'Advanced React Development',
      instructor: 'Sarah Thompson',
      category: 'Programming',
      completedDate: '2024-07-15',
      duration: 40,
      participants: 25,
      rating: 4.8,
      status: 'Completed',
      description: 'Deep dive into React hooks, context, and performance optimization'
    },
    {
      id: 2,
      courseName: 'UI/UX Design Principles',
      instructor: 'Mike Rodriguez',
      category: 'Design',
      completedDate: '2024-06-28',
      duration: 30,
      participants: 18,
      rating: 4.6,
      status: 'Completed',
      description: 'Comprehensive guide to modern UI/UX design methodologies'
    },
    {
      id: 3,
      courseName: 'Project Management Fundamentals',
      instructor: 'Emily Chen',
      category: 'Management',
      completedDate: '2024-06-10',
      duration: 25,
      participants: 32,
      rating: 4.4,
      status: 'Completed',
      description: 'Essential project management skills and methodologies'
    },
    {
      id: 4,
      courseName: 'Data Analytics with Python',
      instructor: 'John Davis',
      category: 'Data Science',
      completedDate: '2024-05-22',
      duration: 50,
      participants: 15,
      rating: 4.9,
      status: 'Completed',
      description: 'Comprehensive Python course for data analysis and visualization'
    },
    {
      id: 5,
      courseName: 'Digital Marketing Strategy',
      instructor: 'Lisa Wang',
      category: 'Marketing',
      completedDate: '2024-04-18',
      duration: 20,
      participants: 28,
      rating: 4.3,
      status: 'Archived',
      description: 'Modern digital marketing techniques and strategy development'
    },
    {
      id: 6,
      courseName: 'Cloud Computing Basics',
      instructor: 'Alex Kumar',
      category: 'Technology',
      completedDate: '2024-04-05',
      duration: 35,
      participants: 22,
      rating: 4.7,
      status: 'Completed',
      description: 'Introduction to cloud platforms and deployment strategies'
    }
  ]);

  const categories = ['All', 'Programming', 'Design', 'Management', 'Data Science', 'Marketing', 'Technology'];
  const statuses = ['All', 'Completed', 'Archived'];

  const filteredCourses = courseHistory.filter(course => {
    const matchesSearch = course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || course.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate statistics
  const totalCourses = courseHistory.length;
  const totalParticipants = courseHistory.reduce((sum, course) => sum + course.participants, 0);
  const totalHours = courseHistory.reduce((sum, course) => sum + course.duration, 0);
  const averageRating = courseHistory.reduce((sum, course) => sum + course.rating, 0) / courseHistory.length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'Completed' ? '#10b981' : '#64748b';
  };

  const getRatingStars = (rating: number) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Course History</h1>
        <p className="page-subtitle">
          Review all completed and archived courses with detailed analytics and participant feedback.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="card-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Total Courses</h3>
              <div className="card-value">{totalCourses}</div>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Completed programs
              </p>
            </div>
            <CheckCircle size={32} style={{ color: '#10b981' }} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Total Participants</h3>
              <div className="card-value">{totalParticipants}</div>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Across all courses
              </p>
            </div>
            <Users size={32} style={{ color: '#3b82f6' }} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Learning Hours</h3>
              <div className="card-value">{totalHours}</div>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Total content delivered
              </p>
            </div>
            <Clock size={32} style={{ color: '#f59e0b' }} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Avg. Rating</h3>
              <div className="card-value">{averageRating.toFixed(1)}</div>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Course satisfaction
              </p>
            </div>
            <Award size={32} style={{ color: '#8b5cf6' }} />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '300px' }}>
          <Search 
            size={20} 
            style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: '#64748b'
            }} 
          />
          <input
            type="text"
            placeholder="Search courses or instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 12px 12px 40px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '0.875rem'
            }}
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '0.875rem',
            backgroundColor: 'white'
          }}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          style={{
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '0.875rem',
            backgroundColor: 'white'
          }}
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {/* Course History Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {filteredCourses.map(course => (
          <div key={course.id} className="card" style={{ height: 'fit-content' }}>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontWeight: '600', 
                    fontSize: '1.125rem',
                    marginBottom: '0.5rem',
                    color: '#1f2937'
                  }}>
                    {course.courseName}
                  </h3>
                  <p style={{ 
                    color: '#64748b', 
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem'
                  }}>
                    by {course.instructor}
                  </p>
                </div>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  backgroundColor: `${getStatusColor(course.status)}20`,
                  color: getStatusColor(course.status)
                }}>
                  {course.status}
                </span>
              </div>

              <p style={{ 
                color: '#64748b', 
                fontSize: '0.875rem',
                marginBottom: '1rem',
                lineHeight: '1.5'
              }}>
                {course.description}
              </p>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={16} style={{ color: '#64748b' }} />
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                    {formatDate(course.completedDate)}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={16} style={{ color: '#64748b' }} />
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                    {course.duration}h
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users size={16} style={{ color: '#64748b' }} />
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                    {course.participants} participants
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={16} style={{ color: '#64748b' }} />
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                    {course.rating}/5 {getRatingStars(course.rating)}
                  </span>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid #f1f5f9'
              }}>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  backgroundColor: '#f1f5f9',
                  color: '#64748b'
                }}>
                  {course.category}
                </span>
                <button style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          color: '#64748b'
        }}>
          <TrendingUp size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <h3 style={{ marginBottom: '0.5rem' }}>No courses found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default CourseHistory;
