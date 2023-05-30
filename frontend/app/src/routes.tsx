import {lazy} from 'react';
import {createBrowserRouter, createHashRouter} from 'react-router-dom';

import {ProvidersLoader} from './ProvidersLoader';

// const Example = lazy(() => import(/*webpackChunkName: 'example'*/ '@/pages/Example'));
const Example = lazy(() => import(/*webpackChunkName: 'example'*/ '@/pages/Main'));

const routes = createHashRouter([
  {
    element: <ProvidersLoader />,
    children: [
      {
        path: '/',
        element: <Example />
      },
      {
        path: '/courses',
        element: <h1>Coming soon 1!</h1>
      },
      {
        path: '/libraries',
        element: <h1>Coming soon 2!</h1>
      },
      {
        path: '/statistics',
        element: <h1>Coming soon 3!</h1>
      },
      {
        path: '/users_guideline',
        element: <h1>Coming soon 4!</h1>
      },
      {
        path: '*',
        element: <h1>404 Not Found</h1>
      }
    ]
  }
]);

export default routes;
