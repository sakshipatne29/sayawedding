export function SectionSeparator() {
  return (
    <div className="flex justify-center bg-ivory py-6" aria-hidden="true">
      <svg viewBox="0 0 240 32" className="h-8 w-60 text-gold" fill="none">
        <path d="M6 16 H84" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        <path d="M156 16 H234" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        <circle cx="3" cy="16" r="1.5" fill="currentColor" fillOpacity="0.6" />
        <circle cx="237" cy="16" r="1.5" fill="currentColor" fillOpacity="0.6" />
        <rect x="88" y="13" width="6" height="6" transform="rotate(45 91 16)" fill="currentColor" />
        <rect x="146" y="13" width="6" height="6" transform="rotate(45 149 16)" fill="currentColor" />

        {/* lotus */}
        <path d="M120 3 C127 11 127 20 120 27 C113 20 113 11 120 3 Z" fill="currentColor" />
        <path d="M120 27 C110 25 103 19 101 10 C110 11 117 18 120 27 Z" fill="currentColor" fillOpacity="0.55" />
        <path d="M120 27 C130 25 137 19 139 10 C130 11 123 18 120 27 Z" fill="currentColor" fillOpacity="0.55" />
        <path d="M105 28 Q120 32 135 28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
