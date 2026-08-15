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
import { useAuth } from '../../contexts/AuthContext';
import { CONTACT_PHONE } from '../../data/seed';
import { ASSIGNABLE_ROLES } from '../../data/permissions';
import { roleLabel, uid } from '../../utils/format';

export function UserForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { users, setUsers } = useAuth();
  const existing = users.find((user) => user.id === id);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: existing?.name ?? '',
    email: existing?.email ?? '',
    password: existing?.password ?? '',
    role: existing?.role ?? 'viewer',
    status: existing?.status ?? 'active',
    phone: existing?.phone ?? CONTACT_PHONE,
    department: existing?.department ?? '',
    sendInvite: !isEdit,
    forceReset: false,
  });

  if (isEdit && !existing) {
    return <Alert severity="error">User not found.</Alert>;
  }

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError('Name, email, and password are required.');
      return;
    }
    if (!isEdit && users.some((user) => user.email.toLowerCase() === form.email.toLowerCase())) {
      setError('A user with this email already exists.');
      return;
    }
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
      status: form.status,
      phone: form.phone,
      department: form.department,
    };
    if (isEdit && existing) {
      setUsers(users.map((user) => (user.id === existing.id ? { ...user, ...payload } : user)));
    } else {
      setUsers([
        {
          id: uid('u'),
          ...payload,
          lastLogin: '',
          createdAt: new Date().toISOString().slice(0, 10),
        },
        ...users,
      ]);
    }
    navigate('/users');
  };

  return (
    <>
      <PageHeader
        title={isEdit ? 'Edit user' : 'Add user'}
        crumbs={[
          { label: 'Users', to: '/users' },
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
                <TextField label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <FormLabel>Role</FormLabel>
                  <RadioGroup
                    row
                    sx={{ flexWrap: 'wrap' }}
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  >
                    {ASSIGNABLE_ROLES.map((role) => (
                      <FormControlLabel key={role} value={role} control={<Radio />} label={roleLabel(role)} />
                    ))}
                  </RadioGroup>
                </FormControl>
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
                  <FormLabel component="legend">Options</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={form.sendInvite} onChange={(e) => setForm({ ...form, sendInvite: e.target.checked })} />}
                      label="Send welcome email"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={form.forceReset} onChange={(e) => setForm({ ...form, forceReset: e.target.checked })} />}
                      label="Require password reset on next login"
                    />
                  </FormGroup>
                  <FormHelperText>These options apply when the account is saved.</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Stack direction="row" spacing={1} sx={{ mt: 2.5 }}>
              <Button type="submit" variant="contained">
                {isEdit ? 'Save changes' : 'Create user'}
              </Button>
              <Button onClick={() => navigate('/users')}>Cancel</Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
