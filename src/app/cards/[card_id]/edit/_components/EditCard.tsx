'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Skeleton } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { SelectQRCodeModal } from './SelectQRCodeModal';
import { UpdateCardSchemaType, updateCardSchema } from './schema';
import { Dto_BusinessCardResponse } from '@/api/@types';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { TextInput, Textarea } from '@/shared/components/common/Input';
import { Center, Group, Paper, Stack } from '@/shared/components/common/Layout';
import { Loader } from '@/shared/components/common/Loader';
import { QRCode } from '@/shared/components/common/QRCode';
import { Text } from '@/shared/components/common/Text';
import { BusinessCard, getQRCodeUrl } from '@/shared/components/features';
import { BusinessCardDesignModal } from '@/shared/components/features/BusinessCard/BusinessCardDesignModal';
import { ROUTES } from '@/shared/constants';
import { useGetArAssets } from '@/shared/hooks/restapi/v1/ArAssets';
import {
  useGetBusinessCard,
  useUpdateBusinessCard,
} from '@/shared/hooks/restapi/v1/BusinessCard';
import { useForm } from '@/shared/hooks/useForm';
import { useNotifications } from '@/shared/hooks/useNotifications';
import { useDisclosure } from '@/shared/lib/mantine';
import { useLoading } from '@/shared/providers/loading';
import { getAddressFromZipcode } from '@/shared/utils/address';

