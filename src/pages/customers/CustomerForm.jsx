import {
  Alert,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { useAppData } from '../../contexts/AppDataContext';
import { CONTACT_PHONE } from '../../data/seed';
import { uid } from '../../utils/format';

export function CustomerForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { customers, setCustomers } = useAppData();
  const existing = customers.find((customer) => customer.id === id);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: existing?.name ?? '',
    email: existing?.email ?? '',
    phone: existing?.phone ?? CONTACT_PHONE,
    company: existing?.company ?? '',
    city: existing?.city ?? '',
    country: existing?.country ?? '',
    status: existing?.status ?? 'active',
    newsletter: true,
    vip: false,
  });

  if (isEdit && !existing) return <Alert severity="error">Customer not found.</Alert>;

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and email are required.');
      return;
    }
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      city: form.city,
      country: form.country,
      status: form.status,
    };
    if (isEdit && existing) {
      setCustomers(customers.map((customer) => (customer.id === existing.id ? { ...customer, ...payload } : customer)));
    } else {
      setCustomers([
        {
          id: uid('c'),
          ...payload,
          totalOrders: 0,
          totalSpent: 0,
          joinedAt: new Date().toISOString().slice(0, 10),
          lastOrderAt: '',
        },
        ...customers,
      ]);
    }
    navigate('/customers');
  };

  return (
    <>
      <PageHeader
        title={isEdit ? 'Edit customer' : 'Add customer'}
        crumbs={[
          { label: 'Customers', to: '/customers' },
          { label: isEdit ? 'Edit' : 'Add' },
        ]}
      />
      <Card>
        <CardContent>
          <form onSubmit={submit}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required fullWidth />
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
                <FormControl fullWidth>
                  <FormLabel>Status</FormLabel>
                  <RadioGroup row value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <FormControlLabel value="active" control={<Radio />} label="Active" />
                    <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                    <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Preferences</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={form.newsletter} onChange={(e) => setForm({ ...form, newsletter: e.target.checked })} />}
                      label="Subscribe to newsletter"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={form.vip} onChange={(e) => setForm({ ...form, vip: e.target.checked })} />}
                      label="Mark as VIP customer"
                    />
                  </FormGroup>
                  <FormHelperText>VIP customers can be filtered later from the customer list.</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Stack direction="row" spacing={1} sx={{ mt: 2.5 }}>
              <Button type="submit" variant="contained">
                {isEdit ? 'Save customer' : 'Create customer'}
              </Button>
              <Button onClick={() => navigate('/customers')}>Cancel</Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
