export interface EmptyStateProps {
  title: string;
  message?: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export function EmptyState(_props: EmptyStateProps) {
  return null;
}
