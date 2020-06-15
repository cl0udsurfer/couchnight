import styled from 'styled-components';

export const HomePicturesWrapper = styled.div`
  .home__listings-img-cover {
    width: 100%;
    cursor: pointer;
  }
  @media (max-width: 36em) {
    .home__listings-img-cover {
      padding: 10px 0;
    }
  }
  .home__listings-img {
    width: 100%;
  }

  .homePictures__heading {
    margin-top: 30px;
    margin-bottom: 10px;
  }
`;
