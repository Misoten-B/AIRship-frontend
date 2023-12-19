import { Meta, StoryObj } from '@storybook/react';
import { CreateArAssetPage } from './CreateArAssetStepper';

const meta: Meta<typeof CreateArAssetPage> = {
  component: undefined,
};
export default meta;

type Story = StoryObj<typeof CreateArAssetPage>;

export const Main: Story = {
  render: () => {
    return <CreateArAssetPage />;
  },
};
