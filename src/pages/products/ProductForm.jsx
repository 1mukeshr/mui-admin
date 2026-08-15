import {
  Alert,
  Box,
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
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { useAppData } from '../../contexts/AppDataContext';
import { uid } from '../../utils/format';

export function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { products, setProducts, categories } = useAppData();
  const existing = products.find((product) => product.id === id);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: existing?.name ?? '',
    sku: existing?.sku ?? '',
    categoryId: existing?.categoryId ?? categories[0]?.id ?? '',
    price: existing?.price ?? 0,
    compareAtPrice: existing?.compareAtPrice ?? 0,
    stock: existing?.stock ?? 0,
    status: existing?.status ?? 'active',
    description: existing?.description ?? '',
    image: existing?.image ?? '',
    featured: false,
    taxable: true,
    trackStock: true,
  });

  if (isEdit && !existing) return <Alert severity="error">Product not found.</Alert>;

  const onImage = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, image: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const submit = (event) => {
    event.preventDefault();
    const payload = {
      name: form.name,
      sku: form.sku,
      categoryId: form.categoryId,
      price: form.price,
      compareAtPrice: form.compareAtPrice || undefined,
      stock: form.stock,
      description: form.description,
      image: form.image,
      status: form.trackStock && form.stock === 0 && form.status === 'active' ? 'out_of_stock' : form.status,
    };
    if (isEdit && existing) {
      setProducts(products.map((product) => (product.id === existing.id ? { ...product, ...payload } : product)));
    } else {
      setProducts([{ id: uid('pr'), ...payload, createdAt: new Date().toISOString().slice(0, 10) }, ...products]);
    }
    navigate('/products');
  };

  return (
    <>
      <PageHeader
        title={isEdit ? 'Edit product' : 'Add product'}
        crumbs={[
          { label: 'Products', to: '/products' },
          { label: isEdit ? 'Edit' : 'Add' },
        ]}
      />
      <Card>
        <CardContent>
          <form onSubmit={submit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required fullWidth />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} required fullWidth />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField select label="Category" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} fullWidth>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required fullWidth />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Compare-at price"
                  type="number"
                  value={form.compareAtPrice}
                  onChange={(e) => setForm({ ...form, compareAtPrice: Number(e.target.value) })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Stock"
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                  disabled={!form.trackStock}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel>Status</FormLabel>
                  <RadioGroup row value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <FormControlLabel value="active" control={<Radio />} label="Active" />
                    <FormControlLabel value="draft" control={<Radio />} label="Draft" />
                    <FormControlLabel value="out_of_stock" control={<Radio />} label="Out of stock" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Catalog options</FormLabel>
                  <FormGroup row sx={{ flexWrap: 'wrap' }}>
                    <FormControlLabel
                      control={<Checkbox checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />}
                      label="Featured product"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={form.taxable} onChange={(e) => setForm({ ...form, taxable: e.target.checked })} />}
                      label="Taxable"
                    />
                    <FormControlLabel
                      control={<Switch checked={form.trackStock} onChange={(e) => setForm({ ...form, trackStock: e.target.checked })} />}
                      label="Track stock"
                    />
                  </FormGroup>
                  <FormHelperText>Featured items appear on the dashboard top products list when they have sales.</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  multiline
                  minRows={3}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button component="label" variant="outlined">
                  Upload image
                  <input hidden type="file" accept="image/*" onChange={(e) => onImage(e.target.files?.[0])} />
                </Button>
                {form.image && (
                  <Box sx={{ mt: 2 }}>
                    <img src={form.image} alt={`${form.name || 'Product'} preview`} width={120} height={120} style={{ objectFit: 'cover', borderRadius: 8 }} />
                  </Box>
                )}
              </Grid>
            </Grid>
            <Stack direction="row" spacing={1} sx={{ mt: 2.5 }}>
              <Button type="submit" variant="contained">
                {isEdit ? 'Save product' : 'Create product'}
              </Button>
              <Button onClick={() => navigate('/products')}>Cancel</Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
