import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): ResolveOptions { // все пути находятся на уровне опций
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,                           // абсолютные пути в приоритете
        modules: [options.paths.src, 'node_modules'],   // https://webpack.js.org/concepts/module-resolution/
        mainFiles: ['index'],
        alias: {
            '@': options.paths.src,                     // добавляем алиасы к абсолютному импорту (исправляем последующие ошибки с помощью ts-morph)
        },
    };
}
