import {FC, ReactNode, Suspense} from 'react';

interface PageSuspenseProps {
  children: ReactNode;
}

export const PageSuspense: FC<PageSuspenseProps> = ({children}) => {
  return <Suspense fallback={<h2>Page is Loading...</h2>}>{children}</Suspense>;
};
