import {FC} from 'react';
import style from './Folders.module.scss';
import {useSelector} from '@reduxHooks';
import {Folder} from './Folder';

export const FoldersList: FC = () => {
  const tempFolders = useSelector((store) => store.user.user?.foldersList);

  return (
    <div className={style.foldersList}>
      {tempFolders?.map((folder, index) => {
        return (
          <div key={index} className={style.folderContainer}>
            <Folder {...folder} />
          </div>
        );
      })}
    </div>
  );
};
