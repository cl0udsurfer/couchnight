import React from 'react';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';
import { Heading } from 'lib/components';
import { CtaWrapper, ParagraphWrapper, ButtonWrapper } from './HomeCta.style';

const { Paragraph } = Typography;

export const HomeCta = () => {
  return (
    <CtaWrapper>
      <Heading content='Your guide for all things rental' as='h1' />
      <ParagraphWrapper>
        <Paragraph>
          Helping you make the best decisions in renting your last minute
          locations.
        </Paragraph>
      </ParagraphWrapper>
      <ButtonWrapper>
        <Link to='/listings/united%20states'>
          Popular Listings in the United States
        </Link>
      </ButtonWrapper>
    </CtaWrapper>
  );
};
