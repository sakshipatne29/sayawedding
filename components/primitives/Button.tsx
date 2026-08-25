import { ComponentProps } from "react";
import { Button as ShadcnButton } from "@/components/ui/button";

type ButtonProps = ComponentProps<typeof ShadcnButton>;

export function Button({ className = "", ...props }: ButtonProps) {
  return (
    <ShadcnButton
      className={`rounded-full bg-maroon font-body text-sm uppercase tracking-widest text-ivory hover:bg-maroon-deep ${className}`}
      {...props}
    />
  );
}
