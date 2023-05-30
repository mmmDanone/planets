import {FC} from 'react';
import style from './UserLevelProfile.module.scss';
import {useTranslate} from '@/i18n';
import {useSelector} from '@reduxHooks';
import {LevelProgressIndicator} from '@/components/LevelProgressIndicator';
import greeting from '@/assets/raster/greeting.png';
import {planets} from '@/components/LevelPlanetGallery/LevelPlanetGallery.constants';

export const UserLevelProfile: FC = () => {
  const t = useTranslate();
  const user = useSelector((store) => store.user.user);
  const level = Math.ceil((user?.experience || 0) / 1000);
  const exp = (user?.experience || 0) % 1000;

  return (
    <div className={style.userLevelProfile}>
      <div className={style.greeting}>
        <h3 className={style.greetingHeader}>{t('levelProfile_greetingUser', {name: user?.name || ''})}</h3>
        <img src={greeting} alt="Greeting" className={style.image} />
      </div>
      <p className={style.description}>{t('levelProfile_description')}</p>

      <div className={style.levelContainer}>
        <img src={planets[level - 1]} alt="Planet 4" className={style.imgLevel} />
        <div className={style.level}>
          <div className={style.levelCount}>{level}</div>
          <div className={style.levelTitle}>{t('levelProfile_level')}</div>
        </div>
        <LevelProgressIndicator size={200} percent={(exp / 1000) * 100} className={style.levelIndicator} />
      </div>

      <span className={style.description}>
        {t('levelProfile_toNextLevel', {
          percent: 100 - Math.floor((exp / 1000) * 100)
        })}
      </span>
    </div>
  );
};
