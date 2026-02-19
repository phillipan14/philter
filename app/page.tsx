"use client";

import { useState, useEffect } from "react";
import { Profile } from "@/lib/types";
import { getProfiles, addProfile, removeProfile, clearAllData } from "@/lib/storage";
import Header from "@/components/Header";
import ProfileCard from "@/components/ProfileCard";
import ProfileDetail from "@/components/ProfileDetail";
import AddProfileModal from "@/components/AddProfileModal";
import EmptyState from "@/components/EmptyState";

export default function Home() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setProfiles(getProfiles());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalChanges = profiles.reduce((sum, p) => sum + p.changes.length, 0);

  function handleAddProfile(profile: Profile) {
    const updated = addProfile(profile);
    setProfiles(updated);
  }

  function handleRemoveProfile(id: string) {
    const updated = removeProfile(id);
    setProfiles(updated);
    if (selectedProfile?.id === id) setSelectedProfile(null);
  }

  function handleResetDemo() {
    clearAllData();
    setProfiles(getProfiles());
    setSelectedProfile(null);
  }

  // Profile detail view
  if (selectedProfile) {
    return (
      <main className="relative z-10 mx-auto max-w-2xl px-4 py-10 sm:py-16">
        <ProfileDetail
          profile={selectedProfile}
          onBack={() => setSelectedProfile(null)}
        />
        <Footer onReset={handleResetDemo} />
      </main>
    );
  }

  // Dashboard view
  return (
    <main className="relative z-10 mx-auto max-w-2xl px-4 py-10 sm:py-16">
      {/* Skylarq-powered banner */}
      <div className="mb-8 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3">
        <div className="flex items-center justify-center gap-2 text-xs text-[var(--text-secondary)] mb-2">
          <span>&#9889;</span>
          <span>Powered by <a href="https://skylarq.ai" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--accent)] hover:underline">Skylarq AI</a> &mdash; the engine behind real LinkedIn profile monitoring</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <a
            href="https://app.skylarq.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[var(--accent)] to-purple-500 px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
          >
            <span>&#128640;</span>
            Set up real monitoring on Skylarq
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 3h7v7M13 3L6 10" />
            </svg>
          </a>
          <span className="text-[10px] text-[var(--text-tertiary)]">Free account required</span>
        </div>
        <p className="text-center text-[10px] text-[var(--text-tertiary)] mt-2">
          Below is a demo with sample data. Create a Skylarq account to monitor real profiles.
        </p>
      </div>

      <Header
        profileCount={profiles.length}
        totalChanges={totalChanges}
        onAddClick={() => setShowAddModal(true)}
      />

      {profiles.length === 0 ? (
        <EmptyState onAddClick={() => setShowAddModal(true)} />
      ) : (
        <div className="grid gap-4">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onSelect={setSelectedProfile}
              onRemove={handleRemoveProfile}
            />
          ))}
        </div>
      )}

      {showAddModal && (
        <AddProfileModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddProfile}
        />
      )}

      <Footer onReset={handleResetDemo} />
    </main>
  );
}

function Footer({ onReset }: { onReset: () => void }) {
  return (
    <footer className="mt-20 flex flex-col items-center gap-3 text-xs text-[var(--text-tertiary)]">
      <p className="text-[var(--text-tertiary)] italic mb-1">&ldquo;It&apos;s not stalking if it&apos;s on LinkedIn&rdquo;</p>
      <div className="flex items-center gap-1.5">
        <span className="text-sm">&#128064;</span>
        <span>
          Built by{" "}
          <a
            href="https://linkedin.com/in/phillipan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            Phillip An
          </a>
        </span>
      </div>
      <div className="flex items-center gap-3">
        <a
          href="https://github.com/phillipan14/philter"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--text-secondary)] transition-colors"
        >
          GitHub
        </a>
        <span>&middot;</span>
        <a
          href="https://skylarq.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--text-secondary)] transition-colors"
        >
          Powered by Skylarq
        </a>
        <span>&middot;</span>
        <button
          onClick={onReset}
          className="hover:text-[var(--text-secondary)] transition-colors"
        >
          Reset demo
        </button>
      </div>
    </footer>
  );
}
