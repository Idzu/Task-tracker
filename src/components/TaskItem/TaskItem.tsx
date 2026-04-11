import { ActionIcon, Button, Checkbox, Group, Text, Textarea } from '@mantine/core';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import styles from './TaskItem.module.scss';
import { validateTaskTitle } from '../../validation/task';

interface Props {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  isEditing?: boolean;
  onChangeCompleted: (completed: boolean) => void;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSaveEdit: (id: number, title: string) => void;
  onDelete: () => void;
}

export const TaskItem = ({
  id,
  title,
  completed,
  createdAt,
  isEditing = false,
  onChangeCompleted,
  onEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
}: Props) => {
  const [editTitle, setEditTitle] = useState(title);
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const titleRef = useRef<HTMLParagraphElement | null>(null);

  // Вызвать функцию редактирования в родительском компоненте
  const changeCompleted = (value: boolean) => {
    onChangeCompleted(value);
  };

  // Изменение текста при редактировании
  const changeEditTitle = (value: string) => {
    setEditTitle(value);

    if (error) {
      setError(validateTaskTitle(value));
    }
  };

  // Отмена редактирования
  const cancelEdit = () => {
    setEditTitle(title);
    setError('');
    onCancelEdit();
  };

  // Сохранение редактирования
  const saveEdit = () => {
    const nextTitle = editTitle.trim();
    const validateError = validateTaskTitle(nextTitle);

    if (validateError) {
      return setError(validateError);
    }

    onSaveEdit(id, nextTitle);
    setError('');
  };

  // Показать весь текст задачи
  const toggleExpanded = () => {
    setIsExpanded((prevState) => !prevState);
  };

  useEffect(() => {
    if (isEditing) {
      setEditTitle(title);
      setError('');
    }
  }, [isEditing, title]);

  useEffect(() => {
    setIsExpanded(false);
  }, [title]);

  useEffect(() => {
    const currentTitle = titleRef.current;

    if (!currentTitle) {
      return;
    }

    setShowToggle(currentTitle.scrollHeight > currentTitle.clientHeight);
  }, [title]);

  return (
    <div className={completed ? `${styles.taskItem} ${styles.taskItem_completed}` : styles.taskItem}>
      <Group justify="space-between" align="flex-start" wrap="nowrap" gap="md">
        {/* Вывод задач */}
        <Group align="flex-start" wrap="nowrap" gap="sm" className={styles.taskItem__main}>
          <Checkbox checked={completed} onChange={(event) => changeCompleted(event.currentTarget.checked)} />

          <div className={styles.taskItem__content}>
            {isEditing ? (
              <div className={styles.taskItem__edit}>
                <Textarea
                  classNames={{
                    root: styles.taskItem__textarea,
                    input: styles.taskItem__textareaInput,
                  }}
                  value={editTitle}
                  onChange={(event) => {
                    changeEditTitle(event.currentTarget.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      cancelEdit();
                    }
                  }}
                  error={error}
                  autoFocus
                  autosize
                  minRows={2}
                />
                <Group gap="xs">
                  <Button size="xs" onClick={saveEdit}>
                    Сохранить
                  </Button>
                  <Button size="xs" variant="default" onClick={cancelEdit}>
                    Отмена
                  </Button>
                </Group>
              </div>
            ) : (
              <>
                <Text
                  ref={titleRef}
                  className={
                    completed
                      ? `${styles.taskItem__title} ${styles.taskItem__title_completed} ${
                          !isExpanded ? styles.taskItem__title_collapsed : ''
                        }`
                      : `${styles.taskItem__title} ${!isExpanded ? styles.taskItem__title_collapsed : ''}`
                  }
                >
                  {title}
                </Text>
                {showToggle && (
                  <Text style={{ cursor: 'pointer' }} className={styles.taskItem__toggle} onClick={toggleExpanded}>
                    {isExpanded ? 'Скрыть' : 'Показать все'}
                  </Text>
                )}
                <Text size="sm" c="dimmed">
                  {dayjs(createdAt).format('DD.MM.YYYY HH:mm')}
                </Text>
              </>
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
