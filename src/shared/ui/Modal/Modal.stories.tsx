// все stories хранятся как и тесты - рядом с компонентом
// .stories. - обязательно, т.к. оно задано в регулярке: '../../src/**/*.stories.@(js|jsx|ts|tsx)'
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Modal } from './Modal';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';


export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    isOpen: true,
    children: 'Content Modal Window',
};

export const Dark = Template.bind({});
Dark.args = {
    isOpen: true,
    children: 'Content Modal Window',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
