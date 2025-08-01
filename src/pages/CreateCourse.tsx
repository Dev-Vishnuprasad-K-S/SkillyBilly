import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Clock, Sparkles } from 'lucide-react';
import { useCourse } from '../context/CourseContext';

interface CourseSuggestion {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
}

const CreateCourse: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentCourse } = useCourse();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'resume' | 'skills'>('resume');
  const [skills, setSkills] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [suggestions, setSuggestions] = useState<CourseSuggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>('');
  const [customCourseName, setCustomCourseName] = useState('');
  const [dailyCommitment, setDailyCommitment] = useState('2');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    }
  };

  const handleSubmitInput = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockSuggestions: CourseSuggestion[] = [
        {
          id: '1',
          title: 'Advanced JavaScript & TypeScript',
          description: 'Master modern JavaScript features and TypeScript for enterprise development',
          estimatedTime: '3 weeks'
        },
        {
          id: '2',
          title: 'React & Next.js Mastery',
          description: 'Build scalable web applications with React and Next.js',
          estimatedTime: '4 weeks'
        },
        {
          id: '3',
          title: 'Full-Stack Development with Node.js',
          description: 'Complete backend development with Node.js, Express, and databases',
          estimatedTime: '5 weeks'
        }
      ];
      
      setSuggestions(mockSuggestions);
      setLoading(false);
      setStep(2);
    }, 2000);
  };

  const handleCreateCourse = async () => {
    setLoading(true);
    
    const selectedSuggestionData = suggestions.find(s => s.id === selectedSuggestion);
    const courseName = customCourseName || selectedSuggestionData?.title || 'Custom Course';
    
    // Simulate API call to create course
    setTimeout(() => {
      const newCourse = {
        id: Date.now().toString(),
        name: courseName,
        description: selectedSuggestionData?.description || 'Custom course based on your requirements',
        tableOfContents: [
          'Introduction and Setup',
          'Core Concepts',
          'Advanced Techniques',
          'Best Practices',
          'Real-world Projects',
          'Assessment and Certification'
        ],
        estimatedTime: selectedSuggestionData?.estimatedTime || '3 weeks',
        dailyCommitment: `${dailyCommitment} hours`,
        content: 'Welcome to your personalized learning journey! Today we\'ll start with the fundamentals...'
      };
      
      setCurrentCourse(newCourse);
      setLoading(false);
      navigate('/course-overview');
    }, 1500);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Create Course</h1>
        <p className="page-subtitle">
          Upload your resume or enter your skills to get AI-powered course recommendations
        </p>
      </div>

      {step === 1 && (
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>
            Step 1: Share Your Background
          </h3>
          
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <button
                className={`btn ${uploadMethod === 'resume' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setUploadMethod('resume')}
              >
                <FileText size={20} />
                Upload Resume
              </button>
              <button
                className={`btn ${uploadMethod === 'skills' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setUploadMethod('skills')}
              >
                <Sparkles size={20} />
                Enter Skills
              </button>
            </div>

            {uploadMethod === 'resume' ? (
              <div className="form-group">
                <label className="form-label">Upload Resume (PDF)</label>
                <div className="file-upload">
                  <Upload size={48} style={{ color: '#9ca3af', marginBottom: '1rem' }} />
                  <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
                    Drag and drop your resume here, or click to browse
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="btn btn-secondary">
                    Choose File
                  </label>
                  {selectedFile && (
                    <p style={{ marginTop: '1rem', color: '#059669' }}>
                      ✓ {selectedFile.name} selected
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="form-group">
                <label className="form-label">Enter Your Skills</label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="e.g., JavaScript, React, Node.js, Python, Data Analysis, Project Management..."
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  Separate skills with commas for better recommendations
                </p>
              </div>
            )}
          </div>

          <button
            className="btn btn-primary"
            onClick={handleSubmitInput}
            disabled={loading || (!selectedFile && !skills.trim())}
          >
            {loading ? (
              <>
                <div className="spinner" />
                Analyzing...
              </>
            ) : (
              'Get Course Suggestions'
            )}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>
            Step 2: Choose Your Course
          </h3>
          
          <div className="course-suggestions">
            <h4 style={{ marginBottom: '1rem', color: '#374151' }}>
              Recommended Courses
            </h4>
            
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className={`suggestion-item ${selectedSuggestion === suggestion.id ? 'selected' : ''}`}
                onClick={() => setSelectedSuggestion(suggestion.id)}
              >
                <input
                  type="radio"
                  name="course-suggestion"
                  value={suggestion.id}
                  checked={selectedSuggestion === suggestion.id}
                  onChange={() => setSelectedSuggestion(suggestion.id)}
                  className="checkbox"
                />
                <div>
                  <h5 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    {suggestion.title}
                  </h5>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                    {suggestion.description}
                  </p>
                  <p style={{ color: '#3b82f6', fontSize: '0.75rem', fontWeight: '500' }}>
                    <Clock size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                    {suggestion.estimatedTime}
                  </p>
                </div>
              </div>
            ))}

            <div className="form-group" style={{ marginTop: '1.5rem' }}>
              <label className="form-label">Or enter a custom course name:</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Advanced Data Science for Marketing"
                value={customCourseName}
                onChange={(e) => setCustomCourseName(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f8faff', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '1rem', color: '#374151' }}>
              Step 3: Set Your Schedule
            </h4>
            <div className="form-group">
              <label className="form-label">Daily Time Commitment</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {['1', '2', '3'].map((hours) => (
                  <label key={hours} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="radio"
                      name="daily-commitment"
                      value={hours}
                      checked={dailyCommitment === hours}
                      onChange={(e) => setDailyCommitment(e.target.value)}
                    />
                    {hours} hour{hours !== '1' ? 's' : ''} per day
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setStep(1)}
            >
              Back
            </button>
            <button
              className="btn btn-primary"
              onClick={handleCreateCourse}
              disabled={loading || (!selectedSuggestion && !customCourseName.trim())}
            >
              {loading ? (
                <>
                  <div className="spinner" />
                  Creating Course...
                </>
              ) : (
                'Create Course'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCourse;