"use client"

import { useState, useMemo, useCallback, useEffect, useRef, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { categories } from "@/lib/symbols"
import type { PhysicsSymbol } from "@/lib/symbols"
import { CategorySection } from "@/components/category-section"
import { SearchBar } from "@/components/search-bar"
import { CategoryNav } from "@/components/category-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { KeyboardHelp } from "@/components/keyboard-help"
import { Atom, Clock, Keyboard } from "lucide-react"

const RECENT_KEY = "phyik-recent"
const MAX_RECENT = 12

function HomeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  const [search, setSearch] = useState(searchParams.get("q") || "")
  const [activeCategory, setActiveCategory] = useState(categories[0].id)
  const [recentSymbols, setRecentSymbols] = useState<PhysicsSymbol[]>([])
  const [showHelp, setShowHelp] = useState(false)

  const allSymbols = useMemo(() => 
    categories.flatMap(cat => cat.symbols),
  [])

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_KEY)
    if (stored) {
      try {
        const chars = JSON.parse(stored) as string[]
        const symbols = chars
          .map(char => allSymbols.find(s => s.char === char))
          .filter((s): s is PhysicsSymbol => s !== undefined)
        setRecentSymbols(symbols)
      } catch {
        localStorage.removeItem(RECENT_KEY)
      }
    }
  }, [allSymbols])

  const updateRecent = useCallback((symbol: PhysicsSymbol) => {
    setRecentSymbols(prev => {
      const filtered = prev.filter(s => s.char !== symbol.char)
      const updated = [symbol, ...filtered].slice(0, MAX_RECENT)
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated.map(s => s.char)))
      return updated
    })
  }, [])

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
            (s.htmlEntity && s.htmlEntity.toLowerCase().includes(q)) ||
            s.beschreibung.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.symbols.length > 0)
  }, [search])

  const totalResults = useMemo(
    () => filtered.reduce((sum, cat) => sum + cat.symbols.length, 0),
    [filtered]
  )

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set("q", value)
    } else {
      params.delete("q")
    }
    router.replace(`?${params.toString()}`, { scroll: false })
  }, [searchParams, router])

  const handleCategorySelect = useCallback((id: string) => {
    setActiveCategory(id)
    setSearch("")
    router.replace("?", { scroll: false })
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [router])

  const handleRelatedClick = useCallback((char: string) => {
    for (const cat of categories) {
      const symbol = cat.symbols.find(s => s.char === char)
      if (symbol) {
        handleCategorySelect(cat.id)
        break
      }
    }
  }, [handleCategorySelect])

  useEffect(() => {
    if (!search) return
    const firstCategory = filtered[0]
    if (firstCategory) {
      setActiveCategory(firstCategory.id)
    }
  }, [search, filtered])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        if (e.key === "Escape") {
          setSearch("")
          router.replace("?", { scroll: false })
        }
        return
      }

      if (e.key === "/") {
        e.preventDefault()
        searchInputRef.current?.focus()
        return
      }

      if (e.key === "?") {
        e.preventDefault()
        setShowHelp(prev => !prev)
        return
      }

      if (e.key === "Escape") {
        setShowHelp(false)
        setSearch("")
        router.replace("?", { scroll: false })
        return
      }

      const num = parseInt(e.key)
      if (num >= 1 && num <= categories.length) {
        handleCategorySelect(categories[num - 1].id)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleCategorySelect, router])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex items-start justify-between gap-4">
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
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHelp(true)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-card-foreground transition-colors"
                aria-label="Tastaturkuerzel anzeigen"
              >
                <Keyboard className="h-4 w-4" />
              </button>
              <ThemeToggle />
            </div>
          </div>
          <div className="mt-6 max-w-md">
            <SearchBar 
              ref={searchInputRef}
              value={search} 
              onChange={handleSearchChange} 
            />
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

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="shrink-0 lg:sticky lg:top-8 lg:w-52 lg:self-start">
            {recentSymbols.length > 0 && !search && (
              <div className="mb-6">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Zuletzt verwendet
                </div>
                <div className="flex flex-wrap gap-1">
                  {recentSymbols.slice(0, 8).map((symbol) => (
                    <button
                      key={symbol.char}
                      onClick={() => {
                        navigator.clipboard.writeText(symbol.char)
                        updateRecent(symbol)
                      }}
                      className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-1 text-sm hover:bg-secondary/80 transition-colors"
                      title={symbol.name}
                    >
                      <code className="text-primary">{symbol.char}</code>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Kategorien
            </p>
            <CategoryNav
              categories={filtered}
              activeId={activeCategory}
              onSelect={handleCategorySelect}
            />
          </aside>

          <main className="min-w-0 flex-1">
            <div className="flex flex-col gap-12">
              {filtered.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-lg text-muted-foreground">
                    Keine Ergebnisse fuer &ldquo;{search}&rdquo;
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Versuche einen anderen Suchbegriff.
                  </p>
                </div>
              ) : (
                filtered.map((category) => (
                  <CategorySection 
                    key={category.id} 
                    category={category}
                    allSymbols={allSymbols}
                    onSymbolCopy={updateRecent}
                    onRelatedClick={handleRelatedClick}
                  />
                ))
              )}
            </div>
          </main>
        </div>
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <p className="text-center text-xs text-muted-foreground">
            Antippen oder klicken, um ein Symbol in die Zwischenablage zu kopieren. Druecke <kbd className="px-1 py-0.5 rounded bg-secondary text-[10px]">?</kbd> fuer Hilfe.
          </p>
        </div>
      </footer>

      {showHelp && <KeyboardHelp onClose={() => setShowHelp(false)} />}
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Laden...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}
