import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function FAQ({ farmerEmail }) {
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [answersMap, setAnswersMap] = useState({});
  const [votesMap, setVotesMap] = useState({});
  const [userVotesMap, setUserVotesMap] = useState({});
  const [form, setForm] = useState({ content: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('my-questions'); // 'my-questions' or 'all-questions'

  useEffect(() => {
    if (farmerEmail) {
      if (viewMode === 'my-questions') {
        fetchMyQuestions();
      } else {
        fetchAllQuestions();
      }
    }
  }, [farmerEmail, viewMode]);

  const fetchMyQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/questions/farmer/${farmerEmail}`);
      const questionsData = response.data;
      setQuestions(questionsData);
      
      // Fetch answers for each question
      for (const question of questionsData) {
        await fetchAnswersForQuestion(question.questionId);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  const fetchAllQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/questions');
      const questionsData = response.data;
      setAllQuestions(questionsData);
      
      // Fetch answers for each question
      for (const question of questionsData) {
        await fetchAnswersForQuestion(question.questionId);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching all questions:', error);
      setLoading(false);
    }
  };

  const fetchAnswersForQuestion = async (questionId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/answers/question/${questionId}`);
      const answers = response.data;
      setAnswersMap(prev => ({
        ...prev,
        [questionId]: answers
      }));
      
      // Fetch vote counts and user votes for each answer
      for (const answer of answers) {
        await fetchVotesForAnswer(answer.answerId);
      }
    } catch (error) {
      console.error(`Error fetching answers for question ${questionId}:`, error);
    }
  };

  const fetchVotesForAnswer = async (answerId) => {
    try {
      const countResponse = await axios.get(`http://localhost:8080/api/answer-votes/answer/${answerId}/count`);
      setVotesMap(prev => ({
        ...prev,
        [answerId]: countResponse.data.voteCount
      }));

      const voteCheckResponse = await axios.get(`http://localhost:8080/api/answer-votes/answer/${answerId}/check/${farmerEmail}`);
      setUserVotesMap(prev => ({
        ...prev,
        [answerId]: voteCheckResponse.data.hasVoted
      }));
    } catch (error) {
      console.error(`Error fetching votes for answer ${answerId}:`, error);
    }
  };

  const handleUpvote = async (answerId) => {
    try {
      const hasVoted = userVotesMap[answerId];
      
      if (hasVoted) {
        // Remove upvote
        await axios.delete(`http://localhost:8080/api/answer-votes/${answerId}/${farmerEmail}`);
      } else {
        // Add upvote
        await axios.post('http://localhost:8080/api/answer-votes', {
          answerId: answerId.toString(),
          voterEmail: farmerEmail,
          voterType: 'FARMER'
        });
      }
      
      // Refresh votes
      await fetchVotesForAnswer(answerId);
    } catch (error) {
      console.error('Error handling upvote:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.content.trim()) {
      setStatus('Please enter your question.');
      return;
    }

    try {
      const questionData = {
        content: form.content,
        farmerEmail: farmerEmail
      };

      await axios.post('http://localhost:8080/api/questions', questionData);
      setForm({ content: '' });
      setStatus('Question posted successfully! Experts will answer soon.');
      fetchMyQuestions(); // Refresh the questions list
      
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('Error posting question:', error);
      setStatus('Failed to post question. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const currentQuestions = viewMode === 'my-questions' ? questions : allQuestions;

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>❓ Ask an Expert</h1>
        <p style={styles.pageSubtitle}>Get answers from agricultural experts for your farming questions.</p>
      </div>

      <div style={styles.contentContainer}>
        {/* Ask a Question Section */}
        <div style={styles.formCard}>
          <div style={styles.formHeader}>
            <h3 style={styles.formTitle}>🌾 Ask a New Question</h3>
            <p style={styles.formSubtitle}>Experts respond within 24 hours.</p>
          </div>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Your Question</label>
              <textarea
                style={styles.textarea}
                rows="5"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Ask your question here... (e.g., When should I start irrigation after rain? What fertilizer is best for wheat in winter?)"
                required
              />
            </div>
            {status && (
              <div style={{
                ...styles.statusMessage,
                color: status.includes('Failed') ? '#d32f2f' : '#2e7d32',
                background: status.includes('Failed') ? '#ffebee' : '#e8f5e9'
              }}>
                {status}
              </div>
            )}
            <button style={styles.submitButton} type="submit">📤 Post Question</button>
          </form>
        </div>

        {/* View Mode Toggle */}
        <div style={styles.toggleContainer}>
          <button
            onClick={() => setViewMode('my-questions')}
            style={{
              ...styles.toggleButton,
              ...(viewMode === 'my-questions' ? styles.toggleButtonActive : {})
            }}
          >
            📋 My Questions
          </button>
          <button
            onClick={() => setViewMode('all-questions')}
            style={{
              ...styles.toggleButton,
              ...(viewMode === 'all-questions' ? styles.toggleButtonActive : {})
            }}
          >
            🌍 All Community Q&A
          </button>
        </div>

        {/* Questions Section */}
        <div style={styles.questionsSection}>
          <h2 style={styles.sectionTitle}>
            {viewMode === 'my-questions' ? '📋 Your Previously Asked Questions' : '🌍 Community Questions & Answers'}
          </h2>
          
          {loading && <p style={styles.loadingText}>Loading questions...</p>}
          
          {!loading && currentQuestions.length === 0 && (
            <div style={styles.emptyState}>
              <p style={styles.emptyStateText}>
                {viewMode === 'my-questions' 
                  ? "You haven't asked any questions yet." 
                  : "No questions available yet."}
              </p>
              <p style={styles.emptyStateSubtext}>
                {viewMode === 'my-questions' 
                  ? 'Ask your first question above to get expert answers!'
                  : 'Check back later for community questions.'}
              </p>
            </div>
          )}

          {currentQuestions.map((question) => (
            <div key={question.questionId} style={styles.questionCard}>
              <div style={styles.questionHeader}>
                <div style={styles.questionIcon}>Q</div>
                <div style={styles.questionContent}>
                  <h3 style={styles.questionText}>{question.content}</h3>
                  <div style={styles.questionMeta}>
                    {viewMode === 'all-questions' && (
                      <span style={styles.metaItem}>👤 {question.farmerEmail}</span>
                    )}
                    <span style={styles.metaItem}>📅 {formatDate(question.askedDate)}</span>
                  </div>
                </div>
              </div>
              
              {/* Display answers for this question */}
              <div style={styles.answersContainer}>
                {answersMap[question.questionId] && answersMap[question.questionId].length > 0 ? (
                  <>
                    <h4 style={styles.answersTitle}>
                      💡 Answers ({answersMap[question.questionId].length})
                    </h4>
                    {answersMap[question.questionId].map((answer) => (
                      <div key={answer.answerId} style={styles.answerCard}>
                        <div style={styles.answerHeader}>
                          <div style={styles.answerInfo}>
                            <span style={styles.expertBadge}>👨‍🌾 Expert</span>
                            <span style={styles.expertEmail}>{answer.expertEmail}</span>
                            <span style={styles.answerDate}>• {formatDate(answer.answeredDate)}</span>
                          </div>
                          <button
                            onClick={() => handleUpvote(answer.answerId)}
                            style={{
                              ...styles.upvoteButton,
                              ...(userVotesMap[answer.answerId] ? styles.upvoteButtonActive : {})
                            }}
                          >
                            {userVotesMap[answer.answerId] ? '👍' : '👍🏻'}
                            <span style={styles.voteCount}>{votesMap[answer.answerId] || 0}</span>
                          </button>
                        </div>
                        <p style={styles.answerText}>{answer.answerText}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  <div style={styles.noAnswers}>
                    <p>⏳ No answers yet. Experts will respond soon.</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: 'calc(100vh - 70px)',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '40px 20px',
  },
  header: {
    maxWidth: '1400px',
    margin: '0 auto 40px',
    textAlign: 'center',
  },
  pageTitle: {
    fontSize: '3rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '15px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  },
  pageSubtitle: {
    fontSize: '1.2rem',
    color: '#64748b',
    fontWeight: '500',
  },
  contentContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  formCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '35px',
    marginBottom: '40px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  formHeader: {
    marginBottom: '25px',
  },
  formTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '8px',
  },
  formSubtitle: {
    color: '#558b2f',
    fontSize: '1rem',
    fontWeight: '500',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '10px',
  },
  textarea: {
    width: '100%',
    padding: '16px',
    fontSize: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    lineHeight: '1.6',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
  },
  statusMessage: {
    padding: '14px 20px',
    borderRadius: '10px',
    marginBottom: '15px',
    fontWeight: '600',
    textAlign: 'center',
  },
  submitButton: {
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  },
  toggleContainer: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginBottom: '40px',
    flexWrap: 'wrap',
  },
  toggleButton: {
    padding: '14px 28px',
    background: 'white',
    color: '#64748b',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1.05rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  toggleButtonActive: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderColor: '#667eea',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
  },
  questionsSection: {
    marginTop: '30px',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: '800',
    marginBottom: '30px',
    color: '#2d3748',
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: '1.1rem',
    color: '#64748b',
    padding: '40px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  },
  emptyStateText: {
    fontSize: '1.3rem',
    color: '#64748b',
    marginBottom: '10px',
    fontWeight: '600',
  },
  emptyStateSubtext: {
    fontSize: '1rem',
    color: '#94a3b8',
  },
  questionCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '35px',
    marginBottom: '30px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.2s ease, box-shadow 0.3s ease',
  },
  questionHeader: {
    display: 'flex',
    gap: '20px',
    marginBottom: '25px',
  },
  questionIcon: {
    width: '50px',
    height: '50px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: '800',
    flexShrink: 0,
  },
  questionContent: {
    flex: 1,
  },
  questionText: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '12px',
    lineHeight: '1.5',
  },
  questionMeta: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  },
  metaItem: {
    fontSize: '0.95rem',
    color: '#64748b',
    fontWeight: '500',
  },
  answersContainer: {
    paddingTop: '25px',
    borderTop: '2px solid #f1f5f9',
  },
  answersTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: '20px',
  },
  answerCard: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e8f5e9 100%)',
    borderLeft: '5px solid #8bc34a',
    padding: '25px',
    marginBottom: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
  },
  answerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    flexWrap: 'wrap',
    gap: '10px',
  },
  answerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  expertBadge: {
    fontWeight: '700',
    color: '#2e7d32',
    fontSize: '1rem',
    background: '#c8e6c9',
    padding: '4px 12px',
    borderRadius: '6px',
  },
  expertEmail: {
    fontWeight: '600',
    color: '#558b2f',
    fontSize: '0.95rem',
  },
  answerDate: {
    fontSize: '0.9rem',
    color: '#94a3b8',
  },
  upvoteButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  upvoteButtonActive: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderColor: '#667eea',
    transform: 'scale(1.05)',
  },
  voteCount: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#2d3748',
  },
  answerText: {
    lineHeight: '1.8',
    color: '#334155',
    fontSize: '1.05rem',
  },
  noAnswers: {
    color: '#94a3b8',
    fontStyle: 'italic',
    padding: '30px',
    textAlign: 'center',
    fontSize: '1.05rem',
  },
};

FAQ.propTypes = {
  farmerEmail: PropTypes.string.isRequired,
};

export default FAQ;
