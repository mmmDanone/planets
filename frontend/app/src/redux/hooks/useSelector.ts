import {TypedUseSelectorHook, useSelector as useSelectorDefault} from 'react-redux';
import {AppRootState} from '../store';

export const useSelector: TypedUseSelectorHook<AppRootState> = useSelectorDefault;
