import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import WebAssetOutlinedIcon from '@mui/icons-material/WebAssetOutlined';
import LinearScaleOutlinedIcon from '@mui/icons-material/LinearScaleOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import TabOutlinedIcon from '@mui/icons-material/TabOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import WebStoriesOutlinedIcon from '@mui/icons-material/WebStoriesOutlined';

export const NAV_GROUPS = [
  {
    id: 'dashboard',
    label: 'Dashboards',
    icon: DashboardOutlinedIcon,
    permission: 'dashboard.view',
    children: [
      { label: 'Overview', to: '/dashboard', permission: 'dashboard.view' },
      { label: 'Analytics', to: '/dashboard/analytics', permission: 'dashboard.view' },
      { label: 'CRM', to: '/dashboard/crm', permission: 'dashboard.view' },
      { label: 'Ecommerce', to: '/dashboard/ecommerce', permission: 'dashboard.view' },
    ],
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: ReceiptLongOutlinedIcon,
    permission: 'orders.view',
    children: [{ label: 'Orders list', to: '/orders', permission: 'orders.view' }],
  },
  {
    id: 'products',
    label: 'Products',
    icon: Inventory2OutlinedIcon,
    permission: 'products.view',
    children: [
      { label: 'Product list', to: '/products', permission: 'products.view' },
      { label: 'Categories', to: '/products/categories', permission: 'products.view' },
      { label: 'Add product', to: '/products/new', permission: 'products.create' },
    ],
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: GroupsOutlinedIcon,
    permission: 'customers.view',
    children: [
      { label: 'Customer list', to: '/customers', permission: 'customers.view' },
      { label: 'Add customer', to: '/customers/new', permission: 'customers.edit' },
    ],
  },
  {
    id: 'chat',
    label: 'Chat',
    icon: ChatBubbleOutlineIcon,
    to: '/apps/chat',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: NotificationsNoneOutlinedIcon,
    permission: 'notifications.view',
    to: '/notifications',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: AssessmentOutlinedIcon,
    permission: 'reports.view',
    children: [
      { label: 'Sales report', to: '/reports/sales', permission: 'reports.view' },
      { label: 'Revenue report', to: '/reports/revenue', permission: 'reports.view' },
      { label: 'Order report', to: '/reports/orders', permission: 'reports.view' },
      { label: 'Product report', to: '/reports/products', permission: 'reports.view' },
      { label: 'User report', to: '/reports/users', permission: 'reports.view' },
    ],
  },
  {
    id: 'users',
    label: 'Users',
    icon: PeopleOutlineIcon,
    permission: 'users.view',
    children: [
      { label: 'Users list', to: '/users', permission: 'users.view' },
      { label: 'Add user', to: '/users/new', permission: 'users.create' },
    ],
  },
  {
    id: 'access',
    label: 'Access Control',
    icon: AdminPanelSettingsOutlinedIcon,
    permission: 'roles.view',
    children: [
      { label: 'Roles', to: '/access/roles', permission: 'roles.view' },
      { label: 'Permission matrix', to: '/access/permissions', permission: 'roles.view' },
      { label: 'Create role', to: '/access/roles/new', permission: 'roles.edit' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: SettingsOutlinedIcon,
    permission: 'settings.view',
    children: [
      { label: 'Profile', to: '/settings/profile', permission: 'settings.view' },
      { label: 'Security', to: '/settings/security', permission: 'settings.view' },
      { label: 'Notifications', to: '/settings/notifications', permission: 'settings.view' },
      { label: 'Appearance', to: '/settings/appearance', permission: 'settings.view' },
      { label: 'General', to: '/settings/general', permission: 'settings.view' },
    ],
  },
  {
    id: 'front',
    label: 'Front Pages',
    icon: LanguageOutlinedIcon,
    children: [
      { label: 'Landing', to: '/' },
      { label: 'Pricing', to: '/front/pricing' },
      { label: 'Payment', to: '/front/payment' },
      { label: 'Checkout', to: '/front/checkout' },
      { label: 'Help Center', to: '/front/help' },
    ],
  },
  {
    id: 'form-elements',
    label: 'Form Elements',
    icon: ToggleOnOutlinedIcon,
    children: [
      { label: 'Text fields', to: '/forms/elements/text' },
      { label: 'Selects', to: '/forms/elements/select' },
      { label: 'Checkboxes & radios', to: '/forms/elements/controls' },
      { label: 'Pickers & upload', to: '/forms/elements/pickers' },
    ],
  },
  {
    id: 'form-layouts',
    label: 'Form Layouts',
    icon: WebAssetOutlinedIcon,
    children: [
      { label: 'Vertical', to: '/forms/layouts/vertical' },
      { label: 'Horizontal', to: '/forms/layouts/horizontal' },
      { label: 'Columns', to: '/forms/layouts/columns' },
      { label: 'Sticky', to: '/forms/layouts/sticky' },
    ],
  },
  {
    id: 'form-wizard',
    label: 'Form Wizard',
    icon: LinearScaleOutlinedIcon,
    children: [
      { label: 'Numbered', to: '/forms/wizard/numbered' },
      { label: 'Vertical', to: '/forms/wizard/vertical' },
    ],
  },
  {
    id: 'form-validation',
    label: 'Form Validation',
    icon: FactCheckOutlinedIcon,
    to: '/forms/validation',
  },
  {
    id: 'tables',
    label: 'Tables',
    icon: TableChartOutlinedIcon,
    to: '/tables/basic',
  },
  {
    id: 'datatables',
    label: 'Datatables',
    icon: GridOnOutlinedIcon,
    children: [
      { label: 'Basic grid', to: '/tables/data/basic' },
      { label: 'Advanced grid', to: '/tables/data/advanced' },
    ],
  },
  {
    id: 'tabs',
    label: 'Tabs',
    icon: TabOutlinedIcon,
    children: [
      { label: 'Basic', to: '/pages/tabs/basic' },
      { label: 'Icons', to: '/pages/tabs/icons' },
      { label: 'Pills', to: '/pages/tabs/pills' },
      { label: 'Scrollable', to: '/pages/tabs/scrollable' },
      { label: 'Vertical', to: '/pages/tabs/vertical' },
    ],
  },
  {
    id: 'faq',
    label: 'FAQ',
    icon: QuizOutlinedIcon,
    children: [
      { label: 'Accordion', to: '/pages/faq/accordion' },
      { label: 'Categories', to: '/pages/faq/categories' },
      { label: 'Search', to: '/pages/faq/search' },
    ],
  },
  {
    id: 'icons',
    label: 'Icons',
    icon: InterestsOutlinedIcon,
    children: [
      { label: 'Gallery', to: '/pages/icons/gallery' },
      { label: 'Colored', to: '/pages/icons/colored' },
      { label: 'Sizes', to: '/pages/icons/sizes' },
      { label: 'Buttons', to: '/pages/icons/buttons' },
    ],
  },
  {
    id: 'popups',
    label: 'Popups',
    icon: WebStoriesOutlinedIcon,
    to: '/pages/popups',
  },
  {
    id: 'system',
    label: 'System',
    icon: ErrorOutlineIcon,
    children: [
      { label: '403 page', to: '/system/403' },
      { label: '404 page', to: '/system/404' },
      { label: '500 page', to: '/system/500' },
      { label: 'Empty state', to: '/system/empty' },
      { label: 'Error state', to: '/system/error' },
      { label: 'Loading state', to: '/system/loading' },
    ],
  },
];

export function visibleNavGroups(hasPermission) {
  return NAV_GROUPS.map((group) => {
    const children = (group.children ?? []).filter((child) => !child.permission || hasPermission(child.permission));
    const groupAllowed = !group.permission || hasPermission(group.permission) || children.length > 0;
    if (!groupAllowed) return null;
    return { ...group, children };
  }).filter(Boolean);
}

export function isNavSelected(pathname, to, siblingTos = []) {
  if (pathname === to) return true;
  if (!pathname.startsWith(`${to}/`)) return false;
  return !siblingTos.some((sibling) => sibling !== to && sibling.length > to.length && (pathname === sibling || pathname.startsWith(`${sibling}/`)));
}
