import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { SearchField } from '../../components/common/SearchField';
import { CONTACT_PHONE, OWNER_NAME } from '../../data/seed';

const TYPES = [
  { id: 'accordion', label: 'Accordion' },
  { id: 'categories', label: 'Categories' },
  { id: 'search', label: 'Search' },
];

const FAQS = [
  {
    category: 'Account',
    q: 'How do I sign in to the console?',
    a: 'Use a demo account such as admin@demo.com with password Admin@123, or create a viewer account from Register.',
  },
  {
    category: 'Account',
    q: 'Can I reset my password?',
    a: 'Yes. Open Forgot password, enter the account email, then follow the demo reset link generated in this browser.',
  },
  {
    category: 'Billing',
    q: 'What currency does the workspace use?',
    a: 'All amounts are shown in Indian Rupees (₹). USD and other currencies have been removed.',
  },
  {
    category: 'Billing',
    q: 'Where do I see order totals?',
    a: 'Open Orders or the Ecommerce dashboard. Paid totals and average order value use ₹ formatting.',
  },
  {
    category: 'Support',
    q: 'How can I contact the workspace owner?',
    a: `Contact ${OWNER_NAME} on ${CONTACT_PHONE}. The same number is saved on every user and customer record.`,
  },
  {
    category: 'Support',
    q: 'How do I change theme colors?',
    a: 'Open Template Customizer from the header tune icon. You can change primary color, light/dark theme, skin, and layout.',
  },
  {
    category: 'Catalog',
    q: 'How do I add a product?',
    a: 'Go to Products → Add product. You can set price in ₹, stock, category, and an image.',
  },
  {
    category: 'Catalog',
    q: 'Can I hide table columns?',
    a: 'Yes. On list pages and Datatables, use the Columns button to show or hide fields. Preferences are saved in this browser.',
  },
];

const CATEGORIES = ['Account', 'Billing', 'Support', 'Catalog'];

const accordionSx = {
  border: 1,
  borderColor: 'divider',
  borderRadius: '8px !important',
  '&:before': { display: 'none' },
};

export function FaqPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const tab = Math.max(0, TYPES.findIndex((item) => item.id === type));
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((item) => !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <PageHeader
        title="FAQ"
        crumbs={[{ label: 'Pages' }, { label: 'FAQ' }, { label: TYPES[tab].label }]}
      />
      <Card>
        <Tabs value={tab} onChange={(_, value) => navigate(`/pages/faq/${TYPES[value].id}`)} variant="scrollable" scrollButtons="auto" aria-label="FAQ layouts">
          {TYPES.map((item) => (
            <Tab key={item.id} label={item.label} />
          ))}
        </Tabs>
        <CardContent>
          {tab === 0 && (
            <Stack spacing={1}>
              {FAQS.map((item) => (
                <Accordion key={item.q} disableGutters sx={accordionSx}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography component="h2" fontWeight={700}>{item.q}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="text.secondary">{item.a}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          )}

          {tab === 1 && (
            <>
              <Tabs value={category} onChange={(_, value) => setCategory(value)} variant="scrollable" sx={{ mb: 2 }} aria-label="FAQ categories">
                {CATEGORIES.map((label) => (
                  <Tab key={label} label={label} />
                ))}
              </Tabs>
              <Stack spacing={1}>
                {FAQS.filter((item) => item.category === CATEGORIES[category]).map((item) => (
                  <Accordion key={item.q} defaultExpanded disableGutters sx={accordionSx}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography component="h2" fontWeight={700}>{item.q}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography color="text.secondary">{item.a}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </>
          )}

          {tab === 2 && (
            <Stack spacing={2}>
              <SearchField
                label="Search questions"
                placeholder="Search questions"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Grid container spacing={2}>
                {filtered.map((item) => (
                  <Grid item xs={12} md={6} key={item.q}>
                    <Box component="article" sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: '8px', height: '100%' }}>
                      <Typography variant="caption" color="primary" fontWeight={700}>
                        {item.category}
                      </Typography>
                      <Typography variant="subtitle1" component="h2" sx={{ mt: 0.5, mb: 1 }}>
                        {item.q}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.a}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              {filtered.length === 0 && (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Typography color="text.secondary">No matching questions.</Typography>
                </Box>
              )}
            </Stack>
          )}
        </CardContent>
      </Card>
    </>
  );
}
