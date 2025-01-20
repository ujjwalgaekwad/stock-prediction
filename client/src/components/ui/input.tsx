import * as React from "react"

import { cn } from "@/lib/utils.ts"

interface InputProps extends React.ComponentProps<"input"> {
  defaultStyling?: boolean; // or any other type you need
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, defaultStyling = true, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-10 w-full rounded-md border border-input px-3 py-2 ${defaultStyling && "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"} ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
