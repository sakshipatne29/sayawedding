import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
}

export function Section({ children, className = "", innerClassName = "max-w-3xl", id }: SectionProps) {
  return (
    <section id={id} className={`px-6 py-16 md:py-24 ${className}`}>
      <div className={`mx-auto ${innerClassName}`}>{children}</div>
    </section>
  );
}
