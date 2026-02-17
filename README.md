# Physik Sonderzeichen

Eine Sammlung physikalischer und mathematischer Symbole zum schnellen Kopieren. Griechische Buchstaben, Operatoren, Konstanten und mehr - einfach antippen und in die Zwischenablage kopieren.

## Nutzung

Die Anwendung ist als Web-App nutzbar und kann auch als PWA installiert werden. Symbole werden durch Klicken oder Antippen kopiert. 

### Tastaturkürzel

| Taste | Funktion |
|-------|----------|
| `/` | Suchfeld fokussieren |
| `↓` / `↑` | Zwischen Symbolen navigieren |
| `Enter` | Fokussiertes Symbol kopieren |
| `1-9` | Zu Kategorie springen |
| `Esc` | Suche leeren / Schliessen |
| `?` | Hilfe anzeigen |

### Kopierformate

Jedes Symbol kann in verschiedenen Formaten kopiert werden:
- Unicode (das Symbol selbst)
- LaTeX (fuer wissenschaftliche Dokumente)
- HTML-Entity (fuer Webseiten)
- Unicode Escape (fuer Programmierung)

## Installation

```bash
npm install
npm run dev
```

Die Anwendung laeuft dann unter `http://localhost:3000`.

## Technologie

- Next.js 16
- React 19
- Tailwind CSS 4
- Radix UI Komponenten
- PWA-Support

## Struktur

```
app/
  page.tsx          # Hauptseite
  layout.tsx        # Layout mit Metadaten
components/
  symbol-card.tsx   # Einzelnes Symbol mit Kopierfunktion
  category-section.tsx
  category-nav.tsx
  search-bar.tsx
  theme-toggle.tsx
  keyboard-help.tsx
lib/
  symbols.ts        # Symboldatenbank
public/
  icon.svg          # Favicon
  manifest.json     # PWA Manifest
```

## Entwicklung

```bash
npm run build       # Produktions-Build
npm run start       # Produktions-Server
npm run lint        # Linter ausfuehren
```
