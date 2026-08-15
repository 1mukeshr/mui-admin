import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Rating,
  Slider,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { CONTACT_PHONE, OWNER_NAME } from '../../data/seed';
import { formatCurrency } from '../../utils/format';

const TABS = [
  { id: 'text', label: 'Text fields' },
  { id: 'select', label: 'Selects' },
  { id: 'controls', label: 'Checkboxes & radios' },
  { id: 'pickers', label: 'Pickers & upload' },
];

export function FormElements() {
  const { type } = useParams();
  const navigate = useNavigate();
  const tab = Math.max(0, TABS.findIndex((item) => item.id === type));
  const [values, setValues] = useState({
    name: OWNER_NAME,
    email: 'admin@demo.com',
    phone: CONTACT_PHONE,
    city: 'Jaipur',
    role: 'admin',
    status: 'active',
    tags: ['Orders', 'Catalog'],
    newsletter: true,
    sms: false,
    plan: 'pro',
    amount: 25000,
    rating: 4,
    date: '2026-08-15',
    time: '16:30',
    fileName: '',
  });

  return (
    <>
      <PageHeader
        title="Form Elements"
        crumbs={[{ label: 'Forms & Tables' }, { label: 'Form Elements' }, { label: TABS[tab].label }]}
      />
      <Card>
        <Tabs value={tab} onChange={(_, value) => navigate(`/forms/elements/${TABS[value].id}`)} variant="scrollable" scrollButtons="auto">
          {TABS.map((item) => (
            <Tab key={item.id} label={item.label} />
          ))}
        </Tabs>
        <CardContent>
          {tab === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField label="Full name" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Email" type="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Phone" value={values.phone} onChange={(e) => setValues({ ...values, phone: e.target.value })} fullWidth helperText="Workspace contact number" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Budget"
                  value={formatCurrency(values.amount)}
                  InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start">INR</InputAdornment> }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Notes" multiline minRows={3} placeholder="Add a short note for this record" fullWidth />
              </Grid>
            </Grid>
          )}

          {tab === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField select label="Role" value={values.role} onChange={(e) => setValues({ ...values, role: e.target.value })} fullWidth>
                  <MenuItem value="super_admin">Super Admin</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="viewer">Viewer</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField select label="Status" value={values.status} onChange={(e) => setValues({ ...values, status: e.target.value })} fullWidth>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={['Orders', 'Catalog', 'Users', 'Reports', 'Support']}
                  value={values.tags}
                  onChange={(_, tags) => setValues({ ...values, tags })}
                  renderInput={(params) => <TextField {...params} label="Modules" />}
                />
              </Grid>
            </Grid>
          )}

          {tab === 2 && (
            <Stack spacing={2.5}>
              <FormControl>
                <FormLabel>Plan</FormLabel>
                <RadioGroup row value={values.plan} onChange={(e) => setValues({ ...values, plan: e.target.value })}>
                  <FormControlLabel value="starter" control={<Radio />} label="Starter" />
                  <FormControlLabel value="pro" control={<Radio />} label="Pro" />
                  <FormControlLabel value="business" control={<Radio />} label="Business" />
                </RadioGroup>
              </FormControl>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={values.newsletter} onChange={(e) => setValues({ ...values, newsletter: e.target.checked })} />}
                  label="Email updates"
                />
                <FormControlLabel control={<Checkbox checked={values.sms} onChange={(e) => setValues({ ...values, sms: e.target.checked })} />} label="SMS alerts" />
              </FormGroup>
              <FormControlLabel
                control={<Switch checked={values.newsletter} onChange={(e) => setValues({ ...values, newsletter: e.target.checked })} />}
                label="Enable notifications"
              />
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Quality rating
                </Typography>
                <Rating value={values.rating} onChange={(_, rating) => setValues({ ...values, rating: rating ?? 0 })} />
              </Box>
            </Stack>
          )}

          {tab === 3 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField label="Date" type="date" value={values.date} onChange={(e) => setValues({ ...values, date: e.target.value })} InputLabelProps={{ shrink: true }} fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Time" type="time" value={values.time} onChange={(e) => setValues({ ...values, time: e.target.value })} InputLabelProps={{ shrink: true }} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Amount range · {formatCurrency(values.amount)}
                </Typography>
                <Slider min={1000} max={100000} step={1000} value={values.amount} onChange={(_, amount) => setValues({ ...values, amount: Number(amount) })} />
              </Grid>
              <Grid item xs={12}>
                <Button component="label" variant="outlined">
                  Upload file
                  <input hidden type="file" onChange={(e) => setValues({ ...values, fileName: e.target.files?.[0]?.name ?? '' })} />
                </Button>
                {values.fileName && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Selected: {values.fileName}
                  </Typography>
                )}
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </>
  );
}
