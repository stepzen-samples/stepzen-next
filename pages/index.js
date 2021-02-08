import Head from "next/head";
import React, { useState, useEffect } from "react";
import { GraphQLClient, gql, request } from "graphql-request";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import Orders from "./orders";

//request query
const JOHN = `query customer {  
  customerByEmail(email: "john.doe@example.com") {
		name 
    email
    street
    postalCode
    stateProvince
  }
}`;

// posts will be populated at build time by getStaticProps()
function Home({ customers }) {
  const [showOrders, setShowOrders] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = handleSubmit(async ({ email }) => {
    const endpoint = "https://anant.stepzen.net/api/meetup/__graphql";
    const graphQLClient = new GraphQLClient(endpoint, {});
    if (errorMessage) setErrorMessage("");
    const CUSTOMERS = gql`
      query customer($email: String!) {
        customerByEmail(email: $email) {
          name
          email
          street
          postalCode
          stateProvince
          creditCard
          orders {
            createdOn
            carrier
            lineitemsCost
            shippingCost
            tax
            trackingId
            product {
              name
              image
            }
            delivery {
              status
              statusDate
            }
          }
        }
      }
    `;
    try {
      const data = await graphQLClient.request(CUSTOMERS, { email });
      console.log(data);
      setShowOrders(data);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  });

  console.log("static");
  console.log(customers);
  console.log("static");

  console.log("dynamic");
  if (showOrders.customerByEmail) {
    console.log(showOrders.customerByEmail.name);
  }
  console.log("dynamic");

  /* 
    Could not get useSWR to sync with the graphQLClient in the onSubmit function
  */

  // const { data, error } = useSWR(CUSTOMERS, (query) =>
  //   request(API_ENDPOINT, query)
  // );
  // if (error) return <div>failed to load</div>
  // if (!data) return <div>loading...</div>

  if (showOrders.customerByEmail) {
    let orders = showOrders.customerByEmail.orders;
    return (
      <ul>
        {orders.map((order) => (
          <Orders
            id={order.id}
            createdOn={order.createdOn}
            image={order.product.image}
            name={order.product.name}
          />
        ))}
      </ul>
    );
  }
  if (!showOrders.customerByEmail)
    return (
      <div className="container">
        <Head>
          <title>stepzen-next</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        Sorry {customers.name}, we could not retrieve your orders. Can you
        provide us your email below?
        <form onSubmit={onSubmit}>
          <div className="input-area">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="mb2"
              // value={initialValues.to}
              ref={register({ required: "Email is required" })}
              placeholder="john.doe@example.com"
            />
            {errors.task && <span role="alert">{errors.task.message}</span>}
          </div>
          <div>
            <button type="submit" className="submit">
              Submit
            </button>
          </div>
        </form>
        <footer>
          <a
            href="https://stepzen.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by StepZen
          </a>
        </footer>
      </div>
    );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // const variables = { // Line 2
  //   email: "john.doe@example.com",
  //   };

  const res = await request(
    "https://anant.stepzen.net/api/meetup/__graphql",
    JOHN
  );
  const data = res.customerByEmail;
  console.log(data);
  return {
    props: { customers: data },
  };
}

export default Home;
