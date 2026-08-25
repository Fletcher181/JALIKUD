const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function isValidPassword(value: string): boolean {
  return value.length >= 8;
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function normalizePhMobileDigits(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  const withoutCountryCode = digits.startsWith('63') && digits.length > 10 ? digits.slice(2) : digits;
  const withoutLeadingZero = withoutCountryCode.startsWith('0')
    ? withoutCountryCode.slice(1)
    : withoutCountryCode;
  return withoutLeadingZero.slice(0, 10);
}

export function formatPhMobile(raw: string): string {
  const digits = normalizePhMobileDigits(raw);
  return [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 10)].filter(Boolean).join(' ');
}

export function isValidPhMobile(raw: string): boolean {
  return /^9\d{9}$/.test(normalizePhMobileDigits(raw));
}

export function formatIdentifierInput(value: string): string {
  if (/[a-zA-Z]/.test(value)) return value;
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return [digits.slice(0, 4), digits.slice(4, 7), digits.slice(7, 11)].filter(Boolean).join(' ');
}

export function isValidIdentifier(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.includes('@')) {
    return isValidEmail(trimmed);
  }
  return isValidPhMobile(trimmed);
}

export function maskContact(contact: string): string {
  if (contact.includes('@')) {
    const [local, domain] = contact.split('@');
    return `${local.slice(0, 1)}•••@${domain}`;
  }
  const digits = normalizePhMobileDigits(contact);
  return `+63 ${digits.slice(0, 3)} ••• ${digits.slice(-4)}`;
}
