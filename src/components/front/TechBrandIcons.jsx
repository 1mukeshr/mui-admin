import {
  SiCss,
  SiCssHex,
  SiMui,
  SiMuiHex,
  SiReact,
  SiReactHex,
  SiReactrouter,
  SiReactrouterHex,
} from '@icons-pack/react-simple-icons';

const ICON_SIZE = 32;

function Brand({ Icon, color, title }) {
  return <Icon title={title} color={color} size={ICON_SIZE} aria-hidden />;
}

export function ReactIcon() {
  return <Brand Icon={SiReact} color={SiReactHex} title="React" />;
}

/** Official Vite brand colors (blue / violet / yellow). */
export function ViteIcon() {
  return (
    <svg viewBox="0 0 24 24" width={ICON_SIZE} height={ICON_SIZE} aria-hidden focusable="false">
      <title>Vite</title>
      <path fill="#41D1FF" d="M2.2 19.8 12 2.2l9.8 17.6H2.2Z" />
      <path fill="#BD34FE" d="M12 6.6 7.1 16.2h2.9L12 11.4l2 4.8h2.9L12 6.6Z" />
      <path fill="#FFCC21" d="m12 12.8-1.4 3.4h2.8L12 12.8Z" />
    </svg>
  );
}

export function MuiIcon() {
  return <Brand Icon={SiMui} color={SiMuiHex} title="Material UI" />;
}

export function EmotionIcon() {
  return (
    <svg viewBox="0 0 32 32" width={ICON_SIZE} height={ICON_SIZE} aria-hidden focusable="false">
      <title>Emotion</title>
      <circle cx="16" cy="16" r="14" fill="#C43BAD" />
      <circle cx="11.2" cy="13.2" r="2" fill="#fff" />
      <circle cx="20.8" cy="13.2" r="2" fill="#fff" />
      <path
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        d="M10.4 19.2c1.6 2.4 3.8 3.6 5.6 3.6s4-1.2 5.6-3.6"
      />
    </svg>
  );
}

export function ReactRouterIcon() {
  return <Brand Icon={SiReactrouter} color={SiReactrouterHex} title="React Router" />;
}

export function RechartsIcon() {
  return (
    <svg viewBox="0 0 32 32" width={ICON_SIZE} height={ICON_SIZE} aria-hidden focusable="false">
      <title>Recharts</title>
      <rect width="32" height="32" rx="6" fill="#22B7C9" />
      <path fill="#fff" d="M7 22V14.5h3.2V22H7Zm7.4 0V9h3.2v13h-3.2Zm7.4 0v-7.2H25V22h-3.2Z" />
    </svg>
  );
}

export function CssIcon() {
  return <Brand Icon={SiCss} color={SiCssHex} title="CSS" />;
}
