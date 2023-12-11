type Page = 'register' | 'login' | 'cards' | 'ar-assets' | 'sign-out';

export const ROUTES = {
  register: '/register',
  login: '/login',
  cards: '/cards',
  arAssets: '/ar-assets',
  signOut: '/sign-out',
} as const;
