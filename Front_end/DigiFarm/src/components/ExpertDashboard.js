import React from 'react';
import { useNavigate } from 'react-router-dom';
import qna from './Images/website-faq-section-user-helpdesk-customer-support-frequently-asked-questions-problem-solution-quiz-/19197954.jpg'
import diseasae from './Images/flat-design-green-leaves/6042067.jpg'
import article from './Images/hand-drawn-essay-illustration/8767132.jpg'



function ExpertDashboard() {
  const navigate = useNavigate();

  const dashboardCards = [
    {
      id: 1,
      title: 'Answer Questions',
      description: 'Respond to farmers queries and provide expert agricultural guidance',
      image: qna, // Add your image path here
      bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      route: '/expert/answer-questions'
    },
    {
      id: 3,
      title: 'Write Articles',
      description: 'Create and publish informative articles to educate farmers',
      image: article, // Add your image path here
      bgColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      route: '/expert/write-articles'
    }
  ];

  const styles = {
    container: {
      minHeight: 'calc(100vh - 70px)',
      background: '#f8fafc',
      padding: '60px 20px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '60px',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: '#1e293b',
      marginBottom: '12px',
      letterSpacing: '-0.5px',
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#64748b',
      fontWeight: '400',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '50px',
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '0 40px',
    },
    card: {
      background: 'white',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      cursor: 'pointer',
      border: '1px solid #e2e8f0',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    imageContainer: {
      width: '100%',
      height: '280px',
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0,
    },
    imagePlaceholder: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '4rem',
      color: 'white',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%)',
    },
    cardContent: {
      padding: '35px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    cardTitle: {
      fontSize: '1.75rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '16px',
      lineHeight: '1.3',
    },
    cardDescription: {
      fontSize: '1.05rem',
      color: '#64748b',
      lineHeight: '1.8',
      marginBottom: '32px',
      flex: 1,
    },
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      padding: '15px 32px',
      background: '#1e293b',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1.05rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      alignSelf: 'flex-start',
    },
    statsContainer: {
      maxWidth: '1400px',
      margin: '80px auto 0',
      padding: '0 20px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px',
    },
    statCard: {
      background: 'white',
      padding: '32px',
      borderRadius: '20px',
      textAlign: 'center',
      border: '1px solid #e2e8f0',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    statNumber: {
      fontSize: '3rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '8px',
    },
    statLabel: {
      fontSize: '0.95rem',
      color: '#64748b',
      fontWeight: '500',
    },
  };

  const iconMap = {
    1: '💬',
    2: '🔬',
    3: '✍️',
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Expert Dashboard</h1>
        <p style={styles.subtitle}>Manage your expert activities and help the farming community</p>
      </div>

      <div style={styles.grid}>
        {dashboardCards.map((card) => (
          <div
            key={card.id}
            style={styles.card}
            onClick={() => navigate(card.route)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={styles.imageContainer}>
              <div style={{
                ...styles.imagePlaceholder,
                background: card.bgColor,
              }}>
                {card.image ? (
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  iconMap[card.id]
                )}
              </div>
              <div style={styles.overlay}></div>
            </div>
            
            <div style={styles.cardContent}>
              <h2 style={styles.cardTitle}>{card.title}</h2>
              <p style={styles.cardDescription}>{card.description}</p>
              <button
                style={styles.button}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#334155';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1e293b';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                Get Started
                <span style={{ fontSize: '1.2rem' }}>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

   

      <style>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            padding: 0 20px !important;
            gap: 35px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ExpertDashboard;
