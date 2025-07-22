import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

import {db} from "@services/firebase.ts";
import {RootState} from "@/store";
import {BlogPost, BlogState} from "@interface/blog.ts";
import {thunkErrorHelper} from "@utils/helperFunction/redux-helper.ts";

const initialState: BlogState = {
    posts: [],
    loading: false,
    error: null,
    currentPost: null
};

// Fetch all blog posts
export const fetchBlogPosts = createAsyncThunk(
    'blog/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            const querySnapshot = await getDocs(collection(db, 'blogPosts'));
            const posts: BlogPost[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                posts.push({
                    id: doc.id,
                    title: data.title,
                    content: data.content,
                    excerpt: data.excerpt,
                    category: data.category,
                    author: data.author,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    published: data.published,
                    imageUrl: data.imageUrl,
                    tags: data.tags || []
                });
            });
            return posts;
        } catch (error: unknown) {
            return rejectWithValue(thunkErrorHelper(error) || 'Failed to fetch posts');
        }
    }
);

// Fetch a single blog post by ID
export const fetchBlogPostById = createAsyncThunk(
    'blog/fetchPostById',
    async (postId: string, { rejectWithValue }) => {
        try {
            const docRef = doc(db, 'blogPosts', postId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                return {
                    id: docSnap.id,
                    ...data
                } as BlogPost;
            } else {
                return rejectWithValue('Post not found');
            }
        } catch (error: unknown) {
            return rejectWithValue(thunkErrorHelper(error) || 'Failed to fetch post');
        }
    }
);

// Create a new blog post
export const createBlogPost = createAsyncThunk(
    'blog/createPost',
    async (post: Omit<BlogPost, 'id'>, { rejectWithValue }) => {
        try {
            const docRef = await addDoc(collection(db, 'blogPosts'), {
                ...post,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            return { id: docRef.id, ...post };
        } catch (error: unknown) {
            let errorMessage = "fail to load data";

            if(error instanceof Error){
                errorMessage = error.message
            }
            return rejectWithValue(errorMessage || 'Failed to create post');
        }
    }
);

// Update an existing blog post
export const updateBlogPost = createAsyncThunk(
    'blog/updatePost',
    async (post: BlogPost, { rejectWithValue }) => {
        try {
            const { id, ...postData } = post;
            await updateDoc(doc(db, 'blogPosts', id), {
                ...postData,
                updatedAt: new Date().toISOString()
            });
            return post;
        } catch (error: unknown) {
            return rejectWithValue(thunkErrorHelper(error) || 'Failed to update post');
        }
    }
);

// Delete a blog post
export const deleteBlogPost = createAsyncThunk(
    'blog/deletePost',
    async (postId: string, { rejectWithValue }) => {
        try {
            await deleteDoc(doc(db, 'blogPosts', postId));
            return postId;
        } catch (error: unknown) {
            return rejectWithValue(thunkErrorHelper(error) || 'Failed to delete post');
        }
    }
);

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        clearCurrentPost: (state) => {
            state.currentPost = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.loading = false;
            })
            .addCase(fetchBlogPosts.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(fetchBlogPostById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogPostById.fulfilled, (state, action) => {
                state.currentPost = action.payload;
                state.loading = false;
            })
            .addCase(fetchBlogPostById.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(createBlogPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(updateBlogPost.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
                state.currentPost = action.payload;
            })
            .addCase(deleteBlogPost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload);
            });
    }
});

export const { clearCurrentPost } = blogSlice.actions;
export const selectBlog = (state: RootState) => state.blog;
export default blogSlice.reducer;