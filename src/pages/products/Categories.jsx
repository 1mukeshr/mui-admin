import { Button, Card, CardContent, Stack, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { DataTable } from '../../components/common/DataTable';
import { PageHeader } from '../../components/common/PageHeader';
import { useAppData } from '../../contexts/AppDataContext';
import { useAuth } from '../../contexts/AuthContext';
import { uid } from '../../utils/format';

export function Categories() {
  const { categories, setCategories, products } = useAppData();
  const { hasPermission } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const canEdit = hasPermission('products.edit');

  const add = () => {
    if (!name.trim()) return;
    setCategories([
      ...categories,
      {
        id: uid('cat'),
        name: name.trim(),
        slug: name.trim().toLowerCase().replace(/\s+/g, '-'),
        description,
        productCount: 0,
      },
    ]);
    setName('');
    setDescription('');
  };

  const columns = useMemo(
    () => [
      { id: 'name', label: 'Name', sortable: true, hideable: false, minWidth: 140 },
      { id: 'slug', label: 'Slug', sortable: true, minWidth: 140 },
      { id: 'description', label: 'Description', sortable: true, minWidth: 200 },
      {
        id: 'productCount',
        label: 'Products',
        sortable: true,
        align: 'right',
        minWidth: 100,
        getValue: (category) => products.filter((product) => product.categoryId === category.id).length,
      },
      ...(canEdit
        ? [
            {
              id: 'actions',
              label: 'Actions',
              hideable: false,
              align: 'right',
              width: 110,
              render: (category) => (
                <Button size="small" color="error" onClick={() => setDeleteId(category.id)}>
                  Delete
                </Button>
              ),
            },
          ]
        : []),
    ],
    [canEdit, products],
  );

  return (
    <>
      <PageHeader
        title="Categories"
        crumbs={[
          { label: 'Products', to: '/products' },
          { label: 'Categories' },
        ]}
      />
      {canEdit && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }}>
              <TextField size="small" label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
              <TextField size="small" label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth />
              <Button variant="contained" onClick={add} sx={{ minWidth: 140, flexShrink: 0 }}>
                Add category
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}
      <Card>
        <DataTable
          id="categories"
          rows={categories}
          columns={columns}
          getRowId={(category) => category.id}
          defaultSort={{ key: 'name', dir: 'asc' }}
          defaultRowsPerPage={10}
          emptyTitle="No categories found"
        />
      </Card>
      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete category"
        description="Products in this category will keep their current assignment until edited."
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          setCategories(categories.filter((category) => category.id !== deleteId));
          setDeleteId(null);
        }}
      />
    </>
  );
}
