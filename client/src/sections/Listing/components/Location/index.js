import React from 'react';
import { Element } from 'react-scroll';
import { Heading, Map } from 'lib/components';
import { Text } from '../../Listing.style';
import LocationWrapper, { MapWrapper } from './Location.style';

export const Location = ({
  address,
  city,
  state,
  country,
  location,
  titleStyle,
}) => {
  return (
    <Element name='location' className='location'>
      <LocationWrapper>
        <Heading as='h2' content='Location' {...titleStyle} />
        <Text>{`${address}, ${city}, ${state}, ${country}`}</Text>
        <MapWrapper>
          <Map location={location} />
        </MapWrapper>
      </LocationWrapper>
    </Element>
  );
};
