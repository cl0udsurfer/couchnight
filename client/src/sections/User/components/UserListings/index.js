import React, { Fragment } from 'react';
import { ProductCard } from 'lib/components';
import { List, Typography } from 'antd';

const { Paragraph, Title } = Typography;

export const UserListingsSection = ({
  userListings,
  listingsPage,
  setListingsPage,
  limit
}) => {
  const { total, result } = userListings;

  return (
    <Fragment>
      <Title level={4}>Listings</Title>
      <Paragraph>
        This section highlights the listings this user currently hosts and has
        made available for bookings.
      </Paragraph>
      <List
        grid={{
          gutter: 8,
          xs: 1,
          sm: 2,
          lg: 4
        }}
        dataSource={result}
        locale={{ emptyText: "User doesn't have any listings yet!" }}
        pagination={{
          position: 'top',
          current: listingsPage,
          total,
          defaultPageSize: limit,
          hideOnSinglePage: true,
          showLessItems: true,
          onChange: page => setListingsPage(page)
        }}
        renderItem={result => (
          <List.Item>
            <ProductCard listing={result} />
          </List.Item>
        )}
      />
    </Fragment>
  );
};
