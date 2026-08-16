import { Button, useTheme } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import { ChartCard } from '../../components/common/ChartCard';
import { DateRangePicker } from '../../components/common/DateRangePicker';
import { DonutChart } from '../../components/common/DonutChart';
import { PageHeader } from '../../components/common/PageHeader';
import { SwitchableChart } from '../../components/common/SwitchableChart';
import { FollowUps } from '../../components/dashboard/FollowUps';
import {
  CRM_ACTIVITY_WEEK,
  CRM_FOLLOWUPS,
  CRM_OWNERS,
  CRM_PIPELINE,
  CRM_SERIES,
  CRM_SOURCES,
} from '../../data/seed';
import { defaultDateRange } from '../../utils/dateRange';
import { formatCurrency, formatInrK, formatPercentChange } from '../../utils/format';

export function CrmDashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [range, setRange] = useState(() => defaultDateRange('30d'));
  const primary = theme.palette.primary.main;
  const success = theme.palette.success.main;
  const warning = theme.palette.warning.main;
  const error = theme.palette.error.main;
  const info = theme.palette.info.main;

  const leads = CRM_SERIES.reduce((sum, item) => sum + item.leads, 0);
  const won = CRM_SERIES.reduce((sum, item) => sum + item.won, 0);
  const lost = CRM_SERIES.reduce((sum, item) => sum + item.lost, 0);
  const winRate = Math.round((won / (won + lost)) * 100);
  const pipelineValue = CRM_PIPELINE.filter((item) => item.name !== 'Won').reduce((sum, item) => sum + item.amount, 0);
  const meetings = CRM_ACTIVITY_WEEK.reduce((sum, item) => sum + item.meetings, 0);
  const calls = CRM_ACTIVITY_WEEK.reduce((sum, item) => sum + item.calls, 0);
  const emails = CRM_ACTIVITY_WEEK.reduce((sum, item) => sum + item.emails, 0);
  const sourceMix = CRM_SOURCES.map((item) => ({ name: item.name, value: item.leads }));
  const maxOwner = Math.max(...CRM_OWNERS.map((item) => item.value));
  const maxClose = Math.max(...CRM_SOURCES.map((item) => item.close));
  const atRisk = CRM_PIPELINE.find((item) => item.name === 'Negotiation');
  const stageColors = [primary, info, warning, success, theme.palette.text.secondary];
  const bestSource = [...CRM_SOURCES].sort((a, b) => b.close - a.close)[0];
  const latest = CRM_SERIES[CRM_SERIES.length - 1];
  const previous = CRM_SERIES[CRM_SERIES.length - 2];
  const latestWin = Math.round((latest.won / (latest.won + latest.lost)) * 100);
  const previousWin = Math.round((previous.won / (previous.won + previous.lost)) * 100);

  return (
    <div className="c-page p-crm">
      <PageHeader
        title="CRM"
        crumbs={[{ label: 'Dashboards', to: '/dashboard' }, { label: 'CRM' }]}
        actions={
          <>
            <DateRangePicker value={range} onChange={setRange} />
            <Button size="small" variant="outlined" onClick={() => navigate('/customers')}>
              Customers
            </Button>
            <Button size="small" variant="contained" onClick={() => navigate('/apps/chat')}>
              Inbox
            </Button>
          </>
        }
      />

      <div className="p-crm-stats" aria-label="CRM metrics">
        {[
          {
            label: 'New leads',
            value: String(leads),
            change: formatPercentChange(latest.leads, previous.leads),
            icon: <PersonAddAlt1OutlinedIcon fontSize="inherit" />,
            tone: 'primary',
          },
          {
            label: 'Closed won',
            value: String(won),
            change: formatPercentChange(latest.won, previous.won),
            icon: <EmojiEventsOutlinedIcon fontSize="inherit" />,
            tone: 'green',
          },
          {
            label: 'Win rate',
            value: `${winRate}%`,
            change: formatPercentChange(latestWin, previousWin),
            icon: <TrendingUpOutlinedIcon fontSize="inherit" />,
            tone: 'cyan',
          },
          {
            label: 'Open pipeline',
            value: formatCurrency(pipelineValue),
            change: formatPercentChange(latest.deals, previous.deals),
            icon: <AccountTreeOutlinedIcon fontSize="inherit" />,
            tone: 'amber',
          },
        ].map((item) => (
          <article key={item.label} className={`p-crm-kpi p-crm-kpi--${item.tone}`}>
            <div className="p-crm-kpi__head">
              <span className="p-crm-kpi__icon" aria-hidden>
                {item.icon}
              </span>
              {item.change ? (
                <em className={`p-crm-kpi__delta ${item.change.startsWith('+') ? 'is-up' : item.change.startsWith('-') ? 'is-down' : ''}`}>
                  {item.change}
                </em>
              ) : null}
            </div>
            <div className="p-crm-kpi__copy">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          </article>
        ))}
      </div>

      <section className="p-crm-focus" aria-label="CRM focus">
        <article className="p-crm-focus__card is-warn">
          <span className="p-crm-focus__icon" aria-hidden>
            <WarningAmberRoundedIcon fontSize="inherit" />
          </span>
          <div>
            <span className="p-crm-focus__label">At risk</span>
            <strong>{formatCurrency(atRisk?.amount || 0)}</strong>
            <p>{atRisk?.value || 0} deals in negotiation</p>
          </div>
        </article>
        <article className="p-crm-focus__card is-ok">
          <span className="p-crm-focus__icon" aria-hidden>
            <HubOutlinedIcon fontSize="inherit" />
          </span>
          <div>
            <span className="p-crm-focus__label">Best channel</span>
            <strong>{bestSource.name}</strong>
            <p>{bestSource.close}% close rate</p>
          </div>
        </article>
        <article className="p-crm-focus__card">
          <span className="p-crm-focus__icon" aria-hidden>
            <ForumOutlinedIcon fontSize="inherit" />
          </span>
          <div>
            <span className="p-crm-focus__label">Outreach this week</span>
            <strong>{calls + emails}</strong>
            <p>{calls} calls · {emails} emails · {meetings} meetings</p>
          </div>
        </article>
        <article className="p-crm-focus__card">
          <span className="p-crm-focus__icon" aria-hidden>
            <AssignmentLateOutlinedIcon fontSize="inherit" />
          </span>
          <div>
            <span className="p-crm-focus__label">Follow-ups due</span>
            <strong>{CRM_FOLLOWUPS.length}</strong>
            <p>Action items on the board below</p>
          </div>
        </article>
      </section>

      <section className="p-crm-board">
        <ChartCard title="Follow-ups this week" description="Owner board for due actions">
          <FollowUps items={CRM_FOLLOWUPS} variant="board" />
        </ChartCard>
      </section>

      <section className="p-crm-pipeline" aria-label="Pipeline stages">
        <header className="p-crm-section-head">
          <h2>Pipeline</h2>
          <p>Deal value by stage</p>
        </header>
        <ul className="p-crm-stages">
          {CRM_PIPELINE.map((stage, index) => (
            <li key={stage.name} style={{ '--stage': stageColors[index % stageColors.length] }}>
              <span>{stage.name}</span>
              <strong>{formatCurrency(stage.amount)}</strong>
              <em>{stage.value} deals</em>
            </li>
          ))}
        </ul>
      </section>

      <div className="p-crm-split">
        <ChartCard title="Lead flow" description="Leads won and lost by month">
          <SwitchableChart
            data={CRM_SERIES}
            xKey="month"
            height={280}
            defaultType="line"
            series={[
              { dataKey: 'leads', name: 'Leads', color: primary },
              { dataKey: 'won', name: 'Won', color: success },
              { dataKey: 'lost', name: 'Lost', color: error },
            ]}
          />
        </ChartCard>
        <ChartCard title="Lead sources" description="Volume by acquisition channel">
          <DonutChart data={sourceMix} height={240} centerValue={String(leads)} centerLabel="leads" />
        </ChartCard>
      </div>

      <div className="p-crm-bottom">
        <ChartCard title="Weekly activity" description="Calls, emails, and meetings">
          <SwitchableChart
            data={CRM_ACTIVITY_WEEK}
            xKey="day"
            height={240}
            defaultType="bar"
            stacked
            series={[
              { dataKey: 'calls', name: 'Calls', color: primary },
              { dataKey: 'emails', name: 'Emails', color: info },
              { dataKey: 'meetings', name: 'Meetings', color: warning },
            ]}
          />
        </ChartCard>
        <ChartCard title="Deal value by stage" description="Pipeline amount distribution">
          <SwitchableChart
            data={CRM_PIPELINE}
            xKey="name"
            height={240}
            defaultType="bar"
            layout="vertical"
            categoryWidth={96}
            showToggle={false}
            yTickFormatter={formatInrK}
            formatter={(value) => formatCurrency(Number(value))}
            series={[{ dataKey: 'amount', name: 'Value', color: primary }]}
          />
        </ChartCard>
      </div>

      <div className="p-crm-split">
        <section className="p-crm-owners">
          <header>
            <h2>Source quality</h2>
            <p>Leads vs close rate</p>
          </header>
          <ul>
            {CRM_SOURCES.map((source) => (
              <li key={source.name}>
                <div>
                  <strong>{source.name}</strong>
                  <span>{source.leads} leads · {source.close}% close</span>
                </div>
                <span className="p-crm-owners__track" aria-hidden>
                  <i style={{ width: `${(source.close / maxClose) * 100}%`, background: primary }} />
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="p-crm-owners">
          <header>
            <h2>Owners</h2>
            <p>Won value this quarter</p>
          </header>
          <ul>
            {CRM_OWNERS.map((owner) => (
              <li key={owner.name}>
                <div>
                  <strong>{owner.name}</strong>
                  <span>{owner.won} won · {formatCurrency(owner.value)}</span>
                </div>
                <span className="p-crm-owners__track" aria-hidden>
                  <i style={{ width: `${(owner.value / maxOwner) * 100}%` }} />
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
