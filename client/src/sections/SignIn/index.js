import React, { useState, useContext, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { Button, Col, Row } from 'antd';

import { ErrorBanner, LoadingSpin, Logo } from 'lib/components';
import { AuthContext } from 'lib/context/AuthProvider';
import { displaySuccessNotification } from 'lib/utils';
import { LOG_IN } from 'lib/graphql/mutations';
import { AUTH_URL } from 'lib/graphql/queries';
import useScrollToTop from 'lib/hooks/useScrollToTop';

import couchNight from 'lib/assets/brand/logo_transparent.png';

import SignInWrapper, {
  Title,
  TitleInfo,
  SignInFormWrapper,
  SignInBannerWrapper,
  LogoWrapper,
} from './Signin.style';

const imageBg =
  'https://res.cloudinary.com/dj7nklpkt/image/upload/v1586448495/StockSnap_GCZ32Y9RLS_1_irurbq.jpg';

const SignIn = () => {
  useScrollToTop();

  const client = useApolloClient();
  const { viewer, setViewer } = useContext(AuthContext);

  const [state, setState] = useState({
    googleBtnLoading: false,
  });

  const [
    logIn,
    { data: logInData, loading: logInLoading, error: logInError },
  ] = useMutation(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn);
        sessionStorage.setItem('token', data.logIn.token);
        displaySuccessNotification("You've successfully logged in!");
      }
    },
  });

  const handleAuth = async () => {
    setState({ ...state, googleBtnLoading: true });
    setTimeout(() => {
      setState({ ...state, googleBtnLoading: false });
    }, 2000);
    try {
      const { data } = await client.query({
        query: AUTH_URL,
      });
      window.location.href = data.authUrl;
    } catch {
      // Display Error Message!
    }
  };

  const logInRef = useRef(logIn);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      logInRef.current({
        variables: {
          input: { code },
        },
      });
    }
  }, []);

  if (viewer.id && viewer.avatar) {
    return <Redirect to={`/user/${viewer.id}`} />;
  }

  if (logInLoading) {
    return <LoadingSpin message={'Logging you in...'} />;
  }

  if (logInData && logInData.logIn) {
    const { id: viewerId } = logInData.logIn;
    return <Redirect to={`/user/${viewerId}`} />;
  }

  const logInErrorBannerElement = logInError ? (
    <ErrorBanner description="Sorry! We weren't able to log you in. Please try again later!" />
  ) : null;

  return (
    <SignInWrapper>
      {logInErrorBannerElement}
      <SignInFormWrapper>
        <LogoWrapper>
          <Logo withLink linkTo='/' src={couchNight} title='CouchNight' />
        </LogoWrapper>
        <Title>Welcome Back</Title>
        <TitleInfo>Please log into your account</TitleInfo>

        <Row gutter={16} style={{ marginBottom: '37px' }}>
          <Col span={12}>
            <Button
              loading={state.googleBtnLoading}
              className='google-btn'
              type='primary'
              style={{ width: '100%', marginBottom: 16 }}
              size='large'
              onClick={handleAuth}
            >
              Sign In with Google
            </Button>
          </Col>
        </Row>
      </SignInFormWrapper>

      <SignInBannerWrapper>
        <div
          style={{
            backgroundImage: `url(${imageBg})`,
            backgroundPosition: 'center center',
            height: '100vh',
            backgroundSize: 'cover',
          }}
        />
      </SignInBannerWrapper>
    </SignInWrapper>
  );
};

export default SignIn;
