"use client";

import { Profile } from "@/lib/types";

interface ProfileCardProps {
  profile: Profile;
  onSelect: (profile: Profile) => void;
  onRemove: (id: string) => void;
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function fieldLabel(field: string): string {
  switch (field) {
    case "title": return "Title";
    case "company": return "Company";
    case "headline": return "Headline";
    default: return field;
  }
}

function fieldBadgeClass(field: string): string {
  switch (field) {
    case "title": return "badge-change badge-title";
    case "company": return "badge-change badge-company";
    case "headline": return "badge-change badge-headline";
    default: return "badge-change badge-title";
  }
}

export default function ProfileCard({ profile, onSelect, onRemove }: ProfileCardProps) {
  const latestChange = profile.changes[0];
  const changeCount = profile.changes.length;

  return (
    <div className={`card p-5 cursor-pointer animate-in${changeCount > 0 ? " card-has-changes" : ""}`} onClick={() => onSelect(profile)}>
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
          {profile.avatarInitials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-[var(--text-primary)] truncate">
              {profile.name}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(profile.id);
              }}
              className="shrink-0 text-[var(--text-tertiary)] hover:text-[var(--danger)] transition-colors p-1"
              title="Remove profile"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>

          <p className="text-sm text-[var(--text-secondary)] truncate">
            {profile.currentTitle} @ {profile.currentCompany}
          </p>

          <p className="text-xs text-[var(--text-tertiary)] mt-1 truncate">
            {profile.headline}
          </p>

          {/* Latest change or no changes */}
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            {changeCount > 0 ? (
              <>
                <span className={fieldBadgeClass(latestChange.field)}>
                  {fieldLabel(latestChange.field)}
                </span>
                <span className="text-xs text-[var(--text-tertiary)]">
                  {timeAgo(latestChange.timestamp)}
                </span>
                {changeCount > 1 && (
                  <span className="text-xs text-[var(--text-tertiary)]">
                    +{changeCount - 1} more
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs text-[var(--text-tertiary)] italic">
                Suspiciously quiet
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
