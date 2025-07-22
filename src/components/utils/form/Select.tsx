import  { forwardRef, SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: boolean;
    helperText?: string;
    fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, helperText, fullWidth = true, children, ...props }, ref) => {
        return (
            <div className={`space-y-1 ${fullWidth ? 'w-full' : 'w-auto'}`}>
                {label && (
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {label}
                    </label>
                )}

                <select
                    ref={ref}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        error ? 'border-error-500 focus:ring-error-500' : 'border-gray-300 dark:border-gray-700'
                    } ${className || ''}`}
                    {...props}
                >
                    {children}
                </select>

                {helperText && (
                    <p className={`text-sm ${error ? 'text-error-600 dark:text-error-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

export { Select };