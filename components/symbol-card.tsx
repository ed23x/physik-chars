"use client"

import { useState, useCallback } from "react"
import { Check, Copy, ChevronDown } from "lucide-react"
import type { PhysicsSymbol } from "@/lib/symbols"

type CopyFormat = "unicode" | "latex" | "html" | "escape"

const formatLabels: Record<CopyFormat, string> = {
  unicode: "Unicode",
  latex: "LaTeX",
  html: "HTML",
  escape: "Escape",
}

function getFormattedValue(symbol: PhysicsSymbol, format: CopyFormat): string {
  switch (format) {
    case "unicode":
      return symbol.char
    case "latex":
      return symbol.latex || symbol.char
    case "html":
      return symbol.htmlEntity || symbol.char
    case "escape":
      return symbol.unicode ? `\\u${symbol.unicode.replace("U+", "")}` : symbol.char
    default:
      return symbol.char
  }
}

interface SymbolCardProps {
  symbol: PhysicsSymbol
  onCopy?: (symbol: PhysicsSymbol) => void
  onRelatedClick?: (char: string) => void
  allSymbols?: PhysicsSymbol[]
  isFocused?: boolean
}

export function SymbolCard({ symbol, onCopy, onRelatedClick, allSymbols = [], isFocused = false }: SymbolCardProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [showFormats, setShowFormats] = useState(false)

  const copyToClipboard = useCallback(async (format: CopyFormat = "unicode") => {
    const value = getFormattedValue(symbol, format)
    try {
      await navigator.clipboard.writeText(value)
      setCopied(format)
      onCopy?.(symbol)
      setTimeout(() => setCopied(null), 1500)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = value
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(format)
      onCopy?.(symbol)
      setTimeout(() => setCopied(null), 1500)
    }
  }, [symbol, onCopy])

  const relatedSymbols = symbol.related
    ? allSymbols.filter(s => symbol.related?.includes(s.char))
    : []

  const formats: CopyFormat[] = ["unicode", "latex", "html", "escape"]

  return (
    <div 
      className={`group rounded-lg border bg-card transition-all ${
        isFocused 
          ? "border-primary ring-2 ring-primary/30 ring-offset-2 ring-offset-background scale-[1.02]" 
          : "border-border hover:border-primary/40"
      }`}
      aria-current={isFocused ? "true" : undefined}
    >
      <button
        onClick={() => copyToClipboard("unicode")}
        className="flex w-full items-center gap-3 px-3 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-4 sm:px-4 sm:py-3"
        aria-label={`${symbol.char} kopieren - ${symbol.name}`}
        title={`${symbol.name} kopieren`}
      >
        <code className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary font-mono text-xl text-primary transition-colors group-hover:bg-primary/10 sm:h-12 sm:w-12 sm:text-2xl">
          {symbol.char}
        </code>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-card-foreground sm:text-sm">
            {symbol.name}
          </p>
          {symbol.latex && (
            <p className="truncate font-mono text-[10px] text-muted-foreground sm:text-xs">
              {symbol.latex}
            </p>
          )}
        </div>
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-all sm:h-8 sm:w-8">
          {copied ? (
            <Check className="h-3.5 w-3.5 text-success sm:h-4 sm:w-4" aria-hidden="true" />
          ) : (
            <Copy
              className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100 sm:h-4 sm:w-4"
              aria-hidden="true"
            />
          )}
        </div>
        <span className="sr-only">
          {copied ? "Kopiert!" : `${symbol.name} in die Zwischenablage kopieren`}
        </span>
      </button>

      <button
        onClick={() => setShowFormats(!showFormats)}
        className="hidden w-full items-center justify-between px-4 py-1.5 text-xs text-muted-foreground hover:text-card-foreground transition-colors sm:flex"
      >
        <span>Formate anzeigen</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${showFormats ? "rotate-180" : ""}`} />
      </button>

      {showFormats && (
        <div className="grid grid-cols-4 gap-1 px-3 pb-2 sm:px-4 sm:pb-3">
          {formats.map((format) => {
            const value = getFormattedValue(symbol, format)
            const hasFormat = format === "unicode" || 
              (format === "latex" && symbol.latex) ||
              (format === "html" && symbol.htmlEntity) ||
              (format === "escape" && symbol.unicode)
            if (!hasFormat) return null
            return (
              <button
                key={format}
                onClick={() => copyToClipboard(format)}
                className="flex flex-col items-center gap-0.5 rounded-md bg-secondary/50 px-1.5 py-1 text-[10px] hover:bg-secondary transition-colors sm:gap-1 sm:px-2 sm:py-1.5 sm:text-xs"
              >
                <span className="text-muted-foreground">{formatLabels[format]}</span>
                <code className="text-card-foreground truncate max-w-full">
                  {value}
                </code>
                {copied === format && (
                  <Check className="h-2.5 w-2.5 text-success sm:h-3 sm:w-3" />
                )}
              </button>
            )
          })}
        </div>
      )}

      {symbol.beschreibung && (
        <div className="hidden border-t border-border px-4 py-2 sm:block">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {symbol.beschreibung}
          </p>
        </div>
      )}

      {relatedSymbols.length > 0 && (
        <div className="hidden border-t border-border px-4 py-2 sm:block">
          <p className="text-xs text-muted-foreground mb-2">Verwandte Symbole:</p>
          <div className="flex flex-wrap gap-1">
            {relatedSymbols.map((rel) => (
              <button
                key={rel.char}
                onClick={() => onRelatedClick?.(rel.char)}
                className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-xs hover:bg-secondary/80 transition-colors"
              >
                <code className="text-primary">{rel.char}</code>
                <span className="text-muted-foreground">{rel.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
