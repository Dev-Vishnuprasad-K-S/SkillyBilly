import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Clock, Sparkles } from 'lucide-react';
import { useCourse } from '../context/CourseContext';

interface CourseSuggestion {
  id: string;
  title: string;
  reason: string;
  potential_platforms: string;
  skill_area: string;
  level: string;
  order: number;
  source: string;
}

interface APIResponse {
  filename: string;
  skills: string[];
  experience: number;
  full_text_snippet: string;
  course_list: {
    title: string;
    reason: string;
    potential_platforms: string;
    skill_area: string;
    level: string;
    order: number;
    source: string;
  }[];
}

const CreateCourse: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentCourse } = useCourse();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [uploadMethod, setUploadMethod] = useState<'resume' | 'skills'>('resume');
  const [skills, setSkills] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [suggestions, setSuggestions] = useState<CourseSuggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>('');
  const [customCourseName, setCustomCourseName] = useState('');
  const [dailyCommitment, setDailyCommitment] = useState('2');
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState<number>(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setError('');
    }
  };

  const handleSubmitInput = async () => {
    setLoading(true);
    setError('');
    
    try {
      if (uploadMethod === 'resume' && selectedFile) {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('file', selectedFile);
        
        const response = await fetch('http://localhost:8000/upload-resume', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: APIResponse = await response.json();
        
        // Transform API response to our format
        const transformedSuggestions: CourseSuggestion[] = data.course_list
          .sort((a, b) => a.order - b.order)
          .map((course, index) => ({
            id: (index + 1).toString(),
            title: course.title,
            reason: course.reason,
            potential_platforms: course.potential_platforms,
            skill_area: course.skill_area,
            level: course.level,
            order: course.order,
            source: course.source
          }));
        
        setSuggestions(transformedSuggestions);
        setExtractedSkills(data.skills);
        setExperience(data.experience);
        setStep(2);
        
      } else if (uploadMethod === 'skills' && skills.trim()) {
        // For skills input, create mock suggestions (you can implement another API endpoint)
        const mockSuggestions: CourseSuggestion[] = [
          {
            id: '1',
            title: 'Advanced JavaScript & TypeScript',
            reason: 'Based on your JavaScript skills, advancing to TypeScript will enhance your development capabilities',
            potential_platforms: 'Udemy, Coursera, Pluralsight',
            skill_area: 'javascript',
            level: 'Advanced',
            order: 1,
            source: 'Udemy, Coursera'
          },
          {
            id: '2',
            title: 'React & Next.js Mastery',
            reason: 'Building on your React knowledge, Next.js will help you create production-ready applications',
            potential_platforms: 'Vercel, Udemy, Frontend Masters',
            skill_area: 'react',
            level: 'Advanced',
            order: 2,
            source: 'Frontend Masters'
          }
        ];
        
        setSuggestions(mockSuggestions);
        setStep(2);
      }
    } catch (err) {
      console.error('Error uploading resume:', err);
      setError('Failed to process your resume. Please try again or check if the API server is running.');
    } finally {
      setLoading(false);
    }
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
        description: selectedSuggestionData?.reason || 'Custom course based on your requirements',
        tableOfContents: [
          'Introduction and Setup',
          'Core Concepts',
          'Advanced Techniques',
          'Best Practices',
          'Real-world Projects',
          'Assessment and Certification'
        ],
        estimatedTime: '3 weeks',
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
          
          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              {error}
            </div>
          )}
          
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
          
          {extractedSkills.length > 0 && (
            <div style={{
              background: '#f0f9ff',
              border: '1px solid #bae6fd',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{ color: '#0369a1', marginBottom: '0.5rem' }}>
                Extracted from your resume:
              </h4>
              <p style={{ color: '#0369a1', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <strong>Experience:</strong> {experience} years
              </p>
              <p style={{ color: '#0369a1', fontSize: '0.875rem' }}>
                <strong>Skills:</strong> {extractedSkills.join(', ')}
              </p>
            </div>
          )}
          
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
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    {suggestion.reason}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '0.125rem 0.5rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      backgroundColor: '#dbeafe',
                      color: '#1e40af'
                    }}>
                      {suggestion.level}
                    </span>
                    <span style={{
                      padding: '0.125rem 0.5rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      backgroundColor: '#f3f4f6',
                      color: '#374151'
                    }}>
                      {suggestion.skill_area}
                    </span>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    Available on: {suggestion.potential_platforms}
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