import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import TabOutlinedIcon from '@mui/icons-material/TabOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { SearchField } from '../../components/common/SearchField';

const TYPES = [
  { id: 'gallery', label: 'Gallery' },
  { id: 'colored', label: 'Colored' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'buttons', label: 'Buttons' },
];

const ICONS = [
  { name: 'DashboardOutlined', Icon: DashboardOutlinedIcon, group: 'Console' },
  { name: 'PeopleOutline', Icon: PeopleOutlineIcon, group: 'Console' },
  { name: 'GroupsOutlined', Icon: GroupsOutlinedIcon, group: 'Console' },
  { name: 'Inventory2Outlined', Icon: Inventory2OutlinedIcon, group: 'Console' },
  { name: 'ReceiptLongOutlined', Icon: ReceiptLongOutlinedIcon, group: 'Console' },
  { name: 'ShoppingCartOutlined', Icon: ShoppingCartOutlinedIcon, group: 'Console' },
  { name: 'AssessmentOutlined', Icon: AssessmentOutlinedIcon, group: 'Console' },
  { name: 'AdminPanelSettingsOutlined', Icon: AdminPanelSettingsOutlinedIcon, group: 'Console' },
  { name: 'ChatBubbleOutline', Icon: ChatBubbleOutlineIcon, group: 'Console' },
  { name: 'QuizOutlined', Icon: QuizOutlinedIcon, group: 'Console' },
  { name: 'TabOutlined', Icon: TabOutlinedIcon, group: 'Console' },
  { name: 'NotificationsNoneOutlined', Icon: NotificationsNoneOutlinedIcon, group: 'Console' },
  { name: 'HomeOutlined', Icon: HomeOutlinedIcon, group: 'Actions' },
  { name: 'Search', Icon: SearchIcon, group: 'Actions' },
  { name: 'AddOutlined', Icon: AddOutlinedIcon, group: 'Actions' },
  { name: 'EditOutlined', Icon: EditOutlinedIcon, group: 'Actions' },
  { name: 'DeleteOutline', Icon: DeleteOutlineIcon, group: 'Actions' },
  { name: 'ContentCopyOutlined', Icon: ContentCopyOutlinedIcon, group: 'Actions' },
  { name: 'VisibilityOutlined', Icon: VisibilityOutlinedIcon, group: 'Actions' },
  { name: 'SendOutlined', Icon: SendOutlinedIcon, group: 'Actions' },
  { name: 'PrintOutlined', Icon: PrintOutlinedIcon, group: 'Actions' },
  { name: 'AttachFileOutlined', Icon: AttachFileOutlinedIcon, group: 'Actions' },
  { name: 'SettingsOutlined', Icon: SettingsOutlinedIcon, group: 'System' },
  { name: 'TuneOutlined', Icon: TuneOutlinedIcon, group: 'System' },
  { name: 'LockOutlined', Icon: LockOutlinedIcon, group: 'System' },
  { name: 'DarkModeOutlined', Icon: DarkModeOutlinedIcon, group: 'System' },
  { name: 'MailOutline', Icon: MailOutlineIcon, group: 'System' },
  { name: 'PhoneOutlined', Icon: PhoneOutlinedIcon, group: 'System' },
  { name: 'CalendarMonthOutlined', Icon: CalendarMonthOutlinedIcon, group: 'System' },
  { name: 'LocalOfferOutlined', Icon: LocalOfferOutlinedIcon, group: 'System' },
  { name: 'CheckCircleOutline', Icon: CheckCircleOutlineIcon, group: 'Status' },
  { name: 'InfoOutlined', Icon: InfoOutlinedIcon, group: 'Status' },
  { name: 'WarningAmberOutlined', Icon: WarningAmberOutlinedIcon, group: 'Status' },
  { name: 'ErrorOutline', Icon: ErrorOutlineIcon, group: 'Status' },
  { name: 'StarBorderOutlined', Icon: StarBorderOutlinedIcon, group: 'Status' },
  { name: 'FavoriteBorderOutlined', Icon: FavoriteBorderOutlinedIcon, group: 'Status' },
];

