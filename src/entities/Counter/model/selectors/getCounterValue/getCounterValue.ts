// здесь мы воспользуемся RESELECT - позволяет переиспользовать другие селекторы. Полученные значения он мемоизирует - запоминает.
// И пересчитывать значение он будет только тогда, когда изменится исходное значение (30.18-20)
// До этого он будет возвращать только сохраненное значение

// Т.е., реселекторы позволяют не только оперрировать с данными, но и мемоизировать их

import { createSelector } from '@reduxjs/toolkit';
import { getCounter } from '../getCounter/getCounter';
import { CounterSchema } from '../../types/CounterSchema';

export const getCounterValue = createSelector(
    getCounter,                                                     // берем селектор
    (counter: CounterSchema) => counter.value,                // и калбэком возвращаем его поле
);
