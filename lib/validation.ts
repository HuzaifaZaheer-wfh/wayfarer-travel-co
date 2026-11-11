export type FieldError = string | undefined;

export function validateRequired(value: string, label: string): FieldError {
  if (!value || value.trim().length === 0) {
    return `${label} is required.`;
  }
  return undefined;
}

export function validateEmail(value: string): FieldError {
  if (!value || value.trim().length === 0) return 'Email is required.';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!re.test(value.trim())) return 'Please enter a valid email address.';
  return undefined;
}

export function validatePhone(value: string): FieldError {
  if (!value || value.trim().length === 0) return 'Phone is required.';
  const digits = value.replace(/[^\d]/g, '');
  if (digits.length < 7 || digits.length > 15) {
    return 'Please enter a valid phone number (7–15 digits).';
  }
  return undefined;
}

export function validateDate(value: string, label: string): FieldError {
  if (!value) return `${label} is required.`;
  const picked = new Date(value);
  if (Number.isNaN(picked.getTime())) return `${label} is not a valid date.`;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (picked < today) return `${label} cannot be in the past.`;
  return undefined;
}

export function validateMinLength(
  value: string,
  min: number,
  label: string
): FieldError {
  if (!value || value.trim().length < min) {
    return `${label} must be at least ${min} characters.`;
  }
  return undefined;
}
