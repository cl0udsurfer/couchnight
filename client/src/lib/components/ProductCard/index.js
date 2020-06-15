import React from 'react';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';

import { TextLink, GridCard } from 'lib/components';
import { formatListingPrice } from 'lib/utils';

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 1,
    paritialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    paritialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};

export const ProductCard = ({ listing }) => {
  const { id, title, address, country, price, image } = listing;

  const location = { address, country };

  return (
    <GridCard
      isCarousel={true}
      location={location}
      title={<TextLink link={`/listing/${id}`} content={title} />}
      price={`${formatListingPrice(price, false)}/Night`}
    >
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        containerClass='container'
        dotListClass=''
        draggable
        focusOnSelect={false}
        infinite
        itemClass=''
        renderDotsOutside={false}
        responsive={responsive}
        showDots={true}
        sliderClass=''
        slidesToSlide={1}
      >
        {image.map(({ url }, index) => (
          <Link to={`/listing/${id}`}>
            <img
              src={url}
              alt={title}
              key={index}
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'relative',
              }}
            />
          </Link>
        ))}
      </Carousel>
    </GridCard>
  );
};
