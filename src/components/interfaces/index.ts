// Authentication interfaces
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdmin: boolean;
}

// Task interfaces
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
}

export interface TaskFormData {
  title: string;
  description: string;
}

// Blog interfaces
// export interface BlogPost {
//   id: string;
//   title: string;
//   slug: string;
//   content: string;
//   excerpt: string;
//   published: boolean;
//   createdAt: number;
//   updatedAt: number;
//   author: string;
//   tags: string[];
//   coverImage?: string;
// }

// export interface BlogFormData {
//   title: string;
//   content: string;
//   excerpt: string;
//   published: boolean;
//   tags: string[];
//   coverImage?: string;
// }

// Service interfaces
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface ProfileInfoPostCollection  {
  [key: string]: unknown[];
}

// Theme interfaces
export type ThemeMode = 'light' | 'dark' | 'system';