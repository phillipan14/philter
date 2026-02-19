"use client";

interface EmptyStateProps {
  onAddClick: () => void;
}

export default function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="text-center py-20">
      <p className="text-5xl mb-4">&#128373;</p>
      <h2 className="text-xl font-semibold mb-2">No profiles yet</h2>
      <p className="text-[var(--text-secondary)] mb-6 max-w-sm mx-auto">
        Add a LinkedIn profile to start tracking changes. Purely for professional networking purposes, of course.
      </p>
      <button onClick={onAddClick} className="btn-primary">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 3v10M3 8h10" />
        </svg>
        Add Your First Profile
      </button>
    </div>
  );
}
