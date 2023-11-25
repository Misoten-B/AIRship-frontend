import { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from '.';

const meta: Meta<typeof PasswordInput> = {
  component: undefined,
};
export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const Main: Story = {
  render: () => {
    return <PasswordInput />;
  },
};
