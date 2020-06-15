import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const LogoArea = styled.div`
  display: flex;
  align-items: center;

  a {
    display: flex;
    align-items: center;
  }

  img {
    width: 70px;
    left: 0;
    right: 0;
  }

  h3 {
    color: ${themeGet('primary.0', '##26466f')};
    text-transform: capitalize;
    font-size: 20px;
    font-weight: 700;
    margin: 0 20px 0 -10px;

    @media only screen and (max-width: 991px) {
      margin: 0 90px 0 -10px;
    }
  }
`;

export default LogoArea;