const COLORS = [
  { label: 'Primary', color: 'primary.main' },
  { label: 'Success', color: 'success.main' },
  { label: 'Warning', color: 'warning.main' },
  { label: 'Error', color: 'error.main' },
  { label: 'Info', color: 'info.main' },
  { label: 'Secondary', color: 'text.secondary' },
];

const SIZES = [
  { label: 'Small', fontSize: 18 },
  { label: 'Medium', fontSize: 24 },
  { label: 'Large', fontSize: 32 },
  { label: 'Display', fontSize: 42 },
];

export function IconsPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const tab = Math.max(0, TYPES.findIndex((item) => item.id === type));
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ICONS.filter((item) => !q || item.name.toLowerCase().includes(q) || item.group.toLowerCase().includes(q));
  }, [query]);

  const copy = async (name) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(name);
    } catch {
      setCopied(name);
    }
  };

  return (
    <>
      <PageHeader
        title="Icons"
        crumbs={[{ label: 'Pages' }, { label: 'Icons' }, { label: TYPES[tab].label }]}
      />
      <Card>
        <Tabs value={tab} onChange={(_, value) => navigate(`/pages/icons/${TYPES[value].id}`)} variant="scrollable" scrollButtons="auto">
          {TYPES.map((item) => (
            <Tab key={item.id} label={item.label} />
          ))}
        </Tabs>
        <CardContent>
          {tab === 0 && (
            <Stack spacing={2}>
              <SearchField
                className="c-search-field--wide"
                placeholder="Search icons"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Grid container spacing={1.5}>
                {filtered.map((item) => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={item.name}>
                    <Tooltip title="Copy name">
                      <Box
                        onClick={() => copy(item.name)}
                        sx={{
                          p: 1.5,
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: '8px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'background-color 180ms ease, border-color 180ms ease',
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
                            color: 'primary.main',
                          },
                        }}
                      >
                        <item.Icon />
                        <Typography variant="caption" display="block" noWrap sx={{ mt: 0.75 }}>
                          {item.name.replace('Outlined', '')}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </Grid>
                ))}
              </Grid>
              {filtered.length === 0 && (
                <Typography color="text.secondary" textAlign="center" sx={{ py: 4 }}>
                  No icons match “{query}”.
                </Typography>
              )}
            </Stack>
          )}

          {tab === 1 && (
            <Grid container spacing={2}>
              {COLORS.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.label}>
                  <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: '8px' }}>
                    <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                      {item.label}
                    </Typography>
                    <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                      {ICONS.slice(0, 8).map((icon) => (
                        <icon.Icon key={icon.name} sx={{ color: item.color }} />
                      ))}
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          {tab === 2 && (
            <Grid container spacing={2}>
              {SIZES.map((item) => (
                <Grid item xs={12} sm={6} key={item.label}>
                  <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: '8px' }}>
                    <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                      {item.label} · {item.fontSize}px
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
                      {ICONS.slice(0, 6).map((icon) => (
                        <icon.Icon key={icon.name} sx={{ fontSize: item.fontSize }} />
                      ))}
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          {tab === 3 && (
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                  Icon buttons
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <IconButton color="primary">
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton color="success">
                    <CheckCircleOutlineIcon />
                  </IconButton>
                  <IconButton color="warning">
                    <WarningAmberOutlinedIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteOutlineIcon />
                  </IconButton>
                  <IconButton>
                    <SettingsOutlinedIcon />
                  </IconButton>
                </Stack>
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                  Buttons with icons
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Button variant="contained" startIcon={<AddOutlinedIcon />}>
                    Add product
                  </Button>
                  <Button variant="outlined" startIcon={<SearchIcon />}>
                    Search orders
                  </Button>
                  <Button variant="contained" color="error" startIcon={<DeleteOutlineIcon />}>
                    Delete
                  </Button>
                  <Button variant="outlined" endIcon={<SendOutlinedIcon />}>
                    Send
                  </Button>
                </Stack>
              </Box>
            </Stack>
          )}
        </CardContent>
      </Card>
      <Snackbar open={Boolean(copied)} autoHideDuration={2000} onClose={() => setCopied('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" onClose={() => setCopied('')}>
          Copied {copied}
        </Alert>
      </Snackbar>
    </>
  );
}
