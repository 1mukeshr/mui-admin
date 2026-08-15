import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { ErrorState } from '../../components/common/ErrorState';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusChip } from '../../components/common/StatusChip';
import { useAppData } from '../../contexts/AppDataContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency, formatDate } from '../../utils/format';
import { useState } from 'react';

export function ProductDetails() {
  const { id } = useParams();
  const { products, setProducts, categories } = useAppData();
  const { hasPermission } = useAuth();
  const product = products.find((item) => item.id === id);
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);

  if (!product) return <ErrorState title="Product not found" onRetry={() => navigate('/products')} />;

  const category = categories.find((item) => item.id === product.categoryId)?.name ?? '—';

  return (
    <>
      <PageHeader
        title={product.name}
        crumbs={[
          { label: 'Products', to: '/products' },
          { label: product.name },
        ]}
        actions={
          <Stack direction="row" spacing={1}>
            {hasPermission('products.edit') && (
              <Button variant="contained" onClick={() => navigate(`/products/${product.id}/edit`)}>
                Edit
              </Button>
            )}
            {hasPermission('products.delete') && (
              <Button color="error" onClick={() => setConfirm(true)}>
                Delete
              </Button>
            )}
          </Stack>
        }
      />
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  height: 220,
                  borderRadius: '8px',
                  bgcolor: 'action.hover',
                  display: 'grid',
                  placeItems: 'center',
                  overflow: 'hidden',
                }}
              >
                {product.image ? (
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Typography color="text.secondary">No image</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack spacing={1.5}>
                <StatusChip value={product.status} />
                <Typography variant="h5">{formatCurrency(product.price)}</Typography>
                <Typography color="text.secondary">{product.description}</Typography>
                <Grid container spacing={2}>
                  {[
                    ['SKU', product.sku],
                    ['Category', category],
                    ['Stock', String(product.stock)],
                    ['Created', formatDate(product.createdAt)],
                  ].map(([label, value]) => (
                    <Grid item xs={6} key={label}>
                      <Typography variant="caption" color="text.secondary">
                        {label}
                      </Typography>
                      <Typography>{value}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ConfirmDialog
        open={confirm}
        title="Delete product"
        description="This product will be removed from the catalog."
        onClose={() => setConfirm(false)}
        onConfirm={() => {
          setProducts(products.filter((item) => item.id !== product.id));
          navigate('/products');
        }}
      />
    </>
  );
}
