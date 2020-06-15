import React from 'react';
import FooterWrapper, {
  MenuWrapper,
  CopyrightArea,
  SecondaryFooter,
} from './Footers.style';

export const Footers = ({ logo, menu, bgSrc, copyright, className, path }) => {
  return (
    <>
      <FooterWrapper id='footer' className={className} bg-img={bgSrc}>
        {logo && logo}
        {menu && <MenuWrapper>{menu}</MenuWrapper>}
        {copyright && <CopyrightArea>{copyright}</CopyrightArea>}
      </FooterWrapper>
      {!!path && <SecondaryFooter />}
    </>
  );
};
