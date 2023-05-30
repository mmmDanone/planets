import React from 'react';

interface IScrollBarInit {
  onlyHideScrollBar?: boolean;
  parentElement: HTMLDivElement;
  scrollElement: HTMLDivElement;
  trackElementY: HTMLDivElement;
  thumbElementY: HTMLDivElement;
  trackElementX: HTMLDivElement;
  thumbElementX: HTMLDivElement;
}

export class ScrollBar {
  private onlyHideScrollBar?: boolean;
  private parentElement!: HTMLDivElement;
  private scrollElement!: HTMLDivElement;
  private trackElementY!: HTMLDivElement;
  private thumbElementY!: HTMLDivElement;
  private trackElementX!: HTMLDivElement;
  private thumbElementX!: HTMLDivElement;

  private parentWidth!: number;
  private parentHeight!: number;
  private scrollWidth!: number;
  private scrollHeight!: number;
  private maxScrollY!: number;
  private maxScrollX!: number;
  private trackRangeY!: number;
  private trackRangeX!: number;
  private maxShiftY!: number;
  private maxShiftX!: number;
  private currentShiftThumbY!: number;
  private currentShiftThumbX!: number;
  private isPointerMoveY = false;
  private isPointerMoveX = false;
  private isNeedScrollBarY!: boolean;
  private isNeedScrollBarX!: boolean;
  private startPointerPositionY!: number;
  private startPointerPositionX!: number;

  private axis!: 'y' | 'x';

  private requestId!: number;

  public init({
    onlyHideScrollBar,
    parentElement,
    scrollElement,
    trackElementY,
    thumbElementY,
    trackElementX,
    thumbElementX
  }: IScrollBarInit): ScrollBar {
    this.onlyHideScrollBar = onlyHideScrollBar;
    this.parentElement = parentElement;
    this.scrollElement = scrollElement;
    this.trackElementY = trackElementY;
    this.thumbElementY = thumbElementY;
    this.trackElementX = trackElementX;
    this.thumbElementX = thumbElementX;

    return this;
  }

  private validationShiftY(shiftY: number): number {
    if (shiftY < 0) {
      return 0;
    } else if (shiftY > this.maxShiftY) {
      return this.maxShiftY;
    }
    return shiftY;
  }

  private validationShiftX(shiftX: number): number {
    if (shiftX < 0) {
      return 0;
    } else if (shiftX > this.maxShiftX) {
      return this.maxShiftX;
    }
    return shiftX;
  }

  private calcSizesTrackY(): void {
    const parentHeight = this.parentHeight;
    const trackY = this.trackElementY;
    const trackStyleY = getComputedStyle(trackY);
    const trackPaddingTopY = parseInt(trackStyleY.paddingTop);
    const trackPaddingBottomY = parseInt(trackStyleY.paddingBottom);
    const trackTopY = parseInt(trackStyleY.top);

    if (this.isNeedScrollBarX) {
      const trackX = this.trackElementX;
      const trackStyleX = getComputedStyle(trackX);
      const trackHeightX = parseInt(trackStyleX.height);
      const trackBottomX = parseInt(trackStyleX.bottom);
      const trackHeightY = parentHeight - trackTopY - trackHeightX - trackBottomX;

      trackY.style.height = trackHeightY + 'px';
      this.trackRangeY = trackHeightY - trackPaddingTopY - trackPaddingBottomY;
    } else {
      const trackHeightY = parentHeight - trackTopY * 2;

      trackY.style.height = trackHeightY + 'px';
      this.trackRangeY = trackHeightY - trackPaddingTopY - trackPaddingBottomY;
    }
  }

  private calcSizesThumbY(): void {
    const thumbY = this.thumbElementY;
    const thumbStyleY = getComputedStyle(thumbY);
    const thumbMinHeightY = parseInt(thumbStyleY.minHeight);
    const trackRangeY = this.trackRangeY;
    const scrollElement = this.scrollElement;

    const thumbHeightY =
      (this.parentHeight! / scrollElement.scrollHeight) * trackRangeY >= thumbMinHeightY
        ? (this.parentHeight! / scrollElement.scrollHeight) * trackRangeY
        : thumbMinHeightY;
    thumbY.style.height = thumbHeightY + 'px';
    this.maxShiftY = this.trackRangeY! - thumbHeightY;
  }

