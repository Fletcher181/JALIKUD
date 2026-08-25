import type { SoldOutReport } from '@/types';
import { apiGet, apiPost } from './client';
import { ENDPOINTS } from './endpoints';

export interface CreateSoldOutReportPayload {
  menuItemId: string;
  note?: string;
}

export async function listReports(): Promise<SoldOutReport[]> {
  return apiGet<SoldOutReport[]>(ENDPOINTS.soldOut.list);
}

export async function createReport(payload: CreateSoldOutReportPayload): Promise<SoldOutReport> {
  return apiPost<SoldOutReport>(ENDPOINTS.soldOut.create, payload);
}
