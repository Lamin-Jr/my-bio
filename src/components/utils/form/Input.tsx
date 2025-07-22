import React, { forwardRef } from 'react';
import {cn} from "@components/utils/cn.ts";


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
    error?: boolean;
    helperText?: string;
    fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, icon, error, helperText, fullWidth = true, ...props }, ref) => {
        return (
            <div className={cn('space-y-1', fullWidth ? 'w-full' : 'w-auto')}>
                {label && (
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {label}
                    </label>
                )}

                <div className="relative">
                    {icon && (
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
                            'file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                            'disabled:cursor-not-allowed disabled:opacity-50',
                            icon ? 'pl-10' : '',
                            error ? 'border-error-500 focus-visible:ring-error-500' : '',
                            className
                        )}
                        {...props}
                    />
                </div>

                {helperText && (
                    <p className={cn(
                        'text-sm',
                        error ? 'text-error-600 dark:text-error-400' : 'text-muted-foreground'
                    )}>
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };