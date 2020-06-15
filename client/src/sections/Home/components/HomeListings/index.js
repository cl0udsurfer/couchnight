import React from 'react';

import { List } from 'antd';
import { Heading, Container, ProductCard } from 'lib/components';

export const HomeListings = ({ loading, listings }) => {
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container fluid={true}>
      <Heading content='Premium Listings' as='h2' />

      <List
        grid={{
          gutter: 8,
          xs: 1,
          sm: 2,
          lg: 4
        }}
        dataSource={listings}
        locale={{ emptyText: 'No Listings available' }}
        renderItem={listing => (
          <List.Item>
            <ProductCard listing={listing} />
          </List.Item>
        )}
      />
    </Container>
  );
};
