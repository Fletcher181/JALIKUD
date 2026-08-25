import type { Order, OrderItem, OrderStatus } from '@/types';
import { apiGet, apiPatch, apiPost } from './client';
import { ENDPOINTS } from './endpoints';

export interface CreateOrderPayload {
  items: Pick<OrderItem, 'menuItemId' | 'quantity'>[];
  notes?: string;
}

export async function listOrders(): Promise<Order[]> {
  return apiGet<Order[]>(ENDPOINTS.orders.list);
}

export async function getOrder(id: string): Promise<Order> {
  return apiGet<Order>(ENDPOINTS.orders.detail(id));
}

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  return apiPost<Order>(ENDPOINTS.orders.create, payload);
}

export async function acceptOrder(id: string): Promise<Order> {
  return apiPost<Order>(ENDPOINTS.orders.accept(id));
}

export async function rejectOrder(id: string, reason?: string): Promise<Order> {
  return apiPost<Order>(ENDPOINTS.orders.reject(id), { reason });
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
  return apiPatch<Order>(ENDPOINTS.orders.status(id), { status });
}
