import { ConfigProvider } from 'antd';
import { Button } from './_components/common/Button';
import theme from './_shared/theme/themeConfig';

export default function Home() {
  return (
    <ConfigProvider theme={theme}>
      <div className="App">
        <Button type="primary">Button</Button>
      </div>
    </ConfigProvider>
  );
}
