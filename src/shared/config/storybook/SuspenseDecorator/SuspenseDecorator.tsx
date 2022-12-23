import { Story } from '@storybook/react';
import { Suspense } from 'react';


// добавляем его в файл preview: config/storybook/preview.js
export const SuspenseDecorator = (StoryComponent: Story) => (
    <Suspense>
        <StoryComponent />
    </Suspense>
);
