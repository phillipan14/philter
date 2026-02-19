"use client";

interface HeaderProps {
  profileCount: number;
  totalChanges: number;
  onAddClick: () => void;
}

export default function Header({ profileCount, totalChanges, onAddClick }: HeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-none">
            <span className="bg-gradient-to-r from-[var(--accent)] via-purple-400 to-violet-300 bg-clip-text text-transparent">
              PhilTer
            </span>
          </h1>
          <p className="mt-2.5 text-[var(--text-secondary)] text-sm">
            Know when your ex gets a new job before they tell anyone.
          </p>
          <p className="mt-1 text-[var(--text-tertiary)] text-xs">
            Real-time LinkedIn monitoring powered by{" "}
            <a href="https://skylarq.ai" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Skylarq AI</a>
          </p>
        </div>

        <button onClick={onAddClick} className="btn-primary mt-1">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M8 3v10M3 8h10" />
          </svg>
          <span className="hidden sm:inline">Add Profile</span>
        </button>
      </div>

      {/* Stats bar */}
      <div className="flex gap-5 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          <span className="text-[var(--text-tertiary)]">
            <span className="text-[var(--text-secondary)] font-medium">{profileCount}</span> under surveillance
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
          <span className="text-[var(--text-tertiary)]">
            <span className="text-[var(--text-secondary)] font-medium">{totalChanges}</span> life updates intercepted
          </span>
        </div>
      </div>
    </header>
  );
}
