export type ScrollSchema = Record<string, number>   // <Адрес траницы, позиция скрола>

export interface ScrollRestoreSchema {
    scroll: ScrollSchema;
}
