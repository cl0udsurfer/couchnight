import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';

import { Button, Modal } from 'antd';
import { BookingSticky } from 'lib/components';
import { formatListingPrice } from 'lib/utils';

import Reservation from './Reservation';

const BottomReservation = ({
  viewer,
  listing,
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
  setBookingsModal,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <BookingSticky
        title={listing.title}
        price={formatListingPrice(listing.price, false)}
        action={
          <Button type='primary' onClick={() => setVisible(true)}>
            Book
          </Button>
        }
      />

      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        maskStyle={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
        wrapClassName='reservation_modal'
        closable={false}
      >
        <Reservation
          viewer={viewer}
          listing={listing}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          setCheckInDate={setCheckInDate}
          setCheckOutDate={setCheckOutDate}
          setBookingsModal={setBookingsModal}
        />
        <Button onClick={() => setVisible(false)} className='close'>
          <IoIosClose />
        </Button>
      </Modal>
    </>
  );
};

export default BottomReservation;
