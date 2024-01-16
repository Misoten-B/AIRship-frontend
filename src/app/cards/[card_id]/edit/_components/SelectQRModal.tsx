'use client';
import { Control } from 'react-hook-form';
import { Loader } from '@/shared/components/common/Loader';
import { Radio } from '@/shared/components/common/Radio';
import { ArAssetItem } from '@/shared/components/features/QRCode/ArAssetItem';
import { useGetArAssets } from '@/shared/hooks/restapi/v1/ArAssets';

type Props = {
  setValue: (value: string) => void;
  control: Control<
    {
      qrCodeSelection: string;
    },
    any
  >;
};

export const SelectQRModal = ({ setValue, control }: Props) => {
  const { data, error, isLoading } = useGetArAssets();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <Loader />;

  if (!data) return null;
  return (
    <Radio.Group name="qrCodeSelection" control={control}>
      {data.map((item) => (
        <ArAssetItem key={item.id} arAsset={item} setValue={setValue} />
      ))}
    </Radio.Group>
  );
};
