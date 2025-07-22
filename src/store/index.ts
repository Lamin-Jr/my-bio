import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from "@/store/userProfile/profileSlice.ts";
import authReducer from "@/store/auth/authSlice.ts";
import themeReducer from "@/store/theme/themeSlice.ts";
import blogReducer from "@/store/blog/blogSlice.ts";
import appReducer from "@store/app/appSlice.ts";

export const store = configureStore({
reducer: {auth: authReducer,userProfile: userProfileReducer, blog: blogReducer, theme: themeReducer, appState: appReducer}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;