import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('Mukesh Rawat');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [agree, setAgree] = useState(false);

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
    if (!agree) {
      setError('Please accept the terms to create an account.');
      return;
    }
    const result = register({ name, email, password });
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate('/dashboard');
  };

  return (
    <form className="p-auth" onSubmit={submit}>
      <h1 className="p-auth__title">Create an account</h1>
      <p className="p-auth__lead">New accounts start with viewer access.</p>

      {error && (
        <div className="p-auth__alert is-error" role="alert">
          {error}
        </div>
      )}

      <div className="p-auth__stack">
        <label className="p-auth__field">
          <span>Full name</span>
          <input autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className="p-auth__field">
          <span>Email</span>
          <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="p-auth__field">
          <span>Password</span>
          <input type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label className="p-auth__field">
          <span>Confirm password</span>
          <input type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </label>

        <label className="p-auth__check">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          I agree to the terms and privacy policy
        </label>

        <button type="submit" className="p-auth__submit">
          Create account
        </button>

        <p className="p-auth__switch">
          Already have an account? <RouterLink to="/login">Login</RouterLink>
        </p>
      </div>
    </form>
  );
}
