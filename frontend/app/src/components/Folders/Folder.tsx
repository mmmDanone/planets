import {FC} from 'react';
import cn from 'classnames';
import style from './Folders.module.scss';

import {fetchFile} from '@/redux/slices/user/bindActions';

import {FilesList} from './FilesList';

import PlusIcon from '@SVG/plus_folder.svg';
import VerticalEllipsis from '@SVG/vertical_ellipsis.svg';

interface FolderProps {
  id: number;
  name: string;
  people: number;
  files: Array<{
    small: string;
    big: string;
  }>;
}

export const Folder: FC<FolderProps> = ({people, files, id}) => {
  return (
    <div className={style.folder}>
      <div className={style.folderHead}>
        <div className={style.icons}>
          <PlusIcon onClick={() => fetchFile(id)} />
        </div>
        <div className={style.title}>New Additions</div>
        <div className={style.icons}>
          <VerticalEllipsis />
        </div>
      </div>

      <div className={style.stats}>
        <div className={cn(style.statPoint, style.bookIcon)}>
          <span>{files.length}</span>
        </div>
        <div className={cn(style.statPoint, style.peopleIcon)}>
          <span>{people}</span>
        </div>
      </div>

      <div className={style.files}>
        <FilesList files={files} />
      </div>
    </div>
  );
};
