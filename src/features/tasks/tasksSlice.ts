import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '../../types/Task';

interface TasksState {
  tasks: Task[];
}

// Поиск задачи по id
const getTaskById = (tasks: Task[], id: number) => {
  return tasks.find((task) => task.id === id);
};

// Загрузка задач из localStorage
const loadTasks = (): Task[] => {
  const tasks = localStorage.getItem('tasks');

  if (!tasks) {
    return [];
  }

  try {
    return JSON.parse(tasks) as Task[];
  } catch {
    return [];
  }
};

const initialState: TasksState = {
  tasks: loadTasks(),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.unshift({
        id: Date.now(),
        title: action.payload,
        completed: false,
        createdAt: new Date().toISOString(),
      });
    },
    toggleTaskCompleted: (state, action: PayloadAction<number>) => {
      const currentTask = getTaskById(state.tasks, action.payload);

      if (!currentTask) {
        return;
      }

      currentTask.completed = !currentTask.completed;
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTaskTitle: (state, action: PayloadAction<{ id: number; title: string }>) => {
      const currentTask = getTaskById(state.tasks, action.payload.id);

      if (!currentTask) {
        return;
      }

      currentTask.title = action.payload.title;
    },
  },
});

export const { addTask, toggleTaskCompleted, deleteTask, updateTaskTitle } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
