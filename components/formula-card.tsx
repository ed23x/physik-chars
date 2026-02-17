"use client"

import { useState, useCallback } from "react"
import { Check, Copy } from "lucide-react"
import type { PhysicsSymbol } from "@/lib/symbols"

interface FormulaCardProps {
  symbol: PhysicsSymbol
  onCopy?: (symbol: PhysicsSymbol) => void
  isFocused?: boolean
}

export function FormulaCard({ symbol, onCopy, isFocused = false }: FormulaCardProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(symbol.char)
      setCopied(true)
      onCopy?.(symbol)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = symbol.char
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      onCopy?.(symbol)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [symbol, onCopy])

  return (
    <button
      onClick={copyToClipboard}
      className={`group flex flex-col items-start gap-0.5 rounded-lg border bg-card px-3 py-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        isFocused
          ? "border-primary ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
          : "border-border hover:border-primary/40"
      }`}
      aria-label={`${symbol.char} kopieren - ${symbol.name}`}
      title={symbol.beschreibung}
      aria-current={isFocused ? "true" : undefined}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <code className="font-mono text-lg text-card-foreground">
          {symbol.char}
        </code>
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground transition-all">
          {copied ? (
            <Check className="h-3.5 w-3.5 text-success" aria-hidden="true" />
          ) : (
            <Copy
              className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        {symbol.name}
      </p>
      <span className="sr-only">
        {copied ? "Kopiert!" : `${symbol.name} in die Zwischenablage kopieren`}
      </span>
    </button>
  )
}
