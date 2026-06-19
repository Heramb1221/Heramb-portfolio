export interface Recommendation {
  /** Derived from YAML filename — used as React key */
  id: string;
  name: string;
  role: string;
  organization: string;
  message: string;
  /** Cloudinary URL or any image URL — null when absent */
  avatar: string | null;
}

/** Extracts up to 2 uppercase initials from a full name */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
