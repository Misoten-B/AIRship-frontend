import { memo } from 'react';
import { Control, UseFormWatch } from 'react-hook-form';
import { BusinessCard } from '..';
import { Grid, Paper, Stack } from '../../common/Layout';
import { Loader } from '../../common/Loader';
import { Modal } from '../../common/Modal';
import { Radio } from '../../common/Radio';
import { Title } from '../../common/Title';
import { BusinessCardAspectRatio } from './BusinessCardAspectRatio';
import { BusinessCardBackgroundCrop } from './BusinessCardBackgroundCrop';
import { ColorOnlyModal } from './ColorOnlyModal';
import {
  Dto_BusinessCardPartsCoordinate,
  Dto_BusinessCardResponse,
} from '@/api/@types';
import { useGetBusinessCardBackground } from '@/shared/hooks/restapi/v1/BusinessCardBackground';
import { useGetBusinessCardCoordinate } from '@/shared/hooks/restapi/v1/useBusinessCardCoordinate';

type Props = {
  opened: boolean;
  onClose: () => void;
  card: Dto_BusinessCardResponse;
  control: Control<{ backgroundImage: string; coordinate: string }>;
  setValue: (name: 'backgroundImage' | 'coordinate', id: string) => void;
  watch: UseFormWatch<{
    backgroundImage: string;
    coordinate: string;
  }>;
};

export const BusinessCardDesignModal = ({
  opened,
  onClose,
  card,
  control,
  setValue,
  watch,
}: Props) => {
  const {
    data: bcbData,
    error: bcbError,
    isLoading: isBcbLoading,
  } = useGetBusinessCardBackground();
  const {
    data: bccData,
    error: bccError,
    isLoading: isBccLoading,
  } = useGetBusinessCardCoordinate();

  const watchImage = watch('backgroundImage');
  const watchCoordinate = watch('coordinate');

  if (bcbError || bccError) return <div>error...</div>;
  if (isBcbLoading || isBccLoading) return <Loader />;

  type BackgroundImageProps = {
    id: string;
    imagePath: string;
    imageColor: string;
  };
  const BackgroundImage = ({
    id,
    imagePath,
    imageColor,
  }: BackgroundImageProps) => {
    return (
      <Grid.Col span={4} onClick={() => setValue('backgroundImage', id)}>
        <BusinessCardAspectRatio>
          <Paper
            w="100%"
            h="100%"
            style={(theme) => ({
              backgroundColor: imageColor ?? '#ffffff',
              backgroundImage: `url(${imagePath})`,
              backgroundSize: 'cover',
              outline:
                watchImage === id ? `3px solid ${theme.colors.blue[3]}` : '',
            })}
          />
        </BusinessCardAspectRatio>
        <Radio.Item value={id} display="none" />
      </Grid.Col>
    );
  };

  type CoordinateProps = {
    id: string;
    data: Dto_BusinessCardPartsCoordinate;
    card: Dto_BusinessCardResponse;
  };
  const Coordinate = memo(({ id, data, card }: CoordinateProps) => {
    return (
      <>
        <BusinessCard
          style={(theme) => ({
            outline:
              watchCoordinate === id ? `3px solid ${theme.colors.blue[3]}` : '',
          })}
          card={{
            ...card,
            businessCardPartsCoordinate: data,
            businessCardBackgroundImage: bcbData!.find(
              (bcb) => bcb.id === watchImage,
            )?.businessCardBackgroundImage,
          }}
          key={id}
          onClick={() => {
            setValue('coordinate', id);
          }}
        />
        <Radio.Item value={id} display="none" />
      </>
    );
  });
  Coordinate.displayName = 'Coordinate';

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="名刺デザインの編集"
      size="xl"
    >
      <Title order={3}>名刺背景</Title>
      <Radio.Group control={control} name="backgroundImage">
        <Grid p="sm">
          {bcbData?.map(
            ({
              id,
              businessCardBackgroundImage,
              businessCardBackgroundColor,
            }) => (
              <BackgroundImage
                id={id!}
                imagePath={businessCardBackgroundImage!}
                imageColor={businessCardBackgroundColor}
                key={id}
              />
            ),
          )}
          <Grid.Col span={4}>
            <ColorOnlyModal />
          </Grid.Col>
          <Grid.Col span={4}>
            <BusinessCardBackgroundCrop />
          </Grid.Col>
        </Grid>
      </Radio.Group>

      <Title order={3}>名刺配置</Title>
      <Radio.Group control={control} name="coordinate">
        <Stack gap="lg" align="center">
          {bccData?.map((data) => (
            <Coordinate id={data.id!} card={card} data={data} key={data.id} />
          ))}
        </Stack>
      </Radio.Group>
    </Modal>
  );
};
