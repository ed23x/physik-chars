export interface PhysicsSymbol {
  char: string
  name: string
  latex?: string
  beschreibung: string
}

export interface SymbolCategory {
  id: string
  title: string
  description: string
  symbols: PhysicsSymbol[]
}

export const categories: SymbolCategory[] = [
  {
    id: "griechisch-klein",
    title: "Griechische Kleinbuchstaben",
    description: "Kleinbuchstaben des griechischen Alphabets, die in der Physik als Variablen und Konstanten verwendet werden.",
    symbols: [
      { char: "α", name: "Alpha", latex: "\\alpha", beschreibung: "Wird oft als Winkel, Winkelbeschleunigung oder Feinstrukturkonstante verwendet." },
      { char: "β", name: "Beta", latex: "\\beta", beschreibung: "Bezeichnet das Verhaeltnis v/c in der Relativitaetstheorie oder einen Winkel." },
      { char: "γ", name: "Gamma", latex: "\\gamma", beschreibung: "Lorentzfaktor in der speziellen Relativitaetstheorie, auch Gammastrahlung." },
      { char: "δ", name: "Delta (klein)", latex: "\\delta", beschreibung: "Kleine Aenderung einer Groesse, Dirac-Deltafunktion oder Kronecker-Delta." },
      { char: "ε", name: "Epsilon", latex: "\\varepsilon", beschreibung: "Elektrische Feldkonstante (Permittivitaet) oder kleine Groesse in der Stoerungstheorie." },
      { char: "ζ", name: "Zeta", latex: "\\zeta", beschreibung: "Daempfungsverhaeltnis oder Riemann-Zeta-Funktion in der mathematischen Physik." },
      { char: "η", name: "Eta", latex: "\\eta", beschreibung: "Wirkungsgrad, dynamische Viskositaet oder Metrik in der Relativitaetstheorie." },
      { char: "θ", name: "Theta", latex: "\\theta", beschreibung: "Winkel in Polarkoordinaten, Streuwinkel oder Heaviside-Funktion." },
      { char: "ι", name: "Iota", latex: "\\iota", beschreibung: "Selten in der Physik, gelegentlich als Index oder Laufvariable." },
      { char: "κ", name: "Kappa", latex: "\\kappa", beschreibung: "Kruemmung, thermische Leitfaehigkeit oder Dielektrizitaetskonstante." },
      { char: "λ", name: "Lambda (klein)", latex: "\\lambda", beschreibung: "Wellenlaenge, Zerfallskonstante oder Eigenwert in der Quantenmechanik." },
      { char: "μ", name: "My", latex: "\\mu", beschreibung: "Magnetische Permeabilitaet, Reibungskoeffizient, Mikro-Praefix (10^-6) oder reduzierte Masse." },
      { char: "ν", name: "Ny", latex: "\\nu", beschreibung: "Frequenz einer Welle, kinematische Viskositaet oder Neutrino-Symbol." },
      { char: "ξ", name: "Xi", latex: "\\xi", beschreibung: "Dimensionslose Koordinate oder Kohaerenzlaenge in der Supraleitung." },
      { char: "π", name: "Pi", latex: "\\pi", beschreibung: "Kreiszahl (3,14159...), fundamentale Konstante in Geometrie und Physik." },
      { char: "ρ", name: "Rho", latex: "\\rho", beschreibung: "Dichte, elektrischer Widerstand (spezifisch) oder Ladungsdichte." },
      { char: "σ", name: "Sigma (klein)", latex: "\\sigma", beschreibung: "Stefan-Boltzmann-Konstante, Wirkungsquerschnitt, Spannung oder Standardabweichung." },
      { char: "τ", name: "Tau", latex: "\\tau", beschreibung: "Drehmoment, Zeitkonstante, Lebensdauer oder Schubspannung." },
      { char: "υ", name: "Ypsilon", latex: "\\upsilon", beschreibung: "Selten in der Physik; Ypsilon-Meson in der Teilchenphysik." },
      { char: "φ", name: "Phi (klein)", latex: "\\varphi", beschreibung: "Elektrisches Potential, Phasenwinkel oder Azimutwinkel in Kugelkoordinaten." },
      { char: "χ", name: "Chi", latex: "\\chi", beschreibung: "Magnetische Suszeptibilitaet, Chi-Quadrat-Test oder Wellenfunktion." },
      { char: "ψ", name: "Psi (klein)", latex: "\\psi", beschreibung: "Wellenfunktion in der Quantenmechanik oder Stromfunktion." },
      { char: "ω", name: "Omega (klein)", latex: "\\omega", beschreibung: "Kreisfrequenz (2*pi*f), Winkelgeschwindigkeit oder Raumwinkel." },
    ],
  },
  {
    id: "griechisch-gross",
    title: "Griechische Grossbuchstaben",
    description: "Grossbuchstaben des griechischen Alphabets mit wichtiger Bedeutung in der Physik.",
    symbols: [
      { char: "Γ", name: "Gamma (gross)", latex: "\\Gamma", beschreibung: "Gammafunktion, Zerfallsrate oder Christoffel-Symbole in der allgemeinen Relativitaetstheorie." },
      { char: "Δ", name: "Delta (gross)", latex: "\\Delta", beschreibung: "Differenz oder Aenderung einer Groesse, z.B. Delta-T fuer Temperaturdifferenz." },
      { char: "Θ", name: "Theta (gross)", latex: "\\Theta", beschreibung: "Heaviside-Stufenfunktion oder Debye-Temperatur in der Festkoerperphysik." },
      { char: "Λ", name: "Lambda (gross)", latex: "\\Lambda", beschreibung: "Kosmologische Konstante, Lambda-Baryon oder Diagonalmatrix." },
      { char: "Ξ", name: "Xi (gross)", latex: "\\Xi", beschreibung: "Xi-Baryon in der Teilchenphysik oder Kaskadenbaryon." },
      { char: "Π", name: "Pi (gross)", latex: "\\Pi", beschreibung: "Produktsymbol (Multiplikation ueber Folgen) oder Peltier-Koeffizient." },
      { char: "Σ", name: "Sigma (gross)", latex: "\\Sigma", beschreibung: "Summenzeichen, Sigma-Baryon oder Spannungstensor." },
      { char: "Φ", name: "Phi (gross)", latex: "\\Phi", beschreibung: "Magnetischer Fluss, elektrischer Fluss oder allgemeines Potential." },
      { char: "Ψ", name: "Psi (gross)", latex: "\\Psi", beschreibung: "Gesamtwellenfunktion eines Quantensystems." },
      { char: "Ω", name: "Omega (gross)", latex: "\\Omega", beschreibung: "Elektrischer Widerstand in Ohm, Raumwinkel oder Dichteparameter des Universums." },
    ],
  },
  {
    id: "mathematisch",
    title: "Mathematische Operatoren",
    description: "Mathematische Symbole und Operatoren, die in physikalischen Gleichungen verwendet werden.",
    symbols: [
      { char: "∇", name: "Nabla", latex: "\\nabla", beschreibung: "Nabla-Operator: Gradient, Divergenz und Rotation von Vektorfeldern." },
      { char: "∂", name: "Partielle Ableitung", latex: "\\partial", beschreibung: "Partielle Ableitung, z.B. in der Wellengleichung oder Maxwell-Gleichungen." },
      { char: "∫", name: "Integral", latex: "\\int", beschreibung: "Bestimmtes und unbestimmtes Integral zur Berechnung von Flaecheninhalten und Summen." },
      { char: "∮", name: "Ringintegral", latex: "\\oint", beschreibung: "Geschlossenes Kurvenintegral, z.B. in den Maxwell-Gleichungen." },
      { char: "∑", name: "Summe", latex: "\\sum", beschreibung: "Summenzeichen fuer die Addition von Reihen und Folgen." },
      { char: "∏", name: "Produkt", latex: "\\prod", beschreibung: "Produktzeichen fuer die Multiplikation von Reihen." },
      { char: "√", name: "Wurzel", latex: "\\sqrt{}", beschreibung: "Quadratwurzel, z.B. bei der Berechnung von Betraegen oder Energien." },
      { char: "∞", name: "Unendlich", latex: "\\infty", beschreibung: "Unendlichkeit, z.B. als Integrationsgrenze oder in Grenzwerten." },
      { char: "≈", name: "Ungefaehr gleich", latex: "\\approx", beschreibung: "Naeherungsweise Gleichheit, oft in der Physik fuer Abschaetzungen." },
      { char: "≠", name: "Ungleich", latex: "\\neq", beschreibung: "Ungleichheit zweier Ausdruecke oder Groessen." },
      { char: "≤", name: "Kleiner gleich", latex: "\\leq", beschreibung: "Kleiner oder gleich, z.B. bei Ungleichungen in der Thermodynamik." },
      { char: "≥", name: "Groesser gleich", latex: "\\geq", beschreibung: "Groesser oder gleich, z.B. in der Heisenbergschen Unschaerferelation." },
      { char: "±", name: "Plus-Minus", latex: "\\pm", beschreibung: "Plus-Minus-Zeichen fuer Fehlerangaben oder Loesungen quadratischer Gleichungen." },
      { char: "∝", name: "Proportional", latex: "\\propto", beschreibung: "Proportionalitaet, z.B. F ist proportional zu a (Newtons zweites Gesetz)." },
      { char: "⟨⟩", name: "Bra-Ket", latex: "\\langle\\rangle", beschreibung: "Dirac-Notation in der Quantenmechanik fuer Erwartungswerte und Zustaende." },
    ],
  },
  {
    id: "konstanten",
    title: "Physikalische Konstanten & Symbole",
    description: "Haeufig verwendete Symbole fuer physikalische Konstanten und Groessen.",
    symbols: [
      { char: "ℏ", name: "h-quer", latex: "\\hbar", beschreibung: "Reduziertes Plancksches Wirkungsquantum (h/2*pi), fundamental in der Quantenmechanik." },
      { char: "ℓ", name: "Kleines L", latex: "\\ell", beschreibung: "Laenge, Drehimpulsquantenzahl oder mittlere freie Weglaenge." },
      { char: "℃", name: "Grad Celsius", beschreibung: "Temperatureinheit Grad Celsius, basierend auf der Celsius-Skala." },
      { char: "Å", name: "Angstroem", beschreibung: "Laengeneinheit (10^-10 m), haeufig in der Atom- und Molekuelphysik." },
      { char: "→", name: "Pfeil rechts", latex: "\\rightarrow", beschreibung: "Vektorpfeil, Reaktionspfeil oder Grenzwertuebergang." },
      { char: "⇌", name: "Gleichgewichtspfeil", beschreibung: "Chemisches Gleichgewicht, reversible Reaktionen." },
      { char: "†", name: "Dagger", latex: "\\dagger", beschreibung: "Adjungierter Operator in der Quantenmechanik (hermitesch konjugiert)." },
      { char: "⊗", name: "Tensorprodukt", latex: "\\otimes", beschreibung: "Tensorprodukt oder Kreuzprodukt in der Quantenmechanik." },
      { char: "⊕", name: "Direkte Summe", latex: "\\oplus", beschreibung: "Direkte Summe von Vektorraeumen oder XOR-Operation." },
      { char: "·", name: "Malpunkt", latex: "\\cdot", beschreibung: "Skalarprodukt von Vektoren oder Multiplikation." },
      { char: "×", name: "Kreuzprodukt", latex: "\\times", beschreibung: "Vektorprodukt (Kreuzprodukt) oder Multiplikation." },
    ],
  },
  {
    id: "indizes",
    title: "Hoch- & Tiefstellungen",
    description: "Hoch- und tiefgestellte Ziffern und Buchstaben fuer Formeln und Einheiten.",
    symbols: [
      { char: "⁰", name: "Hochgestellt 0", beschreibung: "Hochgestellte Null, z.B. fuer Exponenten oder Gradangaben." },
      { char: "¹", name: "Hochgestellt 1", beschreibung: "Hochgestellte Eins, z.B. in Einheiten wie m/s oder s^-1." },
      { char: "²", name: "Hochgestellt 2", beschreibung: "Quadrat, z.B. in m^2 (Quadratmeter) oder E=mc^2." },
      { char: "³", name: "Hochgestellt 3", beschreibung: "Kubik, z.B. in m^3 (Kubikmeter) oder Volumensberechnungen." },
      { char: "⁴", name: "Hochgestellt 4", beschreibung: "Vierte Potenz, z.B. im Stefan-Boltzmann-Gesetz (T^4)." },
      { char: "⁻", name: "Hochgestellt Minus", beschreibung: "Negativer Exponent, z.B. in s^-1 (pro Sekunde) oder m^-2." },
      { char: "ⁿ", name: "Hochgestellt n", beschreibung: "Allgemeine Potenz n, z.B. in allgemeinen Formeln." },
      { char: "₀", name: "Tiefgestellt 0", beschreibung: "Tiefgestellte Null, z.B. fuer Anfangswerte (v_0, x_0)." },
      { char: "₁", name: "Tiefgestellt 1", beschreibung: "Tiefgestellte Eins, z.B. fuer Indizes in Gleichungssystemen." },
      { char: "₂", name: "Tiefgestellt 2", beschreibung: "Tiefgestellte Zwei, z.B. fuer den zweiten Index." },
      { char: "ₙ", name: "Tiefgestellt n", beschreibung: "Tiefgestelltes n fuer allgemeine Indizes und Folgen." },
    ],
  },
  {
    id: "einheiten",
    title: "SI-Einheiten & Praefixe",
    description: "Symbole fuer SI-Einheiten und Vorsatzzeichen fuer Groessenordnungen.",
    symbols: [
      { char: "µ", name: "Mikro", beschreibung: "SI-Praefix Mikro (10^-6), z.B. Mikrometer oder Mikrofarad." },
      { char: "Ω", name: "Ohm", beschreibung: "SI-Einheit des elektrischen Widerstands." },
      { char: "°", name: "Grad", beschreibung: "Gradzeichen fuer Winkel oder Temperatur." },
      { char: "′", name: "Bogenminute", beschreibung: "Bogenminute (1/60 Grad) oder Ableitung in der Mathematik." },
      { char: "″", name: "Bogensekunde", beschreibung: "Bogensekunde (1/3600 Grad) oder zweite Ableitung." },
      { char: "ℕ", name: "Natuerliche Zahlen", beschreibung: "Menge der natuerlichen Zahlen (1, 2, 3, ...)." },
      { char: "ℤ", name: "Ganze Zahlen", beschreibung: "Menge der ganzen Zahlen (..., -2, -1, 0, 1, 2, ...)." },
      { char: "ℝ", name: "Reelle Zahlen", beschreibung: "Menge der reellen Zahlen, fundamental in der Physik." },
      { char: "ℂ", name: "Komplexe Zahlen", beschreibung: "Menge der komplexen Zahlen, wichtig in der Quantenmechanik und Elektrodynamik." },
    ],
  },
]
