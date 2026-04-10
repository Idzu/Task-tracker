import { notifications } from '@mantine/notifications';
import { Button, Stack, Textarea, Title } from '@mantine/core';
import React, { useState } from 'react';
import z from 'zod';

// Схема валидации
const taskFormSchema = z.object({
  task: z.string().trim().min(1, 'Поле не должно быть пустым').max(500, 'Максимум 500 символов'),
});

export const TaskForm = () => {
  // Состояния
  const [task, setTask] = useState('');
  const [error, setError] = useState('');

  // Проверка валидации
  const validateTask = (v: string) => {
    const result = taskFormSchema.safeParse({ task: v });

    if (!result.success) {
      return z.flattenError(result.error).fieldErrors.task?.[0] ?? 'Ошибка валидации';
    }

    return '';
  };

  // Изменение текста и проверка валидации сразу
  const changeTaskText = (v: string) => {
    setTask(v);

    if (error) {
      setError(validateTask(v));
    }
  };

  // Добавление задачи
  const addTask = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Валидация формы
    const checkErrors = validateTask(task);
    if (checkErrors) {
      return setError(checkErrors);
    }

    // Сохранение данных
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
      <form onSubmit={addTask}>
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
