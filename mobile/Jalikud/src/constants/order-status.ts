import type { OrderStatus } from '@/types';

export const ORDER_STATUSES = [
  'pending',
  'accepted',
  'preparing',
  'ready',
  'completed',
  'rejected',
  'cancelled',
] as const satisfies readonly OrderStatus[];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  preparing: 'Preparing',
  ready: 'Ready for Pickup',
  completed: 'Completed',
  rejected: 'Rejected',
  cancelled: 'Cancelled',
};

export const ACTIVE_ORDER_STATUSES: readonly OrderStatus[] = [
  'pending',
  'accepted',
  'preparing',
  'ready',
];
