"use client";

interface HeaderProps {
  profileCount: number;
  totalChanges: number;
  onAddClick: () => void;
}

export default function Header({ profileCount, totalChanges, onAddClick }: HeaderProps) {
  return (
    <header className="mb-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-[var(--accent)] via-purple-400 to-violet-300 bg-clip-text text-transparent">
              PhilTer
            </span>
          </h1>
          <p className="mt-2 text-[var(--text-secondary)] text-sm">
            LinkedIn profile intelligence.{" "}
            <span className="text-[var(--text-tertiary)]">For market research purposes.</span>
          </p>
        </div>

        <button onClick={onAddClick} className="btn-primary">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3v10M3 8h10" />
          </svg>
          <span className="hidden sm:inline">Add Profile</span>
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="text-[var(--text-secondary)]">
            <span className="text-[var(--text-primary)] font-medium">{profileCount}</span> profiles tracked
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--success)]" />
          <span className="text-[var(--text-secondary)]">
            <span className="text-[var(--text-primary)] font-medium">{totalChanges}</span> changes detected
          </span>
        </div>
      </div>
    </header>
  );
}
