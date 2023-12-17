import { Meta, StoryObj } from '@storybook/react';
import { BusinessCard } from './BusinessCard';

const meta: Meta<typeof BusinessCard> = {
  component: undefined,
};
export default meta;

type Story = StoryObj<typeof BusinessCard>;

export const Main: Story = {
  render: () => (
    <BusinessCard
      card={{
        accessCount: undefined,
        address: undefined,
        businessCardBackgroundColor: undefined,
        businessCardBackgroundImage: undefined,
        businessCardName: undefined,
        businessCardPartsCoordinate: undefined,
        companyName: undefined,
        department: undefined,
        displayName: undefined,
        email: undefined,
        id: undefined,
        officialPosition: undefined,
        phoneNumber: undefined,
        postalCode: undefined,
        speakingAudioPath: undefined,
        speakingDescription: undefined,
        threeDimentionalModel: undefined,
      }}
    ></BusinessCard>
  ),
};
