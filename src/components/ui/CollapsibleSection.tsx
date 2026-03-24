import { useState } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import { cn } from "../../lib/utils";

interface CollapsibleSectionProps {
  title: string;
  value?: string;
  children: React.ReactNode;
  isDark?: boolean;
}

export function CollapsibleSection({ title, value, children, isDark }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn(
      "border-b transition-all duration-200",
      isDark ? "border-white/10" : "border-gray-100",
      isOpen ? "pb-4" : "pb-3"
    )}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left py-1 group"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className={cn(
            "text-[10px] uppercase tracking-[0.15em] shrink-0",
            isDark ? "text-white/30" : "text-muted-foreground/60"
          )}>
            {title}
          </span>
          <span className={cn(
            "text-xs font-semibold truncate",
            value ? (isDark ? "text-white" : "text-primary") : (isDark ? "text-white/30" : "text-muted-foreground/40")
          )}>
            {value || "Selecionar"}
          </span>
          {value && <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />}
        </div>
        <ChevronDown size={14} className={cn(
          "shrink-0 transition-transform duration-200",
          isOpen && "rotate-180",
          isDark ? "text-white/30" : "text-muted-foreground/40"
        )} />
      </button>

      <div className={cn(
        "grid transition-all duration-300 ease-in-out",
        isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
