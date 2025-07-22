import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Edit, Trash2, ChevronRight, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { Task } from 'src/components/interfaces';
import { Button } from '../../ui/Button.tsx';
import { Card } from '../../ui/Card.tsx';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (task: Task) => Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => Promise<void>;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  const toggleExpand = (taskId: string) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const handleDelete = async (taskId: string) => {
    setDeletingTaskId(taskId);
    try {
      await onDelete(taskId);
    } finally {
      setDeletingTaskId(null);
    }
  };

  // Animation variants
  const taskVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No tasks yet. Start by adding a new task!</p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <ul className="space-y-3">
        {tasks.map((task, index) => (
          <motion.li
            key={task.id}
            custom={index}
            variants={taskVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            <Card className="overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <button
                    className={`flex-shrink-0 w-6 h-6 rounded-full border ${
                      task.completed
                        ? 'bg-primary-600 border-primary-600 flex items-center justify-center'
                        : 'border-gray-300 dark:border-gray-600'
                    } mr-3 mt-1 transition-colors`}
                    onClick={() => onToggleComplete(task)}
                    aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {task.completed && <Check className="w-4 h-4 text-white" />}
                  </button>
                  
                  <div className="flex-grow">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleExpand(task.id)}
                    >
                      <h3 
                        className={`text-base font-medium ${
                          task.completed 
                            ? 'text-gray-500 line-through dark:text-gray-400' 
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        {task.title}
                      </h3>
                      {expandedTaskId === task.id ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>
                        Created: {format(task.createdAt, 'MMM d, yyyy')}
                      </span>
                      {task.updatedAt !== task.createdAt && (
                        <span className="ml-3">
                          Updated: {format(task.updatedAt, 'MMM d, yyyy')}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-1 ml-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(task)}
                      aria-label="Edit task"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(task.id)}
                      isLoading={deletingTaskId === task.id}
                      aria-label="Delete task"
                    >
                      <Trash2 className="w-4 h-4 text-error-500" />
                    </Button>
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedTaskId === task.id && task.description && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pl-9 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
                          {task.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.li>
        ))}
      </ul>
    </AnimatePresence>
  );
};