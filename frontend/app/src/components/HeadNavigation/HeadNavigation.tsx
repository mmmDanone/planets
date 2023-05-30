import {FC, ChangeEvent, useState} from 'react';
import cn from 'classnames';
import style from './HeadNavigation.module.scss';
import {useSelector} from '@reduxHooks';
import {fetchExp, fetchFolder} from '@/redux/slices/user/bindActions';
import {useI18N, useTranslate} from '@/i18n';
import NotificationIcon from '@SVG/notification.svg';
import avatarUrl from './avatar.png';

export const HeadNavigation: FC = () => {
  const i18n = useI18N();
  const _ = useTranslate();

  const [isOpen, setOpen] = useState<boolean>(false);

  const user = useSelector((store) => store.user.user);

  const updateLang = (e: ChangeEvent<HTMLSelectElement>) => {
    i18n.setLang(e.target.value as 'en' | 'ua');
  };

  return (
    <div className={style.headNavigation}>
      <div>
        <select value={i18n.getLang()} onChange={updateLang} className={style.select}>
          <option value="en">EN</option>
          <option value="ua">UA</option>
        </select>
      </div>
      <div className={style.notification}>
        <NotificationIcon />
      </div>
      <div className={style.user}>
        <div>
          <div className={style.userName}>{user?.name}</div>
          <div className={style.userRole}>{user?.role}</div>
        </div>
        <div className={cn(style.avatarContainer, style.userOnline)} onClick={() => setOpen(!isOpen)}>
          <img src={avatarUrl} alt="Avatar" className={style.userAvatar} />
        </div>
        {isOpen && (
          <div className={style.controller}>
            <button onClick={fetchExp}>Add EXP</button>
            <button onClick={fetchFolder}>Add FOLDER</button>
          </div>
        )}
      </div>
    </div>
  );
};