  private calcSizesTrackX(): void {
    const parentWidth = this.parentWidth;
    const trackX = this.trackElementX;
    const trackStyleX = getComputedStyle(trackX);
    const trackPaddingLeftX = parseInt(trackStyleX.paddingLeft);
    const trackPaddingRightX = parseInt(trackStyleX.paddingRight);
    const trackLeftX = parseInt(trackStyleX.left);

    if (this.isNeedScrollBarY) {
      const trackY = this.trackElementY;
      const trackStyleY = getComputedStyle(trackY);
      const trackWidthY = parseInt(trackStyleY.width);
      const trackRightY = parseInt(trackStyleY.right);
      const trackWidthX = parentWidth - trackLeftX - trackWidthY - trackRightY;

      trackX.style.width = trackWidthX + 'px';
      this.trackRangeX = trackWidthX - trackPaddingLeftX - trackPaddingRightX;
    } else {
      const trackWidthX = parentWidth - trackLeftX * 2;

      trackX.style.width = trackWidthX + 'px';
      this.trackRangeX = trackWidthX - trackPaddingLeftX - trackPaddingRightX;
    }
  }

  private calcSizesThumbX(): void {
    const thumbX = this.thumbElementX;
    const thumbStyleX = getComputedStyle(thumbX);
    const thumbMinWidthX = parseInt(thumbStyleX.minWidth);
    const trackRangeX = this.trackRangeX;
    const scrollElement = this.scrollElement;

    const thumbWidthX =
      (this.parentWidth! / scrollElement.scrollWidth) * trackRangeX >= thumbMinWidthX
        ? (this.parentWidth! / scrollElement.scrollWidth) * trackRangeX
        : thumbMinWidthX;
    thumbX.style.width = thumbWidthX + 'px';
    this.maxShiftX = this.trackRangeX - thumbWidthX;
  }

  public calcSizes(): void {
    const parent = this.parentElement;
    const parentRect = parent.getBoundingClientRect();
    this.parentWidth = parentRect.width;
    this.parentHeight = parentRect.height;
    const scrollElement = this.scrollElement;
    const trackY = this.trackElementY;
    const trackX = this.trackElementX;

    this.scrollHeight = scrollElement.scrollHeight;
    this.scrollWidth = scrollElement.scrollWidth;

    const maxScrollY = this.scrollHeight - scrollElement.clientHeight;
    const maxScrollX = this.scrollWidth - scrollElement.clientWidth;

    const isNeedScrollBarY = (this.isNeedScrollBarY = !!maxScrollY);
    const isNeedScrollBarX = (this.isNeedScrollBarX = !!maxScrollX);
    if (!isNeedScrollBarY) {
      trackY.style.display = 'none';
    } else {
      trackY.style.display = 'block';
    }
    if (!isNeedScrollBarX) {
      trackX.style.display = 'none';
    } else {
      trackX.style.display = 'block';
    }
    if (!isNeedScrollBarY && !isNeedScrollBarX) return;

    this.maxScrollY = maxScrollY;
    this.maxScrollX = maxScrollX;

    if (isNeedScrollBarY) {
      this.calcSizesTrackY();
      this.calcSizesThumbY();
    }

    if (isNeedScrollBarX) {
      this.calcSizesTrackX();
      this.calcSizesThumbX();
    }

    this.moveThumbs();
  }

  private moveThumbs(): void {
    if (this.isNeedScrollBarY && !this.isPointerMoveY) {
      const currentPositionY = this.scrollElement.scrollTop / this.maxScrollY;
      const thumbY = this.thumbElementY;
      this.currentShiftThumbY = this.maxShiftY * currentPositionY;
      thumbY.style.marginTop = this.currentShiftThumbY + 'px';
    }
    if (this.isNeedScrollBarX && !this.isPointerMoveX) {
      const currentPositionX = this.scrollElement.scrollLeft / this.maxScrollX;
      const thumbX = this.thumbElementX;
      this.currentShiftThumbX = this.maxShiftX * currentPositionX;
      thumbX.style.marginLeft = this.currentShiftThumbX + 'px';
    }
  }

