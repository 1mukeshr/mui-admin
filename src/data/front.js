import { formatCurrency } from '../utils/format';

export const FRONT_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    monthly: 999,
    blurb: 'For a small team getting started.',
    popular: false,
    features: ['3 users', 'Orders and catalog', 'Basic reports', 'Email support'],
  },
  {
    id: 'pro',
    name: 'Professional',
    monthly: 2499,
    popular: true,
    blurb: 'For growing operations teams.',
    features: ['Unlimited users', 'CRM and analytics', 'Chat and notifications', 'Template customizer', 'Priority support'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthly: 6999,
    blurb: 'For multi-role workspaces.',
    popular: false,
    features: ['Roles and permissions', 'Advanced reports', 'Dedicated onboarding', 'Phone support', 'Custom branding'],
  },
];

function planPrice(monthly, yearly) {
  return yearly ? monthly * 10 : monthly;
}

export function planPriceLabel(monthly, yearly) {
  return `${formatCurrency(planPrice(monthly, yearly))}${yearly ? '/yr' : '/mo'}`;
}
