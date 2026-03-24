import * as React from "react"
import { cn } from "../../lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  isDark?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, isDark = false, ...props }, ref) => {
    return (
      <div className="w-full text-left">
        {label && (
          <label className={cn(
            "block text-sm font-medium mb-1.5 font-body tracking-wide",
            isDark ? "text-white/90" : "text-primary"
          )}>
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-2xl border px-4 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium transition-all font-body",
            isDark 
              ? "bg-white/5 border-white/20 text-white focus-visible:ring-highlight focus:border-highlight placeholder:text-white/40 shadow-inner"
              : "bg-background border-input text-foreground focus-visible:ring-primary focus:border-primary placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-[0.7rem] uppercase tracking-wider text-destructive font-medium animate-fade-in-up text-left">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"
