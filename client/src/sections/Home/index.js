import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import useScrollToTop from 'lib/hooks/useScrollToTop';

import {
  HomeHero,
  HomeSlider,
  HomeCta,
  HomeListings,
  HomePictures,
} from './components';
import { LISTINGS } from 'lib/graphql/queries';

const PAGE_LIMIT = 4;
const PAGE_NUMBER = 1;

const Home = () => {
  useScrollToTop();
  const { loading, data } = useQuery(LISTINGS, {
    variables: {
      filter: 'PRICE_HIGH_TO_LOW',
      limit: PAGE_LIMIT,
      page: PAGE_NUMBER,
    },
  });

  const listings = data ? data.listings.result : null;

  return (
    <>
      <HomeHero />
      <HomeSlider />
      <HomeCta />
      <HomeListings loading={loading} listings={listings} />
      <HomePictures />
    </>
  );
};

export default Home;
