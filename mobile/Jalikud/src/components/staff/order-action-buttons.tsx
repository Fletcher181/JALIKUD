export interface OrderActionButtonsProps {
  orderId: string;
  onAccept?: () => void;
  onReject?: (reason?: string) => void;
  disabled?: boolean;
}

export function OrderActionButtons(_props: OrderActionButtonsProps) {
  return null;
}
