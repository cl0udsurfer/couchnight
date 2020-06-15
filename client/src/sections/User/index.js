import React, { useContext, Fragment, useState } from 'react';
import { Route, NavLink, Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { IoIosAdd } from 'react-icons/io';
import { Menu } from 'antd';

import { AuthContext } from 'lib/context/AuthProvider';
import { USER } from 'lib/graphql/queries';
import { Container, PageSkeleton, ErrorBanner } from 'lib/components';
import useScrollToTop from 'lib/hooks/useScrollToTop';

import {
  UserBookingsSection,
  UserListingsSection,
  UserContactSection,
  UserInfoSection,
} from './components';

import AgentDetailsPage, { NavigationArea } from './User.style';

const UserNavigation = ({ viewerIsUser, match }) => {
  return (
    <NavigationArea>
      <Menu>
        <Menu.Item key='0'>
          <NavLink exact to={`${match.url}`}>
            Listings
          </NavLink>
        </Menu.Item>
        {viewerIsUser ? (
          <Menu.Item key='1'>
            <NavLink to={`${match.url}${'/bookings'}`}>Bookings</NavLink>
          </Menu.Item>
        ) : (
          <Menu.Item key='1'>
            <NavLink to={`${match.url}${'/contact'}`}>Contact</NavLink>
          </Menu.Item>
        )}
      </Menu>

      {viewerIsUser && (
        <Link className='add_card' to='/host'>
          <IoIosAdd /> Host
        </Link>
      )}
    </NavigationArea>
  );
};

const UserRoute = ({
  match,
  userListings,
  userBookings,
  listingsPage,
  setListingsPage,
  bookingsPage,
  setBookingsPage,
  viewerIsUser,
  limit,
  user,
}) => {
  return (
    <Container fluid={true}>
      <Route
        exact
        path={`${match.path}`}
        render={(props) => (
          <UserListingsSection
            userListings={userListings}
            listingsPage={listingsPage}
            setListingsPage={setListingsPage}
            limit={limit}
            {...props}
          />
        )}
      />
      <Route
        path={`${match.path}${'/bookings'}`}
        render={(props) => (
          <UserBookingsSection
            userBookings={userBookings}
            bookingsPage={bookingsPage}
            setBookingsPage={setBookingsPage}
            viewerIsUser={viewerIsUser}
            limit={limit}
            {...props}
          />
        )}
      />
      <Route
        path={`${match.path}${'/contact'}`}
        render={(props) => (
          <UserContactSection user={user} viewerIsUser={viewerIsUser} />
        )}
      />
    </Container>
  );
};

const PAGE_LIMIT = 8;

const User = (props) => {
  useScrollToTop();

  const { viewer, setViewer } = useContext(AuthContext);
  const [listingsPage, setListingsPage] = useState(1);
  const [bookingsPage, setBookingsPage] = useState(1);

  const { data, loading, error, refetch } = useQuery(USER, {
    variables: {
      id: props.match.params.id,
      bookingsPage,
      listingsPage,
      limit: PAGE_LIMIT,
    },
  });

  const handleUserRefetch = async () => {
    await refetch();
  };

  const user = data ? data.user : null;
  const viewerIsUser = viewer.id === props.match.params.id;

  const userListings = user ? user.listings : null;
  const userBookings = user ? user.bookings : null;

  const stripeError = new URL(window.location.href).searchParams.get(
    'stripe_error'
  );
  const stripeErrorBanner = stripeError ? (
    <ErrorBanner description='We had an issue connecting with Stripe. Please try again soon.' />
  ) : null;

  if (loading) {
    return <PageSkeleton />;
  }

  if (error) {
    return (
      <Fragment>
        <ErrorBanner description="This user may not exist or we've encountered an error. Please try again soon." />
        <PageSkeleton />
      </Fragment>
    );
  }

  return (
    <AgentDetailsPage>
      {stripeErrorBanner}
      <UserInfoSection
        user={user}
        viewerIsUser={viewerIsUser}
        viewer={viewer}
        setViewer={setViewer}
        handleUserRefetch={handleUserRefetch}
      />
      <Fragment>
        <UserNavigation user={user} viewerIsUser={viewerIsUser} {...props} />
        <UserRoute
          user={user}
          userListings={userListings}
          userBookings={userBookings}
          listingsPage={listingsPage}
          setListingsPage={setListingsPage}
          bookingsPage={bookingsPage}
          setBookingsPage={setBookingsPage}
          viewerIsUser={viewerIsUser}
          limit={PAGE_LIMIT}
          {...props}
        />
      </Fragment>
    </AgentDetailsPage>
  );
};

export default User;
