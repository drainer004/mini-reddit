import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-pixel text-sm uppercase tracking-wider ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-rpg-sm",
  {
    variants: {
      variant: {
        default: "bg-rpg-panel text-white border-4 border-rpg-border hover:bg-rpg-light shadow-rpg",
        primary: "bg-slate-700 text-white border-4 border-slate-950 hover:bg-slate-600 shadow-rpg",
        gold: "bg-gradient-to-b from-yellow-400 to-yellow-600 text-yellow-950 border-4 border-yellow-800 hover:from-yellow-300 hover:to-yellow-500 shadow-rpg",
        danger: "bg-red-700 text-white border-4 border-red-950 hover:bg-red-600 shadow-rpg",
        magic: "bg-purple-700 text-white border-4 border-purple-950 hover:bg-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.5)]",
        outline: "border-4 border-rpg-border bg-transparent hover:bg-rpg-panel text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8 text-base",
        rpg: "h-14 px-8 py-4 text-base", 
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }