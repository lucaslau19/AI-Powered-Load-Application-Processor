import { cn } from "@/lib/utils";
import { SelectHTMLAttributes, forwardRef } from "react";

const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-xl border border-border bg-white px-3 py-2 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";
export { Select };
