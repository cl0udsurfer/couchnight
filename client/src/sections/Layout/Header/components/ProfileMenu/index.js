import React, { useState, useRef } from 'react';
import { Menu } from 'antd';
import useOnClickOutside from 'lib/hooks/useOnClickOutside';
import { Link } from 'react-router-dom';

export const ProfileMenu = ({ avatar, logOutRef, viewerId }) => {
  const [state, setState] = useState(false);

  const handleDropdown = () => {
    setState(!state);
  };

  const closeDropdown = () => {
    setState(false);
  };

  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setState(false));

  return (
    <div className='avatar-dropdown' ref={dropdownRef}>
      <div className='dropdown-handler' onClick={handleDropdown}>
        {avatar}
      </div>

      <Menu className={`dropdown-menu ${state ? 'active' : 'hide'}`}>
        <Menu.Item onClick={closeDropdown} key='0'>
          <Link to={`/user/${viewerId}`}>View Profile</Link>
        </Menu.Item>
        <Menu.Item key='3'>
          <button onClick={logOutRef}>Log Out</button>
        </Menu.Item>
      </Menu>
    </div>
  );
};
