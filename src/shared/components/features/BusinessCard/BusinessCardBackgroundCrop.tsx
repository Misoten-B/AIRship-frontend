import { Modal } from '@mantine/core';
import { useCallback, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { useForm } from 'react-hook-form';
import { ColorPicker } from 'react-hook-form-mantine';
import { Button, FileButton } from '../../common/Button';
import { Container } from '../../common/Container';
import { Stack } from '../../common/Layout';
import { IconUpload } from '../../icons';
import { BusinessCardAspectRatio } from './BusinessCardAspectRatio';
import getCroppedImg, { blobToImage } from './getCroppedImg';
import { useCreateBusinessCardBackground } from '@/shared/hooks/restapi/v1/BusinessCardBackground';
import { useDisclosure } from '@/shared/lib/mantine';

export const BusinessCardBackgroundCrop = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileString, setFileString] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isOpen, { open, close }] = useDisclosure();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImgSrc, setCroppedImgSrc] = useState('');
  const { createBusinessCardBackground } = useCreateBusinessCardBackground();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      backgroundColor: '#ffffffff',
    },
  });

  const onCropComplete = useCallback((croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onFileChange = useCallback(
    async (file: File | null) => {
      if (!file) return;
      setFile(file);
      console.debug('file', file);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (reader.result) {
          setFileString(reader.result.toString() || '');
          open();
        }
      });
      reader.readAsDataURL(file);
    },
    [open],
  );

  const onSubmit = async (data: { backgroundColor: string }) => {
    const croppedImage = await getCroppedImg(fileString, croppedAreaPixels!);
    if (!croppedImage) return; // FIXME: エラーハンドリング
    if (!file) return; // FIXME: エラーハンドリング

    blobToImage(croppedImage).then((img) => {
      setCroppedImgSrc(img.src);
    });

    const croppedFile = new File([croppedImage], 'croppedImage.png', {
      type: 'image/png',
    });

    try {
      const res = await createBusinessCardBackground(
        data.backgroundColor,
        croppedFile,
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
        <Stack gap="md">
          <Container h={500}>
            {fileString && (
              <Cropper
                image={fileString}
                crop={crop}
                zoom={zoom}
                aspect={1254 / 758}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                style={{
                  containerStyle: {
                    width: '95%',
                    height: '65%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  },
                }}
              />
            )}
          </Container>

          <ColorPicker
            fullWidth
            control={control}
            name="backgroundColor"
            format="hexa"
            alphaLabel="透明度"
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
        </Stack>
      </Modal>
    </>
  );
};
