import { Alert, Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Stack, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { useAppData } from '../../contexts/AppDataContext';
import { ALL_PERMISSIONS } from '../../data/permissions';
import { uid } from '../../utils/format';

export function RoleForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { roles, setRoles } = useAppData();
  const existing = roles.find((role) => role.id === id);
  const navigate = useNavigate();
  const [name, setName] = useState(existing?.name ?? '');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [permissions, setPermissions] = useState(existing?.permissions ?? []);

  const grouped = useMemo(() => {
    return ALL_PERMISSIONS.reduce((acc, permission) => {
      acc[permission.module] = acc[permission.module] ? [...acc[permission.module], permission] : [permission];
      return acc;
    }, {});
  }, []);

  if (isEdit && !existing) return <Alert severity="error">Role not found.</Alert>;

  const toggle = (key) => {
    setPermissions((current) => (current.includes(key) ? current.filter((item) => item !== key) : [...current, key]));
  };

  const submit = (event) => {
    event.preventDefault();
    if (isEdit && existing) {
      setRoles(roles.map((role) => (role.id === existing.id ? { ...role, name, description, permissions } : role)));
    } else {
      setRoles([
        ...roles,
        {
          id: uid('r'),
          name,
          slug: name.toLowerCase().replace(/\s+/g, '_'),
          description,
          permissions,
          userCount: 0,
          createdAt: new Date().toISOString().slice(0, 10),
        },
      ]);
    }
    navigate('/access/roles');
  };

  return (
    <>
      <PageHeader
        title={isEdit ? 'Edit role' : 'Create role'}
        crumbs={[
          { label: 'Roles', to: '/access/roles' },
          { label: isEdit ? 'Edit' : 'Create' },
        ]}
      />
      <Card>
        <CardContent>
          <form onSubmit={submit}>
            <Stack spacing={2} sx={{ mb: 2.5 }}>
              <TextField label="Role name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
              <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required fullWidth />
            </Stack>
            <Grid container spacing={2}>
              {Object.entries(grouped).map(([module, items]) => (
                <Grid item xs={12} md={6} key={module}>
                  <FormControl component="fieldset" variant="standard" fullWidth>
                    <FormLabel component="legend">{module}</FormLabel>
                    <FormGroup>
                      {items.map((permission) => (
                        <FormControlLabel
                          key={permission.key}
                          sx={{ alignItems: 'flex-start', mr: 0, ml: 0 }}
                          control={<Checkbox checked={permissions.includes(permission.key)} onChange={() => toggle(permission.key)} />}
                          label={`${permission.action} — ${permission.description}`}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                </Grid>
              ))}
            </Grid>
            <Stack direction="row" spacing={1} sx={{ mt: 2.5 }}>
              <Button type="submit" variant="contained">
                Save role
              </Button>
              <Button onClick={() => navigate('/access/roles')}>Cancel</Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
