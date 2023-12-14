type Page = 'register' | 'login' | 'cards' | 'arAssets' | 'signOut';

export const ROUTES = {
  register: '/register',
  login: '/login',
  cards: '/cards',
  arAssets: '/ar-assets',
  signOut: '/sign-out',
} as const satisfies Record<Page, string>;
