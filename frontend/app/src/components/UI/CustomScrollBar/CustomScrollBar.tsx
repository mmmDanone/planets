import React, {useLayoutEffect, useRef} from 'react';
import {ScrollBar} from './ScrollBar';
import cn from 'classnames';
import style from './CustomScrollBar.module.scss';

interface ICustomScrollBar {
  onlyHideScrollBar?: boolean;
}

export const CustomScrollBar = React.forwardRef<HTMLDivElement, ICustomScrollBar & React.HTMLProps<HTMLDivElement>>(
  ({onlyHideScrollBar, children, ...props}, ref: React.Ref<HTMLDivElement>) => {
    const scrollBarRef = useRef<ScrollBar>(new ScrollBar());
    const scrollBar = scrollBarRef.current;
    const customScrollBar = useRef<HTMLDivElement>(null);
    const customScrollBarContent = useRef<HTMLDivElement>(null);
    const customScrollBarTrackY = useRef<HTMLDivElement>(null);
    const customScrollBarThumbY = useRef<HTMLDivElement>(null);
    const customScrollBarTrackX = useRef<HTMLDivElement>(null);
    const customScrollBarThumbX = useRef<HTMLDivElement>(null);

    const declareRef = (refDiv: HTMLInputElement | null) => {
      (customScrollBar as React.MutableRefObject<HTMLDivElement | null>).current = refDiv;
      if (typeof ref === 'function') {
        ref(refDiv);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = refDiv;
      }
    };

    useLayoutEffect(() => {
      const parent = customScrollBar.current!;
      const child = customScrollBarContent.current!;

      const differenceWidth = child.offsetWidth - child.clientWidth;
      const differenceHeight = child.offsetHeight - child.clientHeight;
      if (differenceWidth > 0) {
        child.style.width = child.offsetWidth + differenceWidth + 'px';
      }
      if (differenceHeight > 0) {
        child.style.height = child.offsetHeight + differenceHeight + 'px';
      }

      if (parent.scrollTo) {
        parent.scrollTo(0, 0);
      } else {
        parent.scrollTop = 0;
        parent.scrollLeft = 0;
      }
    }); //hide default scrollBar

    useLayoutEffect(() => {
      !onlyHideScrollBar &&
        scrollBar
          .init({
            onlyHideScrollBar,
            parentElement: customScrollBar.current!,
            scrollElement: customScrollBarContent.current!,
            trackElementY: customScrollBarTrackY.current!,
            thumbElementY: customScrollBarThumbY.current!,
            trackElementX: customScrollBarTrackX.current!,
            thumbElementX: customScrollBarThumbX.current!
          })
          .calcSizes();
    }, [onlyHideScrollBar]);

    useLayoutEffect(() => {
      if (!onlyHideScrollBar) {
        scrollBar.checkSizes();
        return () => {
          scrollBar.disableCheckSizes();
        };
      }
    }, [onlyHideScrollBar]);

    useLayoutEffect(() => {
      if (!onlyHideScrollBar) {
        const trackY = customScrollBarTrackY.current!;
        const trackX = customScrollBarTrackX.current!;
        const thumbY = customScrollBarThumbY.current!;
        const thumbX = customScrollBarThumbX.current!;

        trackY.addEventListener('touchstart', scrollBar.onTouchStartTrackY, {passive: false});
        trackX.addEventListener('touchstart', scrollBar.onTouchStartTrackX, {passive: false});
        thumbY.addEventListener('touchstart', scrollBar.onTouchStartY, {
          capture: true,
          passive: false
        });
        thumbX.addEventListener('touchstart', scrollBar.onTouchStartX, {
          capture: true,
          passive: false
        });

        return () => {
          trackY.removeEventListener('touchstart', scrollBar.onTouchStartTrackY);
          trackX.removeEventListener('touchstart', scrollBar.onTouchStartTrackX);
          thumbY.removeEventListener('touchstart', scrollBar.onTouchStartY, {
            capture: true
          });
          thumbX.removeEventListener('touchstart', scrollBar.onTouchStartX, {
            capture: true
          });
        };
      }
      //customScrollBarThumbY;
      //customScrollBarThumbX
    }, [onlyHideScrollBar]);

    const classNamesScrollBar = cn(style.customScrollBar, props.className);

    return (
      <div ref={declareRef} className={classNamesScrollBar}>
        <div ref={customScrollBarContent} className={style.customScrollBarContent} onScroll={scrollBar.onScroll}>
          {children}
        </div>
        {!onlyHideScrollBar && (
          <>
            <div
              onMouseDown={scrollBar.onMouseDownTrackY}
              ref={customScrollBarTrackY}
              className={`${style.customScrollBarTrack} ${style.customScrollBarTrackY}`}
            >
              <div
                onMouseDownCapture={scrollBar.onMouseDownY}
                ref={customScrollBarThumbY}
                className={`${style.customScrollBarThumb} ${style.customScrollBarThumbY}`}
              />
            </div>
            <div
              onMouseDown={scrollBar.onMouseDownTrackX}
              ref={customScrollBarTrackX}
              className={`${style.customScrollBarTrack} ${style.customScrollBarTrackX}`}
            >
              <div
                onMouseDownCapture={scrollBar.onMouseDownX}
                ref={customScrollBarThumbX}
                className={`${style.customScrollBarThumb} ${style.customScrollBarThumbX}`}
              />
            </div>
          </>
        )}
      </div>
    );
  }
);
