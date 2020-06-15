import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll';

import { Typography } from 'antd';
import { Heading } from 'lib/components';

import DescriptionWrapper from './Description.style';

const { Text } = Typography;

export const Description = ({
  title,
  description,
  address,
  country,
  titleStyle,
}) => {
  return (
    <Element name='overview' className='overview'>
      <DescriptionWrapper>
        <Text>{`${address}, ${country}`}</Text>
        <Heading as='h2' content={title} {...titleStyle} />
        <Text>{description}</Text>
      </DescriptionWrapper>
    </Element>
  );
};

Description.propTypes = {
  titleStyle: PropTypes.object,
  locationMetaStyle: PropTypes.object,
  contentStyle: PropTypes.object,
};

Description.defaultProps = {
  titleStyle: {
    color: '#2C2C2C',
    fontSize: ['17px', '20px', '25px'],
    lineHeight: ['1.15', '1.2', '1.36'],
    mb: '4px',
  },
  locationMetaStyle: {
    fontSize: '13px',
    fontWeight: '400',
    color: '#909090',
  },
  contentStyle: {
    fontSize: '15px',
    fontWeight: '400',
    color: '#2C2C2C',
    lineHeight: '1.6',
  },
};
