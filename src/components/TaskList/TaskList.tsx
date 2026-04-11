import { Stack, Text } from '@mantine/core';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleTaskCompleted } from '../../features/tasks/tasksSlice';
import { TaskItem } from '../TaskItem/TaskItem';
import styles from './TaskList.module.scss';

export const TaskList = () => {
  const [isEditing, setIsEditing] = useState<number>(0);
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const items = tasks.map((task) => (
    <TaskItem
      key={task.id}
      title={task.title}
      completed={task.completed}
      createdAt={task.createdAt}
      isEditing={task.id === isEditing}
      onChangeCompleted={() => {
        dispatch(toggleTaskCompleted(task.id));
      }}
      onEdit={() => {
        setIsEditing(task.id);
      }}
      onDelete={() => {
        console.log('onDelete');
      }}
    />
  ));

  return (
    <div className={styles.taskList}>
      {items.length ? (
        <Stack gap="sm">{items}</Stack>
      ) : (
        <Text c="dimmed" className={styles.taskList__empty}>
          Список задач пуст, добавьте первую задачу
        </Text>
      )}
    </div>
  );
};
