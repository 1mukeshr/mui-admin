import { useState } from 'react';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function ResetPassword() {
  const { resetPassword } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get('token') ?? '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    const result = resetPassword(token, password);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate('/login');
  };

  return (
    <form className="p-auth" onSubmit={submit}>
      <h1 className="p-auth__title">Reset password</h1>
      <p className="p-auth__lead">Choose a new password for this account.</p>

      {!token && (
        <div className="p-auth__alert is-warn" role="status">
          Missing reset token. Request a new link from forgot password.
        </div>
      )}
      {error && (
        <div className="p-auth__alert is-error" role="alert">
          {error}
        </div>
      )}

      <div className="p-auth__stack">
        <label className="p-auth__field">
          <span>New password</span>
          <input type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label className="p-auth__field">
          <span>Confirm password</span>
          <input type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </label>
        <button type="submit" className="p-auth__submit" disabled={!token}>
          Update password
        </button>
        <p className="p-auth__switch">
          <RouterLink to="/login">Back to login</RouterLink>
        </p>
      </div>
    </form>
  );
}
