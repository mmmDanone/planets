import {FC} from 'react';
import style from './Layout.module.scss';
import {Outlet} from 'react-router-dom';
import {PageSuspense} from '@UI/PageSuspense';
import {CustomScrollBar} from '@UI/CustomScrollBar';
import {SideBar} from '@/components/SideBar';
import {Header} from '@/components/Header';

export const Layout: FC = () => {
  return (
    <div className={style.layout}>
      <div className={style.sideBar}>
        <SideBar />
      </div>
      <div className={style.main}>
        <div className={style.header}>
          <Header />
        </div>
        <CustomScrollBar className={style.content}>
          <PageSuspense>
            <Outlet />
          </PageSuspense>
        </CustomScrollBar>
      </div>
    </div>
  );
};
