import {FC} from 'react';
import style from './Loader.module.scss';

export const Loader: FC = () => {
  return (
    <div className={style.bg}>
      <div className={style.loader} />
    </div>
  );
};
