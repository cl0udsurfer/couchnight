import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { List, Pagination, Typography } from 'antd';
import { ProductCard } from 'lib/components';

const { Text, Paragraph } = Typography;

export const ListingsList = ({
  listings,
  map,
  page,
  total,
  limit,
  setPage,
}) => {
  return (
    <Fragment>
      {listings && listings.result.length ? (
        <Fragment>
          {!map ? (
            <List
              grid={{
                gutter: 8,
                xs: 1,
                sm: 2,
                lg: 4,
              }}
              dataSource={listings.result}
              renderItem={(listing) => (
                <List.Item>
                  <ProductCard listing={listing} key={listing.id} />
                </List.Item>
              )}
            />
          ) : (
            <List
              grid={{
                gutter: 8,
                xs: 1,
                sm: 2,
                lg: 2,
              }}
              dataSource={listings.result}
              renderItem={(listing) => (
                <List.Item>
                  <ProductCard listing={listing} key={listing.id} />
                </List.Item>
              )}
            />
          )}
          <Pagination
            current={page}
            total={total}
            defaultPageSize={limit}
            hideOnSinglePage
            showLessItems
            onChange={(page) => setPage(page)}
          />
        </Fragment>
      ) : (
        <div>
          <Paragraph>
            It appears that no listings have yet been created for{' '}
            <Text mark>"{listings.region}"</Text>
          </Paragraph>
          <Paragraph>
            Be the first person to create a{' '}
            <Link to='/host'>listing in this area</Link>!
          </Paragraph>
        </div>
      )}
    </Fragment>
  );
};
