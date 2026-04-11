import z from 'zod';

export const taskTitleSchema = z.string().trim().min(1, 'Поле не должно быть пустым').max(500, 'Максимум 500 символов');

// Проверка валидации
export const validateTaskTitle = (value: string) => {
  const result = taskTitleSchema.safeParse(value);

  if (!result.success) {
    return z.flattenError(result.error).formErrors[0] ?? 'Ошибка валидации';
  }

  return '';
};
