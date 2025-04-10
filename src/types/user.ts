export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatarUrl?: string;
}

export function getInitials(name: string): string {
  const names = name.split(' ');
  return names
    .map(n => n[0])
    .join('')
    .toUpperCase();
}
