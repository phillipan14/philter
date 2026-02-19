export interface Profile {
  id: string;
  name: string;
  linkedinUrl: string;
  currentTitle: string;
  currentCompany: string;
  headline: string;
  avatarInitials: string;
  addedAt: string;
  lastChecked: string;
  changes: Change[];
}

export interface Change {
  id: string;
  timestamp: string;
  field: "title" | "company" | "headline";
  oldValue: string;
  newValue: string;
}
