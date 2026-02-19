"use client";

interface EmptyStateProps {
  onAddClick: () => void;
}

export default function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="text-center py-20">
      <p className="text-5xl mb-4">&#128064;</p>
      <h2 className="text-xl font-semibold mb-2">No one to stalk yet</h2>
      <p className="text-[var(--text-secondary)] mb-6 max-w-sm mx-auto">
        Add your ex&apos;s LinkedIn profile. You know the URL by heart. Don&apos;t lie.
      </p>
      <div className="flex flex-col items-center gap-3">
        <button onClick={onAddClick} className="btn-primary">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3v10M3 8h10" />
          </svg>
          Try the Demo
        </button>
        <span className="text-xs text-[var(--text-tertiary)]">or</span>
        <a
          href="https://app.skylarq.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg border border-[var(--accent)] px-4 py-2 text-xs font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-white"
        >
          Monitor real profiles on Skylarq
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 3h7v7M13 3L6 10" />
          </svg>
        </a>
      </div>
    </div>
  );
}
