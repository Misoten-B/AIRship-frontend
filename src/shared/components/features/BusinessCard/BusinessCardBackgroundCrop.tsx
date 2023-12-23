import { Modal } from '@mantine/core';
import { useCallback, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { useForm } from 'react-hook-form';
import { ColorPicker } from 'react-hook-form-mantine';
import { Button, FileButton } from '../../common/Button';
import { Container } from '../../common/Container';
import { Flex, Stack } from '../../common/Layout';
import { IconUpload } from '../../icons';
import { BusinessCardAspectRatio } from './BusinessCardAspectRatio';
import getCroppedImg from './getCroppedImg';
import { useCreateBusinessCardBackground } from '@/shared/hooks/restapi/v1/BusinessCardBackground';
import { useDisclosure } from '@/shared/lib/mantine';

export const BusinessCardBackgroundCrop = () => {
  const [file, setFile] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isOpen, { open, close }] = useDisclosure();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImgSrc, setCroppedImgSrc] = useState('');
  const { createBusinessCardBackground } = useCreateBusinessCardBackground();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      backgroundColor: '#ffffff',
    },
  });

  const onCropComplete = useCallback((croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onFileChange = useCallback(
    async (file: File | null) => {
      if (!file) return;
      console.debug('file', file);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (reader.result) {
          setFile(reader.result.toString() || '');
          open();
        }
      });
      reader.readAsDataURL(file);
    },
    [open],
  );

  const onSubmit = async (data: { backgroundColor: string }) => {
    const croppedImage = await getCroppedImg(file, croppedAreaPixels!);
    if (!croppedImage) return; // FIXME: エラーハンドリング

    const croppedFile = new File([croppedImage], 'croppedImage.png', {
      type: 'image/png',
    });
    // const form = new FormData();
    // form.append('BusinessCardBackgroundImage', croppedFile);
    // form.append('backgroundColor', data.backgroundColor);
    console.log('croppedFile', croppedFile);
    try {
      const res = await createBusinessCardBackground(
        croppedFile,
        data.backgroundColor,
      );
      if (res) {
        close();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <BusinessCardAspectRatio>
        <FileButton onChange={onFileChange} accept="image/png">
          {(props) => (
            <Button
              w="100%"
              h="100%"
              variant="outline"
              color="gray"
              size="xs"
              {...props}
            >
              <IconUpload size={24} />
            </Button>
          )}
        </FileButton>
      </BusinessCardAspectRatio>
      <Modal
        opened={isOpen}
        onClose={close}
        title="名刺の背景画像を設定"
        size="xl"
      >
        <Stack>
          <Container h={500}>
            {file && (
              <Cropper
                image={file}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </Container>

          <Flex gap="md" align="end">
            <ColorPicker
              control={control}
              name="backgroundColor"
              format="hex"
              swatches={[
                '#2e2e2e',
                '#ffffff',
                '#fa5252',
                '#e64980',
                '#be4bdb',
                '#7950f2',
                '#4c6ef5',
                '#228be6',
                '#15aabf',
                '#12b886',
                '#40c057',
                '#82c91e',
                '#fab005',
                '#fd7e14',
              ]}
            />
            <Button
              type="submit"
              fullWidth
              radius="xl"
              my="lg"
              onClick={handleSubmit(onSubmit)}
            >
              アップロードする
            </Button>
          </Flex>
        </Stack>
      </Modal>
    </>
  );
};
