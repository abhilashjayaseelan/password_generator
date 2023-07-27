export function getPasswordStrength(
  password: string,
  numSelectedFields: number
): string {
  if (password.length < 8 || numSelectedFields === 1) {
    return "Normal";
  } else if (password.length < 12) {
    return "Medium";
  } else {
    return "Strong";
  }
}
