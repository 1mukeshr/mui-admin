import SearchIcon from '@mui/icons-material/Search';
import { openCommandPalette } from './CommandPalette';

export function HeaderSearch() {
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <button type="button" className="c-search c-search--trigger" onClick={openCommandPalette}>
      <span className="c-search-field c-search-field--pill">
        <span className="c-search-field__icon" aria-hidden>
          <SearchIcon fontSize="small" />
        </span>
        <span className="c-search__placeholder">Search workspace…</span>
        <kbd className="c-search__shortcut">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
      </span>
    </button>
  );
}
