import { Meta, StoryObj } from '@storybook/react';
import { LoginCard } from './LoginCard';

const meta: Meta<typeof LoginCard> = {
  component: undefined,
};
export default meta;

type Story = StoryObj<typeof LoginCard>;

export const Main: Story = {
  render: () => {
    return <LoginCard />;
  },
};
