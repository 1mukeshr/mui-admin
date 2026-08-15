import ViewColumnOutlinedIcon from '@mui/icons-material/ViewColumnOutlined';
import DensityMediumOutlinedIcon from '@mui/icons-material/DensityMediumOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useMemo, useRef, useState } from 'react';
import { EmptyState } from './EmptyState';
import { loadState, saveState } from '../../utils/storage';

function prefsKey(id) {
  return `table:${id}`;
}

function compareValues(left, right) {
  if (typeof left === 'number' && typeof right === 'number') return left - right;
  return String(left).localeCompare(String(right), undefined, { numeric: true, sensitivity: 'base' });
}

export function DataTable({
  id,
  rows,
  columns,
  getRowId,
  onRowClick,
  toolbar,
  emptyTitle = 'No records found',
  emptyDescription,
  defaultSort,
  defaultHidden = [],
  defaultRowsPerPage = 8,
  rowsPerPageOptions = [5, 8, 10, 25],
  filterKey,
  selectable = false,
  selectedIds = [],
  onSelectedIdsChange,
  isRowSelectable,
}) {
  const initial = useMemo(() => {
    const stored = loadState(prefsKey(id), {});
    return {
      hidden: stored.hidden ?? defaultHidden,
      density: stored.density === 'compact' ? 'compact' : 'comfortable',
      sortKey: stored.sortKey ?? defaultSort?.key ?? columns.find((column) => column.sortable)?.id ?? columns[0]?.id ?? '',
      sortDir: stored.sortDir ?? defaultSort?.dir ?? 'asc',
      rowsPerPage: stored.rowsPerPage ?? defaultRowsPerPage,
    };
  }, [columns, defaultHidden, defaultRowsPerPage, defaultSort, id]);

  const [hidden, setHidden] = useState(initial.hidden);
  const [density, setDensity] = useState(initial.density);
  const [sortKey, setSortKey] = useState(initial.sortKey);
  const [sortDir, setSortDir] = useState(initial.sortDir);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initial.rowsPerPage);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const columnsRef = useRef(null);

  useEffect(() => {
    setPage(0);
  }, [filterKey]);

  useEffect(() => {
    if (!columnsOpen) return undefined;
    const close = (event) => {
      if (!columnsRef.current?.contains(event.target)) setColumnsOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [columnsOpen]);

  const persist = (next) => {
    saveState(prefsKey(id), {
      hidden,
      density,
      sortKey,
      sortDir,
      rowsPerPage,
      ...next,
    });
  };

  const visibleColumns = columns.filter((column) => !hidden.includes(column.id));

  const valueOf = (row, column) => {
    if (column.getValue) return column.getValue(row);
    const raw = row[column.id];
    if (typeof raw === 'number' || typeof raw === 'string') return raw;
    return raw == null ? '' : String(raw);
  };

  const sorted = useMemo(() => {
    const column = columns.find((item) => item.id === sortKey);
    if (!column) return rows;
    return [...rows].sort((a, b) => {
      const cmp = compareValues(valueOf(a, column), valueOf(b, column));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [columns, rows, sortDir, sortKey]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / rowsPerPage) || 1);
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = sorted.slice(safePage * rowsPerPage, safePage * rowsPerPage + rowsPerPage);
  const from = sorted.length === 0 ? 0 : safePage * rowsPerPage + 1;
  const to = Math.min(sorted.length, (safePage + 1) * rowsPerPage);

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const pageSelectable = useMemo(
    () => pageRows.filter((row) => !isRowSelectable || isRowSelectable(row)),
    [isRowSelectable, pageRows],
  );
  const pageSelectedCount = pageSelectable.filter((row) => selectedSet.has(getRowId(row))).length;
  const allPageSelected = pageSelectable.length > 0 && pageSelectedCount === pageSelectable.length;
  const somePageSelected = pageSelectedCount > 0 && !allPageSelected;

  const setSelected = (next) => {
    onSelectedIdsChange?.(next);
  };

  const toggleRow = (row, checked) => {
    const rowId = getRowId(row);
    if (isRowSelectable && !isRowSelectable(row)) return;
    if (checked) setSelected([...new Set([...selectedIds, rowId])]);
    else setSelected(selectedIds.filter((id) => id !== rowId));
  };

  const togglePage = (checked) => {
    const pageIds = pageSelectable.map((row) => getRowId(row));
    if (checked) setSelected([...new Set([...selectedIds, ...pageIds])]);
    else setSelected(selectedIds.filter((id) => !pageIds.includes(id)));
  };

  const toggleSort = (key) => {
    const nextDir = sortKey === key && sortDir === 'asc' ? 'desc' : 'asc';
    const nextKey = sortKey === key ? sortKey : key;
    setSortKey(nextKey);
    setSortDir(sortKey === key ? nextDir : 'asc');
    persist({ sortKey: nextKey, sortDir: sortKey === key ? nextDir : 'asc' });
  };

  const toggleColumn = (columnId) => {
    const column = columns.find((item) => item.id === columnId);
    if (column?.hideable === false) return;
    const next = hidden.includes(columnId) ? hidden.filter((item) => item !== columnId) : [...hidden, columnId];
    const remaining = columns.filter((item) => !next.includes(item.id));
    if (remaining.length === 0) return;
    setHidden(next);
    persist({ hidden: next });
  };

  const resetColumns = () => {
    setHidden(defaultHidden);
    setDensity('comfortable');
    persist({ hidden: defaultHidden, density: 'comfortable' });
  };

  return (
    <div className={`c-data-table ${density === 'compact' ? 'is-compact' : ''}`}>
      <div className={`c-data-table__bar ${toolbar ? '' : 'is-tools-only'}`.trim()}>
        {toolbar ? <div className="c-data-table__toolbar">{toolbar}</div> : null}
        <div className="c-data-table__tools">
          <button
            type="button"
            className="c-table-tool"
            aria-label={density === 'compact' ? 'Use comfortable density' : 'Use compact density'}
            title={density === 'compact' ? 'Comfortable density' : 'Compact density'}
            onClick={() => {
              const next = density === 'compact' ? 'comfortable' : 'compact';
              setDensity(next);
              persist({ density: next });
            }}
          >
            <DensityMediumOutlinedIcon fontSize="small" />
          </button>

          <div className="c-table-columns" ref={columnsRef}>
            <button
              type="button"
              className="c-table-tool c-table-tool--label"
              aria-expanded={columnsOpen}
              aria-haspopup="dialog"
              onClick={() => setColumnsOpen((value) => !value)}
            >
              <ViewColumnOutlinedIcon fontSize="small" />
              <span>
                Columns
                {hidden.length ? ` (${columns.length - hidden.length}/${columns.length})` : ''}
              </span>
            </button>

            {columnsOpen && (
              <div className="c-table-columns__panel" role="dialog" aria-label="Grid columns">
                <div className="c-table-columns__head">
                  <strong>Grid columns</strong>
                  <span>Show or hide columns for this table.</span>
                </div>
                <ul className="c-table-columns__list">
                  {columns.map((column) => {
                    const checked = !hidden.includes(column.id);
                    const locked =
                      column.hideable === false || (visibleColumns.length === 1 && checked);
                    return (
                      <li key={column.id}>
                        <label className={`c-table-columns__item ${locked ? 'is-locked' : ''}`}>
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={locked}
                            onChange={() => toggleColumn(column.id)}
                          />
                          <span>{column.label}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
                <button type="button" className="c-table-columns__reset" onClick={resetColumns}>
                  <RestartAltOutlinedIcon fontSize="small" />
                  Reset columns
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="c-table-wrap">
        <table className="c-table" aria-label={id} style={{ minWidth: Math.max(640, visibleColumns.length * 140) }}>
          <thead>
            <tr>
              {selectable && (
                <th scope="col" className="c-table__check">
                  <input
                    type="checkbox"
                    checked={allPageSelected}
                    ref={(node) => {
                      if (node) node.indeterminate = somePageSelected;
                    }}
                    aria-label="Select all rows on this page"
                    disabled={pageSelectable.length === 0}
                    onChange={(event) => togglePage(event.target.checked)}
                  />
                </th>
              )}
              {visibleColumns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className={[
                    column.align === 'right' ? 'is-right' : '',
                    column.align === 'center' ? 'is-center' : '',
                    column.sortable ? 'is-sortable' : '',
                    sortKey === column.id ? `is-sorted is-${sortDir}` : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={{ width: column.width, minWidth: column.minWidth }}
                >
                  {column.sortable ? (
                    <button type="button" className="c-table__sort" onClick={() => toggleSort(column.id)}>
                      <span>{column.label}</span>
                      <span className="c-table__sort-icon" aria-hidden />
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => {
              const rowId = getRowId(row);
              const canSelect = !isRowSelectable || isRowSelectable(row);
              const isSelected = selectedSet.has(rowId);
              return (
                <tr
                  key={rowId}
                  className={[onRowClick ? 'is-clickable' : '', isSelected ? 'is-selected' : '']
                    .filter(Boolean)
                    .join(' ')}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {selectable && (
                    <td className="c-table__check" onClick={(event) => event.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        disabled={!canSelect}
                        aria-label={`Select row ${rowId}`}
                        onChange={(event) => toggleRow(row, event.target.checked)}
                      />
                    </td>
                  )}
                  {visibleColumns.map((column) => (
                    <td
                      key={column.id}
                      className={[
                        column.align === 'right' ? 'is-right' : '',
                        column.align === 'center' ? 'is-center' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      style={{ width: column.width, minWidth: column.minWidth }}
                    >
                      {column.render ? column.render(row) : valueOf(row, column)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {sorted.length === 0 && <EmptyState title={emptyTitle} description={emptyDescription} />}

      {sorted.length > 0 && (
        <div className="c-table-foot">
          <label className="c-table-foot__rows">
            <span>Rows</span>
            <select
              value={rowsPerPage}
              onChange={(event) => {
                const next = parseInt(event.target.value, 10);
                setRowsPerPage(next);
                setPage(0);
                persist({ rowsPerPage: next });
              }}
            >
              {rowsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <p className="c-table-foot__range">
            {from}–{to} of {sorted.length}
          </p>
          <div className="c-table-foot__nav">
            <button
              type="button"
              className="c-table-tool"
              aria-label="Previous page"
              disabled={safePage === 0}
              onClick={() => setPage(safePage - 1)}
            >
              <KeyboardArrowLeftIcon fontSize="small" />
            </button>
            <button
              type="button"
              className="c-table-tool"
              aria-label="Next page"
              disabled={safePage >= pageCount - 1}
              onClick={() => setPage(safePage + 1)}
            >
              <KeyboardArrowRightIcon fontSize="small" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
