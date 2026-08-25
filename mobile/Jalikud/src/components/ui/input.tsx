import type { TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
  label?: string;
  errorText?: string;
}

export function Input(_props: InputProps) {
  return null;
}
