import { Meta, StoryObj } from '@storybook/react';
import { QRCode } from '.';

const meta: Meta<typeof QRCode> = {
  component: undefined,
};
export default meta;

type Story = StoryObj<typeof QRCode>;

export const Main: Story = {
  render: () => (
    <QRCode
      url={'https://airship.azurewebsites.net/'}
      imagesrc="/logo.svg"
      size={50}
    ></QRCode>
  ),
};
