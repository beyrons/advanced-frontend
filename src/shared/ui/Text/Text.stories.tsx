// все stories хранятся как и тесты - рядом с компонентом
// .stories. - обязательно, т.к. оно задано в регулярке: '../../src/**/*.stories.@(js|jsx|ts|tsx)'
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Text, TextSize, TextTheme } from './Text';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';


export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'Title',
    text: 'text text text text text',
};

export const onlyTitle = Template.bind({});
onlyTitle.args = {
    title: 'Title',
};

export const onlyText = Template.bind({});
onlyText.args = {
    text: 'text text text text text',
};

// -- сторикейсы с темной темой
export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    title: 'Title',
    text: 'text text text text text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTitleDark = Template.bind({});
onlyTitleDark.args = {
    title: 'Title',
};
onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTextDark = Template.bind({});
onlyTextDark.args = {
    text: 'text text text text text',
};
onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];


// -- сторикейсы для темы Error
export const Error = Template.bind({});
Error.args = {
    title: 'Title',
    text: 'text text text text text',
    theme: TextTheme.ERROR,
};

// -- сторикейсы для размеров шрифта
export const SizeL = Template.bind({});
SizeL.args = {
    title: 'Title',
    text: 'text text text text text',
    size: TextSize.L,
};

export const SizeM = Template.bind({});
SizeM.args = {
    title: 'Title',
    text: 'text text text text text',
    size: TextSize.M,
};

export const SizeS = Template.bind({});
SizeS.args = {
    title: 'Title',
    text: 'text text text text text',
    size: TextSize.S,
};
