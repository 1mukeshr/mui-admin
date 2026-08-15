import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useId } from 'react';

export function SearchField({
  value,
  onChange,
  placeholder = 'Search',
  label = 'Search',
  variant = 'box',
  className = '',
  onFocus,
  name,
}) {
  const id = useId();

  return (
    <div className={`c-search-field c-search-field--${variant} ${className}`.trim()}>
      <label className="u-sr-only" htmlFor={id}>
        {label}
      </label>
      <span className="c-search-field__icon" aria-hidden>
        <SearchIcon fontSize="small" />
      </span>
      <input
        id={id}
        name={name}
        type="search"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={onChange}
        onFocus={onFocus}
      />
      {value ? (
        <button
          type="button"
          className="c-search-field__clear"
          aria-label="Clear search"
          onClick={() => onChange({ target: { value: '' } })}
        >
          <CloseIcon fontSize="inherit" />
        </button>
      ) : null}
    </div>
  );
}
