import {
  Badge,
  Box,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Switch,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ColorizeIcon from '@mui/icons-material/Colorize';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import { useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useThemeMode } from '../../contexts/ThemeModeContext';
import { FEATURED_COLOR_IDS } from '../../theme/customizer';
import { getColorPreset } from '../../theme/presets';

const DRAWER_WIDTH = 340;

function SectionLabel({ children }) {
  return (
    <Chip
      size="small"
      label={children}
      sx={{
        mb: 1.5,
        height: 24,
        borderRadius: '999px',
        fontSize: '0.6875rem',
        fontWeight: 600,
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
        color: 'primary.main',
      }}
    />
  );
}

function FieldLabel({ children }) {
  return (
    <Typography variant="caption" sx={{ display: 'block', mb: 0.75, fontWeight: 600, color: 'text.secondary' }}>
      {children}
    </Typography>
  );
}

function OptionCard({ selected, onClick, children, width }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: width ?? 92,
        minHeight: 68,
        px: 0.75,
        py: 0.875,
        borderRadius: '10px',
        cursor: 'pointer',
        flex: width === 'auto' ? 1 : undefined,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
        border: 1.5,
        borderColor: selected ? 'primary.main' : 'divider',
        bgcolor: (theme) => (selected ? alpha(theme.palette.primary.main, 0.08) : 'transparent'),
        '&:hover': { borderColor: 'primary.main' },
      }}
    >
      {children}
    </Box>
  );
}

function LayoutPreview({ variant }) {
  const bar = { height: 5, borderRadius: 1, bgcolor: 'text.disabled', opacity: 0.45 };
  const side = { width: 8, borderRadius: 1, bgcolor: 'text.disabled', opacity: 0.35 };
  return (
    <Box sx={{ width: 44, height: 30, p: 0.4, borderRadius: '5px', border: 1, borderColor: 'divider', display: 'flex', gap: 0.4 }}>
      {variant !== 'horizontal' && <Box sx={{ ...side, width: variant === 'collapsed' ? 5 : 8 }} />}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.4 }}>
        <Box sx={bar} />
        <Box
          sx={{
            flex: 1,
            borderRadius: 0.5,
            border: variant === 'bordered' ? 1 : 0,
            borderColor: 'divider',
            bgcolor: variant === 'default' ? 'action.hover' : 'transparent',
          }}
        />
      </Box>
    </Box>
  );
}

function CustomizerButton() {
  const { user } = useAuth();
  const { customizerOpen, setCustomizerOpen } = useThemeMode();

  if (!user || customizerOpen) return null;

  return (
    <button
      type="button"
      className="c-customizer__fab"
      onClick={() => setCustomizerOpen(true)}
      aria-label="Open template customizer"
      title="Template customizer"
    >
      <PaletteOutlinedIcon fontSize="small" />
    </button>
  );
}

