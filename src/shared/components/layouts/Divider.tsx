import { Divider as AntdDivider, DividerProps } from 'antd';

type Props = DividerProps;
export const Divider = (props: Props) => {
  return <AntdDivider {...props} />;
};