export const EditCard = ({ id }: { id: string }) => {
  const router = useRouter();
  const params = useParams<{ card_id: string }>();

  const { data, error, isLoading } = useGetBusinessCard(id);
  const [isOpen, { open, close }] = useDisclosure();
  const { open: openLoading, close: closeLoading } = useLoading();
  const { updateBusinessCard } = useUpdateBusinessCard(id);
  const { errorNotification } = useNotifications();
  // ArAssetの取得
  const {
    data: arAssetData,
    error: arAssetError,
    isLoading: isArAssetLoading,
  } = useGetArAssets();

  // フォーム
  const { handleSubmit, control, getValues, setValue, watch } =
    useForm<UpdateCardSchemaType>({
      resolver: zodResolver(updateCardSchema),
      defaultValues: {
        id: data?.id,
        address: data?.address,
        businessCardName: data?.businessCardName,
        displayName: data?.displayName ?? '',
        companyName: data?.companyName,
        department: data?.department ?? '',
        officialPosition: data?.officialPosition,
        email: data?.email,
        phoneNumber: data?.phoneNumber,
        postalCode: data?.postalCode,
      },
    });

  // デザインモーダルのフォーム
  const {
    control: designControl,
    setValue: designSetValue,
    watch: designWatch,
    getValues: designGetValues,
  } = useForm({
    defaultValues: {
      backgroundImage: data?.businessCardBackgroundImage ?? '',
      coordinate: data?.businessCardPartsCoordinate.id ?? '',
    },
  });

  // ArAssetモーダル
  const {
    control: qrcodeControl,
    setValue: setQRCodeValue,
    getValues: getQRCodeValues,
    watch: qrcodeWatch,
  } = useForm({
    defaultValues: {
      qrCodeSelection: data?.arAssetId ?? '',
    },
  });

  // デザインモーダルでデザインを選択したときの処理
  const handleClickDesign = useCallback(
    (name: 'backgroundImage' | 'coordinate', id: string) => {
      designSetValue(name, id);
    },
    [designSetValue],
  );

  // 登録処理
  const onSubmit = useCallback(
    async (data: UpdateCardSchemaType) => {
      openLoading();
      try {
        await updateBusinessCard(
          getQRCodeValues('qrCodeSelection'),
          designGetValues('backgroundImage'),
          designGetValues('coordinate'),
          data.displayName,
          data.address,
          data.businessCardName,
          data.companyName,
          data.department,
          data.email,
          data.officialPosition,
          data.phoneNumber,
          data.postalCode,
        );
      } catch (error) {
        errorNotification(
          '編集失敗',
          'エラーが発生しました。再度お試しください。',
        );
      }
      closeLoading();
      router.push(ROUTES.cards.base);
    },
    [
      openLoading,
      closeLoading,
      router,
      updateBusinessCard,
      getQRCodeValues,
      designGetValues,
      errorNotification,
    ],
  );

  if (error || arAssetError) return <div>failed to load</div>;
  if (isLoading || isArAssetLoading) return <Loader />;

  const handleSetQRCodeValue = (value: string) => {
    setQRCodeValue('qrCodeSelection', value);
  };
  // 名刺コンポーネントに渡すデータを作成
  const watchAllFields: Dto_BusinessCardResponse = {
    ...watch(),
    businessCardPartsCoordinate: { ...data?.businessCardPartsCoordinate },
    businessCardBackgroundImage: data?.businessCardBackgroundImage,
    businessCardBackgroundColor: data?.businessCardBackgroundColor ?? '',
    arAssetId: data?.arAssetId ?? '',
    speakingAudioPath: data?.speakingAudioPath ?? '',
    speakingDescription: data?.speakingDescription ?? '',
    threeDimentionalModel: data?.threeDimentionalModel ?? '',
    qrcodeImagePath: data?.qrcodeImagePath,
  };
  // 住所検索
  const handlePostalCodeSearch = async () => {
    const zipcode = getValues('postalCode') as string;
    if (!zipcode) {
      return;
    }
    try {
      const data = await getAddressFromZipcode(zipcode);
      if (data.error) {
        console.error(data.message);
      } else {
        setValue('address', data.prefectures + data.cityAndAddress);
      }
    } catch (error) {
      console.error('エラーが発生しました:', error);
    }
  };

  return (
    <Container>
      <Paper
        pos="sticky"
        w="100%"
        top={60}
        pt="lg"
        style={(theme) => ({
          zIndex: 99,
        })}
      >
        <Center px="lg">
          <Button onClick={open}>名刺のデザインをカスタマイズ</Button>
          <BusinessCardDesignModal
            control={designControl}
            setValue={handleClickDesign}
            watch={designWatch}
            card={watchAllFields}
            opened={isOpen}
            onClose={close}
          />
        </Center>
        <Center w="100%" my="lg">
          <BusinessCard style={{ width: '100%' }} card={watchAllFields} />
        </Center>
      </Paper>
      <Text size="sm">QRコード選択</Text>
      <Text size="xs" c="gray.6" mb="md">
        作成したQRコードを選択してください
      </Text>
      <Group justify="center" my="lg">
        {qrcodeWatch('qrCodeSelection') !== '' ? (
          <QRCode
            url={getQRCodeUrl(qrcodeWatch('qrCodeSelection'))}
            imagesrc={
              arAssetData?.find(
                (arAsset) => arAsset.id === qrcodeWatch('qrCodeSelection'),
              )?.qrcodeImagePath ?? ''
            }
            size={150}
          />
        ) : (
          <Skeleton height={200} width={200} />
        )}
        <SelectQRCodeModal
          setValue={handleSetQRCodeValue}
          control={qrcodeControl}
        />
      </Group>

      <Stack gap="xs">
        <TextInput
          control={control}
          name="businessCardName"
          label="名刺名"
          placeholder="仕事用、プライベート用など"
          description="名刺名が未入力の場合、名前が名刺名になります。"
        />
        <TextInput
          control={control}
          name="displayName"
          label="名前"
          withAsterisk
          placeholder="入力してください"
        />
        <TextInput
          control={control}
          name="companyName"
          label="会社名"
          placeholder="入力してください"
        />
        <TextInput
          control={control}
          name="department"
          label="部署"
          placeholder="入力してください"
        />
        <TextInput
          control={control}
          name="officialPosition"
          label="役職"
          placeholder="入力してください"
        />
        <TextInput
          control={control}
          name="email"
          label="メールアドレス"
          withAsterisk
          placeholder="入力してください"
        />
        <TextInput
          control={control}
          name="phoneNumber"
          label="電話番号"
          placeholder="入力してください"
        />
        <Group align="end">
          <TextInput
            control={control}
            name="postalCode"
            label="郵便番号"
            placeholder="入力してください"
          />
          <Button
            color="orange"
            radius="xl"
            size="xs"
            mb="3"
            onClick={handlePostalCodeSearch}
          >
            住所検索
          </Button>
        </Group>
        <Textarea
          control={control}
          name="address"
          label="住所"
          placeholder="入力してください"
        />
        <Button
          type="submit"
          fullWidth
          radius="xl"
          my="lg"
          onClick={handleSubmit(onSubmit)}
        >
          完了
        </Button>
      </Stack>
    </Container>
  );
};
