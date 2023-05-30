import {FC} from 'react';
import style from './Folders.module.scss';
import {FileListType} from './Folders.types';
import {Popup} from '@UI/Popup';

interface FilesListPopupProps {
  closePopup: () => void;
  files: FileListType;
}

export const FilesListPopup: FC<FilesListPopupProps> = ({files, closePopup}) => {
  return (
    <Popup closePopup={closePopup}>
      <div className={style.filesListPopup}>
        {files.map((file, index) => {
          return (
            <div key={index} className={style.filePopup}>
              <img src={file.small} alt="Image" />
            </div>
          );
        })}
      </div>
    </Popup>
  );
};
