import { useOrdersStore } from '@/store/orders-store';
import { ACTIVE_ORDER_STATUSES } from '@/constants/order-status';
import type { Order } from '@/types';

export function useOrders() {
  const orders = useOrdersStore((state) => state.orders);
  const isLoading = useOrdersStore((state) => state.isLoading);
  const error = useOrdersStore((state) => state.error);
  const fetchOrders = useOrdersStore((state) => state.fetchOrders);
  const updateOrderStatus = useOrdersStore((state) => state.updateOrderStatus);

  function getOrderById(orderId: string): Order | undefined {
    return orders.find((order) => order.id === orderId);
  }

  const activeOrders = orders.filter((order) =>
    ACTIVE_ORDER_STATUSES.includes(order.status),
  );

  return {
    orders,
    activeOrders,
    isLoading,
    error,
    fetchOrders,
    updateOrderStatus,
    getOrderById,
  };
}
