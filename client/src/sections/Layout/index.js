import React, { Fragment } from 'react';

import { Layout } from 'antd';
import LayoutProvider from 'lib/context/LayoutProvider';
import Header from './Header';
import Footer from './Footer';

export const LayoutMain = ({ children }) => {
  return (
    <LayoutProvider>
      <Fragment>
        <Header />
        <Layout.Content>{children}</Layout.Content>
        <Footer />
      </Fragment>
    </LayoutProvider>
  );
};
