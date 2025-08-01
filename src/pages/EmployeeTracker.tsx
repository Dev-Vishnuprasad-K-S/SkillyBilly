import React, { useState } from 'react';
import { Search, Users, TrendingUp, Award, Clock } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  coursesCompleted: number;
  coursesInProgress: number;
  totalHours: number;
  lastActivity: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

const EmployeeTracker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Mock data - in a real app, this would come from an API
  const [employees] = useState<Employee[]>([
    {
      id: 1,
      name: 'John Smith',
      position: 'Software Developer',
      department: 'Engineering',
      coursesCompleted: 12,
      coursesInProgress: 2,
      totalHours: 85,
      lastActivity: '2 hours ago',
      skillLevel: 'Advanced'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'UX Designer',
      department: 'Design',
      coursesCompleted: 8,
      coursesInProgress: 1,
      totalHours: 42,
      lastActivity: '1 day ago',
      skillLevel: 'Intermediate'
    },
    {
      id: 3,
      name: 'Mike Chen',
      position: 'Product Manager',
      department: 'Product',
      coursesCompleted: 15,
      coursesInProgress: 3,
      totalHours: 120,
      lastActivity: '3 hours ago',
      skillLevel: 'Expert'
    },
    {
      id: 4,
      name: 'Emily Davis',
      position: 'Marketing Specialist',
      department: 'Marketing',
      coursesCompleted: 6,
      coursesInProgress: 1,
      totalHours: 28,
      lastActivity: '5 hours ago',
      skillLevel: 'Beginner'
    }
  ]);

  const departments = ['All', 'Engineering', 'Design', 'Product', 'Marketing'];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const totalEmployees = employees.length;
  const totalCoursesCompleted = employees.reduce((sum, emp) => sum + emp.coursesCompleted, 0);
  const totalHoursLearned = employees.reduce((sum, emp) => sum + emp.totalHours, 0);
  const activeEmployees = employees.filter(emp => emp.coursesInProgress > 0).length;

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return '#ef4444';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#3b82f6';
      case 'Expert': return '#10b981';
      default: return '#64748b';
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Employee Tracker</h1>
        <p className="page-subtitle">
          Monitor employee learning progress and track skill development across your organization.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="card-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Total Employees</h3>
              <div className="card-value">{totalEmployees}</div>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Active learners: {activeEmployees}
              </p>
            </div>
            <Users size={32} style={{ color: '#3b82f6' }} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Courses Completed</h3>
              <div className="card-value">{totalCoursesCompleted}</div>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Across all employees
              </p>
            </div>
            <Award size={32} style={{ color: '#10b981' }} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Learning Hours</h3>
              <div className="card-value">{totalHoursLearned}</div>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Total time invested
              </p>
            </div>
            <Clock size={32} style={{ color: '#f59e0b' }} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Avg. Progress</h3>
              <div className="card-value">
                {Math.round(totalCoursesCompleted / totalEmployees)}
              </div>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Courses per employee
              </p>
            </div>
            <TrendingUp size={32} style={{ color: '#8b5cf6' }} />
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
            placeholder="Search employees..."
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
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          style={{
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '0.875rem',
            backgroundColor: 'white'
          }}
        >
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      {/* Employee List */}
      <div className="card">
        <div className="card-header" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
          <h3 className="card-title">Employee Learning Progress</h3>
        </div>
        
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Employee</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Department</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600' }}>Completed</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600' }}>In Progress</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600' }}>Hours</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600' }}>Skill Level</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600' }}>Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(employee => (
                <tr key={employee.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem' }}>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                        {employee.name}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                        {employee.position}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: '#64748b' }}>
                    {employee.department}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: '600' }}>
                    {employee.coursesCompleted}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: '#3b82f6' }}>
                    {employee.coursesInProgress}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    {employee.totalHours}h
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: `${getSkillLevelColor(employee.skillLevel)}20`,
                      color: getSkillLevelColor(employee.skillLevel)
                    }}>
                      {employee.skillLevel}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', color: '#64748b' }}>
                    {employee.lastActivity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTracker;
