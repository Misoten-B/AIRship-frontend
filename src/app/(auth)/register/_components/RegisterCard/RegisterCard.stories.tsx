import { Meta, StoryObj } from '@storybook/react';
import { RegisterCard } from '.';

const meta: Meta<typeof RegisterCard> = {
  component: undefined,
};
export default meta;

type Story = StoryObj<typeof RegisterCard>;

export const Main: Story = {
  render: () => {
    return <RegisterCard />;
  },
};
