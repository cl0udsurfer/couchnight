import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Sticky from 'react-stickynode';
import { IoIosClose } from 'react-icons/io';
import { Button, Drawer, Typography } from 'antd';

import { LayoutContext } from 'lib/context/LayoutProvider';
import { AuthContext } from 'lib/context/AuthProvider';
import useWindowSize from 'lib/hooks/useWindowSize';
import { Logo, TextLink } from 'lib/components';
import couchNight from 'lib/assets/brand/logo_transparent.png';

import {
  AuthMenu,
  Navbar,
  MainMenu,
  MobileMenu,
  ProfileMenu,
  Searchbar,
} from './components';

import HeaderWrapper, {
  MobileNavbar,
  CloseDrawer,
  AvatarWrapper,
  AvatarImage,
  AvatarInfo,
  LogoArea,
} from './Header.style';

const LogoIcon = () => (
  <svg
    version='1.0'
    xmlns='http://www.w3.org/2000/svg'
    width='1200.000000pt'
    height='1200.000000pt'
    viewBox='0 0 1200.000000 1200.000000'
    preserveAspectRatio='xMidYMid meet'
  >
    <metadata>
      Created by potrace 1.15, written by Peter Selinger 2001-2017
    </metadata>
    <g
      transform='translate(0.000000,1200.000000) scale(0.100000,-0.100000)'
      fill='#ffffff'
      stroke='none'
    >
      <path
        d='M5672 9719 c-185 -15 -342 -54 -539 -130 -601 -234 -1040 -779 -1160
-1439 -19 -104 -25 -437 -10 -542 l8 -56 138 -4 c136 -3 138 -3 214 -41 80
-40 132 -89 169 -162 44 -85 48 -121 48 -505 l0 -366 38 -36 c101 -97 306
-233 449 -299 l83 -38 2 726 3 726 360 247 c198 137 365 245 370 241 6 -5 169
-117 363 -250 l352 -243 0 -1009 0 -1009 -135 0 -135 0 0 -1015 0 -1015 1200
0 1200 0 0 38 c0 83 -76 189 -167 233 -45 23 -60 24 -270 27 l-223 3 0 865 0
864 -60 0 -60 0 -2 1011 -3 1012 -96 61 -96 61 5 105 c13 286 -55 601 -189
880 -340 706 -1073 1124 -1857 1059z'
      />
      <path
        d='M5484 7246 c-17 -7 -42 -29 -55 -47 -23 -33 -24 -39 -27 -276 l-3
-243 145 0 146 0 0 233 c0 254 -5 278 -61 320 -34 25 -105 31 -145 13z'
      />
      <path
        d='M6061 7242 c-19 -9 -44 -30 -55 -45 -20 -27 -21 -44 -24 -273 l-3
-244 146 0 145 0 0 228 c0 265 -8 295 -79 331 -49 26 -85 26 -130 3z'
      />
      <path d='M5400 6105 l0 -285 145 0 145 0 0 285 0 285 -145 0 -145 0 0 -285z' />
      <path d='M5980 6105 l0 -285 145 0 145 0 0 285 0 285 -145 0 -145 0 0 -285z' />
      <path
        d='M4833 4928 c-6 -7 -63 -103 -128 -213 -169 -286 -195 -331 -195 -339
0 -3 325 -5 721 -4 l721 3 164 275 c90 151 163 278 164 283 0 4 -323 7 -719 7
-563 0 -721 -3 -728 -12z'
      />
      <path d='M5400 3790 l0 -290 145 0 145 0 0 290 0 290 -145 0 -145 0 0 -290z' />
      <path
        d='M4182 3785 c-49 -15 -85 -36 -124 -73 -27 -25 -28 -30 -28 -119 l0
-93 408 0 407 0 -3 150 -3 150 -307 -1 c-226 0 -318 -4 -350 -14z'
      />
    </g>
  </svg>
);

const Header = withRouter(({ location }) => {
  const { viewer, logOutRef } = useContext(AuthContext);
  const [{ searchVisibility }] = useContext(LayoutContext);
  const { width } = useWindowSize();
  const [state, setState] = useState(false);

  const sidebarHandler = () => {
    setState(!state);
  };

  const headerType = location.pathname === '/' ? 'transparent' : 'default';

  return (
    <HeaderWrapper>
      <Sticky
        top={headerType === 'transparent' ? -1 : 0}
        innerZ={10001}
        activeClass='isHeaderSticky'
      >
        {width > 991 ? (
          <Navbar
            logo={
              <>
                {headerType === 'transparent' && <LogoIcon />}
                <Logo withLink linkTo='/' src={couchNight} title='CouchNight' />
              </>
            }
            navMenu={<MainMenu />}
            authMenu={<AuthMenu viewer={viewer} />}
            avatar={<Logo src={viewer.avatar} />}
            searchComponent={<Searchbar />}
            profileMenu={
              <ProfileMenu
                avatar={<Logo src={viewer.avatar} />}
                logOutRef={logOutRef}
                viewerId={viewer.id}
              />
            }
            viewer={viewer}
            headerType={headerType}
            location={window.location.pathname}
            searchVisibility={searchVisibility}
          />
        ) : (
          <MobileNavbar className={headerType}>
            <LogoArea>
              <>
                {headerType === 'transparent' && <LogoIcon />}
                <Logo withLink linkTo='/' src={couchNight} title='CouchNight' />
              </>
              <Searchbar />
            </LogoArea>
            <Button
              className={`hamburg-btn ${state ? 'active' : ''}`}
              onClick={sidebarHandler}
            >
              <span />
              <span />
              <span />
            </Button>
            <Drawer
              placement='right'
              closable={false}
              onClose={sidebarHandler}
              width='285px'
              className='mobile-header'
              visible={state}
            >
              <CloseDrawer>
                <button onClick={sidebarHandler}>
                  <IoIosClose />
                </button>
              </CloseDrawer>
              {viewer.id && viewer.avatar ? (
                <AvatarWrapper>
                  <AvatarImage>
                    <Logo src={viewer.avatar} />
                  </AvatarImage>
                  <AvatarInfo>
                    <Typography.Text>Profile</Typography.Text>
                    <br />
                    <TextLink
                      link={`/user/${viewer.id}`}
                      content='View Profile'
                    />
                  </AvatarInfo>
                </AvatarWrapper>
              ) : (
                <AuthMenu className='auth-menu' viewer={viewer} />
              )}
              <MobileMenu
                viewer={viewer}
                logOutRef={logOutRef}
                className='main-menu'
              />
            </Drawer>
          </MobileNavbar>
        )}
      </Sticky>
    </HeaderWrapper>
  );
});

export default Header;
