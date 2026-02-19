"use client";

import { Profile, Change } from "@/lib/types";

interface ProfileDetailProps {
  profile: Profile;
  onBack: () => void;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
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

// Group changes by timestamp (changes that happened at the same time)
function groupChanges(changes: Change[]): { timestamp: string; changes: Change[] }[] {
  const groups: Map<string, Change[]> = new Map();
  for (const change of changes) {
    const existing = groups.get(change.timestamp) || [];
    existing.push(change);
    groups.set(change.timestamp, existing);
  }
  return Array.from(groups.entries()).map(([timestamp, changes]) => ({
    timestamp,
    changes,
  }));
}

export default function ProfileDetail({ profile, onBack }: ProfileDetailProps) {
  const changeGroups = groupChanges(profile.changes);

  return (
    <div className="animate-in">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-6"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 3L5 8l5 5" />
        </svg>
        Back to all profiles
      </button>

      {/* Profile header */}
      <div className="card p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent)] to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
            {profile.avatarInitials}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-[var(--text-secondary)] mt-1">
              {profile.currentTitle} @ {profile.currentCompany}
            </p>
            <p className="text-sm text-[var(--text-tertiary)] mt-1">{profile.headline}</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-[var(--text-tertiary)]">
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                View LinkedIn
              </a>
              <span>Tracking since {formatDate(profile.addedAt)}</span>
              <span>{profile.changes.length} changes detected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Change timeline */}
      <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-4 uppercase tracking-wider">
        Change History
      </h3>

      {changeGroups.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-4xl mb-3">&#128064;</p>
          <p className="text-[var(--text-secondary)]">Suspiciously quiet</p>
          <p className="text-sm text-[var(--text-tertiary)] mt-1">
            They haven&apos;t changed a thing. Either very stable or very good at hiding it.
          </p>
        </div>
      ) : (
        <div className="space-y-0">
          {changeGroups.map((group, i) => (
            <div key={group.timestamp} className="relative pl-10 pb-8">
              {/* Timeline connector */}
              {i < changeGroups.length - 1 && <div className="timeline-line" />}

              {/* Dot */}
              <div className="absolute left-[14px] top-[6px] timeline-dot" />

              {/* Date header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {formatDate(group.timestamp)}
                </span>
                <span className="text-xs text-[var(--text-tertiary)]">
                  {formatTime(group.timestamp)}
                </span>
              </div>

              {/* Changes in this group */}
              <div className="space-y-2">
                {group.changes.map((change) => (
                  <div key={change.id} className="card p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={fieldBadgeClass(change.field)}>
                        {fieldLabel(change.field)}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="diff-old">{change.oldValue}</p>
                      <p className="diff-new">{change.newValue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
