export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },

  auth: {
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  app: {
    root: {
      path: '/shop',
      getHref: () => '/shop',
    },
    store: {
      path: '',
      getHref: () => '/shop',
    },
    product: {
      path: 'products/:productId',
      getHref: (id: string) => `/shop/products/${id}`,
    },
  },
} as const;
