import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Select } from './Select';


export default {
    title: 'shared/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Select>;


const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;


export const Primary = Template.bind({});
Primary.args = {
    label: 'this is label',
    options: [
        { value: '1', content: 'First point' },
        { value: '2', content: 'Second point' },
    ],
};
