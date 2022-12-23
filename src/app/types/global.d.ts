declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

// решение проблемы импорта svg-файлов
// https://github.com/gregberge/svgr/issues/546
declare module '*.svg' {
    import React from 'react';

    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'

declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __PROJECT__: 'storybook' | 'frontend' | 'jest';

// DeepPartial подразумевает, что все поля становятся необязательными, чтобы была возможность
// задавать только те поля, которые нужны для тестирования
// Мы использовали DeepPartial, который есть по умолчанию в Redux. Вместо будем использовать кастомный
// (заменив DeepPartial в StoreDecorator)
// https://stackoverflow.com/questions/61132262/typescript-deep-partial 40-06:30:
type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;


// создаем свой тип по образу "Record". По сути тот же Record, но с необязательными полями:
type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};
