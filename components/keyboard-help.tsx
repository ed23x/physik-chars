"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface KeyboardHelpProps {
  onClose: () => void
}

const shortcuts = [
  { keys: ["/"], description: "Suchfeld fokussieren" },
  { keys: ["↓", "↑"], description: "Zwischen Symbolen navigieren" },
  { keys: ["Enter"], description: "Fokussiertes Symbol kopieren" },
  { keys: ["1", "-", "9"], description: "Zu Kategorie springen" },
  { keys: ["Esc"], description: "Suche leeren / Schliessen" },
  { keys: ["?"], description: "Hilfe anzeigen/ausblenden" },
]

export function KeyboardHelp({ onClose }: KeyboardHelpProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-card-foreground">Tastaturkuerzel</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-card-foreground transition-colors"
            aria-label="Schliessen"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{shortcut.description}</span>
              <kbd className="flex items-center gap-0.5">
                {shortcut.keys.map((key, i) => (
                  <span
                    key={i}
                    className="rounded bg-secondary px-2 py-1 text-xs font-mono text-card-foreground"
                  >
                    {key}
                  </span>
                ))}
              </kbd>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Druecke <kbd className="px-1 py-0.5 rounded bg-secondary text-[10px]">Esc</kbd> zum Schliessen
        </p>
      </div>
    </div>
  )
}
