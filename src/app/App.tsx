import { MantineProvider } from '@mantine/core';
import { TaskPage } from '../pages/TaskPage/TaskPage';

export const App = () => {
  return (
    <MantineProvider>
      <TaskPage />
    </MantineProvider>
  );
};