export function TemplateCustomizer() {
  const { user } = useAuth();
  const {
    customizerOpen,
    setCustomizerOpen,
    preference,
    setPreference,
    colorId,
    setColor,
    customColor,
    setCustomColor,
    skin,
    setSkin,
    semiDark,
    setSemiDark,
    menu,
    setMenu,
    navbar,
    setNavbar,
    contentWidth,
    setContentWidth,
    dirty,
    resetCustomizer,
  } = useThemeMode();
  const colorInput = useRef(null);

  useEffect(() => {
    if (!user && customizerOpen) setCustomizerOpen(false);
  }, [user, customizerOpen, setCustomizerOpen]);

  if (!user) return null;

  return (
    <>
      <CustomizerButton />
      <Drawer
      className="c-customizer"
      anchor="right"
      open={customizerOpen}
      onClose={() => setCustomizerOpen(false)}
      PaperProps={{
        className: 'c-customizer__paper',
        sx: {
          width: { xs: '100%', sm: DRAWER_WIDTH },
          borderRadius: 0,
          borderLeft: 1,
          borderColor: 'divider',
        },
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="subtitle1" component="h2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
            Template Customizer
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Preview changes live
          </Typography>
        </Box>
        <Stack direction="row" spacing={0.25} sx={{ flexShrink: 0 }}>
          <Tooltip title="Reset">
            <IconButton size="small" onClick={resetCustomizer} aria-label="Reset customizer">
              <Badge color="error" variant="dot" invisible={!dirty} overlap="circular">
                <RestartAltIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <IconButton size="small" onClick={() => setCustomizerOpen(false)} aria-label="Close customizer">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
      <Divider />

      <Box sx={{ px: 2, py: 2, overflow: 'auto' }}>
        <SectionLabel>Theming</SectionLabel>

        <FieldLabel>Primary Color</FieldLabel>
        <Stack direction="row" spacing={0.75} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
          {FEATURED_COLOR_IDS.map((id) => {
            const preset = getColorPreset(id);
            const selected = colorId === id;
            return (
              <Box
                key={id}
                onClick={() => setColor(id)}
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '6px',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  border: 1.5,
                  borderColor: selected ? 'primary.main' : 'divider',
                  bgcolor: selected ? 'background.paper' : 'action.hover',
                }}
              >
                <Box sx={{ width: 18, height: 18, borderRadius: '5px', bgcolor: preset.main }} />
              </Box>
            );
          })}
          <Box
            onClick={() => colorInput.current?.click()}
            sx={{
              width: 36,
              height: 36,
              borderRadius: '6px',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              border: 1.5,
              borderColor: colorId === 'custom' ? 'primary.main' : 'divider',
              bgcolor: colorId === 'custom' ? 'background.paper' : 'action.hover',
            }}
          >
            <ColorizeIcon sx={{ fontSize: 16, color: colorId === 'custom' ? customColor : 'error.main' }} />
            <input
              ref={colorInput}
              type="color"
              value={customColor}
              onChange={(event) => setCustomColor(event.target.value)}
              style={{ display: 'none' }}
            />
          </Box>
        </Stack>

        <FieldLabel>Theme</FieldLabel>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          {(
            [
              ['light', 'Light', LightModeOutlinedIcon],
              ['dark', 'Dark', DarkModeOutlinedIcon],
              ['system', 'System', DesktopWindowsOutlinedIcon],
            ]
          ).map(([value, label, Icon]) => (
            <OptionCard key={value} selected={preference === value} onClick={() => setPreference(value)} width="auto">
              <Icon sx={{ fontSize: 20, color: preference === value ? 'primary.main' : 'text.secondary' }} />
              <Typography variant="caption" fontWeight={600}>
                {label}
              </Typography>
            </OptionCard>
          ))}
        </Stack>

        <FieldLabel>Skins</FieldLabel>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          {(
            [
              ['default', 'Default'],
              ['bordered', 'Bordered'],
            ]
          ).map(([value, label]) => (
            <OptionCard key={value} selected={skin === value} onClick={() => setSkin(value)}>
              <LayoutPreview variant={value} />
              <Typography variant="caption" fontWeight={600}>
                {label}
              </Typography>
            </OptionCard>
          ))}
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5, minHeight: 32 }}>
          <Typography variant="caption" fontWeight={600} color="text.secondary">
            Semi Dark
          </Typography>
          <Switch size="small" checked={semiDark} onChange={(event) => setSemiDark(event.target.checked)} />
        </Stack>

        <SectionLabel>Layout</SectionLabel>

        <FieldLabel>Menu (Navigation)</FieldLabel>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
          {(
            [
              ['vertical', 'Vertical'],
              ['collapsed', 'Collapsed'],
              ['horizontal', 'Horizontal'],
            ]
          ).map(([value, label]) => (
            <OptionCard key={value} selected={menu === value} onClick={() => setMenu(value)}>
              <LayoutPreview variant={value} />
              <Typography variant="caption" fontWeight={600}>
                {label}
              </Typography>
            </OptionCard>
          ))}
        </Stack>

        <FieldLabel>Navbar</FieldLabel>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
          {(
            [
              ['sticky', 'Sticky'],
              ['static', 'Static'],
              ['hidden', 'Hidden'],
            ]
          ).map(([value, label]) => (
            <OptionCard key={value} selected={navbar === value} onClick={() => setNavbar(value)} width={96}>
              <Typography variant="caption" fontWeight={600}>
                {label}
              </Typography>
            </OptionCard>
          ))}
        </Stack>

        <FieldLabel>Content Width</FieldLabel>
        <Stack direction="row" spacing={1}>
          {(
            [
              ['full', 'Full'],
              ['boxed', 'Boxed'],
            ]
          ).map(([value, label]) => (
            <OptionCard key={value} selected={contentWidth === value} onClick={() => setContentWidth(value)}>
              <Typography variant="caption" fontWeight={600}>
                {label}
              </Typography>
            </OptionCard>
          ))}
        </Stack>
      </Box>
    </Drawer>
    </>
  );
}
