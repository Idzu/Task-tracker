import { Stack, Text } from '@mantine/core';
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { TaskItem } from '../TaskItem/TaskItem';
import styles from './TaskList.module.scss';

export const TaskList = () => {
  const [isEditing, setIsEditing] = useState<number>(0);
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const items = tasks.map((task) => (
    <TaskItem
      key={task.id}
      title={task.title}
      completed={task.completed}
      createdAt={task.createdAt}
      isEditing={task.id === isEditing}
      onChangeCompleted={() => {
        console.log('onChangeCompleted');
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
