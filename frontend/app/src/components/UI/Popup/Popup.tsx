import {FC, ReactNode} from 'react';
import ReactDOM from 'react-dom';
import {CustomScrollBar} from '@UI/CustomScrollBar';
import style from './Popup.module.scss';

interface IPopup {
  closePopup?: () => void;
  children: ReactNode;
}

export const Popup: FC<IPopup> = ({closePopup, children}) => {
  const onClickBackdrop = () => {
    closePopup!();
  };

  return ReactDOM.createPortal(
    <div className={style.popup}>
      <CustomScrollBar className={style.popupScroll}>
        <div className={style.popupContainer}>
          <div className={style.popupContent}>
            <div className={style.popupChildren}>{children}</div>
            <div {...(closePopup && {onClick: onClickBackdrop})} className={style.popupBackdrop} />
          </div>
        </div>
      </CustomScrollBar>
    </div>,
    document.getElementById('popup')!
  );
};
