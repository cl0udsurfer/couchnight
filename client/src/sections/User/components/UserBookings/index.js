// TO DO: CHECK IN AND CHECK OUT INTERNAL CARD COMPONENT!
import React, { Fragment } from 'react';
import { List, Typography } from 'antd';
import { ProductCard } from 'lib/components';

const { Paragraph, Title } = Typography;

export const UserBookingsSection = ({
  userBookings,
  bookingsPage,
  setBookingsPage,
  limit,
  viewerIsUser,
}) => {
  const total = 0; // userBookings ? userBookings.total : null;
  const result = []; // userBookings ? userBookings.result : null;

  if (!viewerIsUser) {
    return <h1>You are not allowed to access this page</h1>;
  }

  return (
    <Fragment>
      <Title level={4}>Bookings</Title>
      <Paragraph>
        This section highlights the bookings you've made, and the
        check-in/check-out dates associated with said bookings.
      </Paragraph>
      <List
        grid={{
          gutter: 8,
          xs: 1,
          sm: 2,
          lg: 4,
        }}
        dataSource={result}
        locale={{ emptyText: "You haven't made any bookings!" }}
        pagination={{
          position: 'top',
          current: bookingsPage,
          total,
          defaultPageSize: limit,
          hideOnSinglePage: true,
          showLessItems: true,
          onChange: (page) => setBookingsPage(page),
        }}
        renderItem={(result) => (
          <List.Item>
            <ProductCard listing={result} />
          </List.Item>
        )}
      />
    </Fragment>
  );
};
