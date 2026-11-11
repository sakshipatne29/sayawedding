// A hand-drawn style arrow with a small loop, pointing right by default.
// Rotate or mirror it with `className` (e.g. "-scale-x-100") to aim it elsewhere.
export function CurvedArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 42 C 24 12, 50 8, 58 26 C 63 38, 46 44, 47 32 C 48 20, 78 12, 110 30" />
      <path d="M97 22 L111 31 L95 35" />
    </svg>
  );
}
