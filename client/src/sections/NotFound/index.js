import React from 'react';
import { Image, Heading, TextLink } from 'lib/components';
import NotFoundWrapper, { ContentWrapper } from './NotFound.style';

import Image404 from './assets/404.png';

const NotFound = ({ staticContext = {} }) => {
  staticContext.status = 404;
  return (
    <NotFoundWrapper>
      <ContentWrapper>
        <Image src={Image404} alt='404' />
        <Heading as='h2' content='Page Not Found :(' />
        <TextLink link='/' content='Go Back' />
      </ContentWrapper>
    </NotFoundWrapper>
  );
};

export default NotFound;
