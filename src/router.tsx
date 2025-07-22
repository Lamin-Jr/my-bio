import {createBrowserRouter} from "react-router";
import {Home} from "@/pages/Home.tsx";
import {Info} from "@/pages/Info.tsx";
import {Services} from "@/pages/Services.tsx";
import {BlogPage} from "@pages/Blog.tsx";
import {ProtectedRoute} from "@components/auth/ProtectedRoute.tsx";
import {Tasks} from "@pages/Tasks.tsx";
import {Login} from "@pages/Login.tsx";
import {SignUp} from "@pages/SignUp.tsx";
import {ProfilePage} from "@pages/ProfilePage.tsx";
import {LayoutWrapper} from "@components/layout/LayoutWrapper.tsx";
import {BlogPostView} from "@components/layout/blog/BlogPostView.tsx";
import {BlogPostForm} from "@components/forms/Blog/BlogPostForm.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: LayoutWrapper,
        children: [
            { path: '/', Component: Home },
            { path: '/info', Component: Info },
            { path: '/services', Component: Services },
            { path: '/blog',  children: [
                    {index: true, Component: BlogPage},
                    {
                        path: ':id',
                        Component: BlogPostView,
                    },
                    {
                        path: 'new',
                        Component: ()=>
                             <ProtectedRoute>
                                <BlogPostForm/>
                            </ProtectedRoute>
                        ,
                    },
                    {
                        path: 'edit/:id',
                        Component: ()=>
                            <ProtectedRoute>
                                <BlogPostForm />
                            </ProtectedRoute>
                        ,
                }] },
            { path: '/profile', Component: ()=>
                <ProtectedRoute>
                    <ProfilePage />
                </ProtectedRoute>
                 },
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
                Component: Login,
            },
            {
                path: '/signup',
                Component: SignUp,
            },
            {
                path: '*',
                Component: ()=> <div className="min-h-screen flex items-center justify-center">Page Not Found</div>
            },
        ],
    },

]);