import { useTheme } from '@mui/material';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { chartTooltipStyle } from '../../theme';

const FALLBACK = ['#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e', '#6366f1'];

export function DonutChart({
  data,
  nameKey = 'name',
  valueKey = 'value',
  height = 240,
  colors,
  formatter,
  centerLabel,
  centerValue,
}) {
  const theme = useTheme();
  const palette = colors?.length ? colors : [theme.palette.primary.main, ...FALLBACK.slice(1)];
  const total = data.reduce((sum, item) => sum + Number(item[valueKey] || 0), 0);
  const tooltip = chartTooltipStyle(theme.palette.mode);

  return (
    <div className="c-donut">
      <div className={`c-chart-canvas c-chart-canvas--${height} c-donut__canvas`}>
        <ResponsiveContainer width="100%" height="100%" debounce={50}>
          <PieChart>
            <Pie
              data={data}
              dataKey={valueKey}
              nameKey={nameKey}
              innerRadius="62%"
              outerRadius="88%"
              paddingAngle={3}
              stroke="none"
            >
              {data.map((item, index) => (
                <Cell key={item[nameKey]} fill={item.fill || palette[index % palette.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltip}
              formatter={(value, name) => [formatter ? formatter(value, name) : value, name]}
            />
          </PieChart>
        </ResponsiveContainer>
        {(centerLabel || centerValue) && (
          <div className="c-donut__center">
            {centerValue && <strong>{centerValue}</strong>}
            {centerLabel && <span>{centerLabel}</span>}
          </div>
        )}
      </div>
      <ul className="c-donut__legend">
        {data.map((item, index) => {
          const value = Number(item[valueKey] || 0);
          const share = total ? Math.round((value / total) * 100) : 0;
          return (
            <li key={item[nameKey]}>
              <span className="c-donut__swatch" style={{ background: item.fill || palette[index % palette.length] }} />
              <span className="c-donut__copy">
                <strong>{item[nameKey]}</strong>
                <span>{formatter ? formatter(value, item[nameKey]) : value}</span>
              </span>
              <span className="c-muted">{share}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
