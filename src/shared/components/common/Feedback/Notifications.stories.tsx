import { Box } from '@mantine/core';
import { Meta, StoryObj } from '@storybook/react';
import { Notifications } from '.';
import { useNotifications } from '@/shared/hooks/useNotifications';

const meta: Meta<typeof Notifications> = {
  component: undefined,
  argTypes: {
    variant: {
      options: ['info', 'warn', 'error'],
      control: { type: 'radio' },
      defaultValue: 'info',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Notifications>;

type Props = {
  variant: 'info' | 'warn' | 'error';
};
const Wrap = ({ variant }: Props) => {
  const { errorNotification, infoNotification, warnNotification } =
    useNotifications();

  switch (variant) {
    case 'info':
      infoNotification('Title', 'Message');
      break;
    case 'warn':
      warnNotification('Title', 'Message');
      break;
    case 'error':
      errorNotification('Title', 'Message');
      break;
  }

  return (
    <Box>
      <Notifications />
    </Box>
  );
};

export const Main: Story = {
  render: (arg) => {
    const { variant } = arg;
    const v =
      variant === 'info' ? 'info' : variant === 'warn' ? 'warn' : 'error';
    return <Wrap variant={v} />;
  },
};
