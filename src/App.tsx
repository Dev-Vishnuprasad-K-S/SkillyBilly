import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreateCourse from './pages/CreateCourse';
import CourseOverview from './pages/CourseOverview';
import ActiveCourse from './pages/ActiveCourse';
import AITutor from './pages/AITutor';
import EmployeeTracker from './pages/EmployeeTracker';
import CourseHistory from './pages/CourseHistory';
import { CourseProvider } from './context/CourseContext';
import './App.css';

function App() {
  return (
    <CourseProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-course" element={<CreateCourse />} />
            <Route path="/course-overview" element={<CourseOverview />} />
            <Route path="/active-course" element={<ActiveCourse />} />
            <Route path="/ai-tutor" element={<AITutor />} />
            <Route path="/employee-tracker" element={<EmployeeTracker />} />
            <Route path="/course-history" element={<CourseHistory />} />
          </Routes>
        </Layout>
      </Router>
    </CourseProvider>
  );
}

export default App;