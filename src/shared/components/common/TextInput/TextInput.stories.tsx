import { Meta, StoryObj } from '@storybook/react';
import { TextInput } from '.';

const meta: Meta<typeof TextInput> = {
  component: undefined,
};
export default meta;

type Story = StoryObj<typeof TextInput>;

export const Main: Story = {
  render: () => {
    return <TextInput />;
  },
};
