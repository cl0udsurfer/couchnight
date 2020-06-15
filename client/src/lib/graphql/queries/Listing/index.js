import { gql } from 'apollo-boost';

export const LISTING = gql`
  query Listing($id: ID!, $bookingsPage: Int!, $limit: Int!) {
    listing(id: $id) {
      id
      title
      description
      image {
        url
      }
      host {
        id
        name
        avatar
        hasWallet
      }
      address
      city
      admin
      country
      location {
        lat
        lng
      }
      bookings(limit: $limit, page: $bookingsPage) {
        total
        result {
          id
          tenant {
            id
            name
            avatar
          }
          checkIn
          checkOut
        }
      }
      bookingsIndex
      price
      guests
      wifi
      airCon
      pool
      parking
    }
  }
`;
