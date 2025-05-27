import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {db} from "@services/firebase.ts";
import {ProfileType} from "@config/store/userProfile/profileType.ts";

export const fetchUserProfile = createAsyncThunk(
    "userProfile/fetch",
    async (userId: string) => {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    }
);

export const updateUserProfile = createAsyncThunk(
    "userProfile/update",
    async ({ userId, data }: { userId: string, data: Partial<ProfileType> }) => {
        const docRef = doc(db, "users", userId);
        await updateDoc(docRef, data);
        return data;
    }
);

interface profileStateType {
    data: ProfileType | null;
    loading: boolean;
    error: string | null;
}

const profileState: profileStateType = {
    data: null,
    loading: false,
    error: null,
};


const userProfileSlice = createSlice({
    name: "userProfile",
    initialState: profileState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (_state) => {
                _state.loading = true;
            })
            .addCase(fetchUserProfile.fulfilled, (_state, action) => {
                _state.data = action.payload as ProfileType;
                _state.loading = false;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.data = { ...state.data, ...action.payload } as ProfileType;
            });
    }
});

export default userProfileSlice.reducer;