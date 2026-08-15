import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { DEFAULT_ROLES } from '../data/permissions';
import { CONTACT_PHONE, OWNER_NAME, SEED_USERS } from '../data/seed';
import { loadState, removeState, saveState } from '../utils/storage';
import { uid } from '../utils/format';

const AuthContext = createContext(null);
const OBSOLETE_ROLES = new Set(['manager', 'staff']);
const REMOVED_DEMO_EMAILS = new Set([
  'manager@demo.com',
  'staff@demo.com',
  'riley@demo.com',
  'casey@demo.com',
]);

function normalizeRole(role) {
  return OBSOLETE_ROLES.has(role) ? 'viewer' : role;
}

function toAuthUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: normalizeRole(user.role),
    avatar: user.avatar,
    phone: user.phone,
    department: user.department,
  };
}

function loadUsers() {
  const stored = loadState('users', SEED_USERS)
    .filter((item) => !REMOVED_DEMO_EMAILS.has(String(item.email || '').toLowerCase()))
    .map((item) => ({
      ...item,
      role: normalizeRole(item.role),
      phone: CONTACT_PHONE,
      name: item.id === 'u1' || item.email === 'admin@demo.com' || item.name === 'Alex Morgan' ? OWNER_NAME : item.name,
    }));

  const merged = [...stored];
  SEED_USERS.forEach((seed) => {
    const index = merged.findIndex((item) => item.email.toLowerCase() === seed.email.toLowerCase());
    if (index === -1) merged.push(seed);
    else {
      merged[index] = {
        ...merged[index],
        ...seed,
        name: seed.id === 'u1' ? OWNER_NAME : seed.name,
        phone: CONTACT_PHONE,
      };
    }
  });

  saveState('users', merged);
  return merged;
}

function loadSession() {
  const session = loadState('session', null);
  if (!session) return null;
  if (REMOVED_DEMO_EMAILS.has(String(session.email || '').toLowerCase())) {
    removeState('session');
    return null;
  }
  const next = {
    ...session,
    role: normalizeRole(session.role),
    phone: CONTACT_PHONE,
    name: session.id === 'u1' || session.email === 'admin@demo.com' || session.name === 'Alex Morgan' ? OWNER_NAME : session.name,
  };
  saveState('session', next);
  return next;
}

export function AuthProvider({ children }) {
  const [users, setUsersState] = useState(loadUsers);
  const [user, setUser] = useState(loadSession);
  const [resetTokens, setResetTokens] = useState(() => loadState('resetTokens', {}));

  const persistUsers = useCallback((next) => {
    setUsersState(next);
    saveState('users', next);
  }, []);

  const login = useCallback(
    (email, password) => {
      const found = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
      if (!found || found.password !== password) {
        return { ok: false, message: 'Invalid email or password.' };
      }
      if (found.status === 'inactive') {
        return { ok: false, message: 'This account is inactive. Contact an administrator.' };
      }
      if (found.status === 'pending') {
        return { ok: false, message: 'This account is pending approval.' };
      }
      const next = users.map((item) =>
        item.id === found.id ? { ...item, lastLogin: new Date().toISOString() } : item,
      );
      persistUsers(next);
      const session = toAuthUser(found);
      setUser(session);
      saveState('session', session);
      return { ok: true, message: 'Signed in.' };
    },
    [persistUsers, users],
  );

  const register = useCallback(
    (payload) => {
      if (users.some((item) => item.email.toLowerCase() === payload.email.toLowerCase())) {
        return { ok: false, message: 'An account with this email already exists.' };
      }
      const created = {
        id: uid('u'),
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: 'viewer',
        status: 'active',
        phone: CONTACT_PHONE,
        department: 'General',
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString().slice(0, 10),
      };
      persistUsers([created, ...users]);
      const session = toAuthUser(created);
      setUser(session);
      saveState('session', session);
      return { ok: true, message: 'Account created.' };
    },
    [persistUsers, users],
  );

  const logout = useCallback(() => {
    setUser(null);
    removeState('session');
  }, []);

  const requestReset = useCallback(
    (email) => {
      const found = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
      if (!found) {
        return { ok: false, message: 'No account found for that email.' };
      }
      const token = uid('rst');
      const next = { ...resetTokens, [token]: found.id };
      setResetTokens(next);
      saveState('resetTokens', next);
      return { ok: true, message: 'Reset link generated for this demo.', token };
    },
    [resetTokens, users],
  );

  const resetPassword = useCallback(
    (token, password) => {
      const userId = resetTokens[token];
      if (!userId) {
        return { ok: false, message: 'This reset link is invalid or expired.' };
      }
      persistUsers(users.map((item) => (item.id === userId ? { ...item, password } : item)));
      const next = { ...resetTokens };
      delete next[token];
      setResetTokens(next);
      saveState('resetTokens', next);
      return { ok: true, message: 'Password updated. You can sign in now.' };
    },
    [persistUsers, resetTokens, users],
  );

  const hasPermission = useCallback(
    (key) => {
      if (!user) return false;
      if (user.role === 'super_admin') return true;
      const stored = loadState('roles', DEFAULT_ROLES);
      const catalog = Array.isArray(stored) && stored.length ? stored : DEFAULT_ROLES;
      const current =
        catalog.find((item) => item.slug === user.role) ?? DEFAULT_ROLES.find((item) => item.slug === user.role);
      return current?.permissions?.includes(key) ?? false;
    },
    [user],
  );

  const updateProfile = useCallback(
    (patch) => {
      if (!user) return;
      const nextUser = { ...user, ...patch };
      setUser(nextUser);
      saveState('session', nextUser);
      persistUsers(
        users.map((item) =>
          item.id === user.id
            ? { ...item, name: nextUser.name, email: nextUser.email, phone: nextUser.phone, department: nextUser.department }
            : item,
        ),
      );
    },
    [persistUsers, user, users],
  );

  const value = useMemo(
    () => ({
      user,
      users,
      setUsers: persistUsers,
      login,
      register,
      logout,
      requestReset,
      resetPassword,
      hasPermission,
      updateProfile,
    }),
    [hasPermission, login, logout, persistUsers, register, requestReset, resetPassword, updateProfile, user, users],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
