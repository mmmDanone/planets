import {FC} from 'react';
import style from './SearchInput.module.scss';
import {useTranslate} from '@/i18n';
import SearchIcon from '@SVG/search.svg';

export const SearchInput: FC = () => {
  const t = useTranslate();

  return (
    <div className={style.inputContainer}>
      <input type="text" placeholder={t('header_search')} className={style.input} />
      <SearchIcon className={style.icon} />
    </div>
  );
};
