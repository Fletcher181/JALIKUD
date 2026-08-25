import { create } from 'zustand';

import * as ordersService from '@/services/api/orders.service';
import type { Order, OrderStatus } from '@/types';

interface OrdersState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

export const useOrdersStore = create<OrdersState>()((set) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const orders = await ordersService.listOrders();
      set({ orders, isLoading: false });
    } catch {
      set({ isLoading: false, error: 'Unable to load orders. Please try again.' });
    }
  },

  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    })),
}));
