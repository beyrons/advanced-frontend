import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;

    const svgLoader = { // https://react-svgr.com/docs/webpack/
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    // компиляторы ts и tsx файлов (компонуем после настройки "buildBabelLoader.ts")
    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    const cssLoader = buildCssLoader(isDev);

    const fileLoader = { // // для работы с png, jpeg, gig и т.д. (в т.ч. шрифтов, добавляются через |'namefont'  https://v4.webpack.js.org/loaders/file-loader/
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    // теперь вся компиляция перекинута на babelLoader и typescriptLoader не нужен
    // const typescriptLoader = {
    //     test: /\.tsx?$/, // регулярка, отлавливающая .ts и .tsx
    //     use: 'ts-loader', // 'ts-loader' который будет использоваться для этих (.ts и .tsx) файлов
    //     exclude: /node_modules/, // исключая /node_modules из обработки
    // };

    // порядок при котором loaders возвращаются в массиве имеет значение
    return [ // загрузка лоадеров идет снизу вверх
        fileLoader,
        svgLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        // typescriptLoader,
        cssLoader,
    ];
}
