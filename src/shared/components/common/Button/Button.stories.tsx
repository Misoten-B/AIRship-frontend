import { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';

const meta: Meta<typeof Button> = {
  component: undefined,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Main: Story = {
  render: () => {
    return <Button>Button</Button>;
  },
};
