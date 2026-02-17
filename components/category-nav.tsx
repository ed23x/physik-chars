"use client"

import { cn } from "@/lib/utils"
import type { SymbolCategory } from "@/lib/symbols"

interface CategoryNavProps {
  categories: SymbolCategory[]
  activeId: string
  onSelect: (id: string) => void
}

export function CategoryNav({ categories, activeId, onSelect }: CategoryNavProps) {
  return (
    <nav aria-label="Kategorien" className="flex flex-col gap-1">
      {categories.map((cat, index) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={cn(
            "flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
            activeId === cat.id
              ? "bg-primary/10 font-medium text-primary"
              : "text-muted-foreground hover:bg-secondary hover:text-card-foreground"
          )}
        >
          <span className="shrink-0 text-xs text-muted-foreground/60 w-4">{index + 1}</span>
          <span className="flex-1 truncate">{cat.title}</span>
          <span className="shrink-0 text-xs text-muted-foreground/60">
            {cat.symbols.length}
          </span>
        </button>
      ))}
    </nav>
  )
}
