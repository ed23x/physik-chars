"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { categories } from "@/lib/symbols"
import { CategorySection } from "@/components/category-section"
import { SearchBar } from "@/components/search-bar"
import { CategoryNav } from "@/components/category-nav"
import { Atom } from "lucide-react"

export default function Home() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState(categories[0].id)

  const filtered = useMemo(() => {
    if (!search.trim()) return categories
    const q = search.toLowerCase()
    return categories
      .map((cat) => ({
        ...cat,
        symbols: cat.symbols.filter(
          (s) =>
            s.char.includes(q) ||
            s.name.toLowerCase().includes(q) ||
            (s.latex && s.latex.toLowerCase().includes(q)) ||
            s.beschreibung.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.symbols.length > 0)
  }, [search])

  const totalResults = useMemo(
    () => filtered.reduce((sum, cat) => sum + cat.symbols.length, 0),
    [filtered]
  )

  const handleCategorySelect = useCallback((id: string) => {
    setActiveCategory(id)
    setSearch("")
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  useEffect(() => {
    if (!search) return
    const firstCategory = filtered[0]
    if (firstCategory) {
      setActiveCategory(firstCategory.id)
    }
  }, [search, filtered])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Atom className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-card-foreground sm:text-3xl text-balance">
                Physik Sonderzeichen
              </h1>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                Symbole antippen zum Kopieren
              </p>
            </div>
          </div>
          <div className="mt-6 max-w-md">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          {search && (
            <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
              {totalResults === 0
                ? "Keine Symbole gefunden."
                : `${totalResults} Symbol${totalResults !== 1 ? "e" : ""} gefunden.`}
            </p>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar navigation */}
          <aside className="shrink-0 lg:sticky lg:top-8 lg:w-52 lg:self-start">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Kategorien
            </p>
            <CategoryNav
              categories={categories}
              activeId={activeCategory}
              onSelect={handleCategorySelect}
            />
          </aside>

          {/* Symbol grid */}
          <main className="min-w-0 flex-1">
            <div className="flex flex-col gap-12">
              {filtered.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-lg text-muted-foreground">
                    Keine Ergebnisse für &ldquo;{search}&rdquo;
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Versuche einen anderen Suchbegriff.
                  </p>
                </div>
              ) : (
                filtered.map((category) => (
                  <CategorySection key={category.id} category={category} />
                ))
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <p className="text-center text-xs text-muted-foreground">
            Antippen oder klicken, um ein Symbol in die Zwischenablage zu kopieren.
          </p>
        </div>
      </footer>
    </div>
  )
}
