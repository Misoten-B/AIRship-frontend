import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '../src/shared/lib/mantine';
import { RecoilRoot } from 'recoil';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
export const decorators = [
  (renderStory: any) => (
    <RecoilRoot>
      <ThemeProvider>{renderStory()}</ThemeProvider>
    </RecoilRoot>
  ),
];
