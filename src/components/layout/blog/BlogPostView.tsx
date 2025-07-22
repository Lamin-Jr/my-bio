import  { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import {useAppDispatch, useAppSelector} from "@hooks/appHooks.ts";

import {fetchBlogPostById, selectBlog} from "@store/blog/blogSlice.ts";
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import {formatDate} from "@utils/helperFunction/blog-helper.ts";


export const BlogPostView = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { currentPost: post, loading, error } = useAppSelector(selectBlog);

    useEffect(() => {
        if (id) {
            dispatch(fetchBlogPostById(id));
        }
    }, [id, dispatch]);

    if (loading) {
        return (
            <Layout title="Loading..." description="Loading blog post">
                <div className="flex justify-center py-10">
                    <p>Loading...</p>
                </div>
            </Layout>
        );
    }

    if (error || !post) {
        return (
            <Layout title="Error" description="Error loading blog post">
                <div className="flex justify-center py-10">
                    <p className="text-error">Error: {error || 'Post not found'}</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title={post.title} description={post.excerpt || post.content.slice(0, 100)}>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <article>
                    <header className="mb-8">
                        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                            <span>Category: {post.category}</span>
                            <span>Published: {formatDate(post.createdAt)}</span>
                        </div>
                        {post.imageUrl && (
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />
                        )}
                    </header>

                    <div className="prose dark:prose-invert max-w-none mb-8">
                        {post.content}
                    </div>

                    <footer>
                        <div className="flex justify-between items-center">
                            <Link to="/blog">
                                <Button variant="outline">Back to Blog</Button>
                            </Link>
                            <div>
                                {/*To Be Replace with:: <Button asChild variant="secondary" className="mr-2">*/}
                                <Button variant="default" className="mr-2">
                                    <Link to={`/blog/edit/${post.id}`}>
                                        Edit
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </footer>
                </article>
            </div>
        </Layout>
    );
};