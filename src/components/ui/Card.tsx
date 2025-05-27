import  { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, shadow = 'md', border = true, hover = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg bg-white dark:bg-gray-800 overflow-hidden',
          border && 'border border-gray-200 dark:border-gray-700',
          shadow === 'sm' && 'shadow-sm',
          shadow === 'md' && 'shadow-md',
          shadow === 'lg' && 'shadow-lg',
          hover && 'transition-all duration-200 hover:shadow-lg hover:-translate-y-1',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 py-4 border-b border-gray-200 dark:border-gray-700', className)} {...props} />
  )
);

CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-xl font-semibold text-gray-900 dark:text-white', className)} {...props} />
  )
);

CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-gray-500 dark:text-gray-400', className)} {...props} />
  )
);

CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 py-4', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-6 py-4 border-t border-gray-200 dark:border-gray-700', className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };