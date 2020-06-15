import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

import { HOME_PAGE, HOST_PAGE } from 'lib/settings/constants';

export const FooterMenu = () => {
  return (
    <Menu>
      <Menu.Item key='0'>
        <NavLink to={`${HOME_PAGE}`}>Home</NavLink>
      </Menu.Item>
      <Menu.Item key='1'>
        <NavLink to={`/listings`}>Listings</NavLink>
      </Menu.Item>
      <Menu.Item key='2'>
        <NavLink to={`${HOST_PAGE}`}>Host</NavLink>
      </Menu.Item>
    </Menu>
  );
};
