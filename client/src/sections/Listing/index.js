import React, { Fragment, useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Sticky from 'react-stickynode';
import { Button, Modal, Row, Col } from 'antd';
import { AuthContext } from 'lib/context/AuthProvider';

import { Container, PageSkeleton, ErrorBanner } from 'lib/components';
import SinglePageWrapper, { PostImage } from './Listing.style';
import {
  Gallery,
  TopBar,
  Description,
  Amenities,
  Location,
} from './components';
import Reservation from './components/Reservation/Reservation';
import BottomReservation from './components/Reservation/BottomReservation';
import CreateBookingModal from './components/Reservation/CreateBookingModal';

import { LISTING } from 'lib/graphql/queries';

import useWindowSize from 'lib/hooks/useWindowSize';
import useScrollToTop from 'lib/hooks/useScrollToTop';

const PAGE_LIMIT = 3;

const Listing = ({ match }) => {
  useScrollToTop();

  const { viewer } = useContext(AuthContext);
  const [bookingsPage, setBookingsPage] = useState(1);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [bookingModal, setBookingsModal] = useState(false);
  const [modal, setModal] = useState(false);
  const { width } = useWindowSize();

  const { loading, data, error, refetch } = useQuery(LISTING, {
    variables: {
      id: match.params.id,
      bookingsPage,
      limit: PAGE_LIMIT,
    },
  });

  const listing = data ? data.listing : null;
  const host = data ? data.listing.host : null;

  if (loading) {
    return <PageSkeleton />;
  }

  if (error) {
    return (
      <Fragment>
        <ErrorBanner description="This listing may not exist or we've encountered an error. Please try again soon!" />
        <PageSkeleton />
      </Fragment>
    );
  }

  const clearBookingData = () => {
    setBookingsModal(false);
    setCheckInDate(null);
    setCheckOutDate(null);
    setBookingsPage(1);
  };

  const handleListingRefetch = async () => {
    await refetch();
  };

  const listingCreateBookingModalElement =
    listing && checkInDate && checkOutDate ? (
      <CreateBookingModal
        id={listing.id}
        price={listing.price}
        modalVisible={bookingModal}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        setModalVisible={setBookingsModal}
        clearBookingData={clearBookingData}
        handleListingRefetch={handleListingRefetch}
      />
    ) : null;

  return (
    <SinglePageWrapper>
      <PostImage {...listing}>
        <Button
          type='primary'
          onClick={() => setModal(true)}
          className='image_gallery_button'
        >
          View Photos
        </Button>

        {listingCreateBookingModalElement}

        <Modal
          visible={modal}
          centered
          onCancel={() => setModal(false)}
          footer={null}
          maskStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          }}
          wrapClassName='image_gallery_modal'
          closable={false}
        >
          <Fragment>
            <Gallery image={listing.image} />
            <Button
              onClick={() => setModal(false)}
              className='image_gallery_close'
            >
              <svg width='16.004' height='16' viewBox='0 0 16.004 16'>
                <path
                  id='_ionicons_svg_ios-close_2_'
                  d='M170.4,168.55l5.716-5.716a1.339,1.339,0,1,0-1.894-1.894l-5.716,5.716-5.716-5.716a1.339,1.339,0,1,0-1.894,1.894l5.716,5.716-5.716,5.716a1.339,1.339,0,0,0,1.894,1.894l5.716-5.716,5.716,5.716a1.339,1.339,0,0,0,1.894-1.894Z'
                  transform='translate(-160.5 -160.55)'
                  fill='#909090'
                />
              </svg>
            </Button>
          </Fragment>
        </Modal>
      </PostImage>

      <TopBar />

      <Container>
        <Row gutter={30} id='reviewSection' style={{ marginTop: 30 }}>
          <Col xl={16}>
            <Description
              description={listing.description}
              title={listing.title}
              country={listing.country}
              address={listing.address}
            />
            <Amenities
              wifi={listing.wifi}
              parking={listing.parking}
              pool={listing.pool}
              airCon={listing.airCon}
            />
            <Location
              address={listing.address}
              city={listing.city}
              state={listing.state}
              country={listing.country}
              location={listing.location}
            />
          </Col>
          <Col xl={8}>
            {width > 1200 ? (
              <Sticky innerZ={999} activeClass='isSticky' top={202}>
                <Reservation
                  viewer={viewer}
                  host={host}
                  listing={listing}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  setCheckInDate={setCheckInDate}
                  setCheckOutDate={setCheckOutDate}
                  setBookingsModal={setBookingsModal}
                />
              </Sticky>
            ) : (
              <BottomReservation
                viewer={viewer}
                listing={listing}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                setCheckInDate={setCheckInDate}
                setCheckOutDate={setCheckOutDate}
                setBookingsModal={setBookingsModal}
              />
            )}
          </Col>
        </Row>
      </Container>
    </SinglePageWrapper>
  );
};

export default Listing;
