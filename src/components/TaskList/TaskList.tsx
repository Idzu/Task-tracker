import { notifications } from '@mantine/notifications';
import { Checkbox, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteTask, toggleTaskCompleted, updateTaskTitle } from '../../features/tasks/tasksSlice';
import { TaskItem } from '../TaskItem/TaskItem';
import styles from './TaskList.module.scss';

export const TaskList = () => {
  const [isEditing, setIsEditing] = useState<number>(0);
  const [deleteWithoutConfirm, setDeleteWithoutConfirm] = useState(false);
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);

  // Удалить задачу
  const removeTask = (id: number) => {
    if (!deleteWithoutConfirm) {
      const isConfirmed = window.confirm('Удалить задачу?');

      if (!isConfirmed) {
        return;
      }
    }

    dispatch(deleteTask(id));

    if (isEditing === id) {
      setIsEditing(0);
    }

    notifications.show({
      color: 'green',
      title: 'Успешно',
      message: 'Задача удалена',
    });
  };

  // Отменить редактирование
  const cancelEditTask = () => {
    setIsEditing(0);
  };

  // Сохранить редактирование
  const saveEditTask = (id: number, title: string) => {
    dispatch(updateTaskTitle({ id, title }));
    setIsEditing(0);

    notifications.show({
      color: 'green',
      title: 'Успешно',
      message: 'Задача обновлена',
    });
  };

  // Список задач
  const items = tasks.map((task) => (
    <TaskItem
      key={task.id}
      id={task.id}
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
      onCancelEdit={cancelEditTask}
      onSaveEdit={saveEditTask}
      onDelete={() => {
        removeTask(task.id);
      }}
    />
  ));

  return (
    <div className={styles.taskList}>
      <Checkbox
        checked={deleteWithoutConfirm}
        onChange={(event) => {
          setDeleteWithoutConfirm(event.currentTarget.checked);
        }}
        label="Удалять без подтверждения"
      />

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
