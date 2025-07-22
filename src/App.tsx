import {RouterProvider} from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import {ThemeManager} from "@components/layout/ThemeManager.tsx";
import {router} from "@/router.tsx";
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
            />
      </HelmetProvider>
  );
}

export default App;