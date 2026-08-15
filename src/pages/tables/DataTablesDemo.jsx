import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DataTable } from '../../components/common/DataTable';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusChip } from '../../components/common/StatusChip';
import { useAppData } from '../../contexts/AppDataContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency, formatDate, roleLabel } from '../../utils/format';

const TABS = [
  { id: 'basic', label: 'Basic grid' },
  { id: 'advanced', label: 'Advanced grid' },
];

export function DataTablesDemo() {
  const { type } = useParams();
  const navigate = useNavigate();
  const tab = Math.max(0, TABS.findIndex((item) => item.id === type));
  const { customers } = useAppData();
  const { users } = useAuth();

  const customerColumns = useMemo(
    () => [
      { id: 'name', label: 'Customer', sortable: true, hideable: false, minWidth: 160 },
      { id: 'phone', label: 'Phone', sortable: true, minWidth: 140 },
      { id: 'company', label: 'Company', sortable: true, minWidth: 140 },
      { id: 'city', label: 'City', sortable: true, minWidth: 120 },
      {
        id: 'totalSpent',
        label: 'Spent',
        sortable: true,
        align: 'right',
        minWidth: 110,
        render: (row) => formatCurrency(row.totalSpent),
      },
      { id: 'status', label: 'Status', sortable: true, render: (row) => <StatusChip value={row.status} /> },
    ],
    [],
  );

  const userColumns = useMemo(
    () => [
      { id: 'name', label: 'User', sortable: true, hideable: false, minWidth: 160 },
      { id: 'email', label: 'Email', sortable: true, minWidth: 200 },
      { id: 'phone', label: 'Phone', sortable: true, minWidth: 140 },
      { id: 'role', label: 'Role', sortable: true, getValue: (row) => roleLabel(row.role) },
      { id: 'department', label: 'Department', sortable: true, minWidth: 140 },
      { id: 'status', label: 'Status', sortable: true, render: (row) => <StatusChip value={row.status} /> },
      { id: 'createdAt', label: 'Created', sortable: true, render: (row) => formatDate(row.createdAt) },
    ],
    [],
  );

  const tabs = (
    <nav className="c-table-tabs" aria-label="Datatable views">
      {TABS.map((item, index) => (
        <button
          key={item.id}
          type="button"
          className={`c-table-tabs__item ${tab === index ? 'is-active' : ''}`}
          onClick={() => navigate(`/tables/data/${item.id}`)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );

  return (
    <div className="c-page p-tables">
      <PageHeader
        title="Datatables"
        crumbs={[{ label: 'Forms & Tables' }, { label: 'Datatables' }, { label: TABS[tab].label }]}
      />
      <div className="c-table-card">
        {tab === 0 ? (
          <DataTable
            id="demo-customers"
            rows={customers}
            columns={customerColumns}
            getRowId={(row) => row.id}
            toolbar={tabs}
            defaultSort={{ key: 'totalSpent', dir: 'desc' }}
            emptyTitle="No customers"
          />
        ) : (
          <DataTable
            id="demo-users"
            rows={users}
            columns={userColumns}
            getRowId={(row) => row.id}
            toolbar={tabs}
            defaultSort={{ key: 'name', dir: 'asc' }}
            defaultHidden={['createdAt']}
            emptyTitle="No users"
          />
        )}
      </div>
    </div>
  );
}
