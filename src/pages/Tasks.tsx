import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, CheckCircle, Circle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Layout } from '../components/layout/Layout';
import { TaskForm } from '../components/task/TaskForm';
import { TaskList } from '../components/task/TaskList';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { getTasks, createTask, updateTask, toggleTaskComplete, deleteTask } from '../services/taskService';
import { Task, TaskFormData } from '../types';

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  const { currentUser } = useAuth();
  
  useEffect(() => {
    if (!currentUser) return;
    
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const fetchedTasks = await getTasks(currentUser.uid);
        setTasks(fetchedTasks);
        setError(null);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, [currentUser]);
  
  const handleCreateTask = async (data: TaskFormData) => {
    if (!currentUser) return;
    
    try {
      const newTask = await createTask(data, currentUser.uid);
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Failed to create task. Please try again.');
    }
  };
  
  const handleUpdateTask = async (data: TaskFormData) => {
    if (!editingTask) return;
    
    try {
      await updateTask(editingTask.id, data);
      
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...data, updatedAt: Date.now() }
            : task
        )
      );
      
      setEditingTask(null);
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task. Please try again.');
    }
  };
  
  const handleToggleComplete = async (task: Task) => {
    try {
      await toggleTaskComplete(task.id, task.completed);
      
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id
            ? { ...t, completed: !t.completed, updatedAt: Date.now() }
            : t
        )
      );
    } catch (err) {
      console.error('Error toggling task completion:', err);
      setError('Failed to update task. Please try again.');
    }
  };
  
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };
  
  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task. Please try again.');
    }
  };
  
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });
  
  const handleCancelEdit = () => {
    setEditingTask(null);
  };
  
  return (
    <ProtectedRoute>
      <Layout title="Task Management - Portfolio" description="Manage and organize your tasks">
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Task Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Create, organize, and track your tasks in one place
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {editingTask ? 'Edit Task' : 'Add New Task'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <TaskForm
                        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                        initialData={
                          editingTask
                            ? {
                                title: editingTask.title,
                                description: editingTask.description,
                              }
                            : undefined
                        }
                        isEditing={!!editingTask}
                      />
                      
                      {editingTask && (
                        <div className="mt-4">
                          <Button
                            variant="outline"
                            fullWidth
                            onClick={handleCancelEdit}
                          >
                            Cancel Editing
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-3">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Your Tasks</CardTitle>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                            <Filter className="inline-block w-4 h-4 mr-1" />
                            Filter:
                          </span>
                          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-md p-1">
                            <button
                              onClick={() => setFilter('all')}
                              className={`px-2 py-1 text-xs rounded-md ${
                                filter === 'all'
                                  ? 'bg-white dark:bg-gray-700 shadow-sm'
                                  : 'text-gray-600 dark:text-gray-400'
                              }`}
                            >
                              All
                            </button>
                            <button
                              onClick={() => setFilter('active')}
                              className={`px-2 py-1 text-xs rounded-md flex items-center ${
                                filter === 'active'
                                  ? 'bg-white dark:bg-gray-700 shadow-sm'
                                  : 'text-gray-600 dark:text-gray-400'
                              }`}
                            >
                              <Circle className="w-3 h-3 mr-1" />
                              Active
                            </button>
                            <button
                              onClick={() => setFilter('completed')}
                              className={`px-2 py-1 text-xs rounded-md flex items-center ${
                                filter === 'completed'
                                  ? 'bg-white dark:bg-gray-700 shadow-sm'
                                  : 'text-gray-600 dark:text-gray-400'
                              }`}
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <div className="flex justify-center py-8">
                          <LoadingSpinner text="Loading tasks..." />
                        </div>
                      ) : error ? (
                        <div className="text-center py-8 text-error-600 dark:text-error-400">
                          <p>{error}</p>
                          <Button 
                            variant="outline" 
                            className="mt-4" 
                            onClick={() => window.location.reload()}
                          >
                            Try Again
                          </Button>
                        </div>
                      ) : (
                        <TaskList
                          tasks={filteredTasks}
                          onToggleComplete={handleToggleComplete}
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                        />
                      )}
                      
                      {!loading && !error && filteredTasks.length > 0 && (
                        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
                          Showing {filteredTasks.length} of {tasks.length} tasks
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};