import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { NavbarSearchWrapper } from '../../Header.style';
import { Input } from 'antd';
import { displayErrorMessage } from 'lib/utils';

export const Searchbar = withRouter((props) => {
  const Search = ({ location, history }) => {
    const [search, setSearch] = useState('');

    useEffect(() => {
      const { pathname } = location;
      const pathnameSubStrings = pathname.split('/');

      if (!pathname.includes('/listings')) {
        setSearch('');
        return;
      }

      if (pathname.includes('/listings') && pathnameSubStrings.length === 3) {
        setSearch(pathnameSubStrings[2]);
        return;
      }
    }, [location]);

    const onSearch = (value) => {
      const trimmedValue = value.trim();

      if (trimmedValue) {
        history.push(`/listings/${trimmedValue}`);
      } else {
        displayErrorMessage('Please enter a valid search!');
      }
    };

    return (
      <Input.Search
        placeholder="Search 'Los Angeles, California'"
        enterButton={false}
        value={search}
        onChange={(evt) => setSearch(evt.target.value)}
        onSearch={onSearch}
      />
    );
  };

  return (
    <NavbarSearchWrapper className='navbar_search'>
      <Search {...props} />
    </NavbarSearchWrapper>
  );
});
