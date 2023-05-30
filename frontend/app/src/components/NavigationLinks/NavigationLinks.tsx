import {FC, Fragment} from 'react';
import cn from 'classnames';
import style from './NavigationLinks.module.scss';
import {useTranslate} from '@/i18n';
import PointIcon from '@SVG/point.svg';
import {NavLink} from 'react-router-dom';
import {links} from './NavigationLinks.constants';

export const NavigationLinks: FC = () => {
  const t = useTranslate();
  return (
    <Fragment>
      {links.map((linksGroup, index) => {
        return (
          <Fragment key={index}>
            <ul className={style.listLinks}>
              {linksGroup.map((link) => {
                const {to, title, Icon} = link;
                return (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={to === '/'}
                      className={({isActive}) => cn(style.link, isActive && style.linkActive)}
                    >
                      {Icon ? <Icon className={style.linkIcon} /> : <PointIcon className={style.linkIcon} />}
                      {/*TODO: Do not doing that*/}
                      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                      {/*// @ts-ignore*/}
                      <span>{t(title)}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            {index < links.length - 1 && <hr className={style.separator} />}
          </Fragment>
        );
      })}
    </Fragment>
  );
};
