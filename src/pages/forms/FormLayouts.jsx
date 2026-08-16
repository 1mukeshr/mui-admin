import { Button, Card, CardContent, Grid, Stack, Tab, Tabs, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { CONTACT_PHONE, OWNER_EMAIL, OWNER_NAME } from '../../data/seed';

const TABS = [
  { id: 'vertical', label: 'Vertical' },
  { id: 'horizontal', label: 'Horizontal' },
  { id: 'columns', label: 'Columns' },
  { id: 'sticky', label: 'Sticky' },
];

export function FormLayouts() {
  const { type } = useParams();
  const navigate = useNavigate();
  const tab = Math.max(0, TABS.findIndex((item) => item.id === type));
  const [form, setForm] = useState({
    name: OWNER_NAME,
    email: OWNER_EMAIL,
    phone: CONTACT_PHONE,
    company: 'Tejas MUI',
    city: 'Jaipur',
    country: 'India',
    bio: 'Operations workspace for users, catalog, and orders.',
  });

  const fields = (
    <>
      <TextField label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth />
      <TextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth />
      <TextField label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} fullWidth />
      <TextField label="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} fullWidth />
    </>
  );

  return (
    <>
      <PageHeader
        title="Form Layouts"
        crumbs={[{ label: 'Forms & Tables' }, { label: 'Form Layouts' }, { label: TABS[tab].label }]}
      />
      <Card>
        <Tabs value={tab} onChange={(_, value) => navigate(`/forms/layouts/${TABS[value].id}`)} variant="scrollable" scrollButtons="auto">
          {TABS.map((item) => (
            <Tab key={item.id} label={item.label} />
          ))}
        </Tabs>
        <CardContent>
          {tab === 0 && (
            <Stack spacing={2} maxWidth={520}>
              {fields}
              <Stack direction="row" spacing={1}>
                <Button variant="contained">Save</Button>
                <Button>Cancel</Button>
              </Stack>
            </Stack>
          )}

          {tab === 1 && (
            <Stack spacing={2} maxWidth={720}>
              {[
                ['Full name', 'name'],
                ['Email', 'email'],
                ['Phone', 'phone'],
                ['Company', 'company'],
              ].map(([label, key]) => (
                <Stack key={key} direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                  <TextField
                    label={label}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    fullWidth
                  />
                </Stack>
              ))}
              <Stack direction="row" spacing={1}>
                <Button variant="contained">Save layout</Button>
                <Button>Reset</Button>
              </Stack>
            </Stack>
          )}

          {tab === 2 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} multiline minRows={3} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained">Save columns</Button>
              </Grid>
            </Grid>
          )}

          {tab === 3 && (
            <Stack spacing={2}>
              <TextField label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth />
              <TextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth />
              <TextField label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} fullWidth />
              <TextField label="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} fullWidth />
              <TextField label="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} multiline minRows={6} fullWidth />
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  position: 'sticky',
                  bottom: 0,
                  py: 1.5,
                  bgcolor: 'background.paper',
                  borderTop: 1,
                  borderColor: 'divider',
                }}
              >
                <Button variant="contained">Save sticky form</Button>
                <Button>Discard</Button>
              </Stack>
            </Stack>
          )}
        </CardContent>
      </Card>
    </>
  );
}
