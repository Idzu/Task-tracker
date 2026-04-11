import { Container, Paper, Stack, Title } from '@mantine/core';
import styles from './TaskPage.module.scss';
import { TaskForm } from '../../components/TaskForm/TaskForm';
import { TaskList } from '../../components/TaskList/TaskList';

export const TaskPage = () => {
  return (
    <main className={styles.taskPage}>
      <Container size="sm">
        <Paper className={styles.taskPage__content} radius="md" p="lg" withBorder>
          <Stack gap="md">
            <Title order={1}>Task Tracker</Title>
            <TaskForm />
            <TaskList />
          </Stack>
        </Paper>
      </Container>
    </main>
  );
};
