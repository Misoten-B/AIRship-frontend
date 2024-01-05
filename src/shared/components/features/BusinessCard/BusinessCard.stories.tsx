import { Meta, StoryObj } from '@storybook/react';
import { BusinessCard } from './BusinessCard';
import { Dto_BusinessCardPartsCoordinate } from '@/api/@types';

const meta: Meta<typeof BusinessCard> = {
  component: undefined,
};
export default meta;

type Story = StoryObj<typeof BusinessCard>;

const businessCardPartsCoordinate =
  {} as const satisfies Dto_BusinessCardPartsCoordinate;

export const Main: Story = {
  render: () => (
    <BusinessCard
      card={{
        accessCount: undefined,
        address: undefined,
        businessCardBackgroundColor: '#ffffff',
        businessCardBackgroundImage: undefined,
        businessCardName: undefined,
        businessCardPartsCoordinate: businessCardPartsCoordinate,
        companyName: undefined,
        department: undefined,
        displayName: '名無し',
        email: undefined,
        id: 'id',
        officialPosition: undefined,
        phoneNumber: undefined,
        postalCode: undefined,
        arAssetId: 'arAssetId',
        speakingAudioPath: '/ktok_test.wav',
        speakingDescription: 'こんにちは',
        threeDimentionalModel: '/dog.glb',
      }}
    ></BusinessCard>
  ),
};
