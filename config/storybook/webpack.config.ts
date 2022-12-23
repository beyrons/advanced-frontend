import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import path from 'path';
import { BuildPaths } from '../build/types/config';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default ({ config }: {config: webpack.Configuration}) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
        locales: '',    // из-за того, что добавляли путь для переводов (при деплое)
        buildLocales: '',
    };

    config!.resolve!.modules!.push(paths.src);
    config!.resolve!.extensions!.push('.ts', '.tsx');
    config!.resolve!.alias = {
        ...config!.resolve!.alias,
        '@': paths.src,
    };


    // добавляем работу с svg
    // eslint-disable-next-line no-param-reassign
    // @ts-ignore
    config!.module!.rules = config!.module!.rules!.map((rule:RuleSetRule) => {  // rule:RuleSetRule -- эту часть заигнорим, т.к. в конфиге это не критично, по сравнению с бизнес-кодом
        if (/svg/.test(rule.test as string)) {  // если регулярка лоудера содержит svg (находится в buildLoaders / svgLoader)
            // вернем новый объект, в него развернем старое правило, добавив еще одно поле exclude, с помощью которого исключим файлы
            // т.е. теперь лоадер не будет обрабатывать svg
            // Проще: Находим правило и исключаем из него обработку svg
            return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
    });

    config!.module!.rules.push({  // ! -- сообщаем typescript'у, что поле не 'undefined'
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });

    // по умолчанию webpack storybook'a с css работать не умеет
    config!.module!.rules.push(buildCssLoader(true));  // true - т.к. storybook используется только на этапе разработки

    // плагин для сборки Storybook 34/41:25
    config!.plugins!.push(new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('https://testapi.ru'),
        __PROJECT__: JSON.stringify('storybook'),
    }));

    return config;
};
