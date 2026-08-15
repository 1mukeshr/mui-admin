import { useMemo } from 'react';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import WebAssetOutlinedIcon from '@mui/icons-material/WebAssetOutlined';
import { useAppData } from '../contexts/AppDataContext';
import { useAuth } from '../contexts/AuthContext';
import { NAV_GROUPS } from '../layouts/nav';

const QUICK_LINKS = [
  {
    id: 'q-dashboard',
    title: 'Overview',
    subtitle: 'Dashboards',
    to: '/dashboard',
    Icon: DashboardOutlinedIcon,
  },
  {
    id: 'q-orders',
    title: 'Orders',
    subtitle: 'Fulfillment',
    to: '/orders',
    permission: 'orders.view',
    Icon: ReceiptLongOutlinedIcon,
  },
  {
    id: 'q-products',
    title: 'Products',
    subtitle: 'Catalog',
    to: '/products',
    permission: 'products.view',
    Icon: Inventory2OutlinedIcon,
  },
  {
    id: 'q-customers',
    title: 'Customers',
    subtitle: 'CRM',
    to: '/customers',
    permission: 'customers.view',
    Icon: GroupsOutlinedIcon,
  },
  {
    id: 'q-reports',
    title: 'Sales report',
    subtitle: 'Reports',
    to: '/reports/sales',
    permission: 'reports.view',
    Icon: AssessmentOutlinedIcon,
  },
  {
    id: 'q-settings',
    title: 'Settings',
    subtitle: 'Workspace',
    to: '/settings/profile',
    permission: 'settings.view',
    Icon: SettingsOutlinedIcon,
  },
  {
    id: 'q-chat',
    title: 'Chat',
    subtitle: 'Apps',
    to: '/apps/chat',
    Icon: ChatBubbleOutlineIcon,
  },
  {
    id: 'q-customizer',
    title: 'Template customizer',
    subtitle: 'Appearance',
    to: '#customizer',
    Icon: PaletteOutlinedIcon,
  },
];

const GROUP_META = {
  Pages: { Icon: WebAssetOutlinedIcon },
  Users: { Icon: PeopleOutlineIcon },
  Customers: { Icon: GroupsOutlinedIcon },
  Products: { Icon: Inventory2OutlinedIcon },
  Orders: { Icon: ReceiptLongOutlinedIcon },
};

export function useWorkspaceSearch(query) {
  const { users, hasPermission } = useAuth();
  const { customers, products, orders } = useAppData();
  const q = query.trim().toLowerCase();

  return useMemo(() => {
    if (!q) {
      return {
        mode: 'suggest',
        sections: [
          {
            label: 'Suggested',
            items: QUICK_LINKS.filter((item) => !item.permission || hasPermission(item.permission)),
          },
        ],
      };
    }

    const pages = [];
    NAV_GROUPS.forEach((group) => {
      if (group.to && (!group.permission || hasPermission(group.permission))) {
        if (group.label.toLowerCase().includes(q)) {
          pages.push({
            id: `page-${group.id}`,
            title: group.label,
            subtitle: group.to,
            to: group.to,
            group: 'Pages',
            Icon: group.icon || WebAssetOutlinedIcon,
          });
        }
      }
      group.children?.forEach((child) => {
        if (child.permission && !hasPermission(child.permission)) return;
        if (child.label.toLowerCase().includes(q) || child.to.toLowerCase().includes(q)) {
          pages.push({
            id: `page-${child.to}`,
            title: child.label,
            subtitle: group.label,
            to: child.to,
            group: 'Pages',
            Icon: group.icon || WebAssetOutlinedIcon,
          });
        }
      });
    });

    const userHits = hasPermission('users.view')
      ? users
          .filter((user) => [user.name, user.email, user.department].some((value) => String(value || '').toLowerCase().includes(q)))
          .slice(0, 4)
          .map((user) => ({
            id: user.id,
            title: user.name,
            subtitle: user.email,
            to: `/users/${user.id}`,
            group: 'Users',
            Icon: GROUP_META.Users.Icon,
          }))
      : [];

    const customerHits = hasPermission('customers.view')
      ? customers
          .filter((customer) => [customer.name, customer.email, customer.company].some((value) => String(value || '').toLowerCase().includes(q)))
          .slice(0, 4)
          .map((customer) => ({
            id: customer.id,
            title: customer.name,
            subtitle: customer.company,
            to: `/customers/${customer.id}`,
            group: 'Customers',
            Icon: GROUP_META.Customers.Icon,
          }))
      : [];

    const productHits = hasPermission('products.view')
      ? products
          .filter((product) => [product.name, product.sku].some((value) => String(value || '').toLowerCase().includes(q)))
          .slice(0, 4)
          .map((product) => ({
            id: product.id,
            title: product.name,
            subtitle: product.sku,
            to: `/products/${product.id}`,
            group: 'Products',
            Icon: GROUP_META.Products.Icon,
          }))
      : [];

    const orderHits = hasPermission('orders.view')
      ? orders
          .filter((order) => [order.orderNumber, order.customerName].some((value) => String(value || '').toLowerCase().includes(q)))
          .slice(0, 4)
          .map((order) => ({
            id: order.id,
            title: order.orderNumber,
            subtitle: order.customerName,
            to: `/orders/${order.id}`,
            group: 'Orders',
            Icon: GROUP_META.Orders.Icon,
          }))
      : [];

    const sections = [
      { label: 'Pages', items: pages.slice(0, 5) },
      { label: 'Users', items: userHits },
      { label: 'Customers', items: customerHits },
      { label: 'Products', items: productHits },
      { label: 'Orders', items: orderHits },
    ].filter((section) => section.items.length > 0);

    return { mode: 'search', sections };
  }, [customers, hasPermission, orders, products, q, users]);
}

export function flattenSearchSections(sections) {
  return sections.flatMap((section) => section.items);
}
