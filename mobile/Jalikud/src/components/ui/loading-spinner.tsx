import { ActivityIndicator } from 'react-native';

export interface LoadingSpinnerProps {
  size?: 'small' | 'large';
}

export function LoadingSpinner({ size = 'small' }: LoadingSpinnerProps) {
  return <ActivityIndicator size={size} />;
}
