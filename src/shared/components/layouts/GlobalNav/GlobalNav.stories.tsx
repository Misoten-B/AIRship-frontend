import { Meta, StoryObj } from '@storybook/react';
import { GlobalNav } from './GlobalNav';

const meta: Meta<typeof GlobalNav> = {
  component: undefined,
};
export default meta;

type Story = StoryObj<typeof GlobalNav>;

export const Main: Story = {
  render: () => <GlobalNav>Contents</GlobalNav>,
};
