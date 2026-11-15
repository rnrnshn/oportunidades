export const CONTACT_EMAIL = 'geral@oportunidades.social'

// Links without an href are hidden, so the social section only appears once real profiles exist.
export const SOCIAL_LINKS: Array<{ label: 'Facebook' | 'LinkedIn' | 'Instagram' | 'X' | 'YouTube'; href: string }> = [
  { label: 'Facebook', href: '' },
  { label: 'LinkedIn', href: '' },
  { label: 'Instagram', href: '' },
  { label: 'X', href: '' },
  { label: 'YouTube', href: '' },
]

export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'https://oportunidades.social').replace(/\/$/, '')
export const SITE_NAME = 'Oportunidades'
export const DEFAULT_SHARE_IMAGE = '/hero-image.png'
