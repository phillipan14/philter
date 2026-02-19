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

function getStalkerScore(changes: number): { label: string; emoji: string; color: string } {
  if (changes === 0) return { label: "Nothing yet", emoji: "\u{1F634}", color: "var(--text-tertiary)" };
  if (changes <= 2) return { label: "Mild interest", emoji: "\u{1F440}", color: "var(--text-secondary)" };
  if (changes <= 5) return { label: "Invested", emoji: "\u{1F50D}", color: "var(--warning)" };
  return { label: "Obsessed", emoji: "\u{1F6A8}", color: "var(--danger)" };
}

export default function ProfileDetail({ profile, onBack }: ProfileDetailProps) {
  const changeGroups = groupChanges(profile.changes);
  const score = getStalkerScore(profile.changes.length);

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
        Back to surveillance
      </button>

      {/* Profile header */}
      <div className="card p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent)] to-purple-500 flex items-center justify-center text-white font-semibold text-lg ring-2 ring-[var(--accent)]/20">
            {profile.avatarInitials}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-[var(--text-secondary)] mt-1">
              {profile.currentTitle} @ {profile.currentCompany}
            </p>
            <p className="text-sm text-[var(--text-tertiary)] mt-1 italic">
              &ldquo;{profile.headline}&rdquo;
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-[var(--text-tertiary)]">
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                Stalk on LinkedIn
              </a>
              <span>Watching since {formatDate(profile.addedAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Intel summary */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="card p-3 text-center">
          <p className="text-lg font-bold text-[var(--text-primary)]">{profile.changes.length}</p>
          <p className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">Changes caught</p>
        </div>
        <div className="card p-3 text-center">
          <p className="text-lg font-bold text-[var(--text-primary)]">{changeGroups.length}</p>
          <p className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">Life events</p>
        </div>
        <div className="card p-3 text-center">
          <p className="text-lg font-bold" style={{ color: score.color }}>{score.emoji} {score.label}</p>
          <p className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">Intel level</p>
        </div>
      </div>

      {/* Change timeline */}
      <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-4 uppercase tracking-wider">
        Evidence Log
      </h3>

      {changeGroups.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-4xl mb-3">&#128564;</p>
          <p className="text-[var(--text-secondary)] font-medium">Radio silence</p>
          <p className="text-sm text-[var(--text-tertiary)] mt-1">
            They haven&apos;t changed a thing. Either very stable or very good at hiding it.
          </p>
        </div>
      ) : (
        <div className="space-y-0">
          {changeGroups.map((group, i) => (
            <div key={group.timestamp} className="relative pl-10 pb-8">
              {i < changeGroups.length - 1 && <div className="timeline-line" />}
              <div className="absolute left-[14px] top-[6px] timeline-dot" />

              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {formatDate(group.timestamp)}
                </span>
                <span className="text-xs text-[var(--text-tertiary)]">
                  {formatTime(group.timestamp)}
                </span>
                {group.changes.length > 1 && (
                  <span className="text-[10px] text-[var(--warning)] font-medium uppercase">
                    Multi-update
                  </span>
                )}
              </div>

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
