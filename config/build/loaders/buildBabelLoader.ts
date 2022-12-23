import { BuildOptions } from '../types/config';
import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin';


interface BuildBabelLoaderProps extends BuildOptions {
    isTsx?: boolean;
}

export function buildBabelLoader({ isTsx  }: BuildBabelLoaderProps) {
    return {
        test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    [
                        // данный лоадер не умеет в рантайме проверять типы. Проверку выносим в отдельный процесс - ForkTsCheckerWebpackPlugin
                        '@babel/plugin-transform-typescript',
                        {
                            isTsx,  // https://babeljs.io/docs/en/babel-plugin-transform-typescript#istsx
                        },
                    ],
                    '@babel/plugin-transform-runtime',  // позволяет повторно использовать внедренный вспомогательный код Babel
                    isTsx && [
                        babelRemovePropsPlugin,
                        {
                            props: ['data-testid'],
                        },
                    ],
                ].filter(Boolean),
            },
        },
    };
}
