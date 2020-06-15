import React, { Fragment } from 'react';
import StyledSkeleton from './PageSkeleton.style';

export const PageSkeleton = () => {
  const skeletonParagraph = <StyledSkeleton active paragraph={{ rows: 4 }} />;

  return (
    <Fragment>
      {skeletonParagraph}
      {skeletonParagraph}
      {skeletonParagraph}
    </Fragment>
  );
};
