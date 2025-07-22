import React from 'react';
import { Link } from 'react-router';
import { Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { BlogPost } from 'src/components/interfaces';
import { Card } from '@components/ui/Card.tsx';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, index = 0 }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Card hover border className="h-full flex flex-col">
        {post.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{format(post.createdAt, 'MMMM d, yyyy')}</span>
          </div>
          
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            <Link to={`/blog/${post.slug}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              {post.title}
            </Link>
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
            {post.excerpt}
          </p>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center mt-2 space-x-2">
              <Tag className="h-3 w-3 text-gray-500 dark:text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, i) => (
                  <Link 
                    key={i} 
                    to={`/blog/tag/${tag}`}
                    className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-4">
            <Link 
              to={`/blog/${post.slug}`}
              className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              Read more &rarr;
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};