import { alpha, createTheme } from '@mui/material/styles';
import { resolveColorPreset } from './customizer';

export function buildTheme(
  mode,
  colorId = 'indigo',
  options = {},
) {
  const preset = resolveColorPreset(colorId, options.customColor ?? '#7367F0');
  const isLight = mode === 'light';
  const bordered = options.skin === 'bordered';
  const primary = isLight ? preset.main : preset.light;
  const paper = isLight ? '#ffffff' : '#121c1f';
  const background = isLight ? '#eef2f4' : '#0a1214';
  const textPrimary = isLight ? '#0f172a' : '#e8eefc';
  const textSecondary = isLight ? '#64748b' : '#94a3b8';
  const divider = bordered
    ? isLight
      ? 'rgba(15, 23, 42, 0.14)'
      : 'rgba(232, 238, 252, 0.18)'
    : isLight
      ? 'rgba(15, 23, 42, 0.08)'
      : 'rgba(232, 238, 252, 0.1)';

  return createTheme({
    palette: {
      mode,
      primary: { main: primary, light: preset.light, dark: preset.dark, contrastText: '#fff' },
      secondary: { main: isLight ? preset.secondary : alpha(preset.secondary, 0.92) },
      success: { main: isLight ? '#059669' : '#34d399' },
      warning: { main: isLight ? '#d97706' : '#fbbf24' },
      error: { main: isLight ? '#e11d48' : '#fb7185' },
      info: { main: isLight ? '#0284c7' : '#38bdf8' },
      background: { default: background, paper },
      text: { primary: textPrimary, secondary: textSecondary },
      divider,
      action: {
        hover: isLight ? 'rgba(15, 23, 42, 0.04)' : 'rgba(232, 238, 252, 0.06)',
        selected: alpha(primary, isLight ? 0.1 : 0.18),
        disabled: isLight ? 'rgba(15, 23, 42, 0.26)' : 'rgba(232, 238, 252, 0.3)',
        disabledBackground: isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(232, 238, 252, 0.08)',
      },
    },
    typography: {
      fontFamily: '"Outfit", sans-serif',
      allVariants: {
        fontFamily: '"Outfit", sans-serif',
      },
      h1: { fontWeight: 600, letterSpacing: '-0.02em' },
      h2: { fontWeight: 600, letterSpacing: '-0.02em' },
      h3: { fontWeight: 600, letterSpacing: '-0.02em' },
      h4: { fontWeight: 600, letterSpacing: '-0.02em' },
      h5: { fontWeight: 600, letterSpacing: '-0.02em' },
      h6: { fontWeight: 600, letterSpacing: '-0.02em' },
      subtitle1: { fontWeight: 600 },
      subtitle2: { fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600, fontFamily: '"Outfit", sans-serif' },
    },
    shape: { borderRadius: 12 },
    spacing: 8,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': { colorScheme: mode },
          html: { overflowX: 'clip' },
          body: {
            fontFamily: '"Outfit", sans-serif',
            backgroundColor: background,
            backgroundImage: `radial-gradient(1200px 500px at 80% -10%, ${alpha(primary, isLight ? 0.1 : 0.18)}, transparent 50%)`,
          },
          '*': {
            scrollbarWidth: 'thin',
            scrollbarColor: isLight ? 'rgba(100, 116, 139, 0.45) transparent' : 'rgba(148, 163, 184, 0.35) transparent',
          },
          'input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill': {
            WebkitTextFillColor: textPrimary,
            caretColor: textPrimary,
            boxShadow: `0 0 0 1000px ${paper} inset`,
            transition: 'background-color 9999s ease-out 0s',
          },
          '::selection': {
            backgroundColor: alpha(primary, 0.24),
          },
          strong: { fontWeight: 500 },
          b: { fontWeight: 500 },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 6, paddingInline: 16, minHeight: 36 },
          containedPrimary: {
            color: '#fff',
            backgroundColor: primary,
            backgroundImage: 'none',
            '&:hover': {
              backgroundColor: preset.dark,
              backgroundImage: 'none',
            },
          },
          outlined: { borderColor: divider },
          sizeLarge: { minHeight: 42 },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: textSecondary,
            '&:hover': { backgroundColor: isLight ? 'rgba(15, 23, 42, 0.06)' : 'rgba(232, 238, 252, 0.08)' },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none', backgroundColor: paper },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            overflow: 'hidden',
            backgroundColor: paper,
            border: `1px solid ${divider}`,
            boxShadow: bordered ? 'none' : isLight ? '0 8px 20px rgba(15, 23, 42, 0.04)' : '0 8px 20px rgba(0,0,0,0.28)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          regular: { minHeight: 72, '@media (min-width: 600px)': { minHeight: 72 } },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: 20,
            '&:last-child': { paddingBottom: 20 },
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          root: { padding: '16px 20px' },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: { borderRadius: 8 },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: { marginRight: 16, marginLeft: 0, alignItems: 'center' },
        },
      },
      MuiRadioGroup: {
        styleOverrides: {
          root: { flexWrap: 'wrap' },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            overflowX: 'auto',
            borderRadius: 0,
          },
        },
      },
      MuiTable: {
        defaultProps: { size: 'medium' },
        styleOverrides: {
          root: { minWidth: 640 },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: divider,
            fontSize: '0.875rem',
            padding: '14px 16px',
          },
          head: {
            fontWeight: 600,
            fontSize: '0.72rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: textSecondary,
            backgroundColor: isLight ? '#eef2f4' : alpha('#fff', 0.04),
            whiteSpace: 'nowrap',
          },
          sizeSmall: { padding: '9px 16px' },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:hover': { backgroundColor: alpha(primary, isLight ? 0.05 : 0.08) },
            '&:last-child td': { borderBottom: 0 },
          },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          root: {
            borderTop: `1px solid ${divider}`,
            backgroundColor: isLight ? alpha('#eef2f4', 0.55) : alpha('#fff', 0.03),
          },
          toolbar: { minHeight: 56 },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: { backgroundImage: 'none' },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: paper,
            border: `1px solid ${divider}`,
            backgroundImage: 'none',
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            marginInline: 4,
            '&:hover': { backgroundColor: alpha(primary, isLight ? 0.06 : 0.12) },
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: { backgroundColor: paper, backgroundImage: 'none' },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: { backgroundColor: paper, backgroundImage: 'none', borderRadius: 12 },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            backgroundColor: isLight ? alpha('#fff', 0.9) : alpha('#fff', 0.04),
            '& fieldset': { borderColor: divider },
            '&:hover fieldset': { borderColor: isLight ? 'rgba(15, 23, 42, 0.18)' : 'rgba(232, 238, 252, 0.2)' },
            '&.Mui-focused fieldset': { borderColor: `${primary} !important` },
          },
        },
      },
      MuiTabs: {
        defaultProps: { scrollButtons: 'auto' },
        styleOverrides: {
          indicator: { height: 3, borderRadius: 3, backgroundColor: primary },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: { color: textSecondary, '&.Mui-selected': { color: primary } },
        },
      },
      MuiChip: {
        defaultProps: { size: 'small' },
        styleOverrides: {
          root: {
            fontWeight: 400,
            height: 22,
            fontSize: 12,
            borderRadius: 6,
          },
          sizeSmall: {
            height: 20,
            fontSize: 11,
          },
          label: { paddingLeft: 8, paddingRight: 8 },
          labelSmall: { paddingLeft: 6, paddingRight: 6 },
          outlined: { borderColor: divider },
        },
      },
      MuiBadge: {
        styleOverrides: {
          badge: {
            fontWeight: 400,
            fontSize: 10,
            minWidth: 16,
            height: 16,
            padding: '0 4px',
            lineHeight: '16px',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: { borderColor: divider },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 8,
            backgroundColor: isLight ? '#0f172a' : '#e8eefc',
            color: isLight ? '#fff' : '#0a1214',
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            '&.Mui-checked': { color: primary },
            '&.Mui-checked + .MuiSwitch-track': { backgroundColor: primary },
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 6,
            borderColor: divider,
            color: textSecondary,
            '&.Mui-selected': {
              color: primary,
              backgroundColor: alpha(primary, isLight ? 0.1 : 0.2),
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: alpha(primary, isLight ? 0.1 : 0.18),
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: { '&.Mui-checked': { color: primary } },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: { '&.Mui-checked': { color: primary } },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          bar: { backgroundColor: primary },
        },
      },
    },
  });
}

export function chartTooltipStyle(mode) {
  return {
    backgroundColor: mode === 'light' ? '#ffffff' : '#121c1f',
    border: mode === 'light' ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(232,238,252,0.1)',
    borderRadius: 8,
    color: mode === 'light' ? '#0f172a' : '#e8eefc',
  };
}
