import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase.ts';
import {BlogPost} from "@interface/blog.ts";

const COLLECTION = 'blogPosts';

// Helper to convert string to slug
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');
};

// Convert Firestore data to BlogPost type
const convertBlogPost = (doc: any): BlogPost => {
  const data = doc.data();
  return {
    id: doc ? doc.id : "",
    title: data.title,
    slug: data.slug,
    content: data.content,
    excerpt: data.excerpt,
    category: data.category,
    published: data.published,
    createdAt: data.createdAt?.toMillis() || Date.now(),
    updatedAt: data.updatedAt?.toMillis() || Date.now(),
    author: data.author,
    tags: data.tags || [],
    coverImage: data.coverImage
  };
};

// Get all published blog posts
export const getPublishedPosts = async (): Promise<BlogPost[]> => {
  try {
    const q = query(
      collection(db, COLLECTION),
      where('published', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(convertBlogPost);
  } catch (error) {
    console.error('Error getting published posts:', error);
    throw error;
  }
};

// Get recent published posts
export const getRecentPosts = async (count: number = 3): Promise<BlogPost[]> => {
  try {
    const q = query(
      collection(db, COLLECTION),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(count)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(convertBlogPost);
  } catch (error) {
    console.error('Error getting recent posts:', error);
    throw error;
  }
};

// Get all blog posts (for admin)
export const getAllPosts = async (): Promise<BlogPost[]> => {
  try {
    const q = query(
      collection(db, COLLECTION),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(convertBlogPost);
  } catch (error) {
    console.error('Error getting all posts:', error);
    throw error;
  }
};

// Get a single blog post by slug
export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const q = query(
      collection(db, COLLECTION),
      where('slug', '==', slug),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    return convertBlogPost(querySnapshot.docs[0]);
  } catch (error) {
    console.error('Error getting post by slug:', error);
    throw error;
  }
};

// Get a single blog post by ID
export const getPost = async (postId: string): Promise<BlogPost | null> => {
  try {
    const docRef = doc(db, COLLECTION, postId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return convertBlogPost(docSnap);
    }
    
    return null;
  } catch (error) {
    console.error('Error getting post:', error);
    throw error;
  }
};

// Create a new blog post
export const createPost = async (data: BlogPost, authorId: string): Promise<BlogPost> => {
  try {
    const slug = createSlug(data.title);

    const postData = {
      ...data,
      slug,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      author: authorId
    };

    const docRef = await addDoc(collection(db, COLLECTION), postData);

    // For immediate UI update
    return {
      ...data,
      id: docRef.id,
      slug,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
      author: authorId,
      tags: data.tags || []
    };
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Update an existing blog post
export const updatePost = async (postId: string, data: Partial<BlogPost>): Promise<void> => {
  try {
    const postRef = doc(db, COLLECTION, postId);
    
    // If title is updated, regenerate the slug
    const updateData: any = { ...data, updatedAt: serverTimestamp() };
    
    if (data.title) {
      updateData.slug = createSlug(data.title);
    }
    
    await updateDoc(postRef, updateData);
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// Delete a blog post
export const deletePost = async (postId: string): Promise<void> => {
  try {
    const postRef = doc(db, COLLECTION, postId);
    await deleteDoc(postRef);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

// Get posts by tag
export const getPostsByTag = async (tag: string): Promise<BlogPost[]> => {
  try {
    const q = query(
      collection(db, COLLECTION),
      where('published', '==', true),
      where('tags', 'array-contains', tag),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(convertBlogPost);
  } catch (error) {
    console.error('Error getting posts by tag:', error);
    throw error;
  }
};