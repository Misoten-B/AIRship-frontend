import { Control, UseFormSetValue } from 'react-hook-form';
import { Divider } from '../common/Divider';
import { Image } from '../common/Image';
import { Grid, Stack } from '../common/Layout';
import { Loader } from '../common/Loader';
import { Radio } from '../common/Radio';
import { useGetThreeDimentionalModels } from '@/shared/hooks/restapi/v1/ThreeDimentionalModel';

type Props = {
  control: Control<{ threeDModel: string }>;
  setValue: UseFormSetValue<{ threeDModel: string }>;
};

type ImageRadioOptionProps = {
  value: string;
  path: string;
  onClick: (value: string) => void;
};

const ImageRadioButton = ({ value, path, onClick }: ImageRadioOptionProps) => {
  return (
    <Grid.Col key={value} span={4}>
      <Stack gap="sm" align="center" onClick={() => onClick(value)}>
        {/* <ModelViewer
          glb={path}
          alt={`${value} 3d model`}
          poster={''}
          usdz={''}
        /> */}
        <Image src={path} alt={`${value} 3d model`} />
        <Radio.Item value={value} size="xs" />
      </Stack>
    </Grid.Col>
  );
};

export const SelectThreeDModel = ({ control, setValue }: Props) => {
  const { data, error, isLoading } = useGetThreeDimentionalModels();

  if (error) return <div>error...</div>;
  if (isLoading) return <Loader />;

  if (!data) return null;
  return (
    <>
      <Radio.Group
        control={control}
        name="threeDModel"
        label="3Dモデル"
        description="用意できる3Dモデルがない場合はサンプルからお選びください"
        withAsterisk
      >
        <Grid gutter="sm">
          {data.map(({ id, path }) => {
            return (
              <ImageRadioButton
                key={id}
                path={path!}
                onClick={(value) => {
                  console.log(value, path);
                  setValue('threeDModel', value);
                }}
                value={id!}
              />
            );
          })}
        </Grid>
        <Divider my="sm" labelPosition="center" />
      </Radio.Group>
    </>
  );
};
