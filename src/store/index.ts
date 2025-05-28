import { configureStore } from '@reduxjs/toolkit';
import userProfileSlice from "@/store/userProfile/profileSlice.ts";
import authSlice from "@/store/auth/authSlice.ts";

export const store = configureStore({
reducer: {auth: authSlice,userProfile: userProfileSlice}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;