import React from 'react';

import { Map } from 'lib/components';
import { FixedMap } from '../../Listings.style';

export const ListingsMap = ({ listings }) => {
  return (
    <FixedMap>
      <Map location={listings.location} listings={listings.result} />
    </FixedMap>
  );
};
