import type { Order } from '@/types';

export interface IncomingOrderCardProps {
  order: Order;
  onPress?: (order: Order) => void;
}

export function IncomingOrderCard(_props: IncomingOrderCardProps) {
  return null;
}
