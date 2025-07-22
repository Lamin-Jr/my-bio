

import { useEffect } from 'react';
import {useAppDispatch, useAppSelector} from "@hooks/appHooks.ts";
import {UserProfileType} from "@components/interfaces/profileType.ts";
import {fetchUserProfile, updateUserProfile} from "@store/userProfile/profileSlice.ts";


export const useProfile = () => {
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector((state) => state.auth);
    const { profile, loading, error } = useAppSelector((state) => state.userProfile);

    // Load profile when user changes
    useEffect(() => {
        if (currentUser?.uid && !profile) {
            dispatch(fetchUserProfile(currentUser.uid));
        }
    }, [currentUser, profile, dispatch]);

    const saveProfile = async (profileData: Partial<UserProfileType>) => {
        if (!currentUser) return;

        const updatedProfile = {
            ...(profile || {}),
            ...profileData
        } as UserProfileType;

        return dispatch(updateUserProfile({
            userId: currentUser.uid,
            profile: updatedProfile
        }));
    };

    return {
        profile,
        loading,
        error,
        saveProfile,
        isLoaded: !!profile
    };
};