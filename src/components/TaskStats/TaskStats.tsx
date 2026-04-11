import { Group, Text } from '@mantine/core';

interface Props {
  total: number;
  active: number;
  completed: number;
}

export const TaskStats = ({ total, active, completed }: Props) => {
  return (
    <Group gap="md">
      <Text>Всего: {total}</Text>
      <Text>Активных: {active}</Text>
      <Text>Выполненных: {completed}</Text>
    </Group>
  );
};
