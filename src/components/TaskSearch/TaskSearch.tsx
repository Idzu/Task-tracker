import { TextInput } from '@mantine/core';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const TaskSearch = ({ value, onChange }: Props) => {
  const changeSearch = (searchValue: string) => {
    onChange(searchValue);
  };

  return (
    <TextInput
      value={value}
      onChange={(event) => {
        changeSearch(event.currentTarget.value);
      }}
      label="Поиск задачи"
      placeholder="Введите название задачи"
    />
  );
};
