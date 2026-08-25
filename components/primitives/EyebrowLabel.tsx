import { ReactNode } from "react";

export function EyebrowLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-center font-body text-xs uppercase tracking-[0.3em] text-maroon/70">
      {children}
    </p>
  );
}
