import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

import { LOGIN_PAGE } from 'lib/settings/constants';

export const AuthMenu = ({ className }) => {
  return (
    <Menu className={className}>
      <Menu.Item key='1'>
        <Link to={LOGIN_PAGE}>Sign in</Link>
      </Menu.Item>
    </Menu>
  );
};
