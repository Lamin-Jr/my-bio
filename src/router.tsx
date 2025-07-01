import {createBrowserRouter} from "react-router-dom";
import {Home} from "@/pages/Home.tsx";
import {Info} from "@/pages/Info.tsx";
import {Services} from "@/pages/Services.tsx";
import {Blog} from "@pages/Blog.tsx";
import {ProtectedRoute} from "@components/auth/ProtectedRoute.tsx";
import {Tasks} from "@pages/Tasks.tsx";
import {Login} from "@pages/Login.tsx";
import {SignUp} from "@pages/SignUp.tsx";
import {ProfilePage} from "@pages/ProfilePage.tsx";
import {LayoutWrapper} from "@components/layout/LayoutWrapper.tsx";

export const router = createBrowserRouter([
    {
        element: <LayoutWrapper />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/info', element: <Info /> },
            { path: '/services', element: <Services /> },
            { path: '/blog', element: <Blog /> },
            { path: '/profile', element: (
                <ProtectedRoute>
                    <ProfilePage />
                </ProtectedRoute>
                ) },
            {
                path: '/tasks',
                element: (
                    // <ProtectedRoute requireAdmin>
                        <Tasks />
                    // </ProtectedRoute>
                ),
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
            {
                path: '*',
                element: <div className="min-h-screen flex items-center justify-center">Page Not Found</div>
            },
        ],
    },

]);