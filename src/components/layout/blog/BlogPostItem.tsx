import React from 'react';
import { BlogPost } from '@interface/blog.ts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Link } from 'react-router';
import {formatDate} from "@utils/helperFunction/blog-helper.ts";


interface BlogPostItemProps {
    post: BlogPost;
}

export const BlogPostItem: React.FC<BlogPostItemProps> = ({ post }) => {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-lg">
                    <Link to={`/blog/${post.id}`} className="hover:underline">
                        {post.title}
                    </Link>
                </CardTitle>
                <CardDescription>
                    <div className="flex justify-between text-sm">
                        <span>{post.category}</span>
                        <span>{formatDate(post.createdAt)}</span>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-gray-600 dark:text-gray-400">
                    {post.excerpt || post.content.slice(0, 100) + '...'}
                </p>
                <div className="mt-4">
                    <Link
                        to={`/blog/${post.id}`}
                        className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                    >
                        Read more
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};