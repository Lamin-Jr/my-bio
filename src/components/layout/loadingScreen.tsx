import { LoadingSpinner } from '@/components/ui/LoadingSpinner.tsx';

export const LoadingScreen = () => {
    return  (<div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <LoadingSpinner size="lg" text="Loading application..." />
    </div>)
};