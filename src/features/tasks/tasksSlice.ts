import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '../../types/Task';

interface TasksState {
  tasks: Task[];
}

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
      const currentTask = state.tasks.find((task) => task.id === action.payload);

      if (!currentTask) {
        return;
      }

      currentTask.completed = !currentTask.completed;
    },
  },
});

export const { addTask, toggleTaskCompleted } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
