'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useColorScheme } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { CreateCardSchemaType, createCardSchema } from './schema';
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
import { useAuth } from '@/shared/hooks/auth';
import { useCreateBusinessCard } from '@/shared/hooks/restapi/v1/BusinessCard';
import { useGetBusinessCardBackground } from '@/shared/hooks/restapi/v1/BusinessCardBackground';
import { useGetBusinessCardCoordinate } from '@/shared/hooks/restapi/v1/useBusinessCardCoordinate';
import { useForm } from '@/shared/hooks/useForm';
import { useDisclosure } from '@/shared/lib/mantine';
import { getAddressFromZipcode } from '@/shared/utils/address';
// import { getAddressFromZipcode, prefectures } from '@/shared/utils/address';

export const CreateCard = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const isDark = useColorScheme() === 'dark';
  const [isOpen, { open, close }] = useDisclosure();
  const [isLoaded, { open: openLoader, close: closeLoader }] = useDisclosure();
  const { createBusinessCard } = useCreateBusinessCard();

  // 背景と座標のデータ
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

  // フォーム
  const { register, handleSubmit, control, getValues, setValue, watch } =
    useForm<CreateCardSchemaType>({
      resolver: zodResolver(createCardSchema),
      defaultValues: {
        address: '',
        businessCardName: '',
        displayName: '',
        companyName: '',
        department: '',
        officialPosition: '',
        email: currentUser?.email ?? '',
        phoneNumber: '',
        postalCode: '',
        // prefectures: '',
        // cityAndAddress: '',
        // buildingAndRoom: '',
      },
    });

  // デザインモーダルのフォーム
  const {
    control: designControl,
    setValue: designSetvalue,
    watch: designWatch,
    getValues: designGetValues,
  } = useForm({
    defaultValues: {
      backgroundImage: bcbData?.[0].id ?? '',
      coordinate: bccData?.[0].id ?? '',
    },
  });

  // デザインモーダルでデザインを選択したときの処理
  const handleClickDesign = useCallback(
    (name: 'backgroundImage' | 'coordinate', id: string) => {
      designSetvalue(name, id);
    },
    [designSetvalue],
  );

  // 名刺コンポーネントに渡すデータを作成
  const watchAllFields: Dto_BusinessCardResponse = {
    ...watch(),
    businessCardPartsCoordinate: bccData?.find(
      (bcb) => bcb.id === designWatch('coordinate'),
    ) as Dto_BusinessCardResponse['businessCardPartsCoordinate'],
    businessCardBackgroundImage:
      bcbData?.find((bcb) => bcb.id === designWatch('backgroundImage'))
        ?.businessCardBackgroundImage ?? '',
    businessCardBackgroundColor:
      bcbData?.find((bcb) => bcb.id === designWatch('backgroundImage'))
        ?.businessCardBackgroundColor ?? '',
    speakingAudioPath: '',
    speakingDescription: '',
    threeDimentionalModel: '',
    id: '',
  };

  // 登録処理
  const onSubmit = useCallback(
    async (data: CreateCardSchemaType) => {
      openLoader();
      try {
        await createBusinessCard(
          '1', // TODO: ArAssetモーダルを作成したら変更する
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
        console.error(error);
      }
      closeLoader();
      router.push(ROUTES.cards.base);
    },
    [closeLoader, createBusinessCard, designGetValues, openLoader, router],
  );

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

  if (bcbError || bccError) return <div>failed to load</div>;
  if (isBcbLoading || isBccLoading) return <Loader />;

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
        <QRCode
          url={getQRCodeUrl('sample')}
          imagesrc="/airship-logo-column.svg"
          size={150}
        />
        <Button variant="outline" color="orange" radius="xl">
          QRコードを選択する
        </Button>
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
        {/* <NativeSelect
          control={control}
          name="prefectures"
          label="都道府県"
          data={prefectures}
          w={100}
        />
        <TextInput
          control={control}
          name="cityAndAddress"
          label="市区町村 番地"
          placeholder="入力してください"
        />
        <TextInput
          control={control}
          name="buildingAndRoom"
          label="建物名・部屋番号"
          placeholder="入力してください"
        /> */}
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
