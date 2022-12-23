export function getQueryParams(params: OptionalRecord<string, string>) {        // параметр: значение параметра
    const searchParams = new URLSearchParams(window.location.search);           // распарсиваем строку запроса === useSearchParams()

    Object.entries(params).forEach(([name, value]) => {
        if (value !== undefined) {
            searchParams.set(name, value);                                      // сохраняем значение если value есть
        }
    });

    return `?${searchParams.toString()}`;
}

/*
    Функция добавления параметров запроса в URL
*/
export function addQueryParams(params: OptionalRecord<string, string>) {
    window.history.pushState(null, '', getQueryParams(params));                 // добавляем в строку запроса браузера
}
