import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

import { Container, Heading, ImageCard } from 'lib/components';
import GlideCarousel, { GlideSlide } from 'lib/components/GlideCarousel';

import LocationWrapper, { CarouselSection } from './HomeSlider.style';
const carouselOptions = {
  type: 'carousel',
  perView: 5,
  gap: 30,
  hoverpause: true,
  breakpoints: {
    1440: {
      perView: 5,
      gap: 20,
    },
    1200: {
      perView: 4,
    },
    991: {
      perView: 3,
      gap: 15,
    },
    667: {
      perView: 2,
      gap: 20,
    },
    480: {
      perView: 1,
      gap: 0,
    },
  },
};

const data = [
  {
    city: 'London',
    locationImage:
      'https://res.cloudinary.com/dj7nklpkt/image/upload/v1586449566/big-ben-bridge-castle-city-460672_1_plx2mu.jpg',
  },
  {
    city: 'New York',
    locationImage:
      'https://res.cloudinary.com/dj7nklpkt/image/upload/v1586448981/StockSnap_FW49S4BL9O_1_xhdxyh.jpg',
  },
  {
    city: 'Toronto',
    locationImage:
      'https://res.cloudinary.com/dj7nklpkt/image/upload/v1586449428/toronto-cityscape-935474_1_n4rckt.jpg',
  },
  {
    city: 'Los Angeles',
    locationImage:
      'https://res.cloudinary.com/dj7nklpkt/image/upload/v1586449334/red-car-on-the-road-1688186_1_dts1vf.jpg',
  },
  {
    city: 'Sydney',
    locationImage:
      'https://res.cloudinary.com/dj7nklpkt/image/upload/v1586449148/StockSnap_4AQEUP2PRE_1_jn2nve.jpg',
  },
  {
    city: 'San Francisco',
    locationImage:
      'https://res.cloudinary.com/dj7nklpkt/image/upload/v1586449451/america-architecture-bay-boat-208745_1_w7v0lz.jpg',
  },
  {
    city: 'Berlin',
    locationImage:
      'https://res.cloudinary.com/dj7nklpkt/image/upload/v1586449564/concrete-structure-2570063_1_lplvx9.jpg',
  },
];

export const HomeSlider = () => {
  return (
    <LocationWrapper>
      <Container fluid={true}>
        <Heading content='Explore Destinations' mb={3} as='h2' />

        <CarouselSection>
          <GlideCarousel
            carouselSelector='explore_carousel'
            prevButton={<IoIosArrowBack />}
            nextButton={<IoIosArrowForward />}
            options={carouselOptions}
          >
            <>
              {data.map((post, index) => (
                <GlideSlide key={index}>
                  <ImageCard
                    link={`/listings/${post.city}`}
                    imageSrc={post.locationImage}
                    title={post.city}
                  />
                </GlideSlide>
              ))}
            </>
          </GlideCarousel>
        </CarouselSection>
      </Container>
    </LocationWrapper>
  );
};
