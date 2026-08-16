import { Box, Button, Card, Chip, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
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

export function ProductsList() {
  const { products, categories } = useAppData();
  const { hasPermission } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState('all');
  const [status, setStatus] = useState('all');

  const filtered = useMemo(
    () =>
      products.filter((product) => {
        const matchesQuery = [product.name, product.sku].some((value) => value.toLowerCase().includes(query.toLowerCase()));
        return matchesQuery && (categoryId === 'all' || product.categoryId === categoryId) && (status === 'all' || product.status === status);
      }),
    [categoryId, products, query, status],
  );

  const columns = useMemo(
    () => [
      {
        id: 'name',
        label: 'Product',
        sortable: true,
        hideable: false,
        minWidth: 200,
        render: (product) => (
          <Stack direction="row" spacing={1.5} alignItems="center">
            {product.image ? (
              <img src={product.image} alt={product.name} width={36} height={36} style={{ borderRadius: 10, objectFit: 'cover' }} />
            ) : (
              <Chip size="small" label={product.name.slice(0, 2)} />
            )}
            <span>{product.name}</span>
          </Stack>
        ),
      },
      { id: 'sku', label: 'SKU', sortable: true, minWidth: 120 },
      {
        id: 'categoryId',
        label: 'Category',
        sortable: true,
        minWidth: 140,
        getValue: (product) => categories.find((category) => category.id === product.categoryId)?.name ?? '—',
      },
      {
        id: 'price',
        label: 'Price',
        sortable: true,
        align: 'right',
        minWidth: 120,
        render: (product) => (
          <>
            {formatCurrency(product.price)}
            {product.compareAtPrice ? (
              <span style={{ display: 'block', fontSize: 12, textDecoration: 'line-through', opacity: 0.6 }}>
                {formatCurrency(product.compareAtPrice)}
              </span>
            ) : null}
          </>
        ),
      },
      { id: 'stock', label: 'Stock', sortable: true, align: 'right', minWidth: 90 },
      {
        id: 'status',
        label: 'Status',
        sortable: true,
        minWidth: 120,
        render: (product) => <StatusChip value={product.status} />,
      },
      {
        id: 'createdAt',
        label: 'Created',
        sortable: true,
        minWidth: 120,
        render: (product) => formatDate(product.createdAt),
      },
    ],
    [categories],
  );

  return (
    <Box className="c-page p-products">
      <PageHeader
        title="Products"
        actions={
          <Stack direction="row" spacing={1}>
            <Button startIcon={<CategoryOutlinedIcon />} onClick={() => navigate('/products/categories')}>
              Categories
            </Button>
            {hasPermission('products.create') && (
              <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/products/new')}>
                Add product
              </Button>
            )}
          </Stack>
        }
      />
      <Card>
        <DataTable
          id="products"
          rows={filtered}
          columns={columns}
          getRowId={(product) => product.id}
          onRowClick={(product) => navigate(`/products/${product.id}`)}
          filterKey={`${query}|${categoryId}|${status}`}
          defaultSort={{ key: 'name', dir: 'asc' }}
          defaultHidden={['createdAt']}
          emptyTitle="No products found"
          toolbar={
            <FilterBar>
              <SearchField
                placeholder="Search name or SKU"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 180 } }}>
                <InputLabel>Category</InputLabel>
                <Select label="Category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                  <MenuItem value="all">All categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 160 } }}>
                <InputLabel>Status</InputLabel>
                <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="out_of_stock">Out of stock</MenuItem>
                </Select>
              </FormControl>
            </FilterBar>
          }
        />
      </Card>
    </Box>
  );
}
