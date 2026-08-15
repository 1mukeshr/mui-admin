import { useTheme } from '@mui/material';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { ChartCard } from '../../components/common/ChartCard';
import { DonutChart } from '../../components/common/DonutChart';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { SwitchableChart } from '../../components/common/SwitchableChart';
import { InsightList } from '../../components/dashboard/InsightList';
import {
  ANALYTICS_DEVICES,
  ANALYTICS_GOALS,
  ANALYTICS_HOURLY,
  ANALYTICS_PAGES,
  ANALYTICS_REGIONS,
  ANALYTICS_SERIES,
  ANALYTICS_SOURCES,
} from '../../data/seed';

export function AnalyticsDashboard() {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const latest = ANALYTICS_SERIES[ANALYTICS_SERIES.length - 1];
  const previous = ANALYTICS_SERIES[ANALYTICS_SERIES.length - 2];
  const deviceMix = ANALYTICS_DEVICES.map((item) => ({ name: item.name, value: item.sessions }));
  const peak = ANALYTICS_HOURLY.reduce((best, item) => (item.sessions > best.sessions ? item : best), ANALYTICS_HOURLY[0]);

  return (
    <div className="c-page p-analytics">
      <PageHeader
        title="Analytics"
        crumbs={[{ label: 'Dashboards' }, { label: 'Analytics' }]}
      />
      <div className="c-grid">
        <div className="c-span-sm-6 c-span-md-3">
          <StatCard title="Sessions" value={latest.sessions.toLocaleString('en-IN')} change="+11.6%" icon={<InsightsOutlinedIcon />} />
        </div>
        <div className="c-span-sm-6 c-span-md-3">
          <StatCard title="Avg session" value={`${latest.duration}m`} change="+8.4%" icon={<TimerOutlinedIcon />} tone="green" />
        </div>
        <div className="c-span-sm-6 c-span-md-3">
          <StatCard title="Bounce rate" value={`${latest.bounce}%`} change="-3.1%" icon={<SpeedOutlinedIcon />} tone="amber" />
        </div>
        <div className="c-span-sm-6 c-span-md-3">
          <StatCard title="Pages / session" value={String(latest.pages)} change="+6.2%" icon={<ArticleOutlinedIcon />} tone="cyan" />
        </div>

        <div className="c-span-lg-8">
          <ChartCard fill title="Sessions vs bounce rate">
            <SwitchableChart
              data={ANALYTICS_SERIES}
              xKey="month"
              height={300}
              defaultType="area"
              rightDomain={[30, 46]}
              rightTickFormatter={(value) => `${value}%`}
              formatter={(value, name) => (name === 'Bounce' ? `${value}%` : Number(value).toLocaleString('en-IN'))}
              series={[
                { dataKey: 'sessions', name: 'Sessions', color: primary, yAxisId: 'left' },
                { dataKey: 'users', name: 'Users', color: '#10b981', yAxisId: 'left' },
                { dataKey: 'bounce', name: 'Bounce', color: '#f59e0b', yAxisId: 'right' },
              ]}
            />
          </ChartCard>
        </div>
        <div className="c-span-lg-4">
          <ChartCard fill title="August snapshot">
            <InsightList
              items={[
                {
                  label: 'Sessions',
                  detail: `vs ${previous.sessions.toLocaleString('en-IN')} last month`,
                  value: latest.sessions.toLocaleString('en-IN'),
                  tone: 'up',
                },
                { label: 'Users', detail: 'Unique visitors', value: latest.users.toLocaleString('en-IN'), tone: 'up' },
                { label: 'Bounce', detail: 'Lower is better', value: `${latest.bounce}%`, tone: 'up' },
                { label: 'Time on site', detail: 'Average session length', value: `${latest.duration} min` },
                { label: 'Peak traffic', detail: 'Busiest hour today', value: peak.hour },
              ]}
            />
          </ChartCard>
        </div>

        <div className="c-span-md-6">
          <ChartCard fill title="Acquisition sources">
            <DonutChart data={ANALYTICS_SOURCES} height={240} centerValue="42%" centerLabel="organic" formatter={(value) => `${value}%`} />
          </ChartCard>
        </div>
        <div className="c-span-md-6">
          <ChartCard fill title="Device mix">
            <DonutChart data={deviceMix} height={240} centerValue="54%" centerLabel="desktop" formatter={(value) => `${value}%`} />
          </ChartCard>
        </div>

        <div className="c-span-md-7">
          <ChartCard fill title="Hourly sessions">
            <SwitchableChart
              data={ANALYTICS_HOURLY}
              xKey="hour"
              height={260}
              defaultType="area"
              showToggle={false}
              series={[{ dataKey: 'sessions', name: 'Sessions', color: '#06b6d4' }]}
            />
          </ChartCard>
        </div>
        <div className="c-span-md-5">
          <ChartCard fill title="Top regions">
            <SwitchableChart
              data={ANALYTICS_REGIONS}
              xKey="name"
              height={240}
              defaultType="bar"
              layout="vertical"
              categoryWidth={108}
              showToggle={false}
              series={[{ dataKey: 'sessions', name: 'Sessions', color: '#10b981' }]}
            />
          </ChartCard>
        </div>

        <div className="c-span-md-7">
          <ChartCard fill title="Top pages">
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
        </div>
        <div className="c-span-md-5">
          <ChartCard fill title="Goal completions">
            <SwitchableChart
              data={ANALYTICS_GOALS}
              xKey="name"
              height={240}
              defaultType="bar"
              layout="vertical"
              categoryWidth={110}
              showToggle={false}
              series={[{ dataKey: 'value', name: 'Events', color: '#f59e0b' }]}
            />
          </ChartCard>
        </div>

        <div className="c-span-md-6">
          <ChartCard fill title="Device engagement">
            <SwitchableChart
              data={ANALYTICS_DEVICES}
              xKey="name"
              height={240}
              defaultType="bar"
              series={[
                { dataKey: 'sessions', name: 'Sessions %', color: primary },
                { dataKey: 'duration', name: 'Duration', color: '#06b6d4' },
                { dataKey: 'conversion', name: 'Conversion', color: '#10b981' },
              ]}
            />
          </ChartCard>
        </div>
        <div className="c-span-md-6">
          <ChartCard fill title="Page bounce">
            <SwitchableChart
              data={ANALYTICS_PAGES}
              xKey="path"
              height={240}
              defaultType="line"
              series={[{ dataKey: 'bounce', name: 'Bounce %', color: '#f43f5e' }]}
            />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
