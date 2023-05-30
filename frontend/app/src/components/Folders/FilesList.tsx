import {FC, ReactElement, useState} from 'react';
import {FileListType} from './Folders.types';
import style from './Folders.module.scss';
import {FilesListPopup} from './FilesListPopup';

interface FilesListProps {
  files: FileListType;
}

export const FilesList: FC<FilesListProps> = ({files}) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const endIteration = files.length > 3 ? 3 : files.length;

  if (files.length == 0) return <div>Void</div>;

  return (
    <div className={style.styleList}>
      {(() => {
        const previewFiles: Array<ReactElement> = [];

        for (let i = 0; i < endIteration; i++) {
          previewFiles.push(
            <div key={i} className={style.file}>
              <img src={files[i].small} alt="Image" />
              {files.length > 3 && i == 2 && (
                <div onClick={() => setOpen(true)} className={style.additionalFiles}>
                  +{files.length - 3}
                </div>
              )}
            </div>
          );
        }

        return previewFiles;
      })()}
      {isOpen && (
        <FilesListPopup
          files={files}
          closePopup={() => {
            setOpen(false);
          }}
        />
      )}
    </div>
  );
};
