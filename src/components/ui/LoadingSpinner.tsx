import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
  text?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className,
  text,
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colorClasses = {
    primary: 'text-primary-600 dark:text-primary-500',
    secondary: 'text-secondary-600 dark:text-secondary-500',
    white: 'text-white',
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 z-50'
    : 'flex items-center justify-center';

  return (
    <div className={cn(containerClasses, className)}>
      <div className="flex flex-col items-center">
        <Loader2 className={cn('animate-spin', sizeClasses[size], colorClasses[color])} />
        {text && (
          <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">{text}</p>
        )}
      </div>
    </div>
  );
};