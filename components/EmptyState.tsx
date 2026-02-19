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
      <button onClick={onAddClick} className="btn-primary">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 3v10M3 8h10" />
        </svg>
        Add Your First &ldquo;Contact&rdquo;
      </button>
      <p className="mt-4 text-xs text-[var(--text-tertiary)]">
        <a href="https://app.skylarq.ai" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Sign in to Skylarq</a> to enable live monitoring
      </p>
    </div>
  );
}
