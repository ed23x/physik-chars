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
}

export function SymbolCard({ symbol, onCopy, onRelatedClick, allSymbols = [] }: SymbolCardProps) {
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
    <div className="group rounded-lg border border-border bg-card transition-colors hover:border-primary/40">
      <button
        onClick={() => copyToClipboard("unicode")}
        className="flex w-full items-center gap-4 px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`${symbol.char} kopieren - ${symbol.name}`}
        title={`${symbol.name} kopieren`}
      >
        <code className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-secondary font-mono text-2xl text-primary transition-colors group-hover:bg-primary/10">
          {symbol.char}
        </code>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-card-foreground">
            {symbol.name}
          </p>
          {symbol.latex && (
            <p className="truncate font-mono text-xs text-muted-foreground">
              {symbol.latex}
            </p>
          )}
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-all">
          {copied ? (
            <Check className="h-4 w-4 text-success" aria-hidden="true" />
          ) : (
            <Copy
              className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100"
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
        className="flex w-full items-center justify-between px-4 py-1.5 text-xs text-muted-foreground hover:text-card-foreground transition-colors"
      >
        <span>Formate anzeigen</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${showFormats ? "rotate-180" : ""}`} />
      </button>

      {showFormats && (
        <div className="grid grid-cols-4 gap-1 px-4 pb-3">
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
                className="flex flex-col items-center gap-1 rounded-md bg-secondary/50 px-2 py-1.5 text-xs hover:bg-secondary transition-colors"
              >
                <span className="text-muted-foreground">{formatLabels[format]}</span>
                <code className="text-[10px] text-card-foreground truncate max-w-full">
                  {value}
                </code>
                {copied === format && (
                  <Check className="h-3 w-3 text-success" />
                )}
              </button>
            )
          })}
        </div>
      )}

      {symbol.beschreibung && (
        <div className="border-t border-border px-4 py-2">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {symbol.beschreibung}
          </p>
        </div>
      )}

      {relatedSymbols.length > 0 && (
        <div className="border-t border-border px-4 py-2">
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
