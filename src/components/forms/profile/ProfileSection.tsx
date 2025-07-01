import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ReactNode } from 'react';

interface ProfileSectionProps {
    title: string;
    icon: ReactNode;
    children: ReactNode;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
                                                                  title,
                                                                  icon,
                                                                  children
                                                              }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    {icon}
                    <span className="ml-2">{title}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
};