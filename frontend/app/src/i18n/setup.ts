import {I18N, useTranslate as useTranslateBase, useI18N as useI18NBase} from './lib';
import {pluralizeEn, pluralizeUa} from './plurals';
import en from './keys/en';

const timeout = <T>(timeout: number) => {
  return (value: T) => {
    return new Promise<T>((res) => {
      setTimeout(() => res(value), timeout);
    });
  };
};

//const loadEN = () => import('./keys/en').then((module) => module.default).then(timeout(1500));
const loadUA = () => import('./keys/ua').then((module) => module.default).then(timeout(1500));

export const i18n = new I18N({
  defaultLang: 'en',
  languages: {
    en: {
      keyset: en,
      pluralize: pluralizeEn
    },
    ua: {
      keyset: loadUA,
      pluralize: pluralizeUa
    }
  }
});

export const useTranslate = useTranslateBase<typeof i18n>;
export const useI18N = useI18NBase<typeof i18n>;
