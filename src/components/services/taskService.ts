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
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase.ts';
import { Task, TaskFormData } from '../interfaces';

const COLLECTION = 'tasks';

// Convert Firestore data to Task type
const convertTask = (doc: any): Task => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    description: data.description,
    completed: data.completed,
    createdAt: data.createdAt?.toMillis() || Date.now(),
    updatedAt: data.updatedAt?.toMillis() || Date.now(),
    createdBy: data.createdBy
  };
};

// Get all tasks for a user
export const getTasks = async (userId: string): Promise<Task[]> => {
  try {
    const q = query(
      collection(db, COLLECTION),
      where('createdBy', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(convertTask);
  } catch (error) {
    console.error('Error getting tasks:', error);
    throw error;
  }
};

// Get a single task by ID
export const getTask = async (taskId: string): Promise<Task | null> => {
  try {
    const docRef = doc(db, COLLECTION, taskId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return convertTask(docSnap);
    }
    
    return null;
  } catch (error) {
    console.error('Error getting task:', error);
    throw error;
  }
};

// Create a new task
export const createTask = async (data: TaskFormData, userId: string): Promise<Task> => {
  try {
    const taskData = {
      ...data,
      completed: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: userId
    };
    
    const docRef = await addDoc(collection(db, COLLECTION), taskData);
    
    // For immediate UI update, return with the generated ID
    // Note: serverTimestamp() won't be available client-side until the next read
    return {
      id: docRef.id,
      ...data,
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      createdBy: userId
    };
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Update an existing task
export const updateTask = async (taskId: string, data: Partial<TaskFormData>): Promise<void> => {
  try {
    const taskRef = doc(db, COLLECTION, taskId);
    
    await updateDoc(taskRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Toggle task completion status
export const toggleTaskComplete = async (taskId: string, completed: boolean): Promise<void> => {
  try {
    const taskRef = doc(db, COLLECTION, taskId);
    
    await updateDoc(taskRef, {
      completed: !completed,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error toggling task completion:', error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    const taskRef = doc(db, COLLECTION, taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};