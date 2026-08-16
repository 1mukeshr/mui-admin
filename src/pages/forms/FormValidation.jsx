import { Alert, Button, Card, CardContent, Grid, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { CONTACT_PHONE, OWNER_EMAIL, OWNER_NAME } from '../../data/seed';
import { formatCurrency } from '../../utils/format';

export function FormValidation() {
  const [form, setForm] = useState({
    name: OWNER_NAME,
    email: OWNER_EMAIL,
    phone: CONTACT_PHONE,
    password: '',
    confirm: '',
    amount: '15000',
  });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.';
    if (!/^[6-9]\d{9}$/.test(form.phone)) next.phone = 'Enter a 10-digit Indian mobile number.';
    if (form.password.length < 6) next.password = 'Password must be at least 6 characters.';
    if (form.password !== form.confirm) next.confirm = 'Passwords do not match.';
    const amount = Number(form.amount);
    if (!amount || amount < 1000) next.amount = 'Amount must be at least ₹1,000.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  return (
    <>
      <PageHeader
        title="Form Validation"
        crumbs={[{ label: 'Forms & Tables' }, { label: 'Form Validation' }]}
      />
      <Card>
        <CardContent>
          {saved && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Validation passed. Contact {form.phone} · Budget {formatCurrency(Number(form.amount))}.
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                error={Boolean(errors.name)}
                helperText={errors.name}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                error={Boolean(errors.email)}
                helperText={errors.email}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                error={Boolean(errors.phone)}
                helperText={errors.phone || 'Use 9690421423 or another 10-digit number'}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Budget (INR)"
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                error={Boolean(errors.amount)}
                helperText={errors.amount}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                error={Boolean(errors.password)}
                helperText={errors.password}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Confirm password"
                type="password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                error={Boolean(errors.confirm)}
                helperText={errors.confirm}
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <Stack direction="row" spacing={1} sx={{ mt: 2.5 }}>
            <Button
              variant="contained"
              onClick={() => {
                setSaved(validate());
              }}
            >
              Validate and save
            </Button>
            <Button
              onClick={() => {
                setForm({ name: '', email: '', phone: CONTACT_PHONE, password: '', confirm: '', amount: '15000' });
                setErrors({});
                setSaved(false);
              }}
            >
              Reset
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
