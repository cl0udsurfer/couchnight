import { gql } from 'apollo-boost';

export const LISTINGS = gql`
  query Listings(
    $location: String
    $filter: ListingsFilter!
    $limit: Int!
    $page: Int!
  ) {
    listings(location: $location, filter: $filter, limit: $limit, page: $page) {
      region
      location {
        lat
        lng
      }
      total
      result {
        id
        title
        image {
          url
        }
        address
        admin
        country
        location {
          lat
          lng
        }
        price
      }
    }
  }
`;
