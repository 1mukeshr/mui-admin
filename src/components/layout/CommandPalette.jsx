import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import NorthEastOutlinedIcon from '@mui/icons-material/NorthEastOutlined';
import { flattenSearchSections, useWorkspaceSearch } from '../../hooks/useWorkspaceSearch';
import { useThemeMode } from '../../contexts/ThemeModeContext';

function isModK(event) {
  return (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listId = useId();
  const navigate = useNavigate();
  const { setCustomizerOpen } = useThemeMode();
  const result = useWorkspaceSearch(query);
  const flat = useMemo(() => flattenSearchSections(result.sections), [result.sections]);

  useEffect(() => {
    const onKey = (event) => {
      if (isModK(event)) {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    setQuery('');
    setActive(0);
    const id = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('tejas-mui:open-command-palette', onOpen);
    return () => window.removeEventListener('tejas-mui:open-command-palette', onOpen);
  }, []);

  const run = (item) => {
    if (!item) return;
    setOpen(false);
    setQuery('');
    if (item.to === '#customizer') {
      setCustomizerOpen(true);
      return;
    }
    navigate(item.to);
  };

  if (!open) return null;

  let offset = 0;

  return (
    <div className="c-cmd" role="presentation">
      <button type="button" className="c-cmd__backdrop" aria-label="Close command palette" onClick={() => setOpen(false)} />
      <div className="c-cmd__panel" role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="c-cmd__field">
          <SearchIcon fontSize="small" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Jump to a page or record…"
            aria-controls={listId}
            aria-autocomplete="list"
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                setActive((value) => Math.min(value + 1, Math.max(flat.length - 1, 0)));
              } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                setActive((value) => Math.max(value - 1, 0));
              } else if (event.key === 'Enter') {
                event.preventDefault();
                run(flat[active]);
              }
            }}
          />
          <kbd className="c-cmd__kbd">esc</kbd>
        </div>

        <div id={listId} className="c-cmd__scroll" role="listbox">
          {flat.length === 0 ? (
            <p className="c-cmd__empty">Nothing matches “{query}”</p>
          ) : (
            result.sections.map((section) => {
              const start = offset;
              offset += section.items.length;
              return (
                <section key={section.label} className="c-cmd__section" aria-label={section.label}>
                  <h2 className="c-cmd__label">{section.label}</h2>
                  <ul className="c-cmd__list">
                    {section.items.map((item, localIndex) => {
                      const index = start + localIndex;
                      const Icon = item.Icon;
                      return (
                        <li key={item.id} role="option" aria-selected={index === active}>
                          <button
                            type="button"
                            className={`c-cmd__hit ${index === active ? 'is-active' : ''}`}
                            onMouseEnter={() => setActive(index)}
                            onClick={() => run(item)}
                          >
                            <span className="c-cmd__icon" aria-hidden>
                              {Icon ? <Icon fontSize="small" /> : null}
                            </span>
                            <span className="c-cmd__hit-copy">
                              <strong>{item.title}</strong>
                              <span>{item.subtitle}</span>
                            </span>
                            <span className="c-cmd__hint" aria-hidden>
                              <NorthEastOutlinedIcon fontSize="inherit" />
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })
          )}
        </div>

        <footer className="c-cmd__foot">
          <span>
            <kbd>↑↓</kbd> move
          </span>
          <span>
            <kbd>↵</kbd> open
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
        </footer>
      </div>
    </div>
  );
}

export function openCommandPalette() {
  window.dispatchEvent(new Event('tejas-mui:open-command-palette'));
}
