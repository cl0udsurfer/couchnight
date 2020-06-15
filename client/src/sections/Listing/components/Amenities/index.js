import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll';

import { Heading, IconCard } from 'lib/components';
import { FaWifi, FaCarAlt, FaSwimmer, FaAirFreshener } from 'react-icons/fa';
import AmenitiesWrapper, { AmenitiesArea } from './Amenities.style';

export const Amenities = ({ titleStyle, wifi, parking, pool, airCon }) => {
  return (
    <Element name='amenities' className='Amenities'>
      <AmenitiesWrapper>
        <Heading as='h2' content='Amenities' {...titleStyle} />
        <AmenitiesArea>
          {wifi && <IconCard icon={<FaWifi />} title='Free Wifi' />}
          {parking && <IconCard icon={<FaCarAlt />} title='Free Parking' />}
          {pool && <IconCard icon={<FaSwimmer />} title='Free Pool' />}
          {airCon && (
            <IconCard icon={<FaAirFreshener />} title='Air Conditioner' />
          )}
        </AmenitiesArea>
      </AmenitiesWrapper>
    </Element>
  );
};

Amenities.propTypes = {
  titleStyle: PropTypes.object,
  linkStyle: PropTypes.object
};

Amenities.defaultProps = {
  titleStyle: {
    color: '#2C2C2C',
    fontSize: ['17px', '20px', '25px'],
    lineHeight: ['1.15', '1.2', '1.36'],
    mb: ['14px', '20px', '30px']
  },
  linkStyle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#008489'
  }
};
