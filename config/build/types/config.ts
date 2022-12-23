// опции сборки

export type BuildMode = 'production' | 'development'

export interface BuildPaths {
    entry: string;          // путь до entry
    build: string;          // путь до папка билда
    html: string;
    src: string;
    locales: string;        // путь до файлов с переводами
    buildLocales: string;   // куда перемещаем переводы
}

export interface BuildEnv {
    mode: BuildMode;
    port: number;
    apiUrl: string;     // ожидаем поле в переменных окружения, т.е. чтобы можно было извне это поле задавать
}

export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    isDev: boolean;
    port: number;
    apiUrl: string;
    project: 'storybook' | 'frontend' | 'jest';     // для всех 3-х своя конфигурация:
        // webpack.config.ts: ...project :: 'frontend',
        // buildPlugins.ts:  __PROJECT__ :: JSON.stringify(project),
        // jest.config.ts: __PROJECT__   :: 'jest',
        // storybook/webpack.config.ts   :: __PROJECT__: JSON.stringify('storybook'),
        // Теперь есть три среды, которые по глобальной переменной, мы можем отличать и в зависимости от нужд, создавать функционал при тестировании
}
