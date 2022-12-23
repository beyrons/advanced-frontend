// переносим сюда всю конфигурацию проекта

import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { paths, mode, isDev } = options;

    return {
        mode,
        entry: paths.entry, // enter point
        output: { // где будет билд-файл
            filename: '[name].[contenthash].js', // имя билд-файла (по умолчанию 'main'); contenthash -- для решения проблемы с кешированием
            path: paths.build, // place location build-file
            clean: true, // очистка лишних файлов после сборки
            publicPath: '/',
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'inline-source-map' : undefined, // убираем source-map при запуске 'build:prod'
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}
