import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/config';

// при изменении конфига, сервак перезапускать!
export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port,
        open: true,
        historyApiFallback: true, // Позволяет проксировать запросы через индекс. Иначе: ошибка 404 при обновлении страницы
        hot: true,
    };
}
