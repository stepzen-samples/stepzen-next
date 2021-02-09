import { gql } from "graphql-request";

export const CUSTOMERS = gql`
  query customer($carrier: String!, $trackingId: String!) {
    delivery(carrier: $carrier, trackingId: $trackingId) {
      status
      statusDate
    }
  }
`