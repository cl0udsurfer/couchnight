import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { LOG_IN, LOG_OUT } from 'lib/graphql/mutations';
import { displayErrorMessage, displaySuccessNotification } from 'lib/utils';

export const AuthContext = React.createContext();

const initialViewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false
};

const AuthProvider = ({ children }) => {
  const [viewer, setViewer] = useState(initialViewer);

  const [logIn, { error }] = useMutation(LOG_IN, {
    onCompleted: data => {
      if (data && data.logIn) {
        setViewer(data.logIn);
        if (data.logIn.token) {
          sessionStorage.setItem('token', data.logIn.token);
        } else {
          sessionStorage.removeItem('token');
        }
      }
    }
  });

  const logInRef = useRef(logIn);

  const [logOut] = useMutation(LOG_OUT, {
    onCompleted: data => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        sessionStorage.removeItem('token');
        displaySuccessNotification("You've successfully logged out!");
      }
    },
    onError: () => {
      displayErrorMessage(
        "Sorry! We weren't able to log you out. Please try again later!"
      );
    }
  });

  const logOutRef = useRef(logOut).current;

  useEffect(() => {
    logInRef.current();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        viewer,
        error,
        setViewer,
        logOutRef
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
