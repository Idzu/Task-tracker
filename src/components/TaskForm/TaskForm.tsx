import { notifications } from '@mantine/notifications';
import { Button, Stack, Textarea, Title } from '@mantine/core';
import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addTask } from '../../features/tasks/tasksSlice';
import { validateTaskTitle } from '../../validation/task';

export const TaskForm = () => {
  // Состояния
  const [task, setTask] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  // Изменение текста и проверка валидации сразу
  const changeTaskText = (v: string) => {
    setTask(v);

    if (error) {
      setError(validateTaskTitle(v));
    }
  };

  // Добавление задачи
  const addTaskForm = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Валидация формы
    const checkErrors = validateTaskTitle(task);
    if (checkErrors) {
      return setError(checkErrors);
    }

    // Сохранение данных
    dispatch(addTask(task.trim()));

    notifications.show({
      color: 'green',
      title: 'Успешно',
      message: 'Задача добавлена',
    });

    // Очистка формы
    setTask('');
    setError('');
  };

  return (
    <div>
      <form onSubmit={addTaskForm}>
        <Stack>
          <Title>Добавление задачи</Title>
          <Textarea
            value={task}
            onChange={(event) => {
              changeTaskText(event.currentTarget.value);
            }}
            label="Введите текст для задачи"
            placeholder="Введите текст"
            error={error}
          />
          <Button type="submit">Добавить задачу</Button>
        </Stack>
      </form>
    </div>
  );
};
