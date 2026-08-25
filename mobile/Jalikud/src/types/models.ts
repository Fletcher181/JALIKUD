export type UserRole = 'customer' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  branchId?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isAvailable: boolean;
}

export interface Deal {
  id: string;
  title: string;
  description?: string;
  discountPercent?: number;
  discountedPrice?: number;
  startsAt: string;
  endsAt: string;
  imageUrl?: string;
}

export interface Reward {
  id: string;
  title: string;
  description?: string;
  pointsCost: number;
  expiresAt?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'rejected'
  | 'cancelled';

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  customerId: string;
  branchId: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  placedAt: string;
  acceptedAt?: string;
  completedAt?: string;
  rejectionReason?: string;
  pickupCode?: string;
}

export interface SoldOutReport {
  id: string;
  branchId: string;
  menuItemId: string;
  reportedByUserId: string;
  reportedAt: string;
  note?: string;
}
