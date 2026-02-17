import type { PhysicsSymbol, SymbolCategory } from "@/lib/symbols"
import { SymbolCard } from "@/components/symbol-card"
import { FormulaCard } from "@/components/formula-card"

interface CategorySectionProps {
  category: SymbolCategory
  allSymbols: PhysicsSymbol[]
  onSymbolCopy?: (symbol: PhysicsSymbol) => void
  onRelatedClick?: (char: string) => void
  focusedSymbol: PhysicsSymbol | null
}

export function CategorySection({ category, allSymbols, onSymbolCopy, onRelatedClick, focusedSymbol }: CategorySectionProps) {
  const isFormulaCategory = category.id === "formeln"

  return (
    <section id={category.id} aria-labelledby={`heading-${category.id}`}>
      <div className="mb-4">
        <h2
          id={`heading-${category.id}`}
          className="text-lg font-semibold text-card-foreground"
        >
          {category.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {category.description}
        </p>
      </div>
      <div className={isFormulaCategory ? "grid grid-cols-2 gap-3" : "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"}>
        {category.symbols.map((symbol) => (
          isFormulaCategory ? (
            <FormulaCard
              key={symbol.char + symbol.name}
              symbol={symbol}
              onCopy={onSymbolCopy}
              isFocused={focusedSymbol?.char === symbol.char && focusedSymbol?.name === symbol.name}
            />
          ) : (
            <SymbolCard 
              key={symbol.char + symbol.name} 
              symbol={symbol} 
              allSymbols={allSymbols}
              onCopy={onSymbolCopy}
              onRelatedClick={onRelatedClick}
              isFocused={focusedSymbol?.char === symbol.char && focusedSymbol?.name === symbol.name}
            />
          )
        ))}
      </div>
    </section>
  )
}
