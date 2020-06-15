import styled from 'styled-components';

const LocationWrapper = styled.div`
  padding: 29px 0;

  .location_meta {
    margin-bottom: 29px;
  }
  a {
    &:hover {
      color: #31b8bd;
    }
  }
`;

export const MapWrapper = styled.div`
  z-index: 10;
`;

export default LocationWrapper;