  public checkSizes = (): void => {
    const parentRect = this.parentElement.getBoundingClientRect();
    const content = this.scrollElement;
    if (
      content.scrollWidth !== this.scrollWidth ||
      content.scrollHeight !== this.scrollHeight ||
      parentRect.width !== this.parentWidth ||
      parentRect.height !== this.parentHeight
    ) {
      this.calcSizes();
    }
    this.requestId = requestAnimationFrame(this.checkSizes);
  };

  public disableCheckSizes(): void {
    cancelAnimationFrame(this.requestId);
  }

  public onScroll = (): void => {
    !this.onlyHideScrollBar && this.moveThumbs();
  };

  private addWindowMoseEvents() {
    window.addEventListener('mousemove', this.onWindowMouseMove);
    window.addEventListener('mouseup', this.onWindowMouseUp);
  }

  private removeWindowMoseEvents() {
    window.removeEventListener('mousemove', this.onWindowMouseMove);
    window.removeEventListener('mouseup', this.onWindowMouseUp);
  }

  private addWindowTouchEvents() {
    window.addEventListener('touchmove', this.onTouchMoveWindow, {
      capture: true,
      passive: false
    });
    window.addEventListener('touchend', this.onTouchEndWindow, {
      capture: true,
      passive: false
    });
    window.addEventListener('touchcancel', this.onTouchEndWindow, {
      capture: true,
      passive: false
    });
  }

  private removeWindowTouchEvents() {
    window.removeEventListener('touchmove', this.onTouchMoveWindow, {
      capture: true
    });
    window.removeEventListener('touchend', this.onTouchEndWindow, {
      capture: true
    });
    window.removeEventListener('touchcancel', this.onTouchEndWindow, {
      capture: true
    });
  }

  public scrollTo(x: number, y: number): void {
    if (this.scrollElement.scrollTo) {
      this.scrollElement.scrollTo(x, y);
    } else {
      this.scrollElement.scrollLeft = x;
      this.scrollElement.scrollTop = y;
    }
  }

  public onMouseDownTrackY = (event: React.MouseEvent<HTMLDivElement>): void => {
    const coordinatesClick = event.nativeEvent.offsetY;
    //const scrollY = this.maxScrollY * (coordinatesClick / currentTargetRect.height);
    const scrollY = this.maxScrollY * (coordinatesClick / this.trackRangeY);
    this.scrollTo(this.scrollElement.scrollLeft, scrollY);
    this.moveThumbs();
    this.onStartY(event.clientY);
    this.addWindowMoseEvents();
  };

  public onMouseDownTrackX = (event: React.MouseEvent<HTMLDivElement>): void => {
    const coordinatesClick = event.nativeEvent.offsetX;
    //const scrollY = this.maxScrollY * (coordinatesClick / currentTargetRect.height);
    const scrollX = this.maxScrollX * (coordinatesClick / this.trackRangeX);
    this.scrollTo(scrollX, this.scrollElement.scrollTop);
    this.moveThumbs();
    this.onStartX(event.clientX);
    this.addWindowMoseEvents();
  };

  private onEnd = (pointerPosition: number): void => {
    if (this.axis === 'y') {
      this.isPointerMoveY = false;
      const moveY = pointerPosition - this.startPointerPositionY;
      this.currentShiftThumbY = this.validationShiftY(this.currentShiftThumbY + moveY);
    }

    if (this.axis === 'x') {
      this.isPointerMoveX = false;
      const moveX = pointerPosition - this.startPointerPositionX;
      this.currentShiftThumbX = this.validationShiftX(this.currentShiftThumbX + moveX);
    }
  };

