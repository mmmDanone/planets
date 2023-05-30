import {FC} from 'react';
import style from './ProgressInformation.module.scss';
import {useSelector} from '@reduxHooks';
import {UserLevelProfile} from '@/components/UserLevelProfile';
import {LevelPlanetGallery} from '@/components/LevelPlanetGallery';
import {ProgressTemplate} from '@/components/ProgressTemplate';

import CategoryIcon from '@SVG/category.svg';
import FolderIcon from '@SVG/folder.svg';
import UsersGuidelineIcon from '@SVG/users_guideline_w.svg';

export const ProgressInformation: FC = () => {
  const countFile = useSelector((store) => store.user.user?.foldersList.length);

  return (
    <div className={style.progressInformation}>
      <UserLevelProfile />
      <div className={style.leftSide}>
        <div className={style.planetGallery}>
          <LevelPlanetGallery />
        </div>
        <div className={style.progressContainer}>
          <ProgressTemplate completed={3} total={15} title="Courses completed" Icon={CategoryIcon} />
          <ProgressTemplate completed={countFile || 0} total={15} title="Folders add" Icon={FolderIcon} />
          <ProgressTemplate completed={3} total={19} title="Books read" Icon={UsersGuidelineIcon} />
        </div>
      </div>
    </div>
  );
};
