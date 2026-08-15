import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { DEFAULT_ROLES } from '../data/permissions';
import {
  CONTACT_PHONE,
  OWNER_NAME,
  SEED_ACTIVITIES,
  SEED_CATEGORIES,
  SEED_CUSTOMER_ACTIVITY,
  SEED_CUSTOMERS,
  createSeedNotifications,
  SEED_ORDERS,
  SEED_PRODUCTS,
} from '../data/seed';
import { loadState, saveState } from '../utils/storage';

const AppDataContext = createContext(null);

function usePersisted(key, seed) {
  const [value, setValueState] = useState(() => loadState(key, seed));
  const setValue = useCallback(
    (next) => {
      setValueState(next);
      saveState(key, next);
    },
    [key],
  );
  return [value, setValue];
}

export function AppDataProvider({ children }) {
  const [customers, setCustomers] = useState(() => {
    const stored = loadState('customers', SEED_CUSTOMERS).map((item) => ({ ...item, phone: CONTACT_PHONE }));
    saveState('customers', stored);
    return stored;
  });
  const persistCustomers = useCallback((next) => {
    setCustomers(next);
    saveState('customers', next);
  }, []);
  const [customerActivity] = usePersisted('customerActivity', SEED_CUSTOMER_ACTIVITY);
  const [products, setProducts] = usePersisted('products', SEED_PRODUCTS);
  const [categories, setCategories] = usePersisted('categories', SEED_CATEGORIES);
  const [orders, setOrders] = usePersisted('orders', SEED_ORDERS);
  const [roles, setRoles] = useState(() => {
    const stored = loadState('roles', DEFAULT_ROLES);
    const obsolete = !Array.isArray(stored) || stored.some((item) => item.slug === 'manager' || item.slug === 'staff');
    const next = obsolete ? DEFAULT_ROLES : stored;
    saveState('roles', next);
    return next;
  });
  const persistRoles = useCallback((next) => {
    setRoles(next);
    saveState('roles', next);
  }, []);
  const [notifications, setNotifications] = useState(() => {
    const stored = loadState('notifications', []);
    const stale =
      stored.length === 0 ||
      !stored.some((item) => item.icon === 'payment' || item.icon === 'award' || item.icon === 'stock');
    const next = stale ? createSeedNotifications() : stored;
    saveState('notifications', next);
    return next;
  });
  const persistNotifications = useCallback((next) => {
    setNotifications(next);
    saveState('notifications', next);
  }, []);
  const [activities] = useState(() => {
    const stored = loadState('activities', SEED_ACTIVITIES).map((item) => ({
      ...item,
      user: item.user === 'Alex Morgan' ? OWNER_NAME : item.user,
    }));
    const extras = SEED_ACTIVITIES.filter((item) => !stored.some((current) => current.id === item.id));
    const next = [...stored, ...extras].map((item) => ({
      ...item,
      user: item.user === 'Alex Morgan' ? OWNER_NAME : item.user,
    }));
    saveState('activities', next);
    return next;
  });

  const value = useMemo(
    () => ({
      customers,
      setCustomers: persistCustomers,
      customerActivity,
      products,
      setProducts,
      categories,
      setCategories,
      orders,
      setOrders,
      roles,
      setRoles: persistRoles,
      notifications,
      setNotifications: persistNotifications,
      activities,
    }),
    [
      activities,
      categories,
      customerActivity,
      customers,
      notifications,
      orders,
      products,
      roles,
      setCategories,
      persistCustomers,
      persistNotifications,
      persistRoles,
      setOrders,
      setProducts,
    ],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) throw new Error('useAppData must be used within AppDataProvider');
  return context;
}
