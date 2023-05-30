import {FC} from 'react';
import style from './SideBar.module.scss';
import {useTranslate} from '@/i18n';
import LogotypeIcon from '@SVG/logotype.svg';
import {CustomScrollBar} from '@UI/CustomScrollBar';
import {NavigationLinks} from '@/components/NavigationLinks';
import styleLink from '@/components/NavigationLinks/NavigationLinks.module.scss';
import LogOutIcon from '@SVG/logout.svg';

export const SideBar: FC = () => {
  const t = useTranslate();

  return (
    <div className={style.sideBar}>
      <div className={style.logotype}>
        <LogotypeIcon />
      </div>

      <CustomScrollBar onlyHideScrollBar className={style.links}>
        <nav>
          <NavigationLinks />
        </nav>
      </CustomScrollBar>
      <div>
        <a href="#" className={styleLink.link}>
          <LogOutIcon className={styleLink.linkIcon} />
          <span>{t('sidebarNavigation_link_signOut')}</span>
        </a>
      </div>
    </div>
  );
};
