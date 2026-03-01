"use client";

import { useState } from "react";
import UnitCatalog from "./unit-catalog";

export default function MobileUnitDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* FAB: visible on mobile only */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/20 text-gold shadow-lg backdrop-blur transition-transform hover:scale-105 lg:hidden"
        aria-label="Add unit"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Drawer overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute inset-x-0 bottom-0 max-h-[75vh] overflow-y-auto rounded-t-2xl border-t border-border bg-surface animate-in slide-in-from-bottom">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface px-4 py-3">
              <h3 className="font-display text-sm font-semibold text-foreground">Add Units</h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-muted hover:text-foreground"
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <UnitCatalog />
          </div>
        </div>
      )}
    </>
  );
}
