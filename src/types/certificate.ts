export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string | null;
  imageUrl?: string | null;
}
