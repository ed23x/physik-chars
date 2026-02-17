import type { PhysicsSymbol, SymbolCategory } from "@/lib/symbols"
import { SymbolCard } from "@/components/symbol-card"

interface CategorySectionProps {
  category: SymbolCategory
  allSymbols: PhysicsSymbol[]
  onSymbolCopy?: (symbol: PhysicsSymbol) => void
  onRelatedClick?: (char: string) => void
}

export function CategorySection({ category, allSymbols, onSymbolCopy, onRelatedClick }: CategorySectionProps) {
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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {category.symbols.map((symbol) => (
          <SymbolCard 
            key={symbol.char + symbol.name} 
            symbol={symbol} 
            allSymbols={allSymbols}
            onCopy={onSymbolCopy}
            onRelatedClick={onRelatedClick}
          />
        ))}
      </div>
    </section>
  )
}
