import React from 'react';
import Sticky from 'react-stickynode';

import { ScrollBar } from 'lib/components';
import { TobBarWrapper } from '../../Listing.style';

const topBarMenu = [
  {
    name: 'Overview',
    target: 'overview',
  },
  {
    name: 'Amenities',
    target: 'amenities',
  },
  {
    name: 'Location',
    target: 'location',
  },
];

export const TopBar = () => {
  return (
    <TobBarWrapper>
      <Sticky innerZ={9999} top={80} activeClass='isSticky'>
        <ScrollBar menu={topBarMenu} />
      </Sticky>
    </TobBarWrapper>
  );
};
