import {RouterProvider} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import {ThemeManager} from "@components/layout/ThemeManager.tsx";
import {router} from "@/router.tsx";
import {LoadingScreen} from "@components/layout/loadingScreen.tsx";
import {useAppDispatch} from "@/hooks/appHooks.ts";
import {useEffect} from "react";
import {initializeAuth} from "@/store/auth/authSlice.ts";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

  return (
      <HelmetProvider>

            <ThemeManager />
            <RouterProvider
                router={router}
                fallbackElement={<LoadingScreen />}
            />
      </HelmetProvider>
  );
}

export default App;