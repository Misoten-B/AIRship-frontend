import { Meta, StoryObj } from '@storybook/react';
import { CreateArAssetStepper } from './CreateArAssetStepper';

const meta: Meta<typeof CreateArAssetStepper> = {
  component: undefined,
};
export default meta;

type Story = StoryObj<typeof CreateArAssetStepper>;

export const Main: Story = {
  render: () => {
    return <CreateArAssetStepper />;
  },
};
