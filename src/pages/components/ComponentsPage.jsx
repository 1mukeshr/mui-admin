import {
  Alert,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { CONTACT_PHONE, OWNER_EMAIL, OWNER_NAME } from '../../data/seed';
import { formatCurrency } from '../../utils/format';

const TYPES = [
  { id: 'buttons', label: 'Buttons' },
  { id: 'cards', label: 'Cards' },
  { id: 'forms', label: 'Forms' },
  { id: 'dialogs', label: 'Dialogs' },
  { id: 'tables', label: 'Tables' },
  { id: 'tabs', label: 'Tabs' },
  { id: 'alerts', label: 'Alerts' },
  { id: 'chips', label: 'Chips' },
  { id: 'avatars', label: 'Avatars' },
];

const TABLE_ROWS = [
  { id: 1, name: 'Priya Shah', role: 'Admin', status: 'Active', spend: 18490 },
  { id: 2, name: 'Jordan Lee', role: 'Viewer', status: 'Active', spend: 6420 },
  { id: 3, name: OWNER_NAME, role: 'Super Admin', status: 'Active', spend: 39200 },
  { id: 4, name: 'Taylor Chen', role: 'Admin', status: 'Invited', spend: 0 },
];

function SectionCard({ title, body, children }) {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        {body && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {body}
          </Typography>
        )}
        {children}
      </CardContent>
    </Card>
  );
}

