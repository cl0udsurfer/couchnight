import React, { useState, useRef, useEffect, Fragment } from 'react';
import Sticky from 'react-stickynode';
import { useQuery } from '@apollo/react-hooks';
import { Checkbox, Select } from 'antd';
import useScrollToTop from 'lib/hooks/useScrollToTop';

import ListingWrapper, {
  PostsWrapper,
  ShowMapCheckbox,
} from './Listings.style';

import { ListingsList, Toolbar, ListingsMap } from './components';
import { ErrorBanner, Heading, ListingsSkeleton } from 'lib/components';

import useWindowSize from 'lib/hooks/useWindowSize';
import { LISTINGS } from 'lib/graphql/queries';

const PAGE_LIMIT = 8;

const Listings = ({ match }) => {
  useScrollToTop();

  const [filter, setFilter] = useState('PRICE_LOW_TO_HIGH');
  const [page, setPage] = useState(1);
  const [map, setMap] = useState(false);
  const locationRef = useRef(match.params.location);
  const { width } = useWindowSize();

  const { loading, data, error } = useQuery(LISTINGS, {
    skip: locationRef.current !== match.params.location && page !== 1,
    variables: {
      location: match.params.location,
      filter,
      limit: PAGE_LIMIT,
      page,
    },
  });

  useEffect(() => {
    setPage(1);
    setMap(false);
    locationRef.current = match.params.location;
  }, [match.params.location]);

  const listings = data ? data.listings : null;
  const listingsRegion = listings ? listings.region : null;

  const handleMapToggle = () => {
    setMap((map) => !map);
  };

  if (loading) {
    return <ListingsSkeleton />;
  }

  if (error) {
    return (
      <ErrorBanner description="We either couldn't find anything matching your search or have encountered an error. If you're searching for a unique location, try searching again with more common keywords." />
    );
  }

  return (
    <ListingWrapper>
      <Sticky top={82} innerZ={999} activeClass='isHeaderSticky'>
        <Toolbar
          left={
            <Select value={filter} onChange={(filter) => setFilter(filter)}>
              <Select.Option value={'PRICE_LOW_TO_HIGH'}>
                Price: Low to High
              </Select.Option>
              <Select.Option value={'PRICE_HIGH_TO_LOW'}>
                Price: High to Low
              </Select.Option>
            </Select>
          }
          right={
            <ShowMapCheckbox>
              <Checkbox defaultChecked={false} onChange={handleMapToggle}>
                Show map
              </Checkbox>
            </ShowMapCheckbox>
          }
        />
      </Sticky>
      <Fragment>
        <PostsWrapper className={width > 767 && map ? 'col-12' : 'col-24'}>
          {listingsRegion ? (
            <Heading
              content={`${listings.total} Results for "${listingsRegion}"`}
            />
          ) : null}
          <ListingsList
            listings={listings}
            map={map}
            page={page}
            total={listings.total}
            limit={listings.limit}
            setPage={setPage}
          />
        </PostsWrapper>
        {map && <ListingsMap listings={listings} />}
      </Fragment>
    </ListingWrapper>
  );
};

export default Listings;
