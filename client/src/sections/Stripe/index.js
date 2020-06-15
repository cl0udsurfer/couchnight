import React, { useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { CONNECT_STRIPE } from 'lib/graphql/mutations';
import { displaySuccessNotification } from 'lib/utils';
import { LoadingSpin } from 'lib/components';

const Stripe = ({ history, viewer, setViewer }) => {
  const [connectStripe, { data, loading, error }] = useMutation(
    CONNECT_STRIPE,
    {
      onCompleted: (data) => {
        if (data && data.connectStripe) {
          setViewer({ ...viewer, hasWallet: data.connectStripe.hasWallet });

          displaySuccessNotification(
            "You've successfully connected your Stripe Account!",
            'You can now begin to create listings in the Host page.'
          );
        }
      },
    }
  );

  const connectStripeRef = useRef(connectStripe);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      connectStripeRef.current({
        variables: {
          input: { code },
        },
      });
    } else {
      history.replace('/login');
    }
  }, [history]);

  if (data && data.connectStripe) {
    return <Redirect to={`/user/${viewer.id}`} />;
  }

  if (loading) {
    return <LoadingSpin message='Connecting your Stripe account...' />;
  }

  if (error) {
    return <Redirect to={`/user/${viewer.id}?stripe_error=true`} />;
  }

  return null;
};

export default Stripe;
