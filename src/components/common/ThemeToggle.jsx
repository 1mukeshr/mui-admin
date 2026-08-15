import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useThemeMode } from '../../contexts/ThemeModeContext';

export function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();
  return (
    <button
      type="button"
      className="l-icon-btn"
      onClick={toggleMode}
      aria-label={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
    </button>
  );
}
