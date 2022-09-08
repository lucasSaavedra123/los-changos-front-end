import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../assets/scss/navbar.scss';
import { IconContext } from 'react-icons';

import * as MdIcons from 'react-icons/md';

import { useAuth0 } from "@auth0/auth0-react";

function SideBar() {
  const [sidebar, setSidebar] = useState(false);
  const { logout } = useAuth0();
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar}/>
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}

            <li className={'nav-text'} onClick={() => { logout() }}>
              <Link to={'/'}>
                {<MdIcons.MdLogout />}
                <span>{'Log out'}</span>
              </Link>
            </li>

          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default SideBar;
