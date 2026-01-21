import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function ExpertArticles({ expertEmail }) {
  const [activeTab, setActiveTab] = useState('my-articles');
  const [myArticles, setMyArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [feedbackCounts, setFeedbackCounts] = useState({});
  const [userFeedback, setUserFeedback] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Crop Management',
  });

  const categories = [
    'Crop Management',
    'Pest Control',
    'Irrigation',
    'Soil Health',
    'Disease Management',
    'Weather & Climate',
    'Market Insights',
    'Technology',
    'Organic Farming',
    'General Tips'
  ];

  useEffect(() => {
    if (expertEmail) {
      fetchMyArticles();
      fetchAllArticles();
    }
  }, [expertEmail]);

  const fetchMyArticles = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/articles/expert/${expertEmail}`);
      const articlesData = response.data;
      setMyArticles(articlesData);
      await fetchFeedbackCounts(articlesData);
    } catch (error) {
      console.error('Error fetching my articles:', error);
    }
  };

  const fetchAllArticles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/articles');
      const articlesData = response.data.filter(article => article.expertEmail !== expertEmail);
      setAllArticles(articlesData);
      await fetchFeedbackCounts(articlesData);
      await checkUserFeedback(articlesData);
    } catch (error) {
      console.error('Error fetching all articles:', error);
    }
  };

  const fetchFeedbackCounts = async (articlesData) => {
    const counts = {};
    for (const article of articlesData) {
      try {
        const feedbackResponse = await axios.get(`http://localhost:8080/api/feedback/article/${article.id}/counts`);
        counts[article.id] = feedbackResponse.data;
      } catch (error) {
        console.error(`Error fetching feedback for article ${article.id}:`, error);
        counts[article.id] = { LIKE: 0, HELPFUL: 0, INFORMATIVE: 0 };
      }
    }
    setFeedbackCounts(prev => ({ ...prev, ...counts }));
  };

  const checkUserFeedback = async (articlesData) => {
    const feedback = {};
    for (const article of articlesData) {
      try {
        const response = await axios.get(`http://localhost:8080/api/feedback/article/${article.id}/user/${expertEmail}`);
        feedback[article.id] = response.data;
      } catch (error) {
        feedback[article.id] = false;
      }
    }
    setUserFeedback(feedback);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const articleData = {
      ...formData,
      expertEmail: expertEmail
    };

    try {
      if (editingArticle) {
        await axios.put(`http://localhost:8080/api/articles/${editingArticle.id}`, articleData);
      } else {
        await axios.post('http://localhost:8080/api/articles', articleData);
      }
      
      setFormData({
        title: '',
        content: '',
        category: 'Crop Management',
      });
      setIsCreating(false);
      setEditingArticle(null);
      fetchMyArticles();
      fetchAllArticles();
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Failed to save article. Please try again.');
    }
  };

  const handleGiveFeedback = async (articleId, feedbackType) => {
    try {
      const feedbackData = {
        article: { id: articleId },
        feedbackType: feedbackType,
        reviewerEmail: expertEmail,
        reviewerType: 'EXPERT'
      };
      
      await axios.post('http://localhost:8080/api/feedback', feedbackData);
      await fetchFeedbackCounts([{ id: articleId }]);
      setUserFeedback(prev => ({ ...prev, [articleId]: true }));
      alert('Thank you for your feedback!');
    } catch (error) {
      if (error.response?.status === 409) {
        alert('You have already submitted feedback for this article.');
      } else {
        console.error('Error submitting feedback:', error);
        alert('Failed to submit feedback. Please try again.');
      }
    }
  };

  const handleViewArticle = (article) => {
    setSelectedArticle(article);
  };

  const closeArticleView = () => {
    setSelectedArticle(null);
  };

  const handleEdit = (article) => {
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category,
    });
    setEditingArticle(article);
    setIsCreating(true);
    setActiveTab('my-articles');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await axios.delete(`http://localhost:8080/api/articles/${id}`);
        fetchMyArticles();
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  const cancelEdit = () => {
    setFormData({
      title: '',
      content: '',
      category: 'Crop Management',
    });
    setIsCreating(false);
    setEditingArticle(null);
  };

  // Get articles based on active tab
  const articles = activeTab === 'my-articles' ? myArticles : allArticles;

  const styles = {
    container: {
      minHeight: 'calc(100vh - 70px)',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '40px 20px',
    },
    header: {
      maxWidth: '1200px',
      margin: '0 auto 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: '#2d3748',
      margin: 0,
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
    },
    tabContainer: {
      maxWidth: '1200px',
      margin: '0 auto 30px',
      display: 'flex',
      gap: '10px',
      borderBottom: '2px solid #e2e8f0',
    },
    tab: {
      padding: '12px 28px',
      background: 'transparent',
      border: 'none',
      borderBottom: '3px solid transparent',
      color: '#64748b',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    activeTab: {
      color: '#667eea',
      borderBottomColor: '#667eea',
    },
    createBtn: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      padding: '14px 32px',
      borderRadius: '50px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    formContainer: {
      maxWidth: '900px',
      margin: '0 auto 40px',
      background: 'white',
      borderRadius: '24px',
      padding: '40px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
    },
    formTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '30px',
      textAlign: 'center',
    },
    formGroup: {
      marginBottom: '24px',
    },
    label: {
      display: 'block',
      fontSize: '0.95rem',
      fontWeight: '600',
      color: '#4a5568',
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      padding: '14px 18px',
      fontSize: '1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      outline: 'none',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      fontFamily: 'inherit',
    },
    textarea: {
      width: '100%',
      padding: '14px 18px',
      fontSize: '1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      outline: 'none',
      resize: 'vertical',
      minHeight: '400px',
      fontFamily: 'inherit',
      boxSizing: 'border-box',
      lineHeight: '1.6',
    },
    select: {
      width: '100%',
      padding: '14px 18px',
      fontSize: '1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      outline: 'none',
      background: 'white',
      cursor: 'pointer',
      boxSizing: 'border-box',
    },
    buttonGroup: {
      display: 'flex',
      gap: '16px',
      marginTop: '32px',
    },
    submitBtn: {
      flex: 1,
      padding: '16px',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1.05rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
    },
    cancelBtn: {
      flex: 1,
      padding: '16px',
      background: '#e2e8f0',
      color: '#4a5568',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1.05rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    articlesGrid: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '30px',
    },
    articleCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      border: '1px solid #e2e8f0',
      position: 'relative',
      overflow: 'hidden',
    },
    articleHeader: {
      marginBottom: '16px',
    },
    articleTitle: {
      fontSize: '1.4rem',
      fontWeight: '700',
      color: '#2d3748',
      margin: '0 0 8px 0',
      lineHeight: '1.4',
    },
    categoryBadge: {
      display: 'inline-block',
      padding: '6px 14px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: '600',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      marginBottom: '12px',
    },
    articleContent: {
      fontSize: '0.95rem',
      color: '#718096',
      lineHeight: '1.7',
      marginBottom: '20px',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    articleDate: {
      fontSize: '0.85rem',
      color: '#a0aec0',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
    feedbackStats: {
      display: 'flex',
      gap: '16px',
      marginBottom: '20px',
      padding: '12px',
      background: '#f8fafc',
      borderRadius: '10px',
      fontSize: '0.85rem',
    },
    feedbackItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      color: '#64748b',
      fontWeight: '500',
    },
    articleActions: {
      display: 'flex',
      gap: '10px',
    },
    actionBtn: {
      flex: 1,
      padding: '10px 20px',
      fontSize: '0.9rem',
      fontWeight: '600',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    editBtn: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: 'white',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    },
    deleteBtn: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: 'white',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
    },
    emptyState: {
      textAlign: 'center',
      padding: '80px 20px',
      gridColumn: '1 / -1',
    },
    emptyIcon: {
      fontSize: '5rem',
      marginBottom: '20px',
      opacity: '0.5',
    },
    emptyText: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: '#4a5568',
      marginBottom: '10px',
    },
    emptySubtext: {
      fontSize: '1rem',
      color: '#718096',
    },
    feedbackButtons: {
      display: 'flex',
      gap: '8px',
      marginTop: '16px',
    },
    feedbackBtn: {
      flex: 1,
      padding: '10px 16px',
      fontSize: '0.85rem',
      fontWeight: '600',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
    },
    likeBtn: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
    },
    helpfulBtn: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: 'white',
    },
    informativeBtn: {
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      color: 'white',
    },
    disabledBtn: {
      background: '#e2e8f0',
      color: '#94a3b8',
      cursor: 'not-allowed',
    },
    viewBtn: {
      width: '100%',
      padding: '10px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      marginBottom: '12px',
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    },
    modalContent: {
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      maxWidth: '800px',
      maxHeight: '90vh',
      overflow: 'auto',
      position: 'relative',
    },
    closeBtn: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: '#e2e8f0',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      fontSize: '1.5rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    expertInfo: {
      fontSize: '0.9rem',
      color: '#64748b',
      marginBottom: '8px',
      fontWeight: '500',
    },
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

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          {isCreating ? (editingArticle ? '✏️ Edit Article' : '✨ Create New Article') : 
           activeTab === 'my-articles' ? '📚 My Articles' : '🌐 Browse Articles'}
        </h1>
        {!isCreating && activeTab === 'my-articles' && (
          <button
            style={styles.createBtn}
            onClick={() => setIsCreating(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>+</span>
            Create Article
          </button>
        )}
      </div>

      {!isCreating && (
        <div style={styles.tabContainer}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'my-articles' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('my-articles')}
            onMouseEnter={(e) => {
              if (activeTab !== 'my-articles') {
                e.currentTarget.style.color = '#4a5568';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'my-articles') {
                e.currentTarget.style.color = '#64748b';
              }
            }}
          >
            📝 My Articles
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'browse' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('browse')}
            onMouseEnter={(e) => {
              if (activeTab !== 'browse') {
                e.currentTarget.style.color = '#4a5568';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'browse') {
                e.currentTarget.style.color = '#64748b';
              }
            }}
          >
            🌍 Browse Articles
          </button>
        </div>
      )}

      {isCreating && (
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>
            {editingArticle ? 'Edit Your Article' : 'Write a New Article'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Enter an engaging title for your article"
                required
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={styles.select}
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                style={styles.textarea}
                placeholder="Share your knowledge and expertise with the farming community..."
                required
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            <div style={styles.buttonGroup}>
              <button
                type="submit"
                style={styles.submitBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
                }}
              >
                {editingArticle ? '💾 Update Article' : '📝 Publish Article'}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                style={styles.cancelBtn}
                onMouseEnter={(e) => e.currentTarget.style.background = '#cbd5e1'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#e2e8f0'}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {!isCreating && (
        <div style={styles.articlesGrid}>
          {articles.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📝</div>
              <div style={styles.emptyText}>
                {activeTab === 'my-articles' ? 'No articles yet' : 'No articles available'}
              </div>
              <p style={styles.emptySubtext}>
                {activeTab === 'my-articles' 
                  ? 'Click "Create Article" to share your first piece of knowledge'
                  : 'Check back later for articles from other experts'}
              </p>
            </div>
          ) : (
            articles.map(article => (
              <div
                key={article.id}
                style={styles.articleCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                }}
              >
                <div style={styles.articleHeader}>
                  <div style={styles.categoryBadge}>{article.category}</div>
                  <h3 style={styles.articleTitle}>{article.title}</h3>
                  {activeTab === 'browse' && (
                    <p style={styles.expertInfo}>By: {article.expertEmail}</p>
                  )}
                </div>

                <p style={styles.articleContent}>{article.content}</p>

                <div style={styles.articleDate}>
                  <span>📅</span>
                  <span>{formatDate(article.createdDate)}</span>
                </div>

                {feedbackCounts[article.id] && (
                  <div style={styles.feedbackStats}>
                    <div style={styles.feedbackItem}>
                      <span>👍</span>
                      <span>{feedbackCounts[article.id].LIKE || 0} Likes</span>
                    </div>
                    <div style={styles.feedbackItem}>
                      <span>💡</span>
                      <span>{feedbackCounts[article.id].HELPFUL || 0} Helpful</span>
                    </div>
                    <div style={styles.feedbackItem}>
                      <span>ℹ️</span>
                      <span>{feedbackCounts[article.id].INFORMATIVE || 0} Informative</span>
                    </div>
                  </div>
                )}

                {activeTab === 'browse' && (
                  <button
                    style={styles.viewBtn}
                    onClick={() => handleViewArticle(article)}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    👁️ View Full Article
                  </button>
                )}

                {activeTab === 'my-articles' ? (
                  <div style={styles.articleActions}>
                    <button
                      style={{ ...styles.actionBtn, ...styles.editBtn }}
                      onClick={() => handleEdit(article)}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                      onClick={() => handleDelete(article.id)}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                ) : (
                  <div style={styles.feedbackButtons}>
                    <button
                      style={{
                        ...styles.feedbackBtn,
                        ...(userFeedback[article.id] ? styles.disabledBtn : styles.likeBtn)
                      }}
                      onClick={() => !userFeedback[article.id] && handleGiveFeedback(article.id, 'LIKE')}
                      disabled={userFeedback[article.id]}
                      onMouseEnter={(e) => {
                        if (!userFeedback[article.id]) {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!userFeedback[article.id]) {
                          e.currentTarget.style.transform = 'scale(1)';
                        }
                      }}
                    >
                      👍 Like
                    </button>
                    <button
                      style={{
                        ...styles.feedbackBtn,
                        ...(userFeedback[article.id] ? styles.disabledBtn : styles.helpfulBtn)
                      }}
                      onClick={() => !userFeedback[article.id] && handleGiveFeedback(article.id, 'HELPFUL')}
                      disabled={userFeedback[article.id]}
                      onMouseEnter={(e) => {
                        if (!userFeedback[article.id]) {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!userFeedback[article.id]) {
                          e.currentTarget.style.transform = 'scale(1)';
                        }
                      }}
                    >
                      💡 Helpful
                    </button>
                    <button
                      style={{
                        ...styles.feedbackBtn,
                        ...(userFeedback[article.id] ? styles.disabledBtn : styles.informativeBtn)
                      }}
                      onClick={() => !userFeedback[article.id] && handleGiveFeedback(article.id, 'INFORMATIVE')}
                      disabled={userFeedback[article.id]}
                      onMouseEnter={(e) => {
                        if (!userFeedback[article.id]) {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!userFeedback[article.id]) {
                          e.currentTarget.style.transform = 'scale(1)';
                        }
                      }}
                    >
                      ℹ️ Informative
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {selectedArticle && (
        <div style={styles.modal} onClick={closeArticleView}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              style={styles.closeBtn}
              onClick={closeArticleView}
              onMouseEnter={(e) => e.currentTarget.style.background = '#cbd5e1'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#e2e8f0'}
            >
              ×
            </button>
            <div style={styles.categoryBadge}>{selectedArticle.category}</div>
            <h2 style={{ ...styles.formTitle, marginTop: '20px', textAlign: 'left' }}>
              {selectedArticle.title}
            </h2>
            <p style={styles.expertInfo}>By: {selectedArticle.expertEmail}</p>
            <div style={{ ...styles.articleDate, marginBottom: '24px' }}>
              <span>📅</span>
              <span>{formatDate(selectedArticle.createdDate)}</span>
            </div>
            <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#2d3748', whiteSpace: 'pre-wrap' }}>
              {selectedArticle.content}
            </div>
            {feedbackCounts[selectedArticle.id] && (
              <div style={{ ...styles.feedbackStats, marginTop: '30px' }}>
                <div style={styles.feedbackItem}>
                  <span>👍</span>
                  <span>{feedbackCounts[selectedArticle.id].LIKE || 0} Likes</span>
                </div>
                <div style={styles.feedbackItem}>
                  <span>💡</span>
                  <span>{feedbackCounts[selectedArticle.id].HELPFUL || 0} Helpful</span>
                </div>
                <div style={styles.feedbackItem}>
                  <span>ℹ️</span>
                  <span>{feedbackCounts[selectedArticle.id].INFORMATIVE || 0} Informative</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

ExpertArticles.propTypes = {
  expertEmail: PropTypes.string.isRequired,
};

export default ExpertArticles;