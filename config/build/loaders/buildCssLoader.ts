import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildCssLoader(isDev: boolean) {
    return {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            // MiniCssExtractPlugin подключаем перед 'cssLoader'
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // MiniCssExtractPlugin используем тольков проде

            // Translates CSS into CommonJS
            { // https://webpack.js.org/loaders/css-loader/#modules
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')), // 5--11:56 App->'./*.css'
                        localIdentName: isDev // для того, чтобы в проде были сгенерированные названия, а в дев наоборот
                            ? '[path][name]__[local]--[hash:base64:5]' // названия можно генерировать по шаблонам
                            : '[hash:base64:8]', // https://webpack.js.org/loaders/css-loader/#modules
                    },
                },
            },
            // Compiles Sass to CSS
            'sass-loader',
        ],
    };
}
