import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function ExpertAnswers({ expertEmail }) {
  const [questions, setQuestions] = useState([]);
  const [answersMap, setAnswersMap] = useState({});
  const [votesMap, setVotesMap] = useState({});
  const [userVotesMap, setUserVotesMap] = useState({});
  const [answerForm, setAnswerForm] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'answered', 'unanswered'
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const fetchAllQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/questions');
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

      const voteCheckResponse = await axios.get(`http://localhost:8080/api/answer-votes/answer/${answerId}/check/${expertEmail}`);
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
        await axios.delete(`http://localhost:8080/api/answer-votes/${answerId}/${expertEmail}`);
      } else {
        // Add upvote
        await axios.post('http://localhost:8080/api/answer-votes', {
          answerId: answerId.toString(),
          voterEmail: expertEmail,
          voterType: 'EXPERT'
        });
      }
      
      // Refresh votes
      await fetchVotesForAnswer(answerId);
    } catch (error) {
      console.error('Error handling upvote:', error);
    }
  };

  const handleAnswerSubmit = async (questionId) => {
    const answerText = answerForm[questionId];
    
    if (!answerText || !answerText.trim()) {
      setStatus('Please enter your answer.');
      return;
    }

    try {
      const answerData = {
        questionId: questionId,
        answerText: answerText,
        expertEmail: expertEmail
      };

      await axios.post('http://localhost:8080/api/answers', answerData);
      
      // Clear the form
      setAnswerForm(prev => ({ ...prev, [questionId]: '' }));
      setSelectedQuestion(null);
      setStatus('Answer posted successfully!');
      
      // Refresh answers
      await fetchAnswersForQuestion(questionId);
      
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('Error posting answer:', error);
      setStatus('Failed to post answer. Please try again.');
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

  const filteredQuestions = questions.filter(question => {
    if (filter === 'all') return true;
    if (filter === 'answered') return answersMap[question.questionId]?.length > 0;
    if (filter === 'unanswered') return !answersMap[question.questionId]?.length;
    return true;
  });

  const hasExpertAnswered = (questionId) => {
    const answers = answersMap[questionId] || [];
    return answers.some(answer => answer.expertEmail === expertEmail);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>💬 Answer Questions</h1>
        <p style={styles.subtitle}>Help farmers by sharing your agricultural expertise</p>
      </div>

      {/* Filter Buttons */}
      <div style={styles.filterContainer}>
        <button
          style={{ ...styles.filterBtn, ...(filter === 'all' ? styles.activeFilter : {}) }}
          onClick={() => setFilter('all')}
        >
          📚 All Questions <span style={styles.badge}>{questions.length}</span>
        </button>
        <button
          style={{ ...styles.filterBtn, ...(filter === 'unanswered' ? styles.activeFilter : {}) }}
          onClick={() => setFilter('unanswered')}
        >
          ❓ Unanswered <span style={styles.badge}>{questions.filter(q => !answersMap[q.questionId]?.length).length}</span>
        </button>
        <button
          style={{ ...styles.filterBtn, ...(filter === 'answered' ? styles.activeFilter : {}) }}
          onClick={() => setFilter('answered')}
        >
          ✅ Answered <span style={styles.badge}>{questions.filter(q => answersMap[q.questionId]?.length > 0).length}</span>
        </button>
      </div>

      {status && (
        <div style={{ ...styles.statusMsg, color: status.includes('Failed') ? '#d32f2f' : '#2e7d32' }}>
          {status}
        </div>
      )}

      {loading && <p style={styles.loading}>Loading questions...</p>}

      {/* Questions List */}
      <div style={styles.questionsList}>
        {!loading && filteredQuestions.length === 0 && (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>No {filter !== 'all' ? filter : ''} questions found.</p>
            <p style={styles.emptySubtext}>Check back later for new questions from farmers.</p>
          </div>
        )}

        {filteredQuestions.map((question) => (
          <div key={question.questionId} style={styles.questionCard}>
            <div style={styles.questionHeader}>
              <div style={styles.questionIconBox}>
                <span style={styles.questionIcon}>Q</span>
              </div>
              <div style={styles.questionContent}>
                <h3 style={styles.questionText}>{question.content}</h3>
                <div style={styles.questionMeta}>
                  <span style={styles.metaItem}>👤 {question.farmerEmail}</span>
                  <span style={styles.metaItem}>📅 {formatDate(question.askedDate)}</span>
                  <span style={styles.answerCount}>
                    💬 {answersMap[question.questionId]?.length || 0} answer(s)
                  </span>
                </div>
              </div>
            </div>

            {/* Existing Answers */}
            {answersMap[question.questionId] && answersMap[question.questionId].length > 0 && (
              <div style={styles.answersSection}>
                <h4 style={styles.answersTitle}>💡 Answers:</h4>
                {answersMap[question.questionId].map((answer) => (
                  <div key={answer.answerId} style={styles.answerCard}>
                    <div style={styles.answerHeader}>
                      <div style={styles.answerInfo}>
                        <span style={styles.expertBadge}>
                          {answer.expertEmail === expertEmail ? '👤 You' : `👨‍🌾 ${answer.expertEmail}`}
                        </span>
                        <span style={styles.answerDate}>{formatDate(answer.answeredDate)}</span>
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
              </div>
            )}

            {/* Add Answer Form */}
            {!hasExpertAnswered(question.questionId) ? (
              <div style={styles.answerFormSection}>
                {selectedQuestion === question.questionId ? (
                  <>
                    <label style={styles.formLabel}>✍️ Write Your Answer</label>
                    <textarea
                      style={styles.textarea}
                      rows="5"
                      value={answerForm[question.questionId] || ''}
                      onChange={(e) => setAnswerForm({ ...answerForm, [question.questionId]: e.target.value })}
                      placeholder="Share your expert knowledge and help the farmer..."
                    />
                    <div style={styles.formButtons}>
                      <button
                        style={styles.submitBtn}
                        onClick={() => handleAnswerSubmit(question.questionId)}
                      >
                        ✅ Submit Answer
                      </button>
                      <button
                        style={styles.cancelBtn}
                        onClick={() => {
                          setSelectedQuestion(null);
                          setAnswerForm({ ...answerForm, [question.questionId]: '' });
                        }}
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    style={styles.addAnswerBtn}
                    onClick={() => setSelectedQuestion(question.questionId)}
                  >
                    ➕ Add Your Answer
                  </button>
                )}
              </div>
            ) : (
              <div style={styles.alreadyAnswered}>
                ✓ You have already answered this question
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: 'calc(100vh - 70px)',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '40px 20px',
  },
  header: {
    maxWidth: '1400px',
    margin: '0 auto 40px',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '15px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#64748b',
    fontWeight: '500',
  },
  filterContainer: {
    maxWidth: '1400px',
    margin: '0 auto 40px',
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '14px 28px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1.05rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  badge: {
    background: '#e2e8f0',
    color: '#64748b',
    padding: '4px 10px',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '700',
  },
  activeFilter: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderColor: '#667eea',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
  },
  statusMsg: {
    maxWidth: '1400px',
    margin: '0 auto 30px',
    padding: '16px 24px',
    background: 'white',
    borderRadius: '12px',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '1.05rem',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#64748b',
    padding: '60px',
    fontWeight: '600',
  },
  questionsList: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  emptyState: {
    textAlign: 'center',
    padding: '100px 20px',
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
  },
  emptyText: {
    fontSize: '1.4rem',
    color: '#64748b',
    marginBottom: '10px',
    fontWeight: '700',
  },
  emptySubtext: {
    fontSize: '1.05rem',
    color: '#94a3b8',
  },
  questionCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    marginBottom: '35px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.2s ease, box-shadow 0.3s ease',
  },
  questionHeader: {
    display: 'flex',
    gap: '25px',
    marginBottom: '30px',
  },
  questionIconBox: {
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  },
  questionIcon: {
    color: 'white',
    fontSize: '1.8rem',
    fontWeight: '800',
  },
  questionContent: {
    flex: 1,
  },
  questionText: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '15px',
    lineHeight: '1.5',
  },
  questionMeta: {
    display: 'flex',
    gap: '20px',
    fontSize: '1rem',
    flexWrap: 'wrap',
  },
  metaItem: {
    color: '#64748b',
    fontWeight: '600',
  },
  answerCount: {
    fontWeight: '700',
    color: '#667eea',
  },
  answersSection: {
    marginTop: '30px',
    paddingTop: '30px',
    borderTop: '3px solid #f1f5f9',
  },
  answersTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: '20px',
  },
  answerCard: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e8f5e9 100%)',
    borderLeft: '6px solid #8bc34a',
    padding: '25px',
    marginBottom: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  },
  answerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    flexWrap: 'wrap',
    gap: '15px',
  },
  answerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap',
  },
  expertBadge: {
    fontWeight: '700',
    color: '#2e7d32',
    fontSize: '1.05rem',
    background: '#c8e6c9',
    padding: '6px 14px',
    borderRadius: '8px',
  },
  answerDate: {
    fontSize: '0.95rem',
    color: '#94a3b8',
    fontWeight: '500',
  },
  upvoteButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 18px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '1.3rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  upvoteButtonActive: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderColor: '#667eea',
    transform: 'scale(1.1)',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  },
  voteCount: {
    fontSize: '1.1rem',
    fontWeight: '800',
    color: '#2d3748',
  },
  answerText: {
    lineHeight: '1.8',
    color: '#334155',
    fontSize: '1.05rem',
  },
  answerFormSection: {
    marginTop: '30px',
    paddingTop: '30px',
    borderTop: '3px solid #f1f5f9',
  },
  formLabel: {
    display: 'block',
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '15px',
  },
  textarea: {
    width: '100%',
    padding: '18px',
    fontSize: '1.05rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    lineHeight: '1.7',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
  },
  formButtons: {
    display: 'flex',
    gap: '15px',
    marginTop: '15px',
    flexWrap: 'wrap',
  },
  submitBtn: {
    flex: 1,
    minWidth: '150px',
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
  },
  cancelBtn: {
    flex: 1,
    minWidth: '150px',
    padding: '16px 32px',
    background: '#e2e8f0',
    color: '#64748b',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  addAnswerBtn: {
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  },
  alreadyAnswered: {
    marginTop: '30px',
    paddingTop: '30px',
    borderTop: '3px solid #f1f5f9',
    color: '#2e7d32',
    fontWeight: '700',
    textAlign: 'center',
    padding: '18px',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    borderRadius: '12px',
    fontSize: '1.05rem',
    boxShadow: '0 2px 10px rgba(46, 125, 50, 0.1)',
  },
};

ExpertAnswers.propTypes = {
  expertEmail: PropTypes.string.isRequired,
};

export default ExpertAnswers;
