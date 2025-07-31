import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Check password strength
  useEffect(() => {
    if (!newPassword) {
      setPasswordStrength('');
      return;
    }

    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumbers = /\d/.test(newPassword);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    const isLongEnough = newPassword.length >= 8;

    const strength = [
      isLongEnough,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChars
    ].filter(Boolean).length;

    setPasswordStrength(
      strength < 3 ? 'Weak' :
      strength === 3 ? 'Moderate' : 'Strong'
    );
  }, [newPassword]);

  // Get email and OTP from navigation state
  useEffect(() => {
    if (!location.state?.email || !location.state?.otp) {
      navigate('/forgot-password');
    } else {
      setEmail(location.state.email);
      setOtp(location.state.otp);
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Frontend validation
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6 || newPassword.length > 20) {
      setError("Password must be 6-20 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/reset-password',
        { email, otp, newPassword }
      );

      if (response.data.success) {
        setSuccess('Password reset successfully! Check your email for confirmation.');
        setTimeout(() => navigate('/login', {
          state: { 
            successMessage: 'Password reset successful. Please login with your new password.' 
          }
        }), 3000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Password reset failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Password strength color
  const getStrengthColor = () => {
    return passwordStrength === 'Weak' ? '#ff4444' :
           passwordStrength === 'Moderate' ? '#ffbb33' : '#00C851';
  };

  return (
    <div style={{
      maxWidth: '450px',
      margin: '2rem auto',
      padding: '2rem',
      border: '1px solid #e0e0e0',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '1.5rem',
        color: '#333',
        fontSize: '1.8rem'
      }}>
        Reset Your Password
      </h2>

      {error && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#d32f2f',
          padding: '0.75rem',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          borderLeft: '4px solid #d32f2f'
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          backgroundColor: '#e8f5e9',
          color: '#2e7d32',
          padding: '0.75rem',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          borderLeft: '4px solid #2e7d32'
        }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#555'
          }}>
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength="6"
            maxLength="20"
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `1px solid ${error ? '#d32f2f' : '#ddd'}`,
              borderRadius: '4px',
              fontSize: '1rem',
              transition: 'border 0.3s'
            }}
          />
          {newPassword && (
            <div style={{
              marginTop: '0.5rem',
              fontSize: '0.875rem',
              color: getStrengthColor(),
              fontWeight: '500'
            }}>
              Strength: {passwordStrength}
              {passwordStrength === 'Weak' && ' (Add uppercase, numbers, or symbols)'}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#555'
          }}>
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength="6"
            maxLength="20"
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `1px solid ${error ? '#d32f2f' : '#ddd'}`,
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !newPassword || !confirmPassword}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: loading ? '#bdbdbd' : '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          {loading ? (
            <>
              <span className="spinner" style={{
                display: 'inline-block',
                width: '1rem',
                height: '1rem',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '50%',
                borderTopColor: '#fff',
                animation: 'spin 1s ease-in-out infinite'
              }} />
              Resetting Password...
            </>
          ) : (
            'Reset Password'
          )}
        </button>
      </form>

      <p style={{
        textAlign: 'center',
        marginTop: '1.5rem',
        color: '#666'
      }}>
        Remember your password?{' '}
        <a 
          href="/login" 
          style={{
            color: '#4285f4',
            textDecoration: 'none',
            fontWeight: '500'
          }}
        >
          Log in
        </a>
      </p>
    </div>
  );
};

export default ResetPassword;