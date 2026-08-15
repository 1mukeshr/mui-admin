import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { buildTheme } from '../theme';
import {
  DEFAULT_CUSTOMIZER,
  isCustomizerDirty,
  resolveColorPreset,
} from '../theme/customizer';
import { COLOR_PRESETS, DEFAULT_COLOR_ID } from '../theme/presets';
import { loadState, saveState } from '../utils/storage';

const ThemeModeContext = createContext(null);

function systemMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveMode(preference) {
  return preference === 'system' ? systemMode() : preference;
}

function loadCustomizer() {
  const stored = loadState('customizer', {});
  const legacyPreference = loadState('themePreference', null);
  const legacyColor = loadState('themeColor', DEFAULT_COLOR_ID);
  const colorId = stored.colorId ?? (COLOR_PRESETS.some((preset) => preset.id === legacyColor) ? legacyColor : DEFAULT_CUSTOMIZER.colorId);
  const menu = stored.menu === 'collapsed' || stored.menu === 'horizontal' ? stored.menu : 'vertical';
  const next = {
    ...DEFAULT_CUSTOMIZER,
    ...stored,
    preference:
      stored.preference ??
      (legacyPreference === 'light' || legacyPreference === 'dark' || legacyPreference === 'system' ? legacyPreference : DEFAULT_CUSTOMIZER.preference),
    colorId,
    // Keep left sidebar available: horizontal hid the side nav for many users.
    menu: menu === 'horizontal' ? 'vertical' : menu,
  };
  saveState('customizer', next);
  return next;
}

function applyDocumentTheme(mode, state) {
  const preset = resolveColorPreset(state.colorId, state.customColor);
  const isLight = mode === 'light';
  const primary = isLight ? preset.main : preset.light;
  const root = document.documentElement;
  root.style.colorScheme = mode;
  root.dataset.theme = mode;
  root.dataset.color = state.colorId;
  root.dataset.skin = state.skin;
  root.dataset.menu = state.menu;
  root.dataset.navbar = state.navbar;
  root.dataset.content = state.contentWidth;
  root.dataset.semidark = state.semiDark ? 'true' : 'false';
  root.style.setProperty('--theme-primary', primary);
  root.style.setProperty('--theme-primary-light', preset.light);
  root.style.setProperty('--theme-primary-dark', preset.dark);
  root.style.setProperty('--theme-secondary', preset.secondary);
  root.style.setProperty('--theme-bg', isLight ? '#eef2f4' : '#0a1214');
  root.style.setProperty('--theme-paper', isLight ? '#ffffff' : '#121c1f');
  root.style.setProperty('--theme-text', isLight ? '#102027' : '#e7f0f2');
  root.style.setProperty('--theme-muted', isLight ? '#5b6b73' : '#92a4ab');
  root.style.setProperty('--theme-divider', isLight ? 'rgba(16, 32, 39, 0.08)' : 'rgba(231, 240, 242, 0.1)');
  root.style.setProperty('--theme-hover', isLight ? 'rgba(16, 32, 39, 0.045)' : 'rgba(231, 240, 242, 0.06)');
}

const bootCustomizer = loadCustomizer();
applyDocumentTheme(resolveMode(bootCustomizer.preference), bootCustomizer);

export function ThemeModeProvider({ children }) {
  const [state, setState] = useState(loadCustomizer);
  const [mode, setModeState] = useState(() => resolveMode(loadCustomizer().preference));
  const [customizerOpen, setCustomizerOpen] = useState(false);

  const persist = (next) => {
    const resolved = resolveMode(next.preference);
    setState(next);
    setModeState(resolved);
    saveState('customizer', next);
    saveState('themePreference', next.preference);
    saveState('theme', resolved);
    saveState('themeColor', next.colorId);
    applyDocumentTheme(resolved, next);
  };

  const patch = (partial) => persist({ ...state, ...partial });

  useEffect(() => {
    applyDocumentTheme(mode, state);
  }, [mode, state]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (state.preference === 'system') {
        const resolved = systemMode();
        setModeState(resolved);
        saveState('theme', resolved);
        applyDocumentTheme(resolved, state);
      }
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [state]);

  const value = useMemo(
    () => ({
      ...state,
      mode,
      dirty: isCustomizerDirty(state),
      customizerOpen,
      setCustomizerOpen,
      setPreference: (preference) => patch({ preference }),
      setColor: (colorId) => patch({ colorId }),
      setCustomColor: (hex) => patch({ colorId: 'custom', customColor: hex }),
      setSkin: (skin) => patch({ skin }),
      setSemiDark: (semiDark) => patch({ semiDark }),
      setMenu: (menu) => patch({ menu }),
      setNavbar: (navbar) => patch({ navbar }),
      setContentWidth: (contentWidth) => patch({ contentWidth }),
      setMode: (next) => patch({ preference: next }),
      toggleMode: () => patch({ preference: mode === 'light' ? 'dark' : 'light' }),
      resetCustomizer: () => persist(DEFAULT_CUSTOMIZER),
    }),
    [customizerOpen, mode, state],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={buildTheme(mode, state.colorId, { skin: state.skin, customColor: state.customColor })}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (!context) throw new Error('useThemeMode must be used within ThemeModeProvider');
  return context;
}
