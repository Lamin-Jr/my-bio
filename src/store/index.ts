import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from "@/store/userProfile/profileSlice.ts";
import authReducer from "@/store/auth/authSlice.ts";
import themeReducer from "@/store/theme/themeSlice.ts";

export const store = configureStore({
reducer: {auth: authReducer,userProfile: userProfileReducer, theme: themeReducer,}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;