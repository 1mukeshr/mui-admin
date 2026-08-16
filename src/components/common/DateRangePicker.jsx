import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useEffect, useId, useRef, useState } from 'react';
import {
  DATE_PRESETS,
  daysInMonth,
  endOfDay,
  formatRangeLabel,
  fromInputValue,
  isAfterDay,
  isBeforeDay,
  matchPreset,
  sameDay,
  startOfDay,
  toInputValue,
} from '../../utils/dateRange';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function MonthGrid({
  year,
  month,
  draftStart,
  draftEnd,
  hoverDay,
  onPick,
  onHover,
}) {
  const firstDow = new Date(year, month, 1).getDay();
  const total = daysInMonth(year, month);
  const cells = [];

  for (let i = 0; i < firstDow; i += 1) {
    cells.push(<span key={`e-${i}`} className="c-daterange__day is-empty" aria-hidden />);
  }

  for (let day = 1; day <= total; day += 1) {
    const date = startOfDay(new Date(year, month, day));
    const isStart = draftStart && sameDay(date, draftStart);
    const isEnd = draftEnd && sameDay(date, draftEnd);
    const rangeEnd = draftEnd || hoverDay;
    const inRange =
      draftStart &&
      rangeEnd &&
      !isBeforeDay(date, draftStart) &&
      !isAfterDay(date, rangeEnd) &&
      !(isStart && isEnd);
    const isToday = sameDay(date, new Date());

    cells.push(
      <button
        key={day}
        type="button"
        className={[
          'c-daterange__day',
          isStart || isEnd ? 'is-selected' : '',
          inRange ? 'is-in-range' : '',
          isStart ? 'is-start' : '',
          isEnd ? 'is-end' : '',
          isToday ? 'is-today' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={() => onPick(date)}
        onMouseEnter={() => onHover(date)}
        aria-pressed={isStart || isEnd}
      >
        {day}
      </button>,
    );
  }

  return (
    <div className="c-daterange__month">
      <div className="c-daterange__weekdays" aria-hidden>
        {WEEKDAYS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className="c-daterange__grid">{cells}</div>
    </div>
  );
}

export function DateRangePicker({ value, onChange, className = '' }) {
  const rootRef = useRef(null);
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [draftStart, setDraftStart] = useState(value?.start ?? null);
  const [draftEnd, setDraftEnd] = useState(value?.end ?? null);
  const [draftPreset, setDraftPreset] = useState(value?.preset ?? 'custom');
  const [hoverDay, setHoverDay] = useState(null);
  const [view, setView] = useState(() => {
    const base = value?.end ?? value?.start ?? new Date();
    return { year: base.getFullYear(), month: base.getMonth() };
  });

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (event) => {
      if (!rootRef.current?.contains(event.target)) close();
    };
    const onKey = (event) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const id = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  const openPanel = () => {
    setDraftStart(value?.start ?? null);
    setDraftEnd(value?.end ?? null);
    setDraftPreset(value?.preset ?? matchPreset(value?.start, value?.end));
    setHoverDay(null);
    const base = value?.end ?? value?.start ?? new Date();
    setView({ year: base.getFullYear(), month: base.getMonth() });
    setVisible(false);
    setOpen(true);
  };

  const close = () => {
    setVisible(false);
    window.setTimeout(() => setOpen(false), 180);
  };

  const applyPreset = (preset) => {
    if (!preset.range) {
      setDraftPreset('custom');
      return;
    }
    const next = preset.range();
    setDraftStart(next.start);
    setDraftEnd(next.end);
    setDraftPreset(preset.id);
    setHoverDay(null);
    setView({ year: next.end.getFullYear(), month: next.end.getMonth() });
  };

  const pickDay = (date) => {
    setDraftPreset('custom');
    if (!draftStart || (draftStart && draftEnd)) {
      setDraftStart(date);
      setDraftEnd(null);
      setHoverDay(null);
      return;
    }
    if (isBeforeDay(date, draftStart)) {
      setDraftEnd(endOfDay(draftStart));
      setDraftStart(date);
      return;
    }
    setDraftEnd(endOfDay(date));
  };

  const apply = () => {
    if (!draftStart || !draftEnd) return;
    const start = startOfDay(draftStart);
    const end = endOfDay(draftEnd);
    onChange?.({
      start,
      end,
      preset: matchPreset(start, end) === draftPreset ? draftPreset : matchPreset(start, end),
    });
    close();
  };

  const shiftMonth = (delta) => {
    const next = new Date(view.year, view.month + delta, 1);
    setView({ year: next.getFullYear(), month: next.getMonth() });
  };

  const monthLabel = new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' }).format(
    new Date(view.year, view.month, 1),
  );

  const canApply = Boolean(draftStart && draftEnd);

  return (
    <div className={`c-daterange ${open ? 'is-open' : ''} ${className}`.trim()} ref={rootRef}>
      <button
        type="button"
        className="c-daterange__trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => (open ? close() : openPanel())}
      >
        <CalendarMonthOutlinedIcon fontSize="inherit" />
        <span className="c-daterange__label">{formatRangeLabel(value?.start, value?.end)}</span>
        {value?.preset && value.preset !== 'custom' ? (
          <em className="c-daterange__chip">{DATE_PRESETS.find((item) => item.id === value.preset)?.label}</em>
        ) : null}
      </button>

      {open ? (
        <div
          id={panelId}
          className={`c-daterange__panel ${visible ? 'is-visible' : ''}`}
          role="dialog"
          aria-label="Choose date range"
        >
          <div className="c-daterange__presets" role="listbox" aria-label="Quick ranges">
            {DATE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                role="option"
                aria-selected={draftPreset === preset.id}
                className={`c-daterange__preset ${draftPreset === preset.id ? 'is-active' : ''}`}
                onClick={() => applyPreset(preset)}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="c-daterange__body">
            <div className="c-daterange__nav">
              <button type="button" className="c-daterange__nav-btn" onClick={() => shiftMonth(-1)} aria-label="Previous month">
                <ChevronLeftRoundedIcon fontSize="inherit" />
              </button>
              <p className="c-daterange__nav-label">{monthLabel}</p>
              <button type="button" className="c-daterange__nav-btn" onClick={() => shiftMonth(1)} aria-label="Next month">
                <ChevronRightRoundedIcon fontSize="inherit" />
              </button>
            </div>

            <MonthGrid
              year={view.year}
              month={view.month}
              draftStart={draftStart}
              draftEnd={draftEnd}
              hoverDay={hoverDay}
              onPick={pickDay}
              onHover={(day) => {
                if (draftStart && !draftEnd) setHoverDay(day);
              }}
            />

            <div className="c-daterange__inputs">
              <label>
                <span>From</span>
                <input
                  type="date"
                  value={toInputValue(draftStart)}
                  onChange={(event) => {
                    const next = fromInputValue(event.target.value);
                    if (!next) return;
                    setDraftPreset('custom');
                    setDraftStart(next);
                    if (draftEnd && isAfterDay(next, draftEnd)) setDraftEnd(endOfDay(next));
                  }}
                />
              </label>
              <label>
                <span>To</span>
                <input
                  type="date"
                  value={toInputValue(draftEnd)}
                  min={toInputValue(draftStart) || undefined}
                  onChange={(event) => {
                    const next = fromInputValue(event.target.value);
                    if (!next) return;
                    setDraftPreset('custom');
                    setDraftEnd(endOfDay(next));
                    if (draftStart && isBeforeDay(next, draftStart)) setDraftStart(next);
                  }}
                />
              </label>
            </div>
          </div>

          <div className="c-daterange__foot">
            <p className="c-daterange__hint">
              {draftStart && draftEnd
                ? formatRangeLabel(draftStart, draftEnd)
                : draftStart
                  ? 'Pick an end date'
                  : 'Pick a start date'}
            </p>
            <div className="c-daterange__actions">
              <button type="button" className="c-daterange__btn c-daterange__btn--ghost" onClick={close}>
                Cancel
              </button>
              <button type="button" className="c-daterange__btn c-daterange__btn--primary" disabled={!canApply} onClick={apply}>
                Apply
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
