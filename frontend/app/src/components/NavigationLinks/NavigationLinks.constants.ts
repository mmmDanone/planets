import {FC, SVGProps} from 'react';

import HomeIcon from '@SVG/home.svg';
import CoursesIcon from '@SVG/courses.svg';
import LibrariesIcon from '@SVG/libraries.svg';
import StatisticsIcon from '@SVG/statistics.svg';
import UsersGuidelineIcon from '@SVG/users_guideline.svg';

interface ILinks {
  to: string;
  title: string;
  Icon?: FC<SVGProps<SVGSVGElement>>;
}

export const links: Array<Array<ILinks>> = [
  [
    {
      to: '/',
      title: 'sidebarNavigation_link_main',
      Icon: HomeIcon
    },
    {
      to: '/courses',
      title: 'sidebarNavigation_link_courses',
      Icon: CoursesIcon
    },
    {
      to: '/libraries',
      title: 'sidebarNavigation_link_libraries',
      Icon: LibrariesIcon
    },
    {
      to: '/statistics',
      title: 'sidebarNavigation_link_statistics',
      Icon: StatisticsIcon
    }
  ],
  [
    {
      to: '/users_guideline',
      title: 'sidebarNavigation_link_usersGuideline',
      Icon: UsersGuidelineIcon
    }
  ]
];
