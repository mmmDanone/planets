import {FC} from 'react';
import style from './LevelPlanetGallery.module.scss';
import {useTranslate} from '@/i18n';
import {useSelector} from '@reduxHooks';
import {planets} from './LevelPlanetGallery.constants';
import astronaut from '@/assets/raster/astronaut.png';
import {LevelProgressIndicator} from '@/components/LevelProgressIndicator';

export const LevelPlanetGallery: FC = () => {
  const t = useTranslate();
  const exp = useSelector((store) => store.user.user?.experience);
  const level = Math.ceil((exp || 0) / 1000);
  const expLevel = (exp || 0) % 1000;

  return (
    <div className={style.bg}>
      <div className={style.planetsList} style={{right: level > 3 ? `${(level - 3) * (25 + 130)}px` : '0px'}}>
        {planets.map((planet, index) => {
          return (
            <div key={planet} className={style.planet}>
              <img src={planet} alt={`Planet ${index + 1}`} className={style.planetImage} />
              {index + 1 == level && <img src={astronaut} alt="Astronaut" className={style.astronaut} />}
              {index + 1 == level && (
                <LevelProgressIndicator size={130} percent={(expLevel / 1000) * 100} className={style.levelIndicator} />
              )}
            </div>
          );
        })}
      </div>
      <div className={style.levelProgress}>
        {t('levelProfile_levelCompleted', {
          percent: Math.floor((expLevel / 1000) * 100)
        })}
      </div>
    </div>
  );
};
