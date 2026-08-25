import type { Reward } from '@/types';
import { apiGet, apiPost } from './client';
import { ENDPOINTS } from './endpoints';

export async function getRewards(): Promise<Reward[]> {
  return apiGet<Reward[]>(ENDPOINTS.rewards.list);
}

export async function redeemReward(rewardId: string): Promise<Reward> {
  return apiPost<Reward>(ENDPOINTS.rewards.redeem, { rewardId });
}
