export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    me: '/auth/me',
  },
  menu: {
    categories: '/menu/categories',
    items: '/menu/items',
    item: (id: string) => `/menu/items/${id}`,
    availability: (id: string) => `/menu/items/${id}/availability`,
  },
  deals: {
    list: '/deals',
  },
  rewards: {
    list: '/rewards',
    redeem: '/rewards/redeem',
  },
  orders: {
    list: '/orders',
    create: '/orders',
    detail: (id: string) => `/orders/${id}`,
    accept: (id: string) => `/orders/${id}/accept`,
    reject: (id: string) => `/orders/${id}/reject`,
    status: (id: string) => `/orders/${id}/status`,
  },
  soldOut: {
    list: '/inventory/sold-out-reports',
    create: '/inventory/sold-out-reports',
  },
} as const;
