import { Container, Paper, Title } from '@mantine/core';
import styles from './TaskPage.module.scss';

export const TaskPage = () => {
  return (
    <main className={styles.taskPage}>
      <Container size="sm">
        <Paper className={styles.taskPage__content} radius="md" p="lg" withBorder>
          <Title order={1}>Task Tracker</Title>
        </Paper>
      </Container>
    </main>
  );
};
