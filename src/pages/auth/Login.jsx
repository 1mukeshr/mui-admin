import { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { OWNER_EMAIL } from '../../data/seed';

const DEMOS = [
  { label: 'Super Admin', email: OWNER_EMAIL, password: 'Admin@123' },
  { label: 'Admin', email: 'priya@demo.com', password: 'Admin@123' },
  { label: 'Viewer', email: 'viewer@demo.com', password: 'Viewer@123' },
];

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from ?? '/dashboard';
  const [email, setEmail] = useState(OWNER_EMAIL);
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(true);

  const submit = (event) => {
    event.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate(from, { replace: true });
  };

  return (
    <form className="p-auth" onSubmit={submit}>
      <h1 className="p-auth__title">Welcome back</h1>
      <p className="p-auth__lead">Login to continue to the console.</p>

      {error && (
        <div className="p-auth__alert is-error" role="alert">
          {error}
        </div>
      )}

      <div className="p-auth__stack">
        <label className="p-auth__field">
          <span>Email</span>
          <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label className="p-auth__field">
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <div className="p-auth__row">
          <label className="p-auth__check">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            Remember me
          </label>
          <RouterLink to="/forgot-password">Forgot password</RouterLink>
        </div>

        <button type="submit" className="p-auth__submit">
          Login
        </button>

        <p className="p-auth__switch">
          New here? <RouterLink to="/register">Create account</RouterLink>
        </p>

        <div className="p-auth__demos">
          <p>Quick demo accounts</p>
          <div>
            {DEMOS.map((demo) => (
              <button
                key={demo.email}
                type="button"
                className={email === demo.email ? 'is-active' : undefined}
                onClick={() => {
                  setEmail(demo.email);
                  setPassword(demo.password);
                  setError('');
                }}
              >
                {demo.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
