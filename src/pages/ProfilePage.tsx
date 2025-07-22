import  {useState} from 'react';
import { Layout } from '@/components/layout/Layout';
import { BookOpen } from 'lucide-react';
import * as Yup from 'yup';
import { useProfile } from '@/hooks/useProfile';
import {LoadingSpinner} from "@components/ui/LoadingSpinner.tsx";
import {FormIndex} from "@components/forms/FormIndex.tsx";
import {ProfileHeader} from "@components/forms/profile/ProfileHeader.tsx";
import {ProfileSection} from "@components/forms/profile/ProfileSection.tsx";
import {CustomTextarea} from "@utils/form/custom/CustomTextArea.tsx";

interface ProfileValues {
    bio: string;
}

const profileSchema = Yup.object().shape({
    bio: Yup.string().max(500, 'Bio must be at most 500 characters')
});

export const ProfilePage = () => {
    const { profile, loading, saveProfile } = useProfile();
    const [editMode, setEditMode] = useState(false);

    const handleSubmit = async (values: ProfileValues) => {
        await saveProfile(values);
        setEditMode(false);
    };

    if (!profile) {
        return (
            <Layout title="Profile" description="User profile">
                <div className="min-h-screen flex items-center justify-center">
                    <LoadingSpinner text="Loading profile..." />
                </div>
            </Layout>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <FormIndex<ProfileValues>
                        initialValues={{ bio: profile.bio }}
                        onSubmit={handleSubmit}
                        validationSchema={profileSchema}
                    >
                        <ProfileHeader
                            editMode={editMode}
                            onEditToggle={() => setEditMode(!editMode)}
                            onSave={() => {}}
                            onCancel={() => setEditMode(false)}
                            loading={loading}
                        />

                        <ProfileSection title="Bio" icon={<BookOpen className="w-5 h-5" />}>
                            <CustomTextarea
                                name="bio"
                                editMode={editMode}
                                placeholder="Tell us about yourself..."
                                rows={4}
                            />
                        </ProfileSection>

                        {/* Add other profile sections here */}
                    </FormIndex>
                </div>
            </div>
        </>
    );
};