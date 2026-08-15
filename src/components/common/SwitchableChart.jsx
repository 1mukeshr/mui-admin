import { ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material';
import { useId, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { chartTooltipStyle } from '../../theme';

const TYPES = [
  { id: 'bar', label: 'Bar' },
  { id: 'line', label: 'Line' },
  { id: 'area', label: 'Area' },
];

export function SwitchableChart({
  data,
  xKey,
  series,
  height = 280,
  formatter,
  yTickFormatter,
  rightTickFormatter,
  rightDomain,
  stacked = false,
  layout = 'horizontal',
  defaultType = 'bar',
  categoryWidth = 88,
  showLegend,
  showToggle = true,
}) {
  const [type, setType] = useState(defaultType);
  const theme = useTheme();
  const gid = useId().replace(/:/g, '');
  const axis = theme.palette.text.secondary;
  const grid = theme.palette.divider;
  const tooltip = chartTooltipStyle(theme.palette.mode);
  const hasRight = series.some((item) => item.yAxisId === 'right');
  const legend = showLegend ?? series.length > 1;
  const Chart = type === 'line' ? LineChart : type === 'area' ? AreaChart : BarChart;
  const vertical = layout === 'vertical';
  const tick = { fill: axis, fontSize: 12 };

  return (
    <div className="c-chart">
      {showToggle && (
        <div className="c-chart-switch">
          <ToggleButtonGroup exclusive size="small" value={type} onChange={(_, next) => next && setType(next)} aria-label="Chart type">
            {TYPES.map((item) => (
              <ToggleButton className="c-chart-toggle" key={item.id} value={item.id}>
                {item.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
      )}
      <div className={`c-chart-canvas c-chart-canvas--${height}`}>
        <ResponsiveContainer width="100%" height="100%" debounce={50}>
          <Chart
            data={data}
            layout={vertical ? 'vertical' : undefined}
            margin={vertical ? { top: 8, right: 16, left: 4, bottom: 0 } : { top: 8, right: hasRight ? 8 : 8, left: 0, bottom: 0 }}
          >
            <defs>
              {series.map((item) => (
                <linearGradient key={item.dataKey} id={`${gid}-${item.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={item.color} stopOpacity={0.38} />
                  <stop offset="100%" stopColor={item.color} stopOpacity={0.04} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={vertical} horizontal />
            {vertical ? (
              <>
                <XAxis type="number" stroke={axis} tick={tick} tickLine={false} axisLine={false} tickFormatter={yTickFormatter} />
                <YAxis type="category" dataKey={xKey} stroke={axis} tick={tick} tickLine={false} axisLine={false} width={categoryWidth} />
              </>
            ) : (
              <>
                <XAxis dataKey={xKey} stroke={axis} tick={tick} tickLine={false} axisLine={false} />
                <YAxis
                  yAxisId={hasRight ? 'left' : undefined}
                  stroke={axis}
                  tick={tick}
                  tickLine={false}
                  axisLine={false}
                  width={52}
                  tickFormatter={yTickFormatter}
                />
                {hasRight ? (
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke={axis}
                    tick={tick}
                    tickLine={false}
                    axisLine={false}
                    width={44}
                    tickFormatter={rightTickFormatter}
                    domain={rightDomain}
                  />
                ) : null}
              </>
            )}
            <Tooltip
              contentStyle={tooltip}
              formatter={formatter}
              cursor={{ fill: theme.palette.action.hover, stroke: grid }}
            />
            {legend ? <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} /> : null}
            {series.map((item) => {
              const axisId = hasRight ? item.yAxisId ?? 'left' : undefined;
              if (type === 'line') {
                return (
                  <Line
                    key={item.dataKey}
                    type="monotone"
                    dataKey={item.dataKey}
                    name={item.name}
                    stroke={item.color}
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: item.color, strokeWidth: 0 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    yAxisId={axisId}
                  />
                );
              }
              if (type === 'area') {
                return (
                  <Area
                    key={item.dataKey}
                    type="monotone"
                    dataKey={item.dataKey}
                    name={item.name}
                    stroke={item.color}
                    fill={`url(#${gid}-${item.dataKey})`}
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5, strokeWidth: 0 }}
                    stackId={stacked ? 'a' : undefined}
                    yAxisId={axisId}
                  />
                );
              }
              return (
                <Bar
                  key={item.dataKey}
                  dataKey={item.dataKey}
                  name={item.name}
                  fill={item.color}
                  radius={vertical ? [0, 8, 8, 0] : stacked ? [0, 0, 0, 0] : [8, 8, 0, 0]}
                  stackId={stacked ? 'a' : undefined}
                  yAxisId={axisId}
                  maxBarSize={vertical ? 18 : series.length > 2 ? 22 : 36}
                />
              );
            })}
          </Chart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