export function ComponentsPage() {
  const navigate = useNavigate();
  const { type } = useParams();
  const active = TYPES.some((item) => item.id === type) ? type : 'buttons';

  const [form, setForm] = useState({ name: OWNER_NAME, email: OWNER_EMAIL, role: 'admin', notify: true });
  const [dialog, setDialog] = useState(null);
  const [toast, setToast] = useState('');
  const [panel, setPanel] = useState(0);
  const [selected, setSelected] = useState([]);
  const [chipFilter, setChipFilter] = useState(['Active', 'Admin']);

  const selectedRows = useMemo(() => TABLE_ROWS.filter((row) => selected.includes(row.id)), [selected]);

  const setType = (_, value) => navigate(`/pages/components/${value}`);

  const toggleRow = (id) => {
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const toggleChip = (label) => {
    setChipFilter((current) => (current.includes(label) ? current.filter((item) => item !== label) : [...current, label]));
  };

  return (
    <div className="c-page p-components">
      <PageHeader
        title="Components"
        crumbs={[{ label: 'UI kit' }, { label: 'Components' }, { label: TYPES.find((item) => item.id === active)?.label ?? 'Buttons' }]}
      />

      <Tabs value={active} onChange={setType} variant="scrollable" scrollButtons="auto" sx={{ mb: 2.5 }}>
        {TYPES.map((item) => (
          <Tab key={item.id} value={item.id} label={item.label} />
        ))}
      </Tabs>

      {active === 'buttons' && (
        <Box display="grid" gap={2} gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}>
          <SectionCard title="Contained" body="Primary actions for save, create, and confirm.">
            <Stack direction="row" flexWrap="wrap" gap={1}>
              <Button variant="contained">Primary</Button>
              <Button variant="contained" color="secondary">
                Secondary
              </Button>
              <Button variant="contained" color="success" startIcon={<SaveOutlinedIcon />}>
                Save
              </Button>
              <Button variant="contained" color="error" startIcon={<DeleteOutlineIcon />}>
                Delete
              </Button>
              <Button variant="contained" disabled>
                Disabled
              </Button>
            </Stack>
          </SectionCard>
          <SectionCard title="Outlined & text" body="Secondary and low-emphasis actions.">
            <Stack direction="row" flexWrap="wrap" gap={1}>
              <Button variant="outlined">Outline</Button>
              <Button variant="outlined" color="error">
                Danger
              </Button>
              <Button variant="text">Text</Button>
              <Button variant="text" startIcon={<AddOutlinedIcon />}>
                Add item
              </Button>
              <IconButton aria-label="Edit" color="primary">
                <EditOutlinedIcon />
              </IconButton>
              <IconButton aria-label="Favorite" color="error">
                <FavoriteBorderOutlinedIcon />
              </IconButton>
            </Stack>
          </SectionCard>
          <SectionCard title="Sizes" body="Match density to the surrounding layout.">
            <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center">
              <Button size="small" variant="contained">
                Small
              </Button>
              <Button size="medium" variant="contained">
                Medium
              </Button>
              <Button size="large" variant="contained">
                Large
              </Button>
            </Stack>
          </SectionCard>
          <SectionCard title="Live action" body="Click to push feedback into a snackbar.">
            <Button
              variant="contained"
              onClick={() => setToast(`Action recorded for ${OWNER_NAME}. Call ${CONTACT_PHONE} if needed.`)}
            >
              Trigger feedback
            </Button>
          </SectionCard>
        </Box>
      )}

      {active === 'cards' && (
        <Box display="grid" gap={2} gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }}>
          {[
            { label: 'Orders today', value: '128', hint: '+12% vs yesterday' },
            { label: 'Revenue', value: formatCurrency(24890), hint: 'Paid in ₹' },
            { label: 'Low stock', value: '3 SKUs', hint: 'Needs restock' },
          ].map((item) => (
            <Card key={item.label} variant="outlined">
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="h4" sx={{ my: 1 }}>
                  {item.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.hint}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View detail</Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}

      {active === 'forms' && (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Team invite form
            </Typography>
            <Box display="grid" gap={2} gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}>
              <TextField
                label="Full name"
                value={form.name}
                onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
                fullWidth
              />
              <TextField
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  label="Role"
                  value={form.role}
                  onChange={(e) => setForm((current) => ({ ...current, role: e.target.value }))}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="viewer">Viewer</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.notify}
                    onChange={(e) => setForm((current) => ({ ...current, notify: e.target.checked }))}
                  />
                }
                label="Send welcome email"
              />
            </Box>
          </CardContent>
          <CardActions sx={{ px: 2, pb: 2 }}>
            <Button
              variant="contained"
              onClick={() => setToast(`Saved ${form.name} as ${form.role}${form.notify ? ' with email' : ''}.`)}
            >
              Save invite
            </Button>
            <Button variant="outlined" onClick={() => setForm({ name: '', email: '', role: 'viewer', notify: false })}>
              Reset
            </Button>
          </CardActions>
        </Card>
      )}

      {active === 'dialogs' && (
        <Box display="grid" gap={2} gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr' }}>
          <SectionCard title="Alert dialog" body="One-step notice.">
            <Button variant="outlined" onClick={() => setDialog('alert')}>
              Open alert
            </Button>
          </SectionCard>
          <SectionCard title="Confirm dialog" body="Ask before a destructive action.">
            <Button variant="outlined" color="error" onClick={() => setDialog('confirm')}>
              Open confirm
            </Button>
          </SectionCard>
          <SectionCard title="Form dialog" body="Collect input without leaving the page.">
            <Button variant="contained" onClick={() => setDialog('form')}>
              Open form
            </Button>
          </SectionCard>
        </Box>
      )}

      {active === 'tables' && (
        <Card variant="outlined">
          <CardContent sx={{ pb: 0 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={1} mb={2}>
              <Box>
                <Typography variant="h6">Users preview</Typography>
                <Typography variant="body2" color="text.secondary">
                  Select rows and run a bulk action.
                </Typography>
              </Box>
              <Button
                variant="contained"
                disabled={!selectedRows.length}
                onClick={() => setToast(`Updated ${selectedRows.length} row(s).`)}
              >
                Bulk update ({selectedRows.length})
              </Button>
            </Stack>
          </CardContent>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.length === TABLE_ROWS.length}
                    indeterminate={selected.length > 0 && selected.length < TABLE_ROWS.length}
                    onChange={(e) => setSelected(e.target.checked ? TABLE_ROWS.map((row) => row.id) : [])}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Spend</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {TABLE_ROWS.map((row) => (
                <TableRow key={row.id} hover selected={selected.includes(row.id)}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={selected.includes(row.id)} onChange={() => toggleRow(row.id)} />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    <Chip size="small" label={row.status} color={row.status === 'Active' ? 'success' : 'warning'} />
                  </TableCell>
                  <TableCell align="right">{formatCurrency(row.spend)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {active === 'tabs' && (
        <Card variant="outlined">
          <Tabs value={panel} onChange={(_, value) => setPanel(value)} sx={{ borderBottom: 1, borderColor: 'divider', px: 1 }}>
            <Tab label="Overview" />
            <Tab label="Orders" />
            <Tab label="Settings" />
          </Tabs>
          <CardContent>
            {panel === 0 && (
              <Typography color="text.secondary">
                Overview panel for {OWNER_NAME}. Support line {CONTACT_PHONE}.
              </Typography>
            )}
            {panel === 1 && (
              <Typography color="text.secondary">Orders panel with totals in {formatCurrency(24890)}.</Typography>
            )}
            {panel === 2 && (
              <Typography color="text.secondary">Settings panel — theme and layout live in Template Customizer.</Typography>
            )}
          </CardContent>
        </Card>
      )}

      {active === 'alerts' && (
        <Stack gap={1.5}>
          <Alert severity="success">Profile saved successfully.</Alert>
          <Alert severity="info">Demo data stays in this browser only.</Alert>
          <Alert severity="warning">Low stock on 3 SKUs.</Alert>
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={() => setToast('Retry queued.')}>
                Retry
              </Button>
            }
          >
            Export failed. Try again or call {CONTACT_PHONE}.
          </Alert>
        </Stack>
      )}

      {active === 'chips' && (
        <Box display="grid" gap={2} gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}>
          <SectionCard title="Status chips" body="Read-only badges for lists.">
            <Stack direction="row" flexWrap="wrap" gap={1}>
              <Chip label="Active" color="success" />
              <Chip label="Pending" color="warning" />
              <Chip label="Viewer" color="info" />
              <Chip label="Draft" variant="outlined" />
              <Chip label="Deleted" color="error" />
            </Stack>
          </SectionCard>
          <SectionCard title="Filter chips" body="Click to toggle filters.">
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {['Active', 'Admin', 'Viewer', 'Invited'].map((label) => (
                <Chip
                  key={label}
                  label={label}
                  color={chipFilter.includes(label) ? 'primary' : 'default'}
                  variant={chipFilter.includes(label) ? 'filled' : 'outlined'}
                  onClick={() => toggleChip(label)}
                  onDelete={chipFilter.includes(label) ? () => toggleChip(label) : undefined}
                />
              ))}
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Selected: {chipFilter.join(', ') || 'none'}
            </Typography>
          </SectionCard>
        </Box>
      )}

      {active === 'avatars' && (
        <Box display="grid" gap={2} gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}>
          <SectionCard title="Initials" body="Use for users without photos.">
            <Stack direction="row" gap={1}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>PS</Avatar>
              <Avatar sx={{ bgcolor: 'info.main' }}>JL</Avatar>
              <Avatar sx={{ bgcolor: 'warning.main' }}>TC</Avatar>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>MR</Avatar>
            </Stack>
          </SectionCard>
          <SectionCard title="Group" body="Stacked faces for shared threads.">
            <AvatarGroup max={4}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>PS</Avatar>
              <Avatar sx={{ bgcolor: 'info.main' }}>JL</Avatar>
              <Avatar sx={{ bgcolor: 'warning.main' }}>TC</Avatar>
              <Avatar sx={{ bgcolor: 'success.main' }}>AK</Avatar>
              <Avatar sx={{ bgcolor: 'error.main' }}>RN</Avatar>
            </AvatarGroup>
          </SectionCard>
        </Box>
      )}

      <Dialog open={dialog === 'alert'} onClose={() => setDialog(null)}>
        <DialogTitle>Heads up</DialogTitle>
        <DialogContent>
          <DialogContentText>This console keeps demo data in the browser only.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(null)} autoFocus>
            Got it
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialog === 'confirm'} onClose={() => setDialog(null)}>
        <DialogTitle>Delete selected rows?</DialogTitle>
        <DialogContent>
          <DialogContentText>This cannot be undone in the demo session.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(null)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setDialog(null);
              setToast('Rows marked deleted.');
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialog === 'form'} onClose={() => setDialog(null)} fullWidth maxWidth="xs">
        <DialogTitle>Quick note</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Note" fullWidth defaultValue={`Call ${OWNER_NAME}`} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(null)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setDialog(null);
              setToast('Note saved.');
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={Boolean(toast)} autoHideDuration={3200} onClose={() => setToast('')} message={toast} />
    </div>
  );
}
