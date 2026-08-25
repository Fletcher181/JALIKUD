import type { Reward } from '@/types';

export interface RewardCardProps {
  reward: Reward;
  pointsBalance?: number;
  onRedeem?: (reward: Reward) => void;
}

export function RewardCard(_props: RewardCardProps) {
  return null;
}
