"use client";

import { useState } from "react";
import { Profile } from "@/lib/types";

interface AddProfileModalProps {
  onClose: () => void;
  onAdd: (profile: Profile) => void;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function extractSlug(url: string): string {
  const match = url.match(/linkedin\.com\/in\/([^/?]+)/);
  return match ? match[1] : "";
}

export default function AddProfileModal({ onClose, onAdd }: AddProfileModalProps) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");

  const isValid = url.includes("linkedin.com/in/") && name.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    const profile: Profile = {
      id: `profile-${Date.now()}`,
      name: name.trim(),
      linkedinUrl: url.startsWith("http") ? url : `https://${url}`,
      currentTitle: title.trim() || "Unknown",
      currentCompany: company.trim() || "Unknown",
      headline: `${title.trim() || "Professional"} @ ${company.trim() || "Company"}`,
      avatarInitials: getInitials(name.trim()),
      addedAt: new Date().toISOString(),
      lastChecked: new Date().toISOString(),
      changes: [],
    };

    onAdd(profile);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Who are we watching?</h2>
          <button
            onClick={onClose}
            className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
              Their LinkedIn URL
            </label>
            <input
              type="url"
              placeholder="You know it by heart"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
              Name
            </label>
            <input
              type="text"
              placeholder="Their full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                Current Title
              </label>
              <input
                type="text"
                placeholder="e.g. Senior PM"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                Current Company
              </label>
              <input
                type="text"
                placeholder="e.g. Google"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>

          <p className="text-xs text-[var(--text-tertiary)]">
            We&apos;ll use their current info as a baseline. You&apos;ll know the moment anything changes.
          </p>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" disabled={!isValid} className="btn-primary flex-1">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="8" cy="8" r="6" />
                <path d="M8 5v6M11 8H5" />
              </svg>
              Start Stalking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
