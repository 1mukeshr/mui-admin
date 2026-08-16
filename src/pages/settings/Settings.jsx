import {
  Alert,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  MenuItem,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { CONTACT_PHONE, OWNER_EMAIL } from '../../data/seed';
import { BRAND_FULL } from '../../data/brand';
import { useAuth } from '../../contexts/AuthContext';
import { useThemeMode } from '../../contexts/ThemeModeContext';
import { loadState, saveState } from '../../utils/storage';

const SECTIONS = ['profile', 'security', 'notifications', 'appearance', 'general'];

const DEFAULT_SETTINGS = {
  profile: { name: '', email: '', phone: CONTACT_PHONE, department: '', bio: '' },
  security: { twoFactor: false, sessionTimeout: 30 },
  notifications: { emailOrders: true, emailUsers: true, pushOrders: true, pushSystem: false },
  appearance: { mode: 'system', compactSidebar: false, density: 'comfortable' },
  general: { language: 'en', timezone: 'Asia/Kolkata', currency: 'INR', dateFormat: 'MMM d, yyyy' },
};

export function Settings() {
  const { user, updateProfile, users, setUsers, hasPermission } = useAuth();
  const { mode, preference, setPreference } = useThemeMode();
  const { section } = useParams();
  const navigate = useNavigate();
  const tab = Math.max(0, SECTIONS.indexOf(section ?? 'profile'));
  const [saved, setSaved] = useState(false);
  const [password, setPassword] = useState({ current: '', next: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [settings, setSettings] = useState(() => {
    const stored = loadState('settings', DEFAULT_SETTINGS);
    return {
      ...stored,
      profile: {
        name: user?.name ?? '',
        email: user?.email ?? '',
        phone: user?.phone ?? CONTACT_PHONE,
        department: user?.department ?? '',
        bio: stored.profile.bio || (user?.email === OWNER_EMAIL ? `Workspace owner for ${BRAND_FULL}.` : ''),
      },
      appearance: { ...stored.appearance, mode: preference },
      general: { ...stored.general, currency: 'INR' },
    };
  });

  const persist = (next) => {
    setSettings(next);
    saveState('settings', next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  const canEdit = hasPermission('settings.edit');

  return (
    <>
      <PageHeader title="Settings" />
      {saved && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Settings saved.
        </Alert>
      )}
      <Card>
        <Tabs value={tab} onChange={(_, value) => navigate(`/settings/${SECTIONS[value]}`)} variant="scrollable" scrollButtons="auto">
          <Tab label="Profile" />
          <Tab label="Security" />
          <Tab label="Notifications" />
          <Tab label="Appearance" />
          <Tab label="General" />
        </Tabs>
        <CardContent>
          {tab === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  value={settings.profile.name}
                  onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, name: e.target.value } })}
                  fullWidth
                  disabled={!canEdit}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  value={settings.profile.email}
                  onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, email: e.target.value } })}
                  fullWidth
                  disabled={!canEdit}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Phone"
                  value={settings.profile.phone}
                  onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, phone: e.target.value } })}
                  fullWidth
                  disabled={!canEdit}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Department"
                  value={settings.profile.department}
                  onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, department: e.target.value } })}
                  fullWidth
                  disabled={!canEdit}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Bio"
                  value={settings.profile.bio}
                  onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, bio: e.target.value } })}
                  fullWidth
                  multiline
                  minRows={3}
                  disabled={!canEdit}
                />
              </Grid>
              {canEdit && (
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      updateProfile(settings.profile);
                      persist(settings);
                    }}
                  >
                    Save profile
                  </Button>
                </Grid>
              )}
            </Grid>
          )}

          {tab === 1 && (
            <Stack spacing={2} maxWidth={480}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.security.twoFactor}
                    disabled={!canEdit}
                    onChange={(e) => persist({ ...settings, security: { ...settings.security, twoFactor: e.target.checked } })}
                  />
                }
                label="Two-factor authentication"
              />
              <TextField
                select
                label="Session timeout (minutes)"
                value={settings.security.sessionTimeout}
                disabled={!canEdit}
                onChange={(e) => persist({ ...settings, security: { ...settings.security, sessionTimeout: Number(e.target.value) } })}
              >
                {[15, 30, 60, 120].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
              {passwordError && <Alert severity="error">{passwordError}</Alert>}
              <TextField label="Current password" type="password" value={password.current} onChange={(e) => setPassword({ ...password, current: e.target.value })} />
              <TextField label="New password" type="password" value={password.next} onChange={(e) => setPassword({ ...password, next: e.target.value })} />
              <TextField label="Confirm new password" type="password" value={password.confirm} onChange={(e) => setPassword({ ...password, confirm: e.target.value })} />
              <Button
                variant="contained"
                disabled={!canEdit}
                onClick={() => {
                  const current = users.find((item) => item.id === user?.id);
                  if (!current || current.password !== password.current) {
                    setPasswordError('Current password is incorrect.');
                    return;
                  }
                  if (password.next.length < 6 || password.next !== password.confirm) {
                    setPasswordError('New passwords must match and be at least 6 characters.');
                    return;
                  }
                  setUsers(users.map((item) => (item.id === user?.id ? { ...item, password: password.next } : item)));
                  setPassword({ current: '', next: '', confirm: '' });
                  setPasswordError('');
                  setSaved(true);
                }}
              >
                Update password
              </Button>
            </Stack>
          )}

          {tab === 2 && (
            <Stack>
              {(
                [
                  ['emailOrders', 'Email me about new orders'],
                  ['emailUsers', 'Email me about user changes'],
                  ['pushOrders', 'Push notifications for orders'],
                  ['pushSystem', 'System alerts'],
                ]
              ).map(([key, label]) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Switch
                      checked={settings.notifications[key]}
                      disabled={!canEdit}
                      onChange={(e) =>
                        persist({
                          ...settings,
                          notifications: { ...settings.notifications, [key]: e.target.checked },
                        })
                      }
                    />
                  }
                  label={label}
                />
              ))}
            </Stack>
          )}

          {tab === 3 && (
            <Stack spacing={2}>
              <Typography variant="subtitle2">Color mode</Typography>
              <ToggleButtonGroup
                exclusive
                sx={{ flexWrap: 'wrap' }}
                value={preference}
                onChange={(_, value) => {
                  if (!value) return;
                  setPreference(value);
                  persist({ ...settings, appearance: { ...settings.appearance, mode: value } });
                }}
              >
                <ToggleButton value="light">Light</ToggleButton>
                <ToggleButton value="dark">Dark</ToggleButton>
                <ToggleButton value="system">System</ToggleButton>
              </ToggleButtonGroup>
              <Typography variant="body2" color="text.secondary">
                Active theme: {mode}. Open Template Customizer from the header to change color, skin, and layout.
              </Typography>
              <TextField
                select
                label="Density"
                value={settings.appearance.density}
                onChange={(e) =>
                  persist({
                    ...settings,
                    appearance: { ...settings.appearance, density: e.target.value },
                  })
                }
                sx={{ maxWidth: 280 }}
              >
                <MenuItem value="comfortable">Comfortable</MenuItem>
                <MenuItem value="compact">Compact</MenuItem>
              </TextField>
            </Stack>
          )}

          {tab === 4 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="Language"
                  value={settings.general.language}
                  onChange={(e) => persist({ ...settings, general: { ...settings.general, language: e.target.value } })}
                  fullWidth
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="Timezone"
                  value={settings.general.timezone}
                  onChange={(e) => persist({ ...settings, general: { ...settings.general, timezone: e.target.value } })}
                  fullWidth
                >
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="America/New_York">America/New_York</MenuItem>
                  <MenuItem value="Europe/London">Europe/London</MenuItem>
                  <MenuItem value="Asia/Kolkata">Asia/Kolkata</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="Currency"
                  value={settings.general.currency}
                  onChange={(e) => persist({ ...settings, general: { ...settings.general, currency: e.target.value } })}
                  fullWidth
                >
                  <MenuItem value="INR">INR (₹)</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="Date format"
                  value={settings.general.dateFormat}
                  onChange={(e) => persist({ ...settings, general: { ...settings.general, dateFormat: e.target.value } })}
                  fullWidth
                >
                  <MenuItem value="MMM d, yyyy">MMM d, yyyy</MenuItem>
                  <MenuItem value="yyyy-MM-dd">yyyy-MM-dd</MenuItem>
                  <MenuItem value="dd/MM/yyyy">dd/MM/yyyy</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </>
  );
}
