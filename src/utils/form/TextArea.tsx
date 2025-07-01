import  { forwardRef, TextareaHTMLAttributes } from 'react';
import { VariantProps, cva } from 'class-variance-authority';

const textareaVariants = cva(
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

export interface TextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement>,
        VariantProps<typeof textareaVariants> {
    error?: boolean;
    helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, variant, size, error, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={`${textareaVariants({ variant, size, error })} ${className || ''}`}
                {...props}
            />
        );
    }
);

Textarea.displayName = 'Textarea';

export { Textarea };