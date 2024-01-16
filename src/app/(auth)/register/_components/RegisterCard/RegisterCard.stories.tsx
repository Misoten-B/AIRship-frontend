import { Meta, StoryObj } from '@storybook/react';
import { RegisterCard } from '.';
import { AuthProvider } from '@/shared/hooks/auth';

const meta: Meta<typeof RegisterCard> = {
  component: undefined,
};
export default meta;

type Story = StoryObj<typeof RegisterCard>;

export const Main: Story = {
  render: () => {
    return (
      <AuthProvider>
        <RegisterCard />
      </AuthProvider>
    );
  },
};
