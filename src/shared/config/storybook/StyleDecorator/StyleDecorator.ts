// https://storybook.js.org/docs/react/writing-stories/decorators
// роль декоратора - подключение глобальных стилей

import '@/app/styles/index.scss';
import { Story } from '@storybook/react';

export const StyleDecorator = (story: () => Story) => story();
