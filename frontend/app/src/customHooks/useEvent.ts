import {useRef, useLayoutEffect, useCallback} from 'react';

type callbackType = (...args: Array<any>) => any;

interface useEventOverload {
  <TF extends callbackType>(callback: TF): TF;
  <TF extends callbackType>(callback: TF): any;
}

export const useEvent: useEventOverload = (callback) => {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback((...args: any) => {
    return callbackRef.current(...args);
  }, []);
};
