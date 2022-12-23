module.exports = {
    stories: [
        '../../src/**/*.stories.@(js|jsx|ts|tsx)', // config storybook path
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        'storybook-addon-mock/register',
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
};