  private onMove = (pointerPosition: number): void => {
    if (this.axis === 'y') {
      const moveY = pointerPosition - this.startPointerPositionY;
      const shiftY = this.validationShiftY(this.currentShiftThumbY + moveY);
      const passedY = shiftY / this.maxShiftY;

      const child = this.scrollElement;
      this.scrollTo(child.scrollLeft, this.maxScrollY * passedY);

      this.thumbElementY.style.marginTop = shiftY + 'px';
    }

    if (this.axis === 'x') {
      const moveX = pointerPosition - this.startPointerPositionX;
      const shiftX = this.validationShiftX(this.currentShiftThumbX + moveX);
      const passedX = shiftX / this.maxShiftX;

      const child = this.scrollElement;
      this.scrollTo(this.maxScrollX * passedX, child.scrollTop);

      this.thumbElementX.style.marginLeft = shiftX + 'px';
    }
  };

  private onStartY = (pointerPositionY: number): void => {
    this.isPointerMoveY = true;
    this.axis = 'y';
    this.startPointerPositionY = pointerPositionY;
  };

  private onStartX = (pointerPositionX: number): void => {
    this.isPointerMoveX = true;
    this.axis = 'x';
    this.startPointerPositionX = pointerPositionX;
  };

  private onWindowMouseMove = (event: MouseEvent): void => {
    this.axis === 'y' && this.onMove(event.clientY);
    this.axis === 'x' && this.onMove(event.clientX);
  };

  private onWindowMouseUp = (event: MouseEvent): void => {
    this.axis === 'y' && this.onEnd(event.clientY);
    this.axis === 'x' && this.onEnd(event.clientX);
    this.removeWindowMoseEvents();
  };

  private onTouchMoveWindow = (event: TouchEvent): void => {
    if (event.changedTouches.length === 1) {
      event.preventDefault();
      const touch = event.changedTouches[0];

      this.axis === 'y' && this.onMove(touch.clientY);
      this.axis === 'x' && this.onMove(touch.clientX);
    }
  };

  private onTouchEndWindow = (event: TouchEvent) => {
    if (event.changedTouches.length === 1) {
      event.preventDefault();
      const touch = event.changedTouches[0];
      this.axis === 'y' && this.onEnd(touch.clientY);
      this.axis === 'x' && this.onEnd(touch.clientX);
    }

    this.removeWindowTouchEvents();
  };

  public onTouchStartTrackY = (event: TouchEvent): void => {
    if (event.changedTouches.length === 1) {
      event.preventDefault();
      event.stopPropagation();
      const touch = event.changedTouches[0];
      const currentTargetRect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();

      const coordinatesClick = touch.pageY - currentTargetRect.top;
      const scrollY = this.maxScrollY * (coordinatesClick / this.trackRangeY);
      this.scrollTo(this.scrollElement.scrollLeft, scrollY);
      this.moveThumbs();
      this.onStartY(touch.clientY);
      this.addWindowTouchEvents();
    }
  };

  public onTouchStartTrackX = (event: TouchEvent): void => {
    if (event.changedTouches.length === 1) {
      event.preventDefault();
      event.stopPropagation();
      const touch = event.changedTouches[0];
      const currentTargetRect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();

      const coordinatesClick = touch.pageX - currentTargetRect.left;
      const scrollX = this.maxScrollX * (coordinatesClick / this.trackRangeX);
      this.scrollTo(scrollX, this.scrollElement.scrollTop);
      this.moveThumbs();
      this.onStartX(touch.clientX);
      this.addWindowTouchEvents();
    }
  };

  public onMouseDownY = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    this.onStartY(event.clientY);
    this.addWindowMoseEvents();
  };

  public onTouchStartY = (event: TouchEvent): void => {
    if (event.changedTouches.length === 1) {
      event.preventDefault();
      event.stopPropagation();
      const touch = event.changedTouches[0];
      this.onStartY(touch.clientY);
      this.addWindowTouchEvents();
    }
  };

  public onMouseDownX = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.onStartX(event.clientX);
    this.addWindowMoseEvents();
  };

  public onTouchStartX = (event: TouchEvent): void => {
    if (event.changedTouches.length === 1) {
      event.preventDefault();
      event.stopPropagation();
      const touch = event.changedTouches[0];
      this.onStartX(touch.clientX);
      this.addWindowTouchEvents();
    }
  };
}
