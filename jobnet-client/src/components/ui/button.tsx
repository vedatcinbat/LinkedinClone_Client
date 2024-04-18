import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "tailwind.config.jsinline-flex tailwind.config.jsitems-center tailwind.config.jsjustify-center tailwind.config.jswhitespace-nowrap tailwind.config.jsrounded-md tailwind.config.jstext-sm tailwind.config.jsfont-medium tailwind.config.jstransition-colors focus-visible:tailwind.config.jsoutline-none focus-visible:tailwind.config.jsring-1 focus-visible:tailwind.config.jsring-slate-950 disabled:tailwind.config.jspointer-events-none disabled:tailwind.config.jsopacity-50 dark:focus-visible:tailwind.config.jsring-slate-300",
  {
    variants: {
      variant: {
        default:
          "tailwind.config.jsbg-slate-900 tailwind.config.jstext-slate-50 tailwind.config.jsshadow hover:tailwind.config.jsbg-slate-900/90 dark:tailwind.config.jsbg-slate-50 dark:tailwind.config.jstext-slate-900 dark:hover:tailwind.config.jsbg-slate-50/90",
        destructive:
          "tailwind.config.jsbg-red-500 tailwind.config.jstext-slate-50 tailwind.config.jsshadow-sm hover:tailwind.config.jsbg-red-500/90 dark:tailwind.config.jsbg-red-900 dark:tailwind.config.jstext-slate-50 dark:hover:tailwind.config.jsbg-red-900/90",
        outline:
          "tailwind.config.jsborder tailwind.config.jsborder-slate-200 tailwind.config.jsbg-white tailwind.config.jsshadow-sm hover:tailwind.config.jsbg-slate-100 hover:tailwind.config.jstext-slate-900 dark:tailwind.config.jsborder-slate-800 dark:tailwind.config.jsbg-slate-950 dark:hover:tailwind.config.jsbg-slate-800 dark:hover:tailwind.config.jstext-slate-50",
        secondary:
          "tailwind.config.jsbg-slate-100 tailwind.config.jstext-slate-900 tailwind.config.jsshadow-sm hover:tailwind.config.jsbg-slate-100/80 dark:tailwind.config.jsbg-slate-800 dark:tailwind.config.jstext-slate-50 dark:hover:tailwind.config.jsbg-slate-800/80",
        ghost: "hover:tailwind.config.jsbg-slate-100 hover:tailwind.config.jstext-slate-900 dark:hover:tailwind.config.jsbg-slate-800 dark:hover:tailwind.config.jstext-slate-50",
        link: "tailwind.config.jstext-slate-900 tailwind.config.jsunderline-offset-4 hover:tailwind.config.jsunderline dark:tailwind.config.jstext-slate-50",
      },
      size: {
        default: "tailwind.config.jsh-9 tailwind.config.jspx-4 tailwind.config.jspy-2",
        sm: "tailwind.config.jsh-8 tailwind.config.jsrounded-md tailwind.config.jspx-3 tailwind.config.jstext-xs",
        lg: "tailwind.config.jsh-10 tailwind.config.jsrounded-md tailwind.config.jspx-8",
        icon: "tailwind.config.jsh-9 tailwind.config.jsw-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
