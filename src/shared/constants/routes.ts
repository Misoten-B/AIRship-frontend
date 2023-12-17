export const ROUTES = {
  arAssets: {
    base: '/ar-assets',
    create: '/ar-assets/create',
    detail: (id: string) => `/ar-assets/${id}`,
    public: (id: string) => `/ar-assets/${id}/public`,
  },
  cards: {
    base: '/cards',
    create: '/cards/create',
    detail: (id: string) => `/cards/${id}`,
  },
  login: {
    base: '/login',
  },
  register: {
    base: '/register',
  },
  signOut: {
    base: '/sign-out',
  },
} as const;
