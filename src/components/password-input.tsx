import * as React from 'react'
import { cn } from '@/lib/utils' // Assuming this is a utility for conditional classes
import { Button } from './ui/button'
import { Icons } from './icons'
import { Input } from './ui/input'

type PasswordInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div className={cn('relative rounded-md', className)}>
        <Input
          type={showPassword ? 'text' : 'password'}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          ref={ref}
          disabled={disabled}
          {...props}
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          disabled={disabled}
          className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-md text-muted-foreground"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label="Toggle password visibility"
        >
          {showPassword ? <Icons.eye size={18} /> : <Icons.eyeOff size={18} />}
        </Button>
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
