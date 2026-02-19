import { Profile } from "./types";
import { DEMO_PROFILES } from "./demo-data";

const STORAGE_KEY = "philter-profiles";

export function getProfiles(): Profile[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Seed with demo data on first visit
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_PROFILES));
    return DEMO_PROFILES;
  }
  return JSON.parse(stored);
}

export function saveProfiles(profiles: Profile[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

export function addProfile(profile: Profile): Profile[] {
  const profiles = getProfiles();
  profiles.unshift(profile);
  saveProfiles(profiles);
  return profiles;
}

export function removeProfile(id: string): Profile[] {
  const profiles = getProfiles().filter((p) => p.id !== id);
  saveProfiles(profiles);
  return profiles;
}

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
