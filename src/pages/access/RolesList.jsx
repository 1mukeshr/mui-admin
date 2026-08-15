import { Box, Button, Card, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../components/common/DataTable';
import { PageHeader } from '../../components/common/PageHeader';
import { useAppData } from '../../contexts/AppDataContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../utils/format';

export function RolesList() {
  const { roles } = useAppData();
  const { hasPermission } = useAuth();
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        id: 'name',
        label: 'Role',
        sortable: true,
        hideable: false,
        minWidth: 200,
        render: (role) => (
          <>
            <Typography fontWeight={600}>{role.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {role.description}
            </Typography>
          </>
        ),
      },
      { id: 'description', label: 'Description', sortable: true, minWidth: 220 },
      {
        id: 'permissions',
        label: 'Permissions',
        sortable: true,
        align: 'right',
        minWidth: 120,
        getValue: (role) => role.permissions.length,
      },
      { id: 'userCount', label: 'Users', sortable: true, align: 'right', minWidth: 90 },
      {
        id: 'createdAt',
        label: 'Created',
        sortable: true,
        minWidth: 120,
        render: (role) => formatDate(role.createdAt),
      },
    ],
    [],
  );

  return (
    <Box className="c-page p-access">
      <PageHeader
        title="Roles"
        actions={
          <Stack direction="row" spacing={1}>
            <Button onClick={() => navigate('/access/permissions')}>Permission matrix</Button>
            {hasPermission('roles.edit') && (
              <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/access/roles/new')}>
                Create role
              </Button>
            )}
          </Stack>
        }
      />
      <Card>
        <DataTable
          id="roles"
          rows={roles}
          columns={columns}
          getRowId={(role) => role.id}
          onRowClick={(role) => navigate(hasPermission('roles.edit') ? `/access/roles/${role.id}/edit` : '/access/permissions')}
          defaultSort={{ key: 'name', dir: 'asc' }}
          defaultHidden={['description']}
          defaultRowsPerPage={10}
          emptyTitle="No roles found"
        />
      </Card>
    </Box>
  );
}
