import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Bot, Mic, Volume2 } from 'lucide-react';

const AITutor: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate starting the AI voice agent
    console.log('AI Tutor session started');
    
    // In a real implementation, you would initialize the ElevenLabs widget here
    // Example: ElevenLabs.init({ agentId: 'your-agent-id' });
  }, []);

  const handleClose = () => {
    navigate('/active-course');
  };

  return (
    <div className="ai-tutor-container">
      <button className="close-btn" onClick={handleClose}>
        <X size={24} />
      </button>
      
      <div className="ai-tutor-header">
        <Bot size={64} style={{ marginBottom: '1rem' }} />
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          AI Learning Tutor
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
          Your personal AI instructor is ready to help you learn
        </p>
      </div>

      <div className="ai-tutor-widget">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem',
            animation: 'pulse 2s infinite'
          }}>
            <Mic size={48} />
          </div>
          
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            AI Tutor is Active
          </h3>
          
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
            Hello! I'm your AI learning assistant. I'm here to help you understand 
            today's lesson on <strong>Introduction and Setup</strong>.
          </p>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            width: '100%',
            maxWidth: '500px'
          }}>
            <h4 style={{ marginBottom: '1rem' }}>I can help you with:</h4>
            <ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
              <li>Explaining complex concepts in simple terms</li>
              <li>Answering your questions in real-time</li>
              <li>Providing additional examples and practice</li>
              <li>Adapting to your learning pace and style</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(16, 185, 129, 0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '20px'
            }}>
              <Volume2 size={16} />
              <span style={{ fontSize: '0.875rem' }}>Voice Active</span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(59, 130, 246, 0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '20px'
            }}>
              <Bot size={16} />
              <span style={{ fontSize: '0.875rem' }}>AI Ready</span>
            </div>
          </div>

          <p style={{ 
            fontSize: '0.875rem', 
            marginTop: '2rem', 
            opacity: 0.7 
          }}>
            In a production environment, the ElevenLabs AI Voice Agent would be integrated here
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default AITutor;