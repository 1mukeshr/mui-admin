import { darken, lighten } from '@mui/material/styles';
import { DEFAULT_COLOR_ID, getColorPreset } from './presets';

export const DEFAULT_CUSTOMIZER = {
  preference: 'light',
  colorId: 'teal',
  customColor: '#0d9488',
  skin: 'default',
  semiDark: false,
  menu: 'vertical',
  navbar: 'sticky',
  contentWidth: 'full',
};

export const FEATURED_COLOR_IDS = ['teal', 'blue', 'slate', 'orange', 'rose'];

export function resolveColorPreset(colorId, customColor) {
  if (colorId === 'custom' && /^#([0-9a-fA-F]{6})$/.test(customColor)) {
    return {
      id: 'custom',
      name: 'Custom',
      main: customColor,
      light: lighten(customColor, 0.22),
      dark: darken(customColor, 0.18),
      secondary: customColor,
    };
  }
  return getColorPreset(colorId || DEFAULT_COLOR_ID);
}

export function isCustomizerDirty(state) {
  return Object.keys(DEFAULT_CUSTOMIZER).some((key) => state[key] !== DEFAULT_CUSTOMIZER[key]);
}
