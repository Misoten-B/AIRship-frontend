import { Control, UseFormSetValue } from 'react-hook-form';
import { Divider } from '../common/Divider';
import { Grid, Stack } from '../common/Layout';
import { Loader } from '../common/Loader';
import { ModelViewer } from '../common/ModelViewer';
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
    <Grid.Col
      key={value}
      span={4}
      onClick={() => onClick(value)}
      style={{ cursor: 'pointer' }}
    >
      <Stack gap="sm" align="center">
        <ModelViewer
          glb={path}
          alt={`${value} 3d model`}
          poster={''}
          // usdz={'/cat.usdz'}
          style={{ width: '100%' }}
        />
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
        description="サンプルもしくはアップロードした3Dモデルを選択してください"
        withAsterisk
      >
        <Grid gutter="sm">
          {data.map(({ id, path }) => (
            <ImageRadioButton
              key={id}
              path={path!}
              onClick={(value) => {
                setValue('threeDModel', value);
              }}
              value={id!}
            />
          ))}
        </Grid>
        <Divider my="sm" labelPosition="center" />
      </Radio.Group>
    </>
  );
};
