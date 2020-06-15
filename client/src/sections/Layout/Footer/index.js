import React from 'react';
import { Logo } from 'lib/components';
import LogoImage from 'lib/assets/brand/logo_transparent.png';
import { FooterMenu, Footers } from './components';
import { FooterWrapper } from './Footer.style';

const Footer = () => {
  return (
    <FooterWrapper>
      <Footers
        logo={<Logo withLink linkTo='/' src={LogoImage} title='CouchNight' />}
        menu={<FooterMenu />}
        copyright={`Copyright @ ${new Date().getFullYear()} CouchNight`}
      />
    </FooterWrapper>
  );
};

export default Footer;
