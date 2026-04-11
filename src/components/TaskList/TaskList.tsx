import { notifications } from '@mantine/notifications';
import { Button, Checkbox, Group, Select, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteTask, toggleTaskCompleted, updateTaskTitle } from '../../features/tasks/tasksSlice';
import type { TaskFilter, TaskSort } from '../../types/Filters';
import { TaskItem } from '../TaskItem/TaskItem';
import { TaskSearch } from '../TaskSearch/TaskSearch';
import styles from './TaskList.module.scss';

export const TaskList = () => {
  const [isEditing, setIsEditing] = useState<number>(0);
  const [deleteWithoutConfirm, setDeleteWithoutConfirm] = useState(false);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<TaskSort>('dateDesc');
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

  // Фильтрация задач
  const filteredTasks = tasks.filter((task) => {
    const isMatchSearch = task.title.toLowerCase().includes(search.trim().toLowerCase());

    if (!isMatchSearch) {
      return false;
    }

    if (filter === 'active') {
      return !task.completed;
    }

    if (filter === 'completed') {
      return task.completed;
    }

    return true;
  });

  // Сортировка задач
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === 'dateAsc') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }

    if (sort === 'titleAsc') {
      return a.title.localeCompare(b.title, 'ru');
    }

    if (sort === 'titleDesc') {
      return b.title.localeCompare(a.title, 'ru');
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Текст для пустого списка
  const emptyText = search.trim()
    ? 'По вашему запросу задачи не найдены'
    : filter === 'active'
      ? 'Нет активных задач'
      : filter === 'completed'
        ? 'Нет выполненных задач'
        : 'Список задач пуст, добавьте первую задачу';

  // Список задач
  const items = sortedTasks.map((task) => (
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

      <TaskSearch value={search} onChange={setSearch} />

      <Select
        value={sort}
        onChange={(value) => {
          if (value) {
            setSort(value as TaskSort);
          }
        }}
        label="Сортировка"
        data={[
          { value: 'dateDesc', label: 'По дате: сначала новые' },
          { value: 'dateAsc', label: 'По дате: сначала старые' },
          { value: 'titleAsc', label: 'По названию: А-Я' },
          { value: 'titleDesc', label: 'По названию: Я-А' },
        ]}
      />

      <Group gap="xs">
        <Button variant={filter === 'all' ? 'filled' : 'light'} onClick={() => setFilter('all')}>
          Все
        </Button>
        <Button variant={filter === 'active' ? 'filled' : 'light'} onClick={() => setFilter('active')}>
          Активные
        </Button>
        <Button variant={filter === 'completed' ? 'filled' : 'light'} onClick={() => setFilter('completed')}>
          Выполненные
        </Button>
      </Group>

      {items.length ? (
        <Stack gap="sm">{items}</Stack>
      ) : (
        <Text c="dimmed" className={styles.taskList__empty}>
          {emptyText}
        </Text>
      )}
    </div>
  );
};
