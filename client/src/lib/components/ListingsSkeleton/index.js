import React from 'react';
import { Card, List, Skeleton } from 'antd';

import loadingCard from './assets/loadingcard.jpg';
import { SkeletonWrapper, CardWrapper } from './ListingsSkeleton.style';

export const ListingsSkeleton = () => {
  const emptyData = [{}, {}, {}, {}, {}, {}, {}, {}];

  return (
    <SkeletonWrapper>
      <Skeleton paragraph={{ rows: 1 }} />
      <CardWrapper>
        <List
          grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            lg: 4,
          }}
          dataSource={emptyData}
          renderItem={() => (
            <List.Item>
              <Card
                cover={
                  <div
                    style={{ backgroundImage: `url(${loadingCard})` }}
                    className='listings-skeleton__card-cover-img'
                  ></div>
                }
                loading
                className='listings-skeleton__card'
              />
            </List.Item>
          )}
        />
      </CardWrapper>
    </SkeletonWrapper>
  );
};
