export interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    category: string;
    author: string;
    createdAt: string;
    updatedAt?: string;
    published: boolean;
    imageUrl?: string;
    tags: string[];
    slug?: string;
    coverImage?: string;
}

export interface BlogState {
    posts: BlogPost[];
    loading: boolean;
    error: string | null;
    currentPost: BlogPost | null;
}