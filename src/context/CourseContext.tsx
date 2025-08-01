import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Course {
  id: string;
  name: string;
  description: string;
  tableOfContents: string[];
  estimatedTime: string;
  dailyCommitment: string;
  content?: string;
  progress?: number;
}

interface CourseContextType {
  currentCourse: Course | null;
  completedCourses: number;
  activeCourses: Course[];
  setCurrentCourse: (course: Course) => void;
  addCompletedCourse: () => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [completedCourses, setCompletedCourses] = useState(3);
  const [activeCourses] = useState<Course[]>([
    {
      id: '1',
      name: 'Advanced React Development',
      description: 'Master modern React patterns and best practices',
      tableOfContents: ['Hooks Deep Dive', 'Context API', 'Performance Optimization'],
      estimatedTime: '2 weeks',
      dailyCommitment: '2 hours',
      progress: 65
    }
  ]);

  const addCompletedCourse = () => {
    setCompletedCourses(prev => prev + 1);
  };

  return (
    <CourseContext.Provider
      value={{
        currentCourse,
        completedCourses,
        activeCourses,
        setCurrentCourse,
        addCompletedCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};