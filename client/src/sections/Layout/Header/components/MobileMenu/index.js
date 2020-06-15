import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

export const MobileMenu = ({ className, viewer, logOutRef }) => {
  return (
    <Menu className={className}>
      <Menu.Item key='0'>
        <NavLink exact to='/'>
          Home
        </NavLink>
      </Menu.Item>
      <Menu.Item key='1'>
        <NavLink exact to='/listings'>
          Listings
        </NavLink>
      </Menu.Item>
      <Menu.Item key='2'>
        <NavLink to='/host'>Host</NavLink>
      </Menu.Item>
      {viewer.id && viewer.avatar && (
        <Menu.Item key='3'>
          <button onClick={logOutRef}>Log Out</button>
        </Menu.Item>
      )}
    </Menu>
  );
};
