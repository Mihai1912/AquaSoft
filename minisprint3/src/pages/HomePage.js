import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Bine ai venit!</h1>
        <button onClick={() => navigate('/login')} style={{ ...styles.button, backgroundColor: '#4a90e2' }}>
          Login
        </button>
        <button onClick={() => navigate('/register')} style={{ ...styles.button, backgroundColor: '#50e3c2' }}>
          Register
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to bottom right, #f0f4f8, #d9e2ec)',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px 30px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '300px',
  },
  title: {
    fontSize: '28px',
    marginBottom: '30px',
    color: '#333',
  },
  button: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default HomePage;
