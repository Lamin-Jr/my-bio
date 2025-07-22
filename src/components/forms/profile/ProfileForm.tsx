import {useState} from 'react';
import { BookOpen } from 'lucide-react';
import * as Yup from 'yup';
import {useAuth} from "@hooks/useAuth.ts";
import {useProfile} from "@hooks/useProfile.ts";
import {FormIndex} from "@components/forms/FormIndex.tsx";
import {ProfileHeader} from "@components/forms/profile/ProfileHeader.tsx";
import {ProfileSection} from "@components/forms/profile/ProfileSection.tsx";
import {updateUserProfile} from "@store/userProfile/profileSlice.ts";
import {CustomTextarea} from "@utils/form/custom/CustomTextArea.tsx";
import {UserProfileType} from "@components/interfaces/profileType.ts";

interface ProfileValues {
    bio: string
    // Add other form fields here
}

const profileSchema = Yup.object().shape({
    bio: Yup.string().max(500, 'Bio must be at most 500 characters')
});

export const ProfileForm = () => {
    const { currentUser } = useAuth();
    const { profile, loading } = useProfile();
    const [editMode, setEditMode] = useState(false);

    const handleSubmit = async (values: ProfileValues) => {
        if (!currentUser) return;
        updateUserProfile({
            userId: currentUser.uid,
            profile: values as UserProfileType
        });
        setEditMode(false);
    };

    return (
        // <FormIndex<ProfileValues>
        <FormIndex <ProfileValues>
            initialValues={{ bio: profile?.bio || '' }}
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
        </FormIndex>
    );
};