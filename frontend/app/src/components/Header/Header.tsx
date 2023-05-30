import {FC} from 'react';
import style from './Header.module.scss';
import {SearchInput} from '@/components/SearchInput';
import {HeadNavigation} from '@/components/HeadNavigation';

export const Header: FC = () => {
  return (
    <div className={style.head}>
      <SearchInput />
      <HeadNavigation />
    </div>
  );
};
