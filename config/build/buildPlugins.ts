import HTMLWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CopyPlugin from 'copy-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { BuildOptions } from './types/config';


export function buildPlugins({ paths, isDev, apiUrl, project }: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
        new HTMLWebpackPlugin({ // упаковка HTML
            template: paths.html, // используем файл index.html, чтобы в него встраивались скрипты, появится строка "<div class="root"></div>" (DOCS: https://github.com/jantimon/html-webpack-plugin#options)
        }),

        new webpack.ProgressPlugin(), // прогресс сборки

        new MiniCssExtractPlugin({ // позволяет выносить css в отдельные модули
            filename: 'css/[name].[contenthash:8].css', // названия файлов и где они будут располагаться
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),

        new webpack.DefinePlugin({ // "прокидывание" глобальных переменных
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),

        new CopyPlugin({
            patterns: [
                { from: paths.locales, to: paths.buildLocales },    // откуда перемещаем и куда
            ],
        }),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,          // при обнаружении кольцевой зависимости в консоль будет вылетать ошибка
        }),
        new ForkTsCheckerWebpackPlugin({    // отдельный процесс проверки типов, который не влияет на скорость сборки основного кода
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: 'write-references',
            },
        }),
    ];


    if (isDev) {    // для production-сборки отключаем
        plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(new BundleAnalyzerPlugin({             // https://www.npmjs.com/package/webpack-bundle-analyzer
            openAnalyzer: false,                                   // для запуска поставить 'true'
        }));
    }

    return plugins;
}
