import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Booking {
    id: ID!
    listing: Listing!
    tenant: User!
    checkIn: String!
    checkOut: String!
  }

  type Bookings {
    total: Int!
    result: [Booking!]!
  }

  enum ListingsFilter {
    PRICE_LOW_TO_HIGH
    PRICE_HIGH_TO_LOW
  }

  type Image {
    url: String!
  }

  type Listing {
    id: ID!
    title: String!
    description: String!
    image: [Image!]!
    host: User!
    address: String!
    city: String!
    admin: String!
    location: Location!
    country: String!
    bookings(limit: Int!, page: Int!): Bookings
    bookingsIndex: String!
    price: Int!
    guests: Int!
    wifi: Boolean!
    parking: Boolean!
    pool: Boolean!
    airCon: Boolean!
  }

  type Location {
    lat: Float
    lng: Float
  }

  type Listings {
    region: String
    location: Location
    total: Int!
    result: [Listing!]!
  }

  type User {
    id: ID!
    name: String!
    avatar: String!
    contact: String!
    hasWallet: Boolean!
    income: Int
    bookings(limit: Int!, page: Int!): Bookings
    listings(limit: Int!, page: Int!): Listings!
  }

  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

  input LogInInput {
    code: String!
  }

  input ConnectStripeInput {
    code: String!
  }

  input HostListingInput {
    title: String!
    description: String!
    image: String!
    address: String!
    price: Int!
    guests: Int!
    wifi: Boolean!
    parking: Boolean!
    airCon: Boolean!
    pool: Boolean!
  }

  input CreateBookingInput {
    id: ID!
    source: String!
    checkIn: String!
    checkOut: String!
  }

  type Query {
    authUrl: String!
    user(id: ID!): User!
    listing(id: ID!): Listing!
    listings(
      location: String
      filter: ListingsFilter!
      limit: Int!
      page: Int!
    ): Listings!
  }

  type Mutation {
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
    connectStripe(input: ConnectStripeInput!): Viewer!
    disconnectStripe: Viewer!
    hostListing(input: HostListingInput!): Listing!
    createBooking(input: CreateBookingInput!): Booking!
  }
`;
