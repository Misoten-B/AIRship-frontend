import { Meta, StoryObj } from '@storybook/react';
import { Container } from '.';

const meta: Meta<typeof Container> = {
  component: undefined,
};
export default meta;

type Story = StoryObj<typeof Container>;

export const Main: Story = {
  render: () => {
    return <Container />;
  },
};
