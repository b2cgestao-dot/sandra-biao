import { cn } from "../../lib/utils"

interface SelectionCardProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  isDark?: boolean;
}

export function SelectionCard({ selected, onClick, children, className, isDark = false }: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 w-full text-center outline-none focus-visible:ring-2 focus-visible:ring-accent",
        selected 
          ? (isDark 
              ? "border-accent bg-accent/10 text-white shadow-[0_0_12px_rgba(4,155,220,0.15)]"
              : "border-primary bg-primary/5 text-primary")
          : (isDark
              ? "border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:bg-white/8"
              : "border-gray-200 bg-white text-muted-foreground hover:border-primary/20 hover:bg-primary/5"),
        className
      )}
    >
      {children}
    </button>
  );
}
