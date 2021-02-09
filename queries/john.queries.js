import { gql } from "graphql-request";

export const JOHN = gql`
  query customer {  
    customerByEmail(email: "john.doe@example.com") {
      name 
      email
      street
      postalCode
      stateProvince
    }
  }
`