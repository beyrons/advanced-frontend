export type Mods = Record<string, boolean | string | undefined>

export function classNames(cls: string, mods: Mods = {}, additional: Array<string | undefined> = []): string { // можно проще:: mods?: Mods, additional?: string[]
    return [
        cls,
        ...additional.filter(Boolean), // т.к. могут прилетать "undefined", т.к. свойство не обязательное
        ...Object.entries(mods)
            .filter(([_, value]) => Boolean(value)) // отсавляем только те элементы, где value == true
            .map(([className]) => className),
    ].join(' ');
}
