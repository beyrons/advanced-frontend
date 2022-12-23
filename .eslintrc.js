module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'i18next',
        'react-hooks',
        'import-path-fix',
    ],
    rules: {
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        indent: [2, 4],
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }], // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
        'max-len': ['error', { code: 220, ignoreComments: true }],
        'react/react-in-jsx-scope': 'off', // https://stackoverflow.com/questions/42640636/react-must-be-in-scope-when-using-jsx-react-react-in-jsx-scope
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'off',
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'warn',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off', // нижние подчеркивания у переменных
        'i18next/no-literal-string': [
            'error', {
                markupOnly: true,    // плагин будет ругаться только на отсутствие переводов внутри jsx
                ignoreAttribute: ['data-testid', 'to', 'target', 'justify', 'align', 'direction', 'gap', 'role', 'as', 'border'],   // аттрибуты, на которые не будет рагировать i18n
            },
        ],
        'no-multi-spaces': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],    // две строки между функциями, как в питоне
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'error',  // Checks effect dependencies
        'no-param-reassign': 'off', // immerJS 30.10:25
        'no-plusplus': 'off',
        'lines-between-class-members': 'off',
        'no-undef': 'off',
        'object-curly-newline': 'off',
        'no-nested-ternary': 'off',
        'react/no-array-index-key': 'off',
        'arrow-body-style': 'off',
        'react/jsx-no-useless-fragment': 'off',
        'import-path-fix/path-check': ['error', { alias: '@' }],
    },
    globals: {
        __IS_DEV__: true, // ESLint: '__IS_DEV__' is not defined.(no-undef)
        __API__: true,
        __PROJECT__: true,
    },
    // позволяет для определенного типа файлов перопределить какие то правила
    overrides: [
        {
            // указываем регулярку, по которой будем переопределять правила
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off', // отключаем переводы в тестах
                'max-len': 'off',
            },
        },
    ],
};
