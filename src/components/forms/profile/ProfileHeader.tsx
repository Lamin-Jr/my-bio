import React from 'react';
import { Button } from '@/components/ui/Button';
import { Edit, Save, X } from 'lucide-react';

interface ProfileHeaderProps {
    editMode: boolean;
    onEditToggle: () => void;
    onSave: () => void;
    onCancel: () => void;
    loading: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
                                                                editMode,
                                                                onEditToggle,
                                                                onSave,
                                                                onCancel,
                                                                loading
                                                            }) => {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Your Profile
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Manage your professional information
                </p>
            </div>

            <div className="flex space-x-2">
                {editMode ? (
                    <>
                        <Button
                            variant="outline"
                            onClick={onCancel}
                        >
                            <X className="w-4 h-4 mr-2" /> Cancel
                        </Button>
                        <Button
                            onClick={onSave}
                            isLoading={loading}
                        >
                            <Save className="w-4 h-4 mr-2" /> Save Profile
                        </Button>
                    </>
                ) : (
                    <Button onClick={onEditToggle}>
                        <Edit className="w-4 h-4 mr-2" /> Edit Profile
                    </Button>
                )}
            </div>
        </div>
    );
};