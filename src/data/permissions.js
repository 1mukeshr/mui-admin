export const ALL_PERMISSIONS = [
  { id: 'p1', module: 'Dashboard', action: 'View', key: 'dashboard.view', description: 'View dashboard and statistics' },
  { id: 'p2', module: 'Users', action: 'View', key: 'users.view', description: 'View user list and details' },
  { id: 'p3', module: 'Users', action: 'Create', key: 'users.create', description: 'Create new users' },
  { id: 'p4', module: 'Users', action: 'Edit', key: 'users.edit', description: 'Edit existing users' },
  { id: 'p5', module: 'Users', action: 'Delete', key: 'users.delete', description: 'Delete users' },
  { id: 'p6', module: 'Customers', action: 'View', key: 'customers.view', description: 'View customers' },
  { id: 'p7', module: 'Customers', action: 'Edit', key: 'customers.edit', description: 'Edit customer records' },
  { id: 'p8', module: 'Products', action: 'View', key: 'products.view', description: 'View products and categories' },
  { id: 'p9', module: 'Products', action: 'Create', key: 'products.create', description: 'Create products' },
  { id: 'p10', module: 'Products', action: 'Edit', key: 'products.edit', description: 'Edit products and stock' },
  { id: 'p11', module: 'Products', action: 'Delete', key: 'products.delete', description: 'Delete products' },
  { id: 'p12', module: 'Orders', action: 'View', key: 'orders.view', description: 'View orders' },
  { id: 'p13', module: 'Orders', action: 'Edit', key: 'orders.edit', description: 'Update order status' },
  { id: 'p14', module: 'Orders', action: 'Export', key: 'orders.export', description: 'Export order data' },
  { id: 'p15', module: 'Access', action: 'View', key: 'roles.view', description: 'View roles and permissions' },
  { id: 'p16', module: 'Access', action: 'Edit', key: 'roles.edit', description: 'Create and edit roles' },
  { id: 'p17', module: 'Reports', action: 'View', key: 'reports.view', description: 'View reports and charts' },
  { id: 'p18', module: 'Reports', action: 'Export', key: 'reports.export', description: 'Export reports as CSV or PDF' },
  { id: 'p19', module: 'Notifications', action: 'View', key: 'notifications.view', description: 'View notifications' },
  { id: 'p20', module: 'Settings', action: 'View', key: 'settings.view', description: 'View settings' },
  { id: 'p21', module: 'Settings', action: 'Edit', key: 'settings.edit', description: 'Update settings' },
];

const allKeys = ALL_PERMISSIONS.map((p) => p.key);

export const ASSIGNABLE_ROLES = ['admin', 'viewer'];

export const DEFAULT_ROLES = [
  {
    id: 'r1',
    name: 'Super Admin',
    slug: 'super_admin',
    description: 'Full access to every module and setting',
    permissions: allKeys,
    userCount: 1,
    createdAt: '2024-01-10',
  },
  {
    id: 'r2',
    name: 'Admin',
    slug: 'admin',
    description: 'Manage users, catalog, orders, and reports',
    permissions: allKeys.filter((k) => k !== 'roles.edit'),
    userCount: 2,
    createdAt: '2024-01-12',
  },
  {
    id: 'r3',
    name: 'Viewer',
    slug: 'viewer',
    description: 'Read-only access to dashboard and reports',
    permissions: ['dashboard.view', 'reports.view', 'notifications.view', 'settings.view'],
    userCount: 3,
    createdAt: '2024-03-01',
  },
];
