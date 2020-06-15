import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

export const MainMenu = ({ className }) => {
  return (
    <Menu className={className}>
      <Menu.Item key='0'>
        <NavLink exact to={`/`}>
          Home
        </NavLink>
      </Menu.Item>
      <Menu.Item key='1'>
        <NavLink exact to={`/listings`}>
          Listings
        </NavLink>
      </Menu.Item>
      <Menu.Item key='2'>
        <NavLink to={`/host`}>Host</NavLink>
      </Menu.Item>
    </Menu>
  );
};
