import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {db} from "@services/firebase.ts";
import {ProfileStateType, UserProfileType} from "@/types/profileType.ts";

const profileInitialState: ProfileStateType = {
    profile: null,
    loading: false,
    error: null,
};

export const fetchUserProfile = createAsyncThunk(
    'profile/fetchProfile',
    async (userId: string) => {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() as UserProfileType : null;
    }
);

export const updateUserProfile = createAsyncThunk(
    'profile/updateProfile',
    async ({ userId, profile }: { userId: string; profile: Partial<UserProfileType> }) => {
        const docRef = doc(db, 'users', userId);
        await setDoc(docRef, profile, { merge: true });
        return profile;
    }
);


const userProfileSlice = createSlice({
    name: "userProfile",
    initialState: profileInitialState,
    reducers: {
        resetProfile: () => profileInitialState,
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
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                if (state.profile) {
                    state.profile = { ...state.profile, ...action.payload };
                }
            });
    }
});

export const { resetProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
