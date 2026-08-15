export const COLOR_PRESETS = [
  { id: 'indigo', name: 'Indigo', main: '#4f46e5', light: '#818cf8', dark: '#3730a3', secondary: '#06b6d4' },
  { id: 'blue', name: 'Blue', main: '#2563eb', light: '#60a5fa', dark: '#1d4ed8', secondary: '#0ea5e9' },
  { id: 'cyan', name: 'Cyan', main: '#0891b2', light: '#22d3ee', dark: '#0e7490', secondary: '#6366f1' },
  { id: 'teal', name: 'Teal', main: '#0d9488', light: '#2dd4bf', dark: '#0f766e', secondary: '#38bdf8' },
  { id: 'green', name: 'Green', main: '#16a34a', light: '#4ade80', dark: '#15803d', secondary: '#14b8a6' },
  { id: 'orange', name: 'Orange', main: '#ea580c', light: '#fb923c', dark: '#c2410c', secondary: '#f59e0b' },
  { id: 'rose', name: 'Rose', main: '#e11d48', light: '#fb7185', dark: '#be123c', secondary: '#f43f5e' },
  { id: 'purple', name: 'Purple', main: '#7c3aed', light: '#a78bfa', dark: '#6d28d9', secondary: '#ec4899' },
  { id: 'slate', name: 'Slate', main: '#334155', light: '#94a3b8', dark: '#1e293b', secondary: '#0ea5e9' },
];

export const DEFAULT_COLOR_ID = 'teal';

export function getColorPreset(id) {
  return COLOR_PRESETS.find((preset) => preset.id === id) ?? COLOR_PRESETS[0];
}
