import {FC, SVGProps} from 'react';
import style from './ProgressTemplate.module.scss';
import {LevelProgressIndicator} from '@/components/LevelProgressIndicator';

interface ProgressTemplateProps {
  completed: number;
  total: number;
  title: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
}

export const ProgressTemplate: FC<ProgressTemplateProps> = ({completed, total, title, Icon}) => {
  return (
    <div className={style.progressTemplate}>
      <div className={style.progressIndicator}>
        <Icon className={style.icon} />
        <LevelProgressIndicator size={64} percent={(completed / total) * 100} withoutPoint />
      </div>
      <div>
        <div className={style.count}>
          <span className={style.completed}>{completed}</span>
          <span>{` / ${total}`}</span>
        </div>
        <div className={style.title}>{title}</div>
      </div>
    </div>
  );
};
