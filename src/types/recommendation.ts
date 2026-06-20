export interface Recommendation {
  id: string;
  name: string;
  role: string;
  organization: string;
  message: string;
  avatar: string | null;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
