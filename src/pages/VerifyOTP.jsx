import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      navigate('/forgot-password');
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/verify-otp', { email, otp });
      
      if (response.data.success) {
        navigate('/reset-password', { state: { email, otp } });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '1.5rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Verify OTP</h2>
      <p style={{ textAlign: 'center', marginBottom: '1rem' }}>Check your email for the 6-digit code</p>
      
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            inputMode="numeric"
            pattern="\d{6}"
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `1px solid ${error ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              letterSpacing: '0.5rem',
              textAlign: 'center',
              fontSize: '1.25rem'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading || otp.length !== 6}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: loading || otp.length !== 6 ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;