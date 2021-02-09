import { gql } from "graphql-request";

export const WEATHER = gql`
  query weather {
    customerByEmail(email: "john.doe@example.com") {
      weather {
        temp
      }
    }
  }
`