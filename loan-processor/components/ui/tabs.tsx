"use client";

import { cn } from "@/lib/utils";
import { createContext, useContext, useState, ReactNode } from "react";

const TabsContext = createContext<{ value: string; onChange: (v: string) => void }>({
  value: "",
  onChange: () => {},
});

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, children, className }: TabsProps) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, onChange: setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("inline-flex h-10 items-center gap-1 rounded-lg bg-muted p-1", className)}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className }: { value: string; children: ReactNode; className?: string }) {
  const ctx = useContext(TabsContext);
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer",
        ctx.value === value
          ? "bg-white text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
      onClick={() => ctx.onChange(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }: { value: string; children: ReactNode; className?: string }) {
  const ctx = useContext(TabsContext);
  if (ctx.value !== value) return null;
  return <div className={cn("mt-4 animate-fade-in", className)}>{children}</div>;
}
