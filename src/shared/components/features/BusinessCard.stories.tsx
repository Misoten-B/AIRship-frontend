import { Meta, StoryObj } from '@storybook/react';
import { BusinessCard } from './BusinessCard';

const meta: Meta<typeof BusinessCard> = {
  component: undefined,
};
export default meta;

type Story = StoryObj<typeof BusinessCard>;

export const Main: Story = {
  render: () => <BusinessCard text={'1'}></BusinessCard>,
};
