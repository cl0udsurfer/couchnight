import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

export const UserContactSection = ({ viewerIsUser, user }) => {
  if (viewerIsUser) {
    return <h1>You cannot contact yourself</h1>;
  }

  return (
    <div>
      <Title level={3}>Email: {user.contact}</Title>
    </div>
  );
};
