"use client"

import { useState, useCallback } from "react"
import { Check, Copy } from "lucide-react"
import type { PhysicsSymbol } from "@/lib/symbols"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function SymbolCard({ symbol }: { symbol: PhysicsSymbol }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(symbol.char)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea")
      textarea.value = symbol.char
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [symbol.char])

  return (
    <div className="group rounded-lg border border-border bg-card transition-colors hover:border-primary/40">
      <button
        onClick={copyToClipboard}
        className="flex w-full items-center gap-4 px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-t-lg"
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
      <Accordion type="single" collapsible>
        <AccordionItem value="info" className="border-b-0">
          <AccordionTrigger className="px-4 py-2 text-xs text-muted-foreground hover:no-underline hover:text-card-foreground">
            Mehr Informationen
          </AccordionTrigger>
          <AccordionContent className="px-4 text-sm leading-relaxed text-muted-foreground">
            {symbol.beschreibung}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
