// https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/StoreProvider';

export const useAppDispatch: () => AppDispatch = useDispatch;
// export consts useAppDispatch: () => useDispatch<AppDispatch>();
