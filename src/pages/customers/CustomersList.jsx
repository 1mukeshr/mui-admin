import { Box, Button, Card, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../components/common/DataTable';
import { FilterBar } from '../../components/common/FilterBar';
import { PageHeader } from '../../components/common/PageHeader';
import { SearchField } from '../../components/common/SearchField';
import { StatusChip } from '../../components/common/StatusChip';
import { useAppData } from '../../contexts/AppDataContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency, formatDate } from '../../utils/format';

export function CustomersList() {
  const { customers } = useAppData();
  const { hasPermission } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () =>
      customers.filter((customer) =>
        [customer.name, customer.email, customer.company, customer.city].some((value) =>
          value.toLowerCase().includes(query.toLowerCase()),
        ),
      ),
    [customers, query],
  );

  const columns = useMemo(
    () => [
      {
        id: 'name',
        label: 'Customer',
        sortable: true,
        hideable: false,
        minWidth: 180,
        render: (customer) => (
          <>
            <Typography variant="body2" fontWeight={600}>
              {customer.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {customer.email}
            </Typography>
          </>
        ),
      },
      { id: 'email', label: 'Email', sortable: true, minWidth: 200 },
      { id: 'company', label: 'Company', sortable: true, minWidth: 140 },
      {
        id: 'location',
        label: 'Location',
        sortable: true,
        minWidth: 140,
        getValue: (customer) => `${customer.city}, ${customer.country}`,
      },
      { id: 'phone', label: 'Phone', sortable: true, minWidth: 140 },
      { id: 'totalOrders', label: 'Orders', sortable: true, align: 'right', minWidth: 90 },
      {
        id: 'totalSpent',
        label: 'Spent',
        sortable: true,
        align: 'right',
        minWidth: 110,
        render: (customer) => formatCurrency(customer.totalSpent),
      },
      {
        id: 'status',
        label: 'Status',
        sortable: true,
        minWidth: 110,
        render: (customer) => <StatusChip value={customer.status} />,
      },
      {
        id: 'lastOrderAt',
        label: 'Last order',
        sortable: true,
        minWidth: 120,
        render: (customer) => formatDate(customer.lastOrderAt),
      },
      {
        id: 'joinedAt',
        label: 'Joined',
        sortable: true,
        minWidth: 120,
        render: (customer) => formatDate(customer.joinedAt),
      },
    ],
    [],
  );

  return (
    <Box className="c-page p-customers">
      <PageHeader
        title="Customers"
        actions={
          hasPermission('customers.edit') ? (
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/customers/new')}>
              Add customer
            </Button>
          ) : undefined
        }
      />
      <Card>
        <DataTable
          id="customers"
          rows={filtered}
          columns={columns}
          getRowId={(customer) => customer.id}
          onRowClick={(customer) => navigate(`/customers/${customer.id}`)}
          filterKey={query}
          defaultSort={{ key: 'totalSpent', dir: 'desc' }}
          defaultHidden={['email', 'phone', 'joinedAt']}
          emptyTitle="No customers found"
          toolbar={
            <FilterBar>
              <SearchField
                className="c-search-field--wide"
                placeholder="Search customers"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </FilterBar>
          }
        />
      </Card>
    </Box>
  );
}
