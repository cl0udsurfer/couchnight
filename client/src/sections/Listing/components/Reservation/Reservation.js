import React, { Fragment } from 'react';
import { Button, DatePicker, Typography } from 'antd';
import moment from 'moment';
import { displayErrorMessage } from 'lib/utils';
import PropTypes from 'prop-types';

import { Card, Heading, TextLink } from 'lib/components';
import { formatListingPrice } from 'lib/utils';

import { FormActionArea, DatePickerArea } from './Reservation.style';

const { Paragraph, Text } = Typography;

const CardHeader = ({
  priceStyle,
  pricePeriodStyle,
  linkStyle,
  listing,
  host,
}) => {
  return (
    <Fragment>
      <Heading
        content={
          <Fragment>
            {formatListingPrice(listing.price, false)} / Night
            <Text as='span' content=' / night' {...pricePeriodStyle} />
          </Fragment>
        }
        {...priceStyle}
      />
      <TextLink
        link={`/user/${host.id}`}
        content='Contact Host'
        {...linkStyle}
      />
    </Fragment>
  );
};

const ReservationForm = ({
  viewer,
  listing,
  host,
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
  setBookingsModal,
}) => {
  const disabledDate = (currentDate) => {
    if (currentDate) {
      const dateIsBeforeEndOfDay = currentDate.isBefore(moment().endOf('day'));

      return dateIsBeforeEndOfDay;
    } else {
      return false;
    }
  };

  const verifyAndSetCheckOutDate = (selectedCheckOutDate) => {
    if (checkInDate && selectedCheckOutDate) {
      if (moment(selectedCheckOutDate).isBefore(checkInDate, 'days')) {
        return displayErrorMessage(
          `You can't book date of check out to be prior to check in!`
        );
      }
    }

    setCheckOutDate(selectedCheckOutDate);
  };

  const viewerIsHost = viewer.id === listing.host.id;
  const checkInInputDisabled =
    !viewer.id || viewerIsHost || !listing.host.hasWallet;
  const checkOutInputDisabled = checkInInputDisabled || !checkInDate;
  const buttonDisabled = checkOutInputDisabled || !checkInDate || !checkOutDate;

  let buttonMessage = "You won't be charged yet";
  if (!viewer.id) {
    buttonMessage = 'You have to be signed in to book a listing!';
  } else if (viewerIsHost) {
    buttonMessage = "You can't book your own listing!";
  } else if (!listing.host.hasWallet) {
    buttonMessage =
      "The host has disconnected from Stripe and thus won't be able to receive payments!";
  }

  return (
    <>
      <DatePickerArea>
        <Paragraph strong>Check In</Paragraph>
        <DatePicker
          value={checkInDate ? checkInDate : undefined}
          format={'YYYY/MM/DD'}
          showToday={false}
          disabledDate={disabledDate}
          onChange={(dateValue) => setCheckInDate(dateValue)}
          onOpenChange={() => setCheckOutDate(null)}
          className='antdDatePicker'
        />
      </DatePickerArea>
      <DatePickerArea>
        <Paragraph strong>Check Out</Paragraph>
        <DatePicker
          value={checkOutDate ? checkOutDate : undefined}
          format={'YYYY/MM/DD'}
          showToday={false}
          disabled={checkOutInputDisabled}
          disabledDate={disabledDate}
          onChange={(dateValue) => verifyAndSetCheckOutDate(dateValue)}
        />
      </DatePickerArea>
      <FormActionArea>
        <Button
          disabled={buttonDisabled}
          onClick={() => setBookingsModal(true)}
          size='large'
          type='primary'
        >
          Request to book!
        </Button>
        <div>
          <Text type='secondary' mark>
            {buttonMessage}
          </Text>
        </div>
      </FormActionArea>
    </>
  );
};

const Reservation = ({
  viewer,
  listing,
  host,
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
  setBookingsModal,
}) => {
  return (
    <Card
      className='reservation_sidebar'
      header={<CardHeader listing={listing} host={host} />}
      content={
        <ReservationForm
          viewer={viewer}
          listing={listing}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          setCheckInDate={setCheckInDate}
          setCheckOutDate={setCheckOutDate}
          setBookingsModal={setBookingsModal}
        />
      }
    />
  );
};

CardHeader.propTypes = {
  priceStyle: PropTypes.object,
  pricePeriodStyle: PropTypes.object,
  linkStyle: PropTypes.object,
};

CardHeader.defaultProps = {
  priceStyle: {
    color: '#2C2C2C',
    fontSize: '25px',
    fontWeight: '700',
  },
  pricePeriodStyle: {
    fontSize: '15px',
    fontWeight: '400',
  },
  linkStyle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#008489',
  },
};

export default Reservation;
