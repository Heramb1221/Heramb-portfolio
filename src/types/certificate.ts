export interface Certification {
  /** Derived from YAML filename — used as React key */
  id: string;
  title: string;
  issuer: string;
  /** Raw issue date string from YAML — formats vary (Jul 2024, Nov 18, 2024, etc.) */
  issueDate: string;
  /** Full credential URL — null when absent or empty */
  credentialUrl: string | null;
}
