import { CONTACT_PHONE } from './seed';

function minutesAgo(minutes) {
  return new Date(Date.now() - minutes * 60 * 1000).toISOString();
}

export const CHAT_CONTACTS = [
  {
    id: 'ch1',
    name: 'Waldemar Mannering',
    role: 'Account Manager',
    email: 'waldemar@demo.com',
    phone: CONTACT_PHONE,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    status: 'online',
  },
  {
    id: 'ch2',
    name: 'Felecia Rower',
    role: 'Support Lead',
    email: 'felecia@demo.com',
    phone: CONTACT_PHONE,
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    status: 'online',
  },
  {
    id: 'ch3',
    name: 'Calvin Moore',
    role: 'UI/UX Designer',
    email: 'calvin.moore@demo.com',
    phone: CONTACT_PHONE,
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    status: 'online',
  },
  {
    id: 'ch4',
    name: 'Calvin Montgomery',
    role: 'Business Analyst',
    email: 'calvin.m@demo.com',
    phone: CONTACT_PHONE,
    initials: 'CM',
    color: '#7367F0',
    status: 'offline',
  },
  {
    id: 'ch5',
    name: 'Louie Mason',
    role: 'Resource Manager',
    email: 'louie@demo.com',
    phone: CONTACT_PHONE,
    initials: 'LM',
    color: '#28C76F',
    status: 'offline',
  },
  {
    id: 'ch6',
    name: 'Claude Horton',
    role: 'UI/UX Designer',
    email: 'claude@demo.com',
    phone: CONTACT_PHONE,
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    status: 'away',
  },
  {
    id: 'ch7',
    name: 'Priya Shah',
    role: 'People',
    email: 'priya@demo.com',
    phone: CONTACT_PHONE,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    status: 'online',
  },
  {
    id: 'ch8',
    name: 'Jordan Lee',
    role: 'Sales',
    email: 'jordan@demo.com',
    phone: CONTACT_PHONE,
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    status: 'offline',
  },
];

export function createSeedMessages() {
  return [
    {
      id: 'm1',
      contactId: 'ch1',
      fromMe: false,
      text: 'Refer friends. Get rewards.',
      createdAt: minutesAgo(18),
    },
    {
      id: 'm2',
      contactId: 'ch1',
      fromMe: true,
      text: 'Shared the catalog with two stores in Jaipur.',
      createdAt: minutesAgo(12),
    },
    {
      id: 'm3',
      contactId: 'ch1',
      fromMe: false,
      text: 'Great. Referral credit is ₹500 once the first order is paid.',
      createdAt: minutesAgo(5),
    },
    {
      id: 'm4',
      contactId: 'ch2',
      fromMe: false,
      text: 'I will purchase it for support. Can you confirm stock?',
      createdAt: minutesAgo(40),
    },
    {
      id: 'm5',
      contactId: 'ch2',
      fromMe: true,
      text: 'Yes, 24 units are available. I can reserve them today.',
      createdAt: minutesAgo(34),
    },
    {
      id: 'm6',
      contactId: 'ch2',
      fromMe: false,
      text: 'Please hold them. I will raise the order this afternoon.',
      createdAt: minutesAgo(30),
    },
    {
      id: 'm7',
      contactId: 'ch3',
      fromMe: true,
      text: 'The invoice draft is ready if you want a review.',
      createdAt: minutesAgo(26 * 60),
    },
    {
      id: 'm8',
      contactId: 'ch3',
      fromMe: false,
      text: 'If it takes long you can mail me at calvin.moore@demo.com',
      createdAt: minutesAgo(24 * 60),
    },
  ];
}

export function formatChatAgo(value) {
  const minutes = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 60000));
  if (minutes < 1) return 'Just now';
  if (minutes === 1) return '1 Minute';
  if (minutes < 60) return `${minutes} Minutes`;
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return '1 Hour';
  if (hours < 24) return `${hours} Hours`;
  const days = Math.floor(hours / 24);
  if (days === 1) return '1 Day';
  return `${days} Days`;
}

export function formatMessageTime(value) {
  return new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit' }).format(new Date(value));
}

export function formatMessageDay(value) {
  const date = new Date(value);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}
