import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
        destructive: 'bg-error-500 text-white hover:bg-error-600 focus-visible:ring-error-500',
        outline: 'border border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:ring-gray-400',
        subtle: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 focus-visible:ring-gray-400',
        ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:ring-gray-400',
        link: 'bg-transparent underline-offset-4 hover:underline text-primary-600 dark:text-primary-500 hover:bg-transparent focus-visible:ring-primary-500',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, isLoading, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };