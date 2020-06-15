import React from 'react';
import { Spin } from 'antd';
import { SpinArea, SpinWrapper } from './LoadingSpin.style';

export const LoadingSpin = ({ message }) => {
  return (
    <SpinWrapper>
      <SpinArea>
        <Spin size='large' tip={message} />
      </SpinArea>
    </SpinWrapper>
  );
};
