import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '@components/services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {UserProfileType,  ProfileStateType} from "@components/interfaces/profileType.ts";
import {RootState} from "@/store";

const initialState: ProfileStateType = {
    profile: null,
    loading: false,
    error: null
};

export const fetchUserProfile = createAsyncThunk(
    'profile/fetchProfile',
    async (userId: string, { rejectWithValue }) => {
        try {
            const docRef = doc(db, 'users', userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data() as UserProfileType;
            }

            // Create new profile if doesn't exist
            const newProfile: UserProfileType = {
                bio: '',
                experiences: [],
                skills: [],
                education: [],
                name: '',
                avatar: ''
            };

            await setDoc(docRef, newProfile);
            return newProfile;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch profile');
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'profile/updateProfile',
    async ({ userId, profile }: {
        userId: string;
        profile: UserProfileType
    }, { rejectWithValue }) => {
        try {
            const docRef = doc(db, 'users', userId);
            await setDoc(docRef, profile, { merge: true });
            return profile;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to update profile');
        }
    }
);

const userProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        resetProfile: (state) => {
            state.profile = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
    }
});

export const { resetProfile } = userProfileSlice.actions;
export const selectProfile = (state: RootState) => state.userProfile;
export default userProfileSlice.reducer;