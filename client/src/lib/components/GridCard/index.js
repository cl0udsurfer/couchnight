import React from 'react';
import PropTypes from 'prop-types';
import GridCardWrapper, {
  ImageWrapper,
  ContentWrapper,
  LocationArea,
  TitleArea,
  PriceArea,
  MetaWrapper,
} from './GridCard.style';

export const GridCard = ({ location, title, price, children }) => {
  const { address, country } = location;
  return (
    <GridCardWrapper>
      <ImageWrapper className='media_wrapper'>{children}</ImageWrapper>
      <ContentWrapper className='content_wrapper'>
        {location && <LocationArea>{`${address}, ${country}`}</LocationArea>}
        {title && <TitleArea>{title}</TitleArea>}
        <MetaWrapper className='meta_wrapper'>
          {price && <PriceArea className='price'>{price}</PriceArea>}
        </MetaWrapper>
      </ContentWrapper>
    </GridCardWrapper>
  );
};

GridCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  price: PropTypes.string,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  location: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
