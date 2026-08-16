import { Button, useTheme } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import { ChartCard } from '../../components/common/ChartCard';
import { DateRangePicker } from '../../components/common/DateRangePicker';
import { DonutChart } from '../../components/common/DonutChart';
import { PageHeader } from '../../components/common/PageHeader';
import { SwitchableChart } from '../../components/common/SwitchableChart';
import {
  ANALYTICS_DEVICES,
  ANALYTICS_GOALS,
  ANALYTICS_HOURLY,
  ANALYTICS_PAGES,
  ANALYTICS_REGIONS,
  ANALYTICS_SERIES,
  ANALYTICS_SOURCES,
} from '../../data/seed';
import { defaultDateRange } from '../../utils/dateRange';
import { formatPercentChange } from '../../utils/format';

export function AnalyticsDashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [range, setRange] = useState(() => defaultDateRange('30d'));
  const primary = theme.palette.primary.main;
  const success = theme.palette.success.main;
  const warning = theme.palette.warning.main;
  const error = theme.palette.error.main;
  const info = theme.palette.info.main;
  const latest = ANALYTICS_SERIES[ANALYTICS_SERIES.length - 1];
  const previous = ANALYTICS_SERIES[ANALYTICS_SERIES.length - 2];
  const peak = ANALYTICS_HOURLY.reduce((best, item) => (item.sessions > best.sessions ? item : best), ANALYTICS_HOURLY[0]);
  const maxSource = Math.max(...ANALYTICS_SOURCES.map((item) => item.value));
  const maxRegion = Math.max(...ANALYTICS_REGIONS.map((item) => item.sessions));
  const maxGoal = Math.max(...ANALYTICS_GOALS.map((item) => item.value));
  const deviceMix = ANALYTICS_DEVICES.map((item) => ({ name: item.name, value: item.sessions }));

  return (
    <div className="c-page p-analytics">
      <PageHeader
        title="Analytics"
        crumbs={[{ label: 'Dashboards', to: '/dashboard' }, { label: 'Analytics' }]}
        actions={
          <>
            <DateRangePicker value={range} onChange={setRange} />
            <Button size="small" variant="outlined" onClick={() => navigate('/reports')}>
              Reports
            </Button>
            <Button size="small" variant="contained" onClick={() => navigate('/dashboard')}>
              Overview
            </Button>
          </>
        }
      />

      <ul className="p-anal-stats" aria-label="Analytics metrics">
        {[
          {
            label: 'Sessions',
            value: latest.sessions.toLocaleString('en-IN'),
            change: formatPercentChange(latest.sessions, previous.sessions),
            icon: <TimelineOutlinedIcon fontSize="inherit" />,
          },
          {
            label: 'Users',
            value: latest.users.toLocaleString('en-IN'),
            change: formatPercentChange(latest.users, previous.users),
            icon: <GroupOutlinedIcon fontSize="inherit" />,
          },
          {
            label: 'Avg session',
            value: `${latest.duration}m`,
            change: formatPercentChange(latest.duration, previous.duration),
            icon: <TimerOutlinedIcon fontSize="inherit" />,
          },
          {
            label: 'Bounce rate',
            value: `${latest.bounce}%`,
            change: formatPercentChange(latest.bounce, previous.bounce, { invert: true }),
            icon: <TrendingDownOutlinedIcon fontSize="inherit" />,
          },
        ].map((item) => (
          <li key={item.label}>
            <span className="p-anal-stats__icon" aria-hidden>
              {item.icon}
            </span>
            <div className="p-anal-stats__copy">
              <span className="p-anal-stats__label">{item.label}</span>
              <strong>{item.value}</strong>
              {item.change ? (
                <em className={item.change.startsWith('+') ? 'is-up' : item.change.startsWith('-') ? 'is-down' : ''}>
                  {item.change}
                </em>
              ) : (
                <em>—</em>
              )}
            </div>
          </li>
        ))}
      </ul>

      <section className="p-anal-focus" aria-label="Period insights">
        <article className="p-anal-focus__card">
          <span className="p-anal-focus__icon" aria-hidden>
            <BoltOutlinedIcon fontSize="inherit" />
          </span>
          <div>
            <span className="p-anal-focus__label">MoM sessions</span>
            <strong>{formatPercentChange(latest.sessions, previous.sessions)}</strong>
            <p>vs {previous.sessions.toLocaleString('en-IN')} last month</p>
          </div>
        </article>
        <article className="p-anal-focus__card">
          <span className="p-anal-focus__icon" aria-hidden>
            <TouchAppOutlinedIcon fontSize="inherit" />
          </span>
          <div>
            <span className="p-anal-focus__label">Engagement</span>
            <strong>{latest.pages} pages</strong>
            <p>{latest.duration} min average session</p>
          </div>
        </article>
        <article className="p-anal-focus__card">
          <span className="p-anal-focus__icon" aria-hidden>
            <SpeedOutlinedIcon fontSize="inherit" />
          </span>
          <div>
            <span className="p-anal-focus__label">Quality</span>
            <strong>{latest.bounce}%</strong>
            <p>Bounce — lower is healthier</p>
          </div>
        </article>
        <article className="p-anal-focus__card">
          <span className="p-anal-focus__icon" aria-hidden>
            <ScheduleOutlinedIcon fontSize="inherit" />
          </span>
          <div>
            <span className="p-anal-focus__label">Peak window</span>
            <strong>{peak.hour}</strong>
            <p>{peak.sessions.toLocaleString('en-IN')} sessions in busiest hour</p>
          </div>
        </article>
      </section>

      <section className="p-anal-hero">
        <ChartCard title="Traffic trend" description="Sessions, users, and bounce over time">
          <SwitchableChart
            data={ANALYTICS_SERIES}
            xKey="month"
            height={340}
            defaultType="line"
            rightDomain={[30, 46]}
            rightTickFormatter={(value) => `${value}%`}
            formatter={(value, name) => (name === 'Bounce' ? `${value}%` : Number(value).toLocaleString('en-IN'))}
            series={[
              { dataKey: 'sessions', name: 'Sessions', color: primary, yAxisId: 'left' },
              { dataKey: 'users', name: 'Users', color: info, yAxisId: 'left' },
              { dataKey: 'bounce', name: 'Bounce', color: warning, yAxisId: 'right' },
            ]}
          />
        </ChartCard>
      </section>

      <div className="p-anal-wide">
        <ChartCard title="Hourly sessions" description="Traffic shape across the day">
          <SwitchableChart
            data={ANALYTICS_HOURLY}
            xKey="hour"
            height={240}
            defaultType="line"
            showToggle={false}
            series={[{ dataKey: 'sessions', name: 'Sessions', color: info }]}
          />
        </ChartCard>
      </div>

      <div className="p-anal-split">
        <section className="p-anal-panel">
          <header>
            <h2>Acquisition</h2>
            <p>Share of sessions by channel</p>
          </header>
          <ul className="p-anal-bars">
            {ANALYTICS_SOURCES.map((item) => (
              <li key={item.name}>
                <div>
                  <span>{item.name}</span>
                  <strong>{item.value}%</strong>
                </div>
                <span className="p-anal-bars__track" aria-hidden>
                  <i style={{ width: `${(item.value / maxSource) * 100}%`, background: primary }} />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="p-anal-panel">
          <header>
            <h2>Top regions</h2>
            <p>Sessions this period</p>
          </header>
          <ul className="p-anal-bars">
            {ANALYTICS_REGIONS.map((item) => (
              <li key={item.name}>
                <div>
                  <span>{item.name}</span>
                  <strong>{item.sessions.toLocaleString('en-IN')}</strong>
                </div>
                <span className="p-anal-bars__track" aria-hidden>
                  <i style={{ width: `${(item.sessions / maxRegion) * 100}%`, background: theme.palette.success.main }} />
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="p-anal-split">
        <ChartCard title="Device mix" description="Session share by device">
          <DonutChart data={deviceMix} height={240} centerValue={`${deviceMix[0].value}%`} centerLabel="desktop" formatter={(value) => `${value}%`} />
        </ChartCard>
        <section className="p-anal-panel">
          <header>
            <h2>Goal completions</h2>
            <p>Key conversion events</p>
          </header>
          <ul className="p-anal-goals">
            {ANALYTICS_GOALS.map((item) => (
              <li key={item.name}>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.value.toLocaleString('en-IN')}</span>
                </div>
                <span className="p-anal-bars__track" aria-hidden>
                  <i style={{ width: `${(item.value / maxGoal) * 100}%`, background: theme.palette.warning.main }} />
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="p-anal-grid">
        <ChartCard title="Top pages" description="Views by path">
          <SwitchableChart
            data={ANALYTICS_PAGES}
            xKey="path"
            height={240}
            defaultType="bar"
            layout="vertical"
            categoryWidth={96}
            showToggle={false}
            series={[{ dataKey: 'views', name: 'Views', color: primary }]}
          />
        </ChartCard>
        <ChartCard title="Page bounce" description="Exit rate by path">
          <SwitchableChart
            data={ANALYTICS_PAGES}
            xKey="path"
            height={240}
            defaultType="bar"
            series={[{ dataKey: 'bounce', name: 'Bounce %', color: error }]}
          />
        </ChartCard>
        <ChartCard title="Device engagement" description="Sessions, duration, conversion">
          <SwitchableChart
            data={ANALYTICS_DEVICES}
            xKey="name"
            height={240}
            defaultType="bar"
            series={[
              { dataKey: 'sessions', name: 'Sessions %', color: primary },
              { dataKey: 'duration', name: 'Duration', color: info },
              { dataKey: 'conversion', name: 'Conversion', color: success },
            ]}
          />
        </ChartCard>
      </div>
    </div>
  );
}
