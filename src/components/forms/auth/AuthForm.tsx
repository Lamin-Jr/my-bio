import React from 'react';
interface AuthFormProps {
    title: string;
    subtitle: string;
    submitText?: string;
    onSubmit?: (e: React.FormEvent) => void;
    loading?: boolean;
    error?: string | null;
    children: React.ReactNode;
    footer?: React.ReactNode;
}


export const AuthForm: React.FC<AuthFormProps> = ({title, subtitle, error, children, footer}) => {
    return (
        <div
            className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        {subtitle}
                    </p>
                </div>

                {error && (
                    <div
                        className="mb-4 p-3 bg-error-50 border border-error-200 text-error-700 rounded-md flex items-start">
                        <span>{error}</span>
                    </div>
                )}

                        {children}
                {footer && (
                    <div className="mt-6 text-center">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};