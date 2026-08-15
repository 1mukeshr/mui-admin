import { useTheme } from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import { ChartCard } from '../../components/common/ChartCard';
import { DonutChart } from '../../components/common/DonutChart';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { SwitchableChart } from '../../components/common/SwitchableChart';
import { FollowUps } from '../../components/dashboard/FollowUps';
import { InsightList } from '../../components/dashboard/InsightList';
import {
  CRM_ACTIVITY_WEEK,
  CRM_FOLLOWUPS,
  CRM_OWNERS,
  CRM_PIPELINE,
  CRM_SERIES,
  CRM_SOURCES,
} from '../../data/seed';
import { formatCurrency } from '../../utils/format';

const inrK = (value) => `₹${Math.round(Number(value) / 1000)}k`;

export function CrmDashboard() {
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  const leads = CRM_SERIES.reduce((sum, item) => sum + item.leads, 0);
  const won = CRM_SERIES.reduce((sum, item) => sum + item.won, 0);
  const lost = CRM_SERIES.reduce((sum, item) => sum + item.lost, 0);
  const winRate = Math.round((won / (won + lost)) * 100);
  const pipelineValue = CRM_PIPELINE.filter((item) => item.name !== 'Won').reduce((sum, item) => sum + item.amount, 0);
  const meetings = CRM_ACTIVITY_WEEK.reduce((sum, item) => sum + item.meetings, 0);
  const sourceMix = CRM_SOURCES.map((item) => ({ name: item.name, value: item.leads }));

  return (
    <div className="c-page p-crm">
      <PageHeader
        title="CRM"
        crumbs={[{ label: 'Dashboards' }, { label: 'CRM' }]}
      />
      <div className="c-grid">
        <div className="c-span-sm-6 c-span-md-3">
          <StatCard title="New leads" value={String(leads)} change="+9.2%" icon={<PeopleAltOutlinedIcon />} />
        </div>
        <div className="c-span-sm-6 c-span-md-3">
          <StatCard title="Closed won" value={String(won)} change="+14.0%" icon={<HandshakeOutlinedIcon />} tone="green" />
        </div>
        <div className="c-span-sm-6 c-span-md-3">
          <StatCard title="Win rate" value={`${winRate}%`} change="+2.4%" icon={<TrendingUpOutlinedIcon />} tone="amber" />
        </div>
        <div className="c-span-sm-6 c-span-md-3">
          <StatCard title="Meetings this week" value={String(meetings)} change="+5.0%" icon={<EventAvailableOutlinedIcon />} tone="cyan" />
        </div>

        <div className="c-span-lg-8">
          <ChartCard fill title="Lead flow vs closed deals">
            <SwitchableChart
              data={CRM_SERIES}
              xKey="month"
              height={300}
              defaultType="area"
              series={[
                { dataKey: 'leads', name: 'Leads', color: primary },
                { dataKey: 'won', name: 'Won', color: '#10b981' },
                { dataKey: 'lost', name: 'Lost', color: '#f43f5e' },
              ]}
            />
          </ChartCard>
        </div>
        <div className="c-span-lg-4">
          <ChartCard fill title="Open pipeline">
            <InsightList
              items={[
                { label: 'Open value', detail: 'Everything not yet won', value: formatCurrency(pipelineValue), tone: 'up' },
                { label: 'Won this quarter', detail: `${won} deals closed`, value: formatCurrency(CRM_OWNERS.reduce((sum, item) => sum + item.value, 0)) },
                { label: 'Best channel', detail: 'Highest close rate', value: 'Referral 41%', tone: 'up' },
                { label: 'At risk', detail: 'Deals in negotiation', value: formatCurrency(162000), tone: 'down' },
                { label: 'Follow-ups due', detail: 'Need action this week', value: String(CRM_FOLLOWUPS.length) },
              ]}
            />
          </ChartCard>
        </div>

        <div className="c-span-md-7">
          <ChartCard fill title="Deal value by stage">
            <SwitchableChart
              data={CRM_PIPELINE}
              xKey="name"
              height={280}
              defaultType="bar"
              layout="vertical"
              categoryWidth={100}
              showToggle={false}
              yTickFormatter={inrK}
              formatter={(value) => formatCurrency(Number(value))}
              series={[{ dataKey: 'amount', name: 'Value', color: primary }]}
            />
          </ChartCard>
        </div>
        <div className="c-span-md-5">
          <ChartCard fill title="Lead sources">
            <DonutChart data={sourceMix} height={240} centerValue={String(leads)} centerLabel="leads" />
          </ChartCard>
        </div>

        <div className="c-span-lg-8">
          <ChartCard fill title="Weekly activity">
            <SwitchableChart
              data={CRM_ACTIVITY_WEEK}
              xKey="day"
              height={260}
              defaultType="bar"
              stacked
              series={[
                { dataKey: 'calls', name: 'Calls', color: primary },
                { dataKey: 'emails', name: 'Emails', color: '#06b6d4' },
                { dataKey: 'meetings', name: 'Meetings', color: '#f59e0b' },
              ]}
            />
          </ChartCard>
        </div>
        <div className="c-span-lg-4">
          <ChartCard fill title="Owner performance">
            <SwitchableChart
              data={CRM_OWNERS}
              xKey="name"
              height={240}
              defaultType="bar"
              layout="vertical"
              categoryWidth={72}
              showToggle={false}
              yTickFormatter={inrK}
              formatter={(value) => formatCurrency(Number(value))}
              series={[{ dataKey: 'value', name: 'Won value', color: '#10b981' }]}
            />
          </ChartCard>
        </div>

        <div className="c-span-lg-7">
          <ChartCard fill title="Follow-ups this week">
            <FollowUps items={CRM_FOLLOWUPS} variant="board" />
          </ChartCard>
        </div>
        <div className="c-span-lg-5">
          <ChartCard fill title="Source quality">
            <SwitchableChart
              data={CRM_SOURCES}
              xKey="name"
              height={240}
              defaultType="bar"
              series={[
                { dataKey: 'leads', name: 'Leads', color: primary },
                { dataKey: 'close', name: 'Close %', color: '#10b981' },
              ]}
            />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
