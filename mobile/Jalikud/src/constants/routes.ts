import type { UserRole } from '@/types';

export const ROUTES = {
  auth: {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
  },
  customer: {
    home: '/',
    menu: '/menu',
    deals: '/deals',
    rewards: '/rewards',
    profile: '/profile',
    editProfile: '/profile/edit',
    menuCategory: (category: string) => `/menu/${category}` as const,
    menuItem: (id: string) => `/menu/item/${id}` as const,
    cart: '/cart',
    checkout: '/checkout',
    orders: '/my-orders',
    orderDetails: (id: string) => `/my-orders/${id}` as const,
  },
  staff: {
    dashboard: '/incoming-orders',
    orderDetails: (id: string) => `/incoming-orders/${id}` as const,
    soldOut: '/sold-out',
    soldOutReport: '/sold-out/report',
    settings: '/settings',
  },
} as const;

export const AUTH_ROUTE_PATHS: readonly string[] = Object.values(ROUTES.auth);

export const CUSTOMER_ROUTE_PREFIXES: readonly string[] = [
  ROUTES.customer.home,
  ROUTES.customer.menu,
  ROUTES.customer.deals,
  ROUTES.customer.rewards,
  ROUTES.customer.profile,
  ROUTES.customer.cart,
  ROUTES.customer.checkout,
  ROUTES.customer.orders,
];

export const STAFF_ROUTE_PREFIXES: readonly string[] = [
  ROUTES.staff.dashboard,
  ROUTES.staff.soldOut,
  ROUTES.staff.settings,
];

type CustomerHome = typeof ROUTES.customer.home;
type StaffHome = typeof ROUTES.staff.dashboard;

export function homeRouteForRole(role: UserRole): CustomerHome | StaffHome {
  return role === 'staff' ? ROUTES.staff.dashboard : ROUTES.customer.home;
}
