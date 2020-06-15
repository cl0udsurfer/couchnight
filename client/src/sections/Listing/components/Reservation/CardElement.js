import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

const StripeCard = () => {
  return (
    <CardElement
      hidePostalCode
      className='listing-booking-modal__stripe-card'
    />
  );
};

export default injectStripe(StripeCard);
