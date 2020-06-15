import React from 'react';

import { Typography } from 'antd';
import { Container } from 'lib/components';
import BannerWrapper, { SearchWrapper } from './HomeHero.style';
import { Searchbar } from 'sections/Layout/Header/components/';

const { Title } = Typography;

export const HomeHero = () => {
  return (
    <BannerWrapper>
      <Container>
        <SearchWrapper>
          <Title level={2}>An ideal world. If only for a night.</Title>
          <Typography.Paragraph strong>
            A cool urban vibe. A luxurious retreat. Whatever your travel style,
            our platform of hotels all over the world covers the globe and spans
            the possibilities.
          </Typography.Paragraph>
          <Searchbar />
        </SearchWrapper>
      </Container>
    </BannerWrapper>
  );
};
