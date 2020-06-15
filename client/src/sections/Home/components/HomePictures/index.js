import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Container, Heading } from 'lib/components';

import { HomePicturesWrapper } from './HomePictures.style';

import sydney from '../../assets/sydney.jpg';
import sanfransisco from '../../assets/sanfrancisco.jpg';

export const HomePictures = () => {
  return (
    <HomePicturesWrapper>
      <Container fluid={true}>
        <Heading
          content='Listings of any kind'
          as='h2'
          className='homePictures__heading'
        />
        <Row gutter={12}>
          <Col xs={24} sm={12}>
            <div className='home__listings-img-cover'>
              <Link to='/listings/San%20Francisco'>
                <img src={sanfransisco} alt='' className='home__listings-img' />
              </Link>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className='home__listings-img-cover'>
              <Link to='/listings/Sydney'>
                <img src={sydney} alt='' className='home__listings-img' />
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </HomePicturesWrapper>
  );
};
