import {FC} from 'react';
import style from './Main.module.scss';
import {ProgressInformation} from '@/components/ProgressInformation';
import {FoldersList} from '@/components/Folders';

export const Main: FC = () => {
  return (
    <div className={style.main}>
      <ProgressInformation />
      <FoldersList />
    </div>
  );
};
