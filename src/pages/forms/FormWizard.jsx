import { Alert, Button, Card, CardContent, Stack, Step, StepLabel, Stepper, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { CONTACT_PHONE, OWNER_EMAIL, OWNER_NAME } from '../../data/seed';

const TABS = [
  { id: 'numbered', label: 'Numbered' },
  { id: 'vertical', label: 'Vertical' },
];

const STEPS = ['Account', 'Profile', 'Review'];

export function FormWizard() {
  const { type } = useParams();
  const navigate = useNavigate();
  const tab = Math.max(0, TABS.findIndex((item) => item.id === type));
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    email: OWNER_EMAIL,
    password: 'Admin@123',
    name: OWNER_NAME,
    phone: CONTACT_PHONE,
    city: 'Jaipur',
  });

  const next = () => {
    if (step === STEPS.length - 1) {
      setDone(true);
      return;
    }
    setStep((current) => current + 1);
  };

  const fields =
    step === 0 ? (
      <Stack spacing={2}>
        <TextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth />
        <TextField label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} fullWidth />
      </Stack>
    ) : step === 1 ? (
      <Stack spacing={2}>
        <TextField label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth />
        <TextField label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} fullWidth />
        <TextField label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} fullWidth />
      </Stack>
    ) : (
      <Stack spacing={1}>
        <Typography>Name: {form.name}</Typography>
        <Typography>Email: {form.email}</Typography>
        <Typography>Phone: {form.phone}</Typography>
        <Typography>City: {form.city}</Typography>
      </Stack>
    );

  return (
    <>
      <PageHeader
        title="Form Wizard"
        crumbs={[{ label: 'Forms & Tables' }, { label: 'Form Wizard' }, { label: TABS[tab].label }]}
      />
      <Card>
        <Tabs value={tab} onChange={(_, value) => navigate(`/forms/wizard/${TABS[value].id}`)} variant="scrollable">
          {TABS.map((item) => (
            <Tab key={item.id} label={item.label} />
          ))}
        </Tabs>
        <CardContent>
          {done && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Wizard completed for {form.name}. Phone saved as {form.phone}.
            </Alert>
          )}
          <Stepper activeStep={step} orientation={tab === 1 ? 'vertical' : 'horizontal'} alternativeLabel={tab === 0} sx={{ mb: 3 }}>
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {fields}
          <Stack direction="row" spacing={1} sx={{ mt: 2.5 }}>
            <Button disabled={step === 0 || done} onClick={() => setStep((current) => current - 1)}>
              Back
            </Button>
            <Button variant="contained" disabled={done} onClick={next}>
              {step === STEPS.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
