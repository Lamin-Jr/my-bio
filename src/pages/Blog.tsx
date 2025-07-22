import { useEffect } from 'react';

import { Button } from '@/components/ui/Button';
import { Link } from 'react-router';

import { Layout } from '@/components/layout/Layout';
import {BlogList} from "@components/layout/blog/BlogList.tsx";
import {clearCurrentPost, fetchBlogPosts, selectBlog} from "@store/blog/blogSlice.ts";
import {useAppDispatch, useAppSelector} from "@hooks/appHooks.ts";

export const BlogPage = () => {
    const dispatch = useAppDispatch();
    const { posts, loading, error } = useAppSelector(selectBlog);

    useEffect(() => {
        dispatch(fetchBlogPosts());
        dispatch(clearCurrentPost());
    }, [dispatch]);

    if (loading) {
        return (
            <Layout title="Blog" description="Blog posts">
                <div className="flex justify-center py-10">
                    <p>Loading blog posts...</p>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
                <div className="flex justify-center py-10">
                    <p className="text-error">Error: {error}</p>
                </div>
        );
    }

    return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Blog</h1>
                    <Button>
                        <Link to="/blog/new">
                            Create New Post
                        </Link>
                    </Button>
                </div>
                <BlogList posts={posts} />
            </div>
    );
};