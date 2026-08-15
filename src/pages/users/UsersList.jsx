import { Box, Button, Card, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { DataTable } from '../../components/common/DataTable';
import { FilterBar } from '../../components/common/FilterBar';
import { PageHeader } from '../../components/common/PageHeader';
import { SearchField } from '../../components/common/SearchField';
import { StatusChip } from '../../components/common/StatusChip';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate, formatDateTime, roleLabel } from '../../utils/format';

export function UsersList() {
  const { users, setUsers, hasPermission, user: sessionUser } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('all');
  const [status, setStatus] = useState('all');
  const [deleteId, setDeleteId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkAction, setBulkAction] = useState(null);

  const filtered = useMemo(
    () =>
      users.filter((user) => {
        const matchesQuery = [user.name, user.email, user.department].some((value) =>
          value.toLowerCase().includes(query.toLowerCase()),
        );
        return matchesQuery && (role === 'all' || user.role === role) && (status === 'all' || user.status === status);
      }),
    [query, role, status, users],
  );

  useEffect(() => {
    setSelectedIds((ids) => ids.filter((id) => filtered.some((user) => user.id === id)));
  }, [filtered]);

  const canBulk = hasPermission('users.edit') || hasPermission('users.delete');
  const canSelectRow = (row) => row.role !== 'super_admin' && row.id !== sessionUser?.id;

  const columns = useMemo(
    () => [
      { id: 'name', label: 'Name', sortable: true, hideable: false, minWidth: 160 },
      { id: 'email', label: 'Email', sortable: true, minWidth: 200 },
      {
        id: 'role',
        label: 'Role',
        sortable: true,
        minWidth: 120,
        getValue: (user) => roleLabel(user.role),
        render: (user) => roleLabel(user.role),
      },
      { id: 'department', label: 'Department', sortable: true, minWidth: 140 },
      {
        id: 'status',
        label: 'Status',
        sortable: true,
        minWidth: 120,
        render: (user) => <StatusChip value={user.status} />,
      },
      {
        id: 'createdAt',
        label: 'Created',
        sortable: true,
        minWidth: 120,
        render: (user) => formatDate(user.createdAt),
      },
      {
        id: 'lastLogin',
        label: 'Last login',
        sortable: true,
        minWidth: 160,
        render: (user) => (user.lastLogin ? formatDateTime(user.lastLogin) : 'Never'),
      },
      {
        id: 'actions',
        label: 'Actions',
        hideable: false,
        align: 'right',
        width: 140,
        render: (user) => (
          <span onClick={(event) => event.stopPropagation()}>
            <Tooltip title="View">
              <IconButton size="small" aria-label={`View ${user.name}`} onClick={() => navigate(`/users/${user.id}`)}>
                <VisibilityOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            {hasPermission('users.edit') && (
              <Tooltip title="Edit">
                <IconButton size="small" aria-label={`Edit ${user.name}`} onClick={() => navigate(`/users/${user.id}/edit`)}>
                  <EditOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {hasPermission('users.delete') && canSelectRow(user) && (
              <Tooltip title="Delete">
                <IconButton size="small" color="error" aria-label={`Delete ${user.name}`} onClick={() => setDeleteId(user.id)}>
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </span>
        ),
      },
    ],
    [hasPermission, navigate, sessionUser?.id],
  );

  const runBulk = () => {
    if (!bulkAction || selectedIds.length === 0) return;
    if (bulkAction === 'deactivate' && hasPermission('users.edit')) {
      setUsers(
        users.map((user) =>
          selectedIds.includes(user.id) && canSelectRow(user) ? { ...user, status: 'inactive' } : user,
        ),
      );
    }
    if (bulkAction === 'delete' && hasPermission('users.delete')) {
      setUsers(users.filter((user) => !selectedIds.includes(user.id) || !canSelectRow(user)));
    }
    setSelectedIds([]);
    setBulkAction(null);
  };

  return (
    <Box className="c-page p-users">
      <PageHeader
        title="Users"
        actions={
          hasPermission('users.create') ? (
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/users/new')}>
              Add user
            </Button>
          ) : undefined
        }
      />

      {canBulk && selectedIds.length > 0 && (
        <div className="c-bulk-bar" role="region" aria-label="Bulk user actions">
          <p>
            <strong>{selectedIds.length}</strong> selected
          </p>
          <div className="c-bulk-bar__actions">
            {hasPermission('users.edit') && (
              <button type="button" className="c-bulk-bar__btn" onClick={() => setBulkAction('deactivate')}>
                <PersonOffOutlinedIcon fontSize="small" />
                Deactivate
              </button>
            )}
            {hasPermission('users.delete') && (
              <button type="button" className="c-bulk-bar__btn is-danger" onClick={() => setBulkAction('delete')}>
                <DeleteOutlineIcon fontSize="small" />
                Delete
              </button>
            )}
            <button type="button" className="c-bulk-bar__btn is-ghost" onClick={() => setSelectedIds([])}>
              Clear
            </button>
          </div>
        </div>
      )}

      <Card>
        <DataTable
          id="users"
          rows={filtered}
          columns={columns}
          getRowId={(user) => user.id}
          onRowClick={(user) => navigate(`/users/${user.id}`)}
          filterKey={`${query}|${role}|${status}`}
          defaultSort={{ key: 'createdAt', dir: 'desc' }}
          defaultHidden={['lastLogin']}
          defaultRowsPerPage={5}
          rowsPerPageOptions={[5, 10, 25]}
          emptyTitle="No users found"
          emptyDescription="Try a different search or filter."
          selectable={canBulk}
          selectedIds={selectedIds}
          onSelectedIdsChange={setSelectedIds}
          isRowSelectable={canSelectRow}
          toolbar={
            <FilterBar>
              <SearchField
                placeholder="Search name, email, department"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 160 } }}>
                <InputLabel>Role</InputLabel>
                <Select label="Role" value={role} onChange={(e) => setRole(e.target.value)}>
                  <MenuItem value="all">All roles</MenuItem>
                  {['super_admin', 'admin', 'viewer'].map((item) => (
                    <MenuItem key={item} value={item}>
                      {roleLabel(item)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 160 } }}>
                <InputLabel>Status</InputLabel>
                <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <MenuItem value="all">All statuses</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </FilterBar>
          }
        />
      </Card>
      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete user"
        description="This user will be removed from the workspace. This cannot be undone."
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          setUsers(users.filter((user) => user.id !== deleteId));
          setSelectedIds((ids) => ids.filter((id) => id !== deleteId));
          setDeleteId(null);
        }}
      />
      <ConfirmDialog
        open={Boolean(bulkAction)}
        title={bulkAction === 'delete' ? 'Delete selected users' : 'Deactivate selected users'}
        description={
          bulkAction === 'delete'
            ? `${selectedIds.length} user(s) will be removed. Super Admin and your own account stay protected.`
            : `${selectedIds.length} user(s) will be set to inactive.`
        }
        onClose={() => setBulkAction(null)}
        onConfirm={runBulk}
      />
    </Box>
  );
}
