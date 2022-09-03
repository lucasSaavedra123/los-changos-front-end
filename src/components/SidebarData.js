import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';

/*

Icons info can be found here:

https://react-icons.github.io/react-icons

*/

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome style={{ fill: 'black' }} />,
    cName: 'nav-text'
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <FiIcons.FiSettings style={{ borderColor: 'black' }}/>,
    cName: 'nav-text'
  }
];