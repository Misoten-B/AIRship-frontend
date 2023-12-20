'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { CreateCardSchemaType, createCardSchema } from './schema';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import {
  ErrorNotificationData,
  notifications,
} from '@/shared/components/common/Feedback';
import {
  // NativeSelect,
  TextInput,
  Textarea,
} from '@/shared/components/common/Input';
import { Group, Stack } from '@/shared/components/common/Layout';
import { QRCode } from '@/shared/components/common/QRCode';
import { Text } from '@/shared/components/common/Text';
import { BusinessCard } from '@/shared/components/features';
import { useAuth } from '@/shared/hooks/auth';
import { useCreateBusinessCard } from '@/shared/hooks/restapi/v1/BusinessCard';
import { useForm } from '@/shared/hooks/useForm';
import { getAddressFromZipcode } from '@/shared/utils/address';
// import { getAddressFromZipcode, prefectures } from '@/shared/utils/address';

export const CreateCard = () => {
  const { currentUser } = useAuth();
  const { createBusinessCard } = useCreateBusinessCard();

  const onSubmit = useCallback(async (data: CreateCardSchemaType) => {
    console.log('card', data);
    const test = {
      accessCount: 0,
      businessCardBackgroundColor: 'aaa',
      businessCardBackgroundImage: 'aaa',
      speakingAudioPath: 'aaa',
      speakingDescription: 'aaa',
      threeDimentionalModel: 'aaa',
    };
    try {
      // ここがうまくいかない
      // await createBusinessCard({ ...data, ...test });
      notifications.show({
        title: '名刺の作成が完了しました',
        message: 'おめでとう🤥',
      });
    } catch (error) {
      notifications.show(ErrorNotificationData('Error', '登録されていません'));
      console.log(error);
    }
  }, []);

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
        email: currentUser?.email as string,
        phoneNumber: '',
        postalCode: '',
        // prefectures: '',
        // cityAndAddress: '',
        // buildingAndRoom: '',
      },
    });
  const watchAllFields = watch();

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
        console.log('data', data);
        setValue('address', data.prefectures + data.cityAndAddress);
        // setValue('prefectures', data.prefectures);
        // setValue('cityAndAddress', data.cityAndAddress);
      }
    } catch (error) {
      console.error('エラーが発生しました:', error);
    }
  };

  return (
    <Container>
      <BusinessCard card={watchAllFields} />
      <Text size="sm">QRコード選択</Text>
      <Text size="xs" c="gray.6" mb="md">
        作成したQRコードを選択してください
      </Text>
      <Group justify="center" my="lg">
        <QRCode
          url={'aaa.com'}
          imageSrc="/airship-logo-column.svg"
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
          placeholder="入力してください"
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
