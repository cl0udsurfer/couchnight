import React, { useState, Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Divider, Tag, Typography } from 'antd';
import { Container, Image, Heading } from 'lib/components';
import { DISCONNECT_STRIPE } from 'lib/graphql/mutations';
import {
  displayErrorMessage,
  displaySuccessNotification,
  formatListingPrice,
} from 'lib/utils';

import {
  BannerSection,
  UserInfoArea,
  ProfileImage,
  ProfileInformationArea,
  ProfileInformation,
} from '../../User.style';

const { Text, Title, Paragraph } = Typography;

const stripeAuthUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_HTFZDB9aQCBddvqd4FpLLJSsjpiI3YS8&scope=read_write`;

export const UserInfoSection = ({
  user,
  viewerIsUser,
  viewer,
  setViewer,
  handleUserRefetch,
}) => {
  const [state, setState] = useState({ stripeBtnLoading: false });

  const [disconnectStripe, { loading }] = useMutation(DISCONNECT_STRIPE, {
    onCompleted: (data) => {
      if (data && data.disconnectStripe) {
        setViewer({ ...viewer, hasWallet: data.disconnectStripe.hasWallet });
        displaySuccessNotification(
          "You've successfully disconnected from Stripe!",
          "You'll have to reconnect with Stripe to continue to create listings."
        );
        handleUserRefetch();
      }
    },
    onError: () => {
      displayErrorMessage(
        "Sorry! We weren't able to disconnect you from Stripe. Please try again later!"
      );
    },
  });

  const handleStripeButton = () => {
    setState({ ...state, stripeBtnLoading: true });
    setTimeout(() => {
      setState({ ...state, stripeBtnLoading: false });
    }, 2000);
    window.location.href = stripeAuthUrl;
  };

  return (
    <Fragment>
      <BannerSection
        style={{
          background: `url(${'https://res.cloudinary.com/dj7nklpkt/image/upload/v1586450952/brown-wooden-center-table-584399_1_au1xgk.jpg'}) center center / cover no-repeat`,
        }}
      />
      <UserInfoArea>
        <Container fluid={true}>
          <ProfileImage>
            <Image src={user.avatar} alt='Profile Pic' />
          </ProfileImage>
          <ProfileInformationArea>
            <ProfileInformation>
              <Heading content={user.name} />
              {viewerIsUser && (
                <Fragment>
                  <Divider />
                  <Title level={4}>Payment Details</Title>
                  {user.hasWallet ? (
                    <>
                      <Paragraph>
                        <Tag color='green'>Stripe Registered</Tag>
                      </Paragraph>
                      <Paragraph>
                        Income Earned:{' '}
                        <Text strong>
                          {user.income
                            ? `$${formatListingPrice(user.income)}`
                            : `$0`}
                        </Text>
                      </Paragraph>
                      <Button
                        type='primary'
                        className='user-profile__details-cta'
                        loading={loading}
                        onClick={() => disconnectStripe()}
                      >
                        Disconnect Stripe
                      </Button>
                      <Paragraph type='secondary'>
                        By disconnecting, you won't be able to receive{' '}
                        <Text strong>any further payments</Text>. This will
                        prevent users from booking listings that you might have
                        already created.
                      </Paragraph>
                    </>
                  ) : (
                    <>
                      <Paragraph strong={true}>
                        Interested in becoming a CouchNight Host? Register with
                        your Stripe account!
                      </Paragraph>
                      <div style={{ marginTop: '30px' }}>
                        <Button
                          type='primary'
                          size='large'
                          className='user-profile__details-cta'
                          onClick={handleStripeButton}
                          loading={state.stripeBtnLoading}
                        >
                          Connect with Stripe
                        </Button>
                        <div style={{ marginTop: '5px' }}>
                          <Paragraph type='secondary'>
                            CoughtNight uses Stripe to help transfer your
                            earnings in a secure and trusted manner.
                          </Paragraph>
                        </div>
                      </div>
                    </>
                  )}
                </Fragment>
              )}
            </ProfileInformation>
          </ProfileInformationArea>
        </Container>
      </UserInfoArea>
    </Fragment>
  );
};
