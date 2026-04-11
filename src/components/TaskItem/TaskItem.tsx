import { ActionIcon, Checkbox, Group, Text } from '@mantine/core';
import dayjs from 'dayjs';
import styles from './TaskItem.module.scss';

interface Props {
  title: string;
  completed: boolean;
  createdAt: string;
  isEditing?: boolean;
  onChangeCompleted: (completed: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const TaskItem = ({ title, completed, createdAt, isEditing = false, onChangeCompleted, onEdit, onDelete }: Props) => {
  // Вызвать функцию редактирования в родительском компоненте
  const changeCompleted = (value: boolean) => {
    onChangeCompleted(value);
  };

  return (
    <div className={styles.taskItem}>
      <Group justify="space-between" align="flex-start" wrap="nowrap" gap="md">
        {/* Вывод задач */}
        <Group align="flex-start" wrap="nowrap" gap="sm" className={styles.taskItem__main}>
          <Checkbox checked={completed} onChange={(event) => changeCompleted(event.currentTarget.checked)} />

          <div className={styles.taskItem__content}>
            <Text className={completed ? styles.taskItem__title_completed : styles.taskItem__title}>{title}</Text>
            <Text size="sm" c="dimmed">
              {dayjs(createdAt).format('DD.MM.YYYY HH:mm')}
            </Text>
            {isEditing && (
              <Text size="sm" c="blue">
                Режим редактирования
              </Text>
            )}
          </div>
        </Group>

        {/* Элементы управления */}
        <Group gap="xs" wrap="nowrap">
          <ActionIcon variant="light" color="gray" onClick={onEdit} aria-label="Редактировать задачу">
            ✎
          </ActionIcon>
          <ActionIcon variant="light" color="red" onClick={onDelete} aria-label="Удалить задачу">
            ×
          </ActionIcon>
        </Group>
      </Group>
    </div>
  );
};
