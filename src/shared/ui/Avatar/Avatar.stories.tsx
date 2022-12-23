import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Avatar } from './Avatar';
import AvatarImage from './avatar.jpg';


export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Avatar>;


const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;


export const Primary = Template.bind({});
Primary.args = {
    size: 150,
    // передаем изображение. Если будем передавать изображение (ссылку) из Интернета, то
    // на загрузку изображения понадобится время. Поэтому, чтобы сторибук прогружался мгновенно, "харкодим" избражение './avatar.jpg'
    src: AvatarImage,
};

export const Small = Template.bind({});
Small.args = {
    size: 50,
    // передаем изображение. Если будем передавать изображение (ссылку) из Интернета, то
    // на загрузку изображения понадобится время. Поэтому, чтобы сторибук прогружался мгновенно, "харкодим" избражение './avatar.jpg'
    src: AvatarImage,
};
