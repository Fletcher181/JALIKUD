import type { Deal } from '@/types';
import { apiGet } from './client';
import { ENDPOINTS } from './endpoints';

export async function getDeals(): Promise<Deal[]> {
  return apiGet<Deal[]>(ENDPOINTS.deals.list);
}
