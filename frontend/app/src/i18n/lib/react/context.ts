import {createContext} from 'react';
import {I18N} from '../I18N';

export const I18NContext = createContext<I18N<any> | null>(null);
