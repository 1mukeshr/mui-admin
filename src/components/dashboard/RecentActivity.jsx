import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { formatRelative } from '../../utils/format';

function activityMeta(action) {
  if (action.includes('fulfill') || action.includes('ship')) return { Icon: LocalShippingOutlinedIcon, tone: 'cyan' };
  if (action.includes('order')) return { Icon: ReceiptLongOutlinedIcon, tone: 'primary' };
  if (action.includes('product') || action.includes('stock')) return { Icon: Inventory2OutlinedIcon, tone: 'amber' };
  if (action.includes('user') || action.includes('invited')) return { Icon: PersonAddAltOutlinedIcon, tone: 'green' };
  if (action.includes('role')) return { Icon: AdminPanelSettingsOutlinedIcon, tone: 'rose' };
  return { Icon: ReceiptLongOutlinedIcon, tone: 'primary' };
}

export function RecentActivity({ activities, limit = 6, variant = 'feed' }) {
  const rows = [...activities].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit);

  return (
    <ul className={`c-panel ${variant === 'timeline' ? 'c-panel--timeline' : ''}`}>
      {rows.map((item) => {
        const { Icon, tone } = activityMeta(item.action);
        return (
          <li key={item.id}>
            <div className={`c-panel__item c-panel__item--${tone}`}>
              <span className="c-panel__media" aria-hidden>
                <Icon fontSize="small" />
              </span>
              <span className="c-panel__body">
                <span className="c-panel__title">
                  {item.user} <span className="c-panel__action">{item.action}</span>
                </span>
                <span className="c-panel__meta">{item.target}</span>
              </span>
              <span className="c-panel__aside">
                <span className="c-panel__time">{formatRelative(item.createdAt)}</span>
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
