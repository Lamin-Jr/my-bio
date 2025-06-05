import { forwardRef, InputHTMLAttributes } from 'react';
import { VariantProps, cva } from 'class-variance-authority';

const inputVariants = cva(
    'w-full transition-colors duration-200 focus:outline-none focus:ring-2',
    {
        variants: {
            variant: {
                default: 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-primary-500',
                filled: 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-primary-500',
                unstyled: 'bg-transparent border-0 focus:ring-0',
            },
            size: {
                sm: 'px-2 py-1 text-sm rounded',
                md: 'px-3 py-2 text-base rounded-md',
                lg: 'px-4 py-3 text-lg rounded-lg',
            },
            error: {
                true: 'border-error-500 focus:ring-error-500 dark:border-error-500',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
        },
    }
);

interface InputProps
    extends InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {
    error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, size, error, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={`${inputVariants({ variant, size, error })} ${className || ''}`}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';

export { Input };