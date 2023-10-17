import { Button as AntdButton, ButtonProps } from 'antd';

type Props = ButtonProps;
export const Button = (props: Props) => {
  return <AntdButton {...props} />;
};
