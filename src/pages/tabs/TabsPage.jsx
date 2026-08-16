import {
  Box,
  Card,
  CardContent,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { BRAND_FULL } from '../../data/brand';
import { CONTACT_PHONE } from '../../data/seed';
import { formatCurrency } from '../../utils/format';

const TYPES = [
  { id: 'basic', label: 'Basic' },
  { id: 'icons', label: 'Icons' },
  { id: 'vertical', label: 'Vertical' },
  { id: 'scrollable', label: 'Scrollable' },
  { id: 'pills', label: 'Pills' },
];

const BASIC_TABS = ['Overview', 'Orders', 'Customers', 'Settings'];
const ICON_TABS = [
  { label: 'Overview', icon: <DashboardOutlinedIcon /> },
  { label: 'Catalog', icon: <Inventory2OutlinedIcon /> },
  { label: 'Customers', icon: <PeopleOutlineIcon /> },
  { label: 'Orders', icon: <ReceiptLongOutlinedIcon /> },
  { label: 'Settings', icon: <SettingsOutlinedIcon /> },
];
const VERTICAL_TABS = ['Profile', 'Security', 'Billing', 'Notifications'];
const SCROLL_TABS = [
  'Overview',
  'Sales',
  'Catalog',
  'Customers',
  'Orders',
  'Roles',
  'Reports',
  'Notifications',
  'Appearance',
  'General',
];
const PILL_TABS = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

const PANELS = {
  Overview: {
    title: 'Workspace overview',
    body: `${BRAND_FULL} tracks users, catalog, and orders in this browser. Support line is ${CONTACT_PHONE}.`,
  },
  Orders: {
    title: 'Recent orders',
    body: `Paid totals and average order value are shown in ${formatCurrency(24890)}. Open Orders for the full list.`,
  },
  Customers: {
    title: 'Customer records',
    body: `Every customer uses phone ${CONTACT_PHONE}. Open Customers to add or edit a record.`,
  },
  Settings: {
    title: 'Console settings',
    body: 'Use Settings for profile and security, or open Template Customizer from the header for theme and layout.',
  },
  Catalog: {
    title: 'Product catalog',
    body: `Prices are stored in Indian Rupees. Example list price ${formatCurrency(1499)}.`,
  },
  Profile: {
    title: 'Profile',
    body: 'Update name, email, and the shared workspace phone from Settings → Profile.',
  },
  Security: {
    title: 'Security',
    body: 'Change the demo password from Settings → Security. Super admin keeps all permissions.',
  },
  Billing: {
    title: 'Billing',
    body: `Invoices and order totals stay in ₹. A sample refund amount is ${formatCurrency(890)}.`,
  },
  Notifications: {
    title: 'Notifications',
    body: 'Bell alerts and the Notifications page share the same local inbox.',
  },
  Sales: {
    title: 'Sales',
    body: `Ecommerce and Analytics dashboards chart paid revenue in ₹, such as ${formatCurrency(186400)}.`,
  },
  Roles: {
    title: 'Roles',
    body: 'Access → Roles controls who can view users, catalog, orders, and reports.',
  },
  Reports: {
    title: 'Reports',
    body: 'Sales, customers, and inventory reports export as PDF with ₹ amounts.',
  },
  Appearance: {
    title: 'Appearance',
    body: 'Primary color, skin, and menu layout live in Template Customizer.',
  },
  General: {
    title: 'General',
    body: 'Workspace name and date format are stored under Settings → General.',
  },
  Daily: {
    title: 'Daily snapshot',
    body: `Today’s paid volume is ${formatCurrency(18640)} across 12 orders.`,
  },
  Weekly: {
    title: 'Weekly snapshot',
    body: `This week’s paid volume is ${formatCurrency(97250)} across 61 orders.`,
  },
  Monthly: {
    title: 'Monthly snapshot',
    body: `This month’s paid volume is ${formatCurrency(412800)} across 248 orders.`,
  },
  Yearly: {
    title: 'Yearly snapshot',
    body: `Year-to-date paid volume is ${formatCurrency(2864500)} across 1,842 orders.`,
  },
};

function Panel({ name }) {
  const panel = PANELS[name] ?? { title: name, body: 'No details for this tab.' };
  return (
    <Box sx={{ pt: 2 }}>
      <Typography variant="subtitle1" fontWeight={700}>
        {panel.title}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 0.75 }}>
        {panel.body}
      </Typography>
    </Box>
  );
}

export function TabsPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const tab = Math.max(0, TYPES.findIndex((item) => item.id === type));
  const [basic, setBasic] = useState(0);
  const [icons, setIcons] = useState(0);
  const [vertical, setVertical] = useState(0);
  const [scroll, setScroll] = useState(0);
  const [pills, setPills] = useState(0);

  return (
    <>
      <PageHeader
        title="Tabs"
        crumbs={[{ label: 'Pages' }, { label: 'Tabs' }, { label: TYPES[tab].label }]}
      />
      <Card>
        <Tabs value={tab} onChange={(_, value) => navigate(`/pages/tabs/${TYPES[value].id}`)} variant="scrollable" scrollButtons="auto">
          {TYPES.map((item) => (
            <Tab key={item.id} label={item.label} />
          ))}
        </Tabs>
        <CardContent>
          {tab === 0 && (
            <>
              <Tabs value={basic} onChange={(_, value) => setBasic(value)}>
                {BASIC_TABS.map((label) => (
                  <Tab key={label} label={label} />
                ))}
              </Tabs>
              <Panel name={BASIC_TABS[basic]} />
            </>
          )}

          {tab === 1 && (
            <>
              <Tabs value={icons} onChange={(_, value) => setIcons(value)} variant="scrollable">
                {ICON_TABS.map((item) => (
                  <Tab key={item.label} icon={item.icon} iconPosition="start" label={item.label} />
                ))}
              </Tabs>
              <Panel name={ICON_TABS[icons].label} />
            </>
          )}

          {tab === 2 && (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Tabs
                orientation="vertical"
                value={vertical}
                onChange={(_, value) => setVertical(value)}
                sx={{ borderRight: 1, borderColor: 'divider', minWidth: 160 }}
              >
                {VERTICAL_TABS.map((label) => (
                  <Tab key={label} label={label} sx={{ alignItems: 'flex-start' }} />
                ))}
              </Tabs>
              <Box sx={{ flex: 1 }}>
                <Panel name={VERTICAL_TABS[vertical]} />
              </Box>
            </Stack>
          )}

          {tab === 3 && (
            <>
              <Tabs value={scroll} onChange={(_, value) => setScroll(value)} variant="scrollable" scrollButtons="auto">
                {SCROLL_TABS.map((label) => (
                  <Tab key={label} label={label} />
                ))}
              </Tabs>
              <Panel name={SCROLL_TABS[scroll]} />
            </>
          )}

          {tab === 4 && (
            <>
              <Tabs
                value={pills}
                onChange={(_, value) => setPills(value)}
                sx={{
                  minHeight: 40,
                  '& .MuiTabs-indicator': { display: 'none' },
                  '& .MuiTab-root': {
                    minHeight: 36,
                    borderRadius: '6px',
                    textTransform: 'none',
                    fontWeight: 600,
                    mr: 0.5,
                  },
                  '& .Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                  },
                }}
              >
                {PILL_TABS.map((label) => (
                  <Tab key={label} label={label} />
                ))}
              </Tabs>
              <Panel name={PILL_TABS[pills]} />
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
