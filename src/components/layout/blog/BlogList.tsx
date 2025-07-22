import React from 'react';
import { BlogPost } from '@interface/blog.ts';
import {BlogPostItem} from "@components/layout/blog/BlogPostItem.tsx";

interface BlogListProps {
    posts: BlogPost[];
}

export const BlogList: React.FC<BlogListProps> = ({ posts }) => {
    if (posts.length === 0) {
        return <p>No blog posts available.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <BlogPostItem key={post.id} post={post} />
            ))}
        </div>
    );
};