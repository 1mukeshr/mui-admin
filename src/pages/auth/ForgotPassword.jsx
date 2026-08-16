import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { OWNER_EMAIL } from '../../data/seed';

export function ForgotPassword() {
  const { requestReset } = useAuth();
  const [email, setEmail] = useState(OWNER_EMAIL);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  const submit = (event) => {
    event.preventDefault();
    const result = requestReset(email);
    if (!result.ok) {
      setError(result.message);
      setToken('');
      return;
    }
    setError('');
    setToken(result.token ?? '');
  };

  return (
    <form className="p-auth" onSubmit={submit}>
      <h1 className="p-auth__title">Forgot password</h1>
      <p className="p-auth__lead">Enter the account email to generate a reset link.</p>

      {error && (
        <div className="p-auth__alert is-error" role="alert">
          {error}
        </div>
      )}
      {token && (
        <div className="p-auth__alert is-success" role="status">
          Reset link created for this demo.{' '}
          <RouterLink to={`/reset-password?token=${token}`}>Continue to reset password</RouterLink>
        </div>
      )}

      <div className="p-auth__stack">
        <label className="p-auth__field">
          <span>Account email</span>
          <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <button type="submit" className="p-auth__submit">
          Send reset link
        </button>
        <p className="p-auth__switch">
          <RouterLink to="/login">Back to login</RouterLink>
        </p>
      </div>
    </form>
  );
}
