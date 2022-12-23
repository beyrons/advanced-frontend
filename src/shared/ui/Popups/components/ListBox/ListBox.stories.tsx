import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListBox } from './ListBox';


export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    // делаем отступы, чтобы было видно, куда меню выпадает
    decorators: [
        (Story) => <div style={{ padding: 100 }}><Story /></div>,
    ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    value: 'ListBox',
    items: [
        { content: 'text', value: 'text value' },
        { content: 'text', value: 'text value' },
        { content: 'text', value: 'text value' },
    ],
};

export const topLeft = Template.bind({});
topLeft.args = {
    value: 'ListBox',
    direction: 'top left',
    items: [
        { content: 'text', value: 'text value' },
        { content: 'text', value: 'text value' },
        { content: 'text', value: 'text value' },
    ],
};

export const topRight = Template.bind({});
topRight.args = {
    value: 'ListBox',
    direction: 'top right',
    items: [
        { content: 'text', value: 'text value' },
        { content: 'text', value: 'text value' },
        { content: 'text', value: 'text value' },
    ],
};

export const bottomLeft = Template.bind({});
bottomLeft.args = {
    value: 'ListBox',
    direction: 'bottom left',
    items: [
        { content: 'text', value: 'text value' },
        { content: 'text', value: 'text value' },
        { content: 'text', value: 'text value' },
    ],
};

export const bottomRight = Template.bind({});
bottomRight.args = {
    value: 'ListBox',
    direction: 'bottom right',
    items: [
        { content: 'text', value: 'text value' },
        { content: 'text', value: 'text value' },
        { content: 'text', value: 'text value' },
    ],
};
