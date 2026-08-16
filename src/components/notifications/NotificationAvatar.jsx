import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

const ICONS = {
  cart: ShoppingBagOutlinedIcon,
  order: ShoppingBagOutlinedIcon,
  payment: PaymentsOutlinedIcon,
  user: PersonOutlineIcon,
  connect: PersonAddAltOutlinedIcon,
  mail: MailOutlineIcon,
  chat: ChatBubbleOutlineIcon,
  message: ChatBubbleOutlineIcon,
  product: Inventory2OutlinedIcon,
  stock: WarningAmberOutlinedIcon,
  security: ShieldOutlinedIcon,
  system: CampaignOutlinedIcon,
  report: AssessmentOutlinedIcon,
  award: WorkspacePremiumOutlinedIcon,
  default: NotificationsNoneOutlinedIcon,
};

const TONE = {
  cart: 'green',
  order: 'green',
  payment: 'green',
  user: 'cyan',
  connect: 'cyan',
  mail: 'indigo',
  chat: 'indigo',
  message: 'indigo',
  product: 'amber',
  stock: 'amber',
  security: 'rose',
  system: 'slate',
  report: 'slate',
  award: 'amber',
};

function resolveNotificationIcon(item) {
  const key = item.icon || item.type || 'default';
  return ICONS[key] || ICONS.default;
}

function resolveNotificationTone(item) {
  const key = item.icon || item.type || 'default';
  return TONE[key] || 'indigo';
}

export function NotificationAvatar({ item, size = 'md' }) {
  const Icon = resolveNotificationIcon(item);
  const tone = resolveNotificationTone(item);

  if (item.avatar) {
    return (
      <span className={`c-notify-avatar c-notify-avatar--${size}`}>
        <img src={item.avatar} alt="" />
      </span>
    );
  }

  if (item.initials) {
    return (
      <span className={`c-notify-avatar c-notify-avatar--${size} is-tone-${tone}`} style={item.color ? { color: item.color, background: `${item.color}22` } : undefined}>
        {item.initials}
      </span>
    );
  }

  return (
    <span className={`c-notify-avatar c-notify-avatar--${size} is-tone-${tone} is-icon`} style={item.color ? { color: item.color, background: `${item.color}22` } : undefined}>
      <Icon fontSize="small" />
    </span>
  );
}
