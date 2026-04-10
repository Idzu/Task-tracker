import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { TaskPage } from '../pages/TaskPage/TaskPage';

export const App = () => {
  return (
    <MantineProvider>
      <Notifications />
      <TaskPage />
    </MantineProvider>
  );
};
